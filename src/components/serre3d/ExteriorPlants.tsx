export function ExteriorPlants({ width, depth }: { width: number; depth: number }) {
  const pots: [number, number, number, number][] = [
    [-width / 2 - 0.35, 0.22, depth / 2 + 0.45, 0.28],
    [width / 2 + 0.3, 0.2, depth / 2 + 0.35, 0.24],
    [-width / 2 - 0.15, 0.18, depth / 2 + 0.75, 0.2],
    [width / 2 + 0.55, 0.25, depth / 2 + 0.6, 0.32],
    [0.5, 0.16, depth / 2 + 0.9, 0.18],
  ]

  return (
    <group>
      {pots.map(([x, h, z, r], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[r * 0.85, r * 0.7, h, 12]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#9a6848' : '#7a7a78'} roughness={0.78} />
          </mesh>
          <mesh position={[0, h + r * 0.7, 0]} castShadow>
            <sphereGeometry args={[r, 10, 8]} />
            <meshStandardMaterial
              color={['#6a9a58', '#8a7ab8', '#5a8a48', '#e8e8f0', '#7aaa60'][i]}
              roughness={0.75}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}