import { MeshTransmissionMaterial } from '@react-three/drei'
import { useMemo } from 'react'
import type { Texture } from 'three'
import type { ImpressionSceneMatch } from '../../lib/impressionSceneMatch'
import { getSchuinGeometry, wallCenterY } from '../../lib/roofSlope'
import { getFrameColor, getGlassTint, getModelVisual, hasSchuifpui } from '../../lib/modelVisuals'
import type { SerreConfig } from '../../types'
import { ExteriorPlants } from './ExteriorPlants'
import { HouseAttachment } from './HouseAttachment'
import { SchuifpuiStructure } from './SchuifpuiStructure'
import { SchuinHouseJunction } from './SchuinHouseJunction'
import { SlopedGlassWall } from './SlopedGlassWall'
import { SlopedRoof } from './SlopedRoof'
import { SlidingDoorWall } from './SlidingDoorWall'
import { VerandaStructure } from './VerandaStructure'
import { GasketSeal, ProfileBar } from './FrameProfile'
import { InteriorLifestyle } from './InteriorLifestyle'
import { GardenDecor, GroundPlane } from './Landscape'
import { FlowerBeds, GardenPath, PatioFurniture } from './Patio'
import { useSceneTextures } from './textures'
import type { FrameProps } from './types'

interface Props {
  config: SerreConfig
  scene?: ImpressionSceneMatch
  cinematic?: boolean
}

function useFrameProps(config: SerreConfig, textures: ReturnType<typeof useSceneTextures>): FrameProps {
  return useMemo(() => {
    const vis = getModelVisual(config)
    const isWood = vis.isWood
    const isSteel = vis.isSlim || config.model === 'steellook-serre'
    const hex = getFrameColor(config)
    const baseFrame = isSteel ? 0.034 : isWood ? 0.078 : 0.056

    return {
      isWood,
      isSteel,
      hex,
      frame: baseFrame * vis.frameMult,
      metalness: isWood ? 0.04 : 0.94,
      roughness: isWood ? 0.72 : isSteel ? 0.1 : 0.14,
      clearcoat: isWood ? 0 : 1,
      woodMap: isWood ? textures.woodMap : undefined,
      woodNormal: isWood ? textures.woodNormal : undefined,
    }
  }, [config, textures])
}

function GlassPane({
  size,
  position,
  tint,
  quality = 'high',
  doublePane = true,
  immersive = false,
}: {
  size: [number, number, number]
  position: [number, number, number]
  tint: string
  quality?: 'high' | 'medium'
  doublePane?: boolean
  immersive?: boolean
}) {
  const hi = quality === 'high'
  const [w, h, d] = size
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        {hi ? (
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.15}
            samples={6}
            resolution={512}
            transmission={0.98}
            roughness={0.015}
            thickness={0.32}
            ior={1.52}
            chromaticAberration={0.025}
            anisotropy={0.12}
            distortion={0.08}
            distortionScale={0.15}
            temporalDistortion={0.04}
            color={tint}
            attenuationColor={tint}
            attenuationDistance={4}
            envMapIntensity={immersive ? 2.4 : 1.85}
            clearcoat={0.15}
            clearcoatRoughness={0.05}
          />
        ) : (
          <meshPhysicalMaterial
            color={tint}
            transmission={0.93}
            roughness={0.03}
            thickness={0.22}
            ior={1.52}
            transparent
            envMapIntensity={1.45}
            clearcoat={0.2}
            clearcoatRoughness={0.04}
            reflectivity={0.9}
          />
        )}
      </mesh>
      {doublePane && hi && d > 0.02 && (
        <mesh position={[0, 0, d * 0.18]}>
          <boxGeometry args={[w * 0.98, h * 0.98, d * 0.35]} />
          <meshPhysicalMaterial
            color={tint}
            transmission={0.88}
            roughness={0.02}
            thickness={0.08}
            ior={1.52}
            transparent
            envMapIntensity={1.2}
          />
        </mesh>
      )}
      {hi && (
        <>
          <GasketSeal size={[w + 0.012, 0.006, d + 0.008]} position={[0, h / 2 + 0.004, 0]} />
          <GasketSeal size={[w + 0.012, 0.006, d + 0.008]} position={[0, -h / 2 - 0.004, 0]} />
          <GasketSeal size={[0.006, h + 0.008, d + 0.008]} position={[-w / 2 - 0.004, 0, 0]} />
          <GasketSeal size={[0.006, h + 0.008, d + 0.008]} position={[w / 2 + 0.004, 0, 0]} />
        </>
      )}
    </group>
  )
}

