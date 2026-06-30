export function PatioFurniture({ depth }: { depth: number }) {
  return (
    <group position={[0.8, 0, depth * 0.62]}>
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.44, 0.05, 18]} />
        <meshStandardMaterial color="#4a4a48" roughness={0.35} metalness={0.55} />
      </mesh>
      {[[-0.55, 0.35], [0.55, 0.35], [-0.55, -0.35], [0.55, -0.35]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.42, 0]} castShadow>
            <boxGeometry args={[0.42, 0.03, 0.42]} />
            <meshStandardMaterial color="#5a5a58" roughness={0.4} metalness={0.45} />
          </mesh>
          <mesh position={[0, 0.22, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.42, 6]} />
            <meshStandardMaterial color="#3a3a38" metalness={0.7} roughness={0.25} />
          </mesh>
        </group>
      ))}
      <mesh position={[1.2, 0.28, 0.2]} castShadow>
        <cylinderGeometry args={[0.16, 0.14, 0.28, 12]} />
        <meshStandardMaterial color="#7a5a40" roughness={0.8} />
      </mesh>
      <mesh position={[1.2, 0.48, 0.2]} castShadow>
        <sphereGeometry args={[0.2, 10, 8]} />
        <meshStandardMaterial color="#5a8a48" roughness={0.8} />
      </mesh>
    </group>
  )
}

export function GardenPath({ depth }: { depth: number }) {
  return (
    <group position={[2.5, 0.01, depth * 0.55]}>
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[0, 0, i * 0.45]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[0.18 + (i % 2) * 0.03, 12]} />
          <meshStandardMaterial color={['#9a9590', '#a8a4a0', '#8a8580'][i % 3]} roughness={0.75} />
        </mesh>
      ))}
    </group>
  )
}

export function FlowerBeds({ depth }: { depth: number }) {
  return (
    <group>
      {[-3.2, 4.5].map((x, i) => (
        <group key={i} position={[x, 0, depth * 0.85]}>
          <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 0.24, 0.55]} />
            <meshStandardMaterial color="#5a4030" roughness={0.9} />
          </mesh>
          {[...Array(6)].map((_, j) => (
            <mesh
              key={j}
              position={[(j % 3) * 0.35 - 0.35, 0.32 + (j % 2) * 0.08, Math.floor(j / 3) * 0.2 - 0.1]}
              castShadow
            >
              <sphereGeometry args={[0.1 + (j % 3) * 0.02, 8, 6]} />
              <meshStandardMaterial
                color={['#e8588a', '#f0c040', '#d05070', '#e878a0', '#f0d060', '#c84868'][j]}
                roughness={0.75}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}