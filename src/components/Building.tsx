import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MathUtils } from 'three';

interface BuildingProps {
  stage: number;
}

export default function Building({ stage }: BuildingProps) {
  const structureRef = useRef<Mesh>(null!);
  const facadeRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    // Animate structure scale Y
    const targetStructureScale = stage >= 1 ? 1 : 0.01;
    structureRef.current.scale.y = MathUtils.damp(structureRef.current.scale.y, targetStructureScale, 4, delta);
    structureRef.current.position.y = (structureRef.current.scale.y * 3) / 2 + 0.5;

    // Animate facade opacity
    const targetFacadeOpacity = stage >= 2 ? 0.7 : 0;
    const material = facadeRef.current.material as any;
    material.opacity = MathUtils.damp(material.opacity, targetFacadeOpacity, 4, delta);
  });

  return (
    <group>
      {/* Foundation (Always visible) */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[4, 0.5, 4]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Structure (Stage 1+) */}
      <mesh ref={structureRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[2.5, 3, 2.5]} />
        <meshStandardMaterial color="#888888" wireframe={stage === 1} />
      </mesh>

      {/* Facade (Stage 2+) */}
      <mesh ref={facadeRef} position={[0, 2, 0]}>
        <boxGeometry args={[2.7, 3.2, 2.7]} />
        <meshPhysicalMaterial 
          color="#a0c0d0"
          transparent
          opacity={0}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>
    </group>
  );
}