function GlassWall({
  width,
  height,
  depth,
  x,
  y,
  z,
  frame,
  tint,
  columns = 2,
  rows = 2,
  quality = 'high',
  rotationY = 0,
  immersive = false,
}: {
  width: number
  height: number
  depth: number
  x: number
  y: number
  z: number
  frame: FrameProps
  tint: string
  columns?: number
  rows?: number
  quality?: 'high' | 'medium'
  rotationY?: number
  immersive?: boolean
}) {
  const f = frame.frame
  const innerW = width - f * 2.2
  const innerH = height - f * 2.2
  const paneW = innerW / columns - f * 0.28
  const paneH = innerH / rows - f * 0.28

  return (
    <group position={[x, y, z]} rotation={[0, rotationY, 0]}>
      <ProfileBar length={width} axis="x" position={[0, height / 2 - f / 2, 0]} frame={frame} />
      <ProfileBar length={width} axis="x" position={[0, -height / 2 + f / 2, 0]} frame={frame} flip />
      <ProfileBar length={height} axis="y" position={[-width / 2 + f / 2, 0, 0]} frame={frame} />
      <ProfileBar length={height} axis="y" position={[width / 2 - f / 2, 0, 0]} frame={frame} flip />

      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: columns }, (_, col) => {
          const px = -innerW / 2 + paneW / 2 + col * (paneW + f * 0.28)
          const py = -innerH / 2 + paneH / 2 + row * (paneH + f * 0.28)
          return (
            <GlassPane
              key={`${row}-${col}`}
              position={[px, py, 0]}
              size={[paneW, paneH, depth]}
              tint={tint}
              quality={quality}
              immersive={immersive}
            />
          )
        }),
      )}

      {Array.from({ length: columns - 1 }, (_, i) => (
        <ProfileBar
          key={`v-${i}`}
          length={innerH}
          axis="y"
          position={[-innerW / 2 + (i + 1) * (innerW / columns), 0, 0]}
          frame={frame}
        />
      ))}
      {Array.from({ length: rows - 1 }, (_, i) => (
        <ProfileBar
          key={`h-${i}`}
          length={innerW}
          axis="x"
          position={[0, -innerH / 2 + (i + 1) * (innerH / rows), 0]}
          frame={frame}
          flip
        />
      ))}
    </group>
  )
}

function Roof({
  config,
  width,
  depth,
  height,
  frame,
  roofMap,
  roofNormal,
  glassRoof,
  tint,
  schuinGeo,
}: {
  config: SerreConfig
  width: number
  depth: number
  height: number
  frame: FrameProps
  roofMap: Texture
  roofNormal: Texture
  glassRoof?: boolean
  tint: string
  schuinGeo?: ReturnType<typeof getSchuinGeometry>
}) {
  const f = frame.frame
  const y = height + 0.08

  if (config.roof === 'schuin' && schuinGeo) {
    return (
      <SlopedRoof
        width={width}
        geo={schuinGeo}
        frame={frame}
        roofMap={roofMap}
        roofNormal={roofNormal}
        tint={tint}
      />
    )
  }

  const showLichtstraat =
    config.roof === 'lichtstraat' || (config.roof === 'plat' && config.options.includes('lichtstraat'))

  if (showLichtstraat) {
    const curbH = 0.28
    const lsW = width * 0.42
    const lsD = depth * 0.58
    const sideW = (width - lsW) / 2

    return (
      <group position={[0, y, 0]}>
        {/* Buitenrand dak */}
        <ProfileBar length={width} axis="x" position={[0, 0, 0]} frame={frame} />
        <ProfileBar length={depth} axis="z" position={[-width / 2, 0, 0]} frame={frame} />
        <ProfileBar length={depth} axis="z" position={[width / 2, 0, 0]} frame={frame} flip />

        {/* Plat dak – linker en rechter deel */}
        <mesh position={[-width / 2 + sideW / 2, f * 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[sideW - f, 0.05, depth - f * 0.5]} />
          <meshStandardMaterial
            map={roofMap}
            normalMap={roofNormal}
            normalScale={[0.35, 0.35]}
            roughness={0.68}
            envMapIntensity={0.55}
          />
        </mesh>
        <mesh position={[width / 2 - sideW / 2, f * 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[sideW - f, 0.05, depth - f * 0.5]} />
          <meshStandardMaterial
            map={roofMap}
            normalMap={roofNormal}
            normalScale={[0.35, 0.35]}
            roughness={0.68}
            envMapIntensity={0.55}
          />
        </mesh>

        {/* Isolatievlak onder lichtstraat-opening */}
        <mesh position={[0, f * 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[lsW - f * 0.5, 0.04, lsD - f * 0.3]} />
          <meshStandardMaterial color="#6a7078" roughness={0.82} metalness={0.1} />
        </mesh>

        {/* Opstand – 4 hoeken verbonden met plat dak */}
        {[
          [-lsW / 2, -lsD / 2],
          [lsW / 2, -lsD / 2],
          [-lsW / 2, lsD / 2],
          [lsW / 2, lsD / 2],
        ].map(([cx, cz], i) => (
          <ProfileBar
            key={i}
            length={curbH}
            axis="y"
            position={[cx, curbH / 2 + f * 0.3, cz]}
            frame={frame}
          />
        ))}

        {/* Opstand – zijprofielen */}
        <ProfileBar length={lsW - f} axis="x" position={[0, curbH + f * 0.3, -lsD / 2]} frame={frame} />
        <ProfileBar length={lsW - f} axis="x" position={[0, curbH + f * 0.3, lsD / 2]} frame={frame} flip />
        <ProfileBar length={lsD - f} axis="z" position={[-lsW / 2, curbH + f * 0.3, 0]} frame={frame} />
        <ProfileBar length={lsD - f} axis="z" position={[lsW / 2, curbH + f * 0.3, 0]} frame={frame} flip />

        {/* Mullions op lichtstraat */}
        {[-0.2, 0.2].map((off) => (
          <ProfileBar
            key={off}
            length={lsD - f}
            axis="z"
            position={[lsW * off, curbH / 2 + f * 0.35, 0]}
            frame={frame}
          />
        ))}

        {/* Glas lichtstraat op opstand */}
        <GlassPane
          position={[0, curbH + f * 0.45, 0]}
          size={[lsW - f * 1.5, 0.05, lsD - f * 1.2]}
          tint={tint}
          quality="high"
        />
      </group>
    )
  }

  const cols = width >= 5 ? 3 : 2
  const rows = depth >= 3.5 ? 2 : 1
  const panelW = (width - f * 1.2) / cols
  const panelD = (depth - f * 0.8) / rows

  return (
    <group position={[0, y, 0]}>
      <ProfileBar length={width} axis="x" position={[0, 0, 0]} frame={frame} />
      <ProfileBar length={depth} axis="z" position={[-width / 2, 0, 0]} frame={frame} />
      <ProfileBar length={depth} axis="z" position={[width / 2, 0, 0]} frame={frame} flip />

      {glassRoof ? (
        <>
          {Array.from({ length: cols }, (_, c) =>
            Array.from({ length: rows }, (_, r) => (
              <GlassPane
                key={`${c}-${r}`}
                position={[
                  -width / 2 + f * 0.6 + panelW * (c + 0.5),
                  f * 0.55,
                  -depth / 2 + f * 0.4 + panelD * (r + 0.5),
                ]}
                size={[panelW - f * 0.15, 0.04, panelD - f * 0.1]}
                tint={tint}
                quality="high"
              />
            )),
          )}
        </>
      ) : (
        <mesh position={[0, f * 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[width - f * 0.8, 0.05, depth - f * 0.5]} />
          <meshStandardMaterial
            map={roofMap}
            normalMap={roofNormal}
            normalScale={[0.35, 0.35]}
            roughness={0.62}
            metalness={0.12}
            envMapIntensity={0.6}
          />
        </mesh>
      )}

      <mesh position={[0, f + 0.04, depth / 2 + 0.06]} castShadow>
        <boxGeometry args={[width + 0.12, 0.05, 0.08]} />
        <meshPhysicalMaterial color="#2a2a2a" metalness={0.9} roughness={0.2} clearcoat={0.5} />
      </mesh>
    </group>
  )
}

export default function RealisticConservatory({ config, scene, cinematic = false }: Props) {
  const textures = useSceneTextures()
  const frame = useFrameProps(config, textures)
  const vis = getModelVisual(config)
  const width = config.width
  const depth = vis.isFacade ? 0.15 : config.depth
  const terraceDepth = vis.isFacade ? Math.max(config.depth, 3) : depth
  const height = vis.height3d
  const f = frame.frame
  const tint = getGlassTint(config)
  const showSchuifpui = hasSchuifpui(config)
  const useGlassRoof =
    scene?.glassRoof &&
    config.roof === 'plat' &&
    (config.model === 'serre-uitbouw' || config.model === 'steellook-serre')
  const wallH = height - f * 2
  const floorY = f + 0.12
  const isSchuin = config.roof === 'schuin'
  const schuinGeo = isSchuin ? getSchuinGeometry(depth, height, f) : null
  const backWallH = schuinGeo?.backWallHeight ?? wallH
  const frontWallH = schuinGeo?.frontWallHeight ?? wallH
  const wallY = schuinGeo?.backWallCenterY ?? wallCenterY(floorY, wallH)
  const frontWallY = schuinGeo?.frontWallCenterY ?? wallY
  const cols = vis.frontCols
  const rows = vis.frontRows
  const sideCols = vis.sideCols
  const isWoodSerre = config.model === 'houten-serre'
  const frontCols = cols
  const frontRows = isWoodSerre && isSchuin ? 1 : rows
  const woodSideCols = isWoodSerre ? 1 : sideCols

  return (
    <group>
      {!cinematic && (
        <GroundPlane
          grassMap={textures.grassMap}
          grassNormal={textures.grassNormal}
          pavingMap={textures.pavingMap}
          pavingNormal={textures.pavingNormal}
        />
      )}
      {cinematic && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0.2]} receiveShadow>
          <planeGeometry args={[7, 6]} />
          <meshStandardMaterial color="#8a9088" roughness={0.55} metalness={0.05} />
        </mesh>
      )}
      {!cinematic && <GardenDecor depth={depth} />}
      {cinematic ? <PatioFurniture depth={terraceDepth} /> : (
        <>
          <PatioFurniture depth={terraceDepth} />
          <GardenPath depth={terraceDepth} />
          <FlowerBeds depth={terraceDepth} />
        </>
      )}
      {scene?.accentPlants && <ExteriorPlants width={width} depth={terraceDepth} />}

      <HouseAttachment
        conservatoryWidth={width}
        conservatoryDepth={vis.isFacade ? 0 : depth}
        conservatoryHeight={height}
        brickMap={textures.brickMap}
        brickNormal={textures.brickNormal}
        brickRough={textures.brickRough}
        roofMap={textures.roofMap}
        roofNormal={textures.roofNormal}
        frameHex={frame.hex}
        isFacade={vis.isFacade}
        hidePatioDoor={!vis.isFacade && showSchuifpui}
      />

      {vis.isFacade ? (
        <>
          <group position={[0, 0.12, terraceDepth * 0.35]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
              <planeGeometry args={[width + 2.4, terraceDepth + 1.2]} />
              <meshStandardMaterial
                map={textures.pavingMap}
                normalMap={textures.pavingNormal}
                normalScale={[0.25, 0.25]}
                roughness={0.65}
                metalness={0.05}
              />
            </mesh>
          </group>
          <SchuifpuiStructure
            config={config}
            width={width}
            height={height}
            frame={frame}
            tint={tint}
            woodMap={textures.woodMap}
            woodNormal={textures.woodNormal}
            interiorVariant={scene?.interior ?? 'living'}
            warmInterior={scene?.warmInterior ?? true}
          />
        </>
      ) : vis.isVeranda ? (
        <group position={[0, 0.12, 0]}>
          <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
            <boxGeometry args={[width + 0.18, 0.12, depth + 0.18]} />
            <meshStandardMaterial
              map={textures.concreteMap}
              normalMap={textures.concreteNormal}
              normalScale={[0.3, 0.3]}
              roughness={0.55}
              metalness={0.08}
              envMapIntensity={0.5}
            />
          </mesh>
          <VerandaStructure
            config={config}
            width={width}
            depth={depth}
            height={height}
            frame={frame}
            roofMap={textures.roofMap}
            roofNormal={textures.roofNormal}
            tint={tint}
          />
        </group>
      ) : (
        <group position={[0, 0.12, 0]}>
          <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
            <boxGeometry args={[width + 0.18, 0.12, depth + 0.18]} />
            <meshStandardMaterial
              map={textures.concreteMap}
              normalMap={textures.concreteNormal}
              normalScale={[0.3, 0.3]}
              roughness={0.55}
              metalness={0.08}
              envMapIntensity={0.55}
            />
          </mesh>

          {isWoodSerre && (
            <mesh position={[0, f * 0.55, depth / 2 - f * 0.2]} castShadow>
              <boxGeometry args={[width - f * 0.4, f * 0.65, 0.05]} />
              <meshStandardMaterial
                map={textures.woodMap}
                normalMap={textures.woodNormal}
                color={frame.hex}
                roughness={0.8}
                envMapIntensity={0.4}
              />
            </mesh>
          )}

          {/* Aansluiting woning — achtergevel */}
          <group
            position={[
              0,
              isSchuin && schuinGeo ? schuinGeo.backWallCenterY : wallY,
              isSchuin && schuinGeo ? schuinGeo.backZ : -depth / 2 + f / 2,
            ]}
          >
            <ProfileBar
              length={width}
              axis="x"
              position={[0, backWallH / 2 - f / 2, 0]}
              frame={frame}
              flip
            />
            {isWoodSerre ? (
              <>
                <mesh position={[0, 0, -f * 0.3]} castShadow receiveShadow>
                  <boxGeometry args={[width * 0.55, backWallH * 0.88, 0.06]} />
                  <meshStandardMaterial
                    map={textures.woodMap}
                    normalMap={textures.woodNormal}
                    normalScale={[0.3, 0.3]}
                    color={frame.hex}
                    roughness={0.78}
                    envMapIntensity={0.45}
                  />
                </mesh>
                <mesh position={[0, backWallH * 0.22, -f * 0.15]} castShadow>
                  <boxGeometry args={[width * 0.38, backWallH * 0.42, 0.04]} />
                  <meshPhysicalMaterial
                    color="#d8ecff"
                    transmission={0.88}
                    roughness={0.04}
                    thickness={0.14}
                    ior={1.52}
                    transparent
                    envMapIntensity={1.2}
                  />
                </mesh>
              </>
            ) : (
              <>
                <mesh position={[0, 0, -f * 0.35]} castShadow receiveShadow>
                  <boxGeometry args={[width * 0.65, backWallH * 0.92, 0.05]} />
                  <meshStandardMaterial color="#f2ede6" roughness={0.92} />
                </mesh>
                <mesh position={[0, -backWallH * 0.13, -f * 0.2]} castShadow>
                  <boxGeometry args={[width * 0.5, backWallH * 0.55, 0.04]} />
                  <meshStandardMaterial color="#e8e2d8" roughness={0.9} />
                </mesh>
              </>
            )}
          </group>

          {vis.showInterior && (
            <InteriorLifestyle
              width={width}
              depth={depth}
              height={height}
              woodMap={textures.woodMap}
              woodNormal={textures.woodNormal}
              variant={scene?.interior}
              warm={scene?.warmInterior}
            />
          )}

          {isSchuin && schuinGeo ? (
            <>
              {showSchuifpui ? (
                <SlidingDoorWall
                  width={width - f * 0.35}
                  height={frontWallH}
                  depth={f * 0.55}
                  x={0}
                  y={frontWallY}
                  z={schuinGeo.frontZ}
                  frame={frame}
                  tint={tint}
                  panelCount={cols >= 3 ? 3 : 2}
                  transomRows={0}
                  quality="high"
                  floorToCeiling
                />
              ) : (
                <GlassWall
                  width={width - f * 0.7}
                  height={frontWallH}
                  depth={f * 0.5}
                  x={0}
                  y={frontWallY}
                  z={schuinGeo.frontZ}
                  frame={frame}
                  tint={tint}
                  columns={frontCols}
                  rows={frontRows}
                  quality="high"
                  immersive={cinematic}
                />
              )}

              <SlopedGlassWall
                geo={schuinGeo}
                x={-width / 2 + f * 0.75}
                frame={frame}
                tint={tint}
                quality="high"
              />
              <SlopedGlassWall
                geo={schuinGeo}
                x={width / 2 - f * 0.75}
                frame={frame}
                tint={tint}
                quality="high"
              />

              {/* Aansluiting dak ↔ gevels — zelfde lokaal kozijn (Z=0 achter, Z=run voor) */}
              <group position={[0, schuinGeo.floorY, schuinGeo.backZ]}>
                <ProfileBar
                  length={width - f * 0.5}
                  axis="x"
                  position={[0, schuinGeo.backWallHeight, 0]}
                  frame={frame}
                />
                <ProfileBar
                  length={width - f * 0.5}
                  axis="x"
                  position={[0, schuinGeo.frontWallHeight, schuinGeo.run]}
                  frame={frame}
                  flip
                />
              </group>

              <SchuinHouseJunction width={width} depth={depth} geo={schuinGeo} frame={frame} />
            </>
          ) : (
            <>
              <ProfileBar length={wallH} axis="y" position={[-width / 2 + f / 2, wallY, 0]} frame={frame} />
              <ProfileBar length={wallH} axis="y" position={[width / 2 - f / 2, wallY, 0]} frame={frame} flip />

              {showSchuifpui ? (
                <SlidingDoorWall
                  width={width - f * 0.35}
                  height={wallH}
                  depth={f * 0.55}
                  x={0}
                  y={wallY}
                  z={depth / 2 - f / 2}
                  frame={frame}
                  tint={tint}
                  panelCount={cols >= 3 ? 3 : 2}
                  transomRows={0}
                  quality="high"
                  floorToCeiling
                />
              ) : (
                <GlassWall
                  width={width - f * 0.7}
                  height={wallH}
                  depth={f * 0.5}
                  x={0}
                  y={wallY}
                  z={depth / 2 - f / 2}
                  frame={frame}
                  tint={tint}
                  columns={frontCols}
                  rows={frontRows}
                  quality="high"
                  immersive={cinematic}
                />
              )}

              <GlassWall
                width={depth - f * 0.7}
                height={wallH}
                depth={f * 0.5}
                x={-width / 2 + f * 0.75}
                y={wallY}
                z={0}
                frame={frame}
                tint={tint}
                columns={woodSideCols}
                rows={isWoodSerre ? 1 : rows}
                quality="medium"
                rotationY={Math.PI / 2}
                immersive={cinematic}
              />

              <GlassWall
                width={depth - f * 0.7}
                height={wallH}
                depth={f * 0.5}
                x={width / 2 - f * 0.75}
                y={wallY}
                z={0}
                frame={frame}
                tint={tint}
                columns={woodSideCols}
                rows={isWoodSerre ? 1 : rows}
                quality="medium"
                rotationY={-Math.PI / 2}
                immersive={cinematic}
              />

              {config.width >= 3 && frontCols >= 3 && (
                <ProfileBar length={wallH - f} axis="y" position={[0, wallY, 0]} frame={frame} />
              )}
            </>
          )}

          <Roof
            config={config}
            width={width}
            depth={depth}
            height={height}
            frame={frame}
            roofMap={textures.roofMap}
            roofNormal={textures.roofNormal}
            glassRoof={useGlassRoof}
            tint={tint}
            schuinGeo={schuinGeo ?? undefined}
          />

          {config.options.includes('zonwering') && (
            <mesh position={[0, height + 0.24, 0]} castShadow>
              <boxGeometry args={[width - 0.15, 0.035, depth - 0.15]} />
              <meshStandardMaterial color="#e8e4dc" roughness={0.72} side={2} />
            </mesh>
          )}

          {config.options.includes('vloerverwarming') && (
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.116, 0]}>
              <planeGeometry args={[width - 0.3, depth - 0.3]} />
              <meshStandardMaterial color="#e8c4a8" roughness={0.28} emissive="#ff6828" emissiveIntensity={0.05} />
            </mesh>
          )}
        </group>
      )}
    </group>
  )
}