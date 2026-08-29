import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Group } from 'three';

interface BuildingProps {
  stage: number;
}

export default function Building({ stage }: BuildingProps) {
  const structureRef = useRef<Group>(null!);
  const facadeRef = useRef<Group>(null!);
  
  const FLOORS = 15;
  const FLOOR_HEIGHT = 0.5;
  const BUILDING_WIDTH = 3.5;
  const BUILDING_DEPTH = 3.5;
  
  const floors = useMemo(() => {
    const arr = [];
    for (let i = 0; i < FLOORS; i++) {
      arr.push(i);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    // Animate structure scale Y
    const targetStructureScale = stage >= 1 ? 1 : 0.001;
    structureRef.current.scale.y = MathUtils.damp(structureRef.current.scale.y, targetStructureScale, 4, delta);
    
    // Animate facade opacity
    const targetFacadeOpacity = stage >= 2 ? 0.75 : 0;
    facadeRef.current.children.forEach((child: any) => {
      if (child.material) {
        child.material.opacity = MathUtils.damp(child.material.opacity, targetFacadeOpacity, 4, delta);
      }
    });
  });

  return (
    <group position={[0, -1.5, 0]}>
      {/* FOUNDATION (Always visible) */}
      <group position={[0, 0.25, 0]}>
        {/* Base layer */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[8, 0.5, 8]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
        </mesh>
        {/* Secondary pedestal */}
        <mesh position={[0, 0.35, 0]} receiveShadow>
          <boxGeometry args={[6, 0.2, 6]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.8} />
        </mesh>
        {/* Pool / Waterfront feature */}
        <mesh position={[0, 0.46, -2.5]} receiveShadow>
          <boxGeometry args={[4, 0.02, 1.5]} />
          <meshStandardMaterial color="#0066cc" roughness={0.1} metalness={0.8} />
        </mesh>
        {/* Landscape / Trees placeholders */}
        <mesh position={[2.5, 0.5, 2.5]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.5]} />
          <meshStandardMaterial color="#2d4c1e" />
        </mesh>
        <mesh position={[-2.5, 0.5, 2.5]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.5]} />
          <meshStandardMaterial color="#2d4c1e" />
        </mesh>
      </group>

      {/* STRUCTURE (Stage 1+) */}
      <group ref={structureRef} position={[0, 0.5, 0]}>
        {/* Elevator Core */}
        <mesh position={[0, (FLOORS * FLOOR_HEIGHT) / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, FLOORS * FLOOR_HEIGHT, 1.2]} />
          <meshStandardMaterial color="#555555" roughness={0.9} />
        </mesh>

        {/* Floors and Pillars */}
        {floors.map((floor) => (
          <group key={floor} position={[0, floor * FLOOR_HEIGHT, 0]}>
            {/* Floor Slab */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[BUILDING_WIDTH, 0.08, BUILDING_DEPTH]} />
              <meshStandardMaterial color="#888888" roughness={0.8} />
            </mesh>
            
            {/* Corner Pillars */}
            <mesh position={[-BUILDING_WIDTH/2 + 0.15, FLOOR_HEIGHT/2, -BUILDING_DEPTH/2 + 0.15]} castShadow>
              <boxGeometry args={[0.15, FLOOR_HEIGHT, 0.15]} />
              <meshStandardMaterial color="#777777" />
            </mesh>
            <mesh position={[BUILDING_WIDTH/2 - 0.15, FLOOR_HEIGHT/2, -BUILDING_DEPTH/2 + 0.15]} castShadow>
              <boxGeometry args={[0.15, FLOOR_HEIGHT, 0.15]} />
              <meshStandardMaterial color="#777777" />
            </mesh>
            <mesh position={[-BUILDING_WIDTH/2 + 0.15, FLOOR_HEIGHT/2, BUILDING_DEPTH/2 - 0.15]} castShadow>
              <boxGeometry args={[0.15, FLOOR_HEIGHT, 0.15]} />
              <meshStandardMaterial color="#777777" />
            </mesh>
            <mesh position={[BUILDING_WIDTH/2 - 0.15, FLOOR_HEIGHT/2, BUILDING_DEPTH/2 - 0.15]} castShadow>
              <boxGeometry args={[0.15, FLOOR_HEIGHT, 0.15]} />
              <meshStandardMaterial color="#777777" />
            </mesh>
          </group>
        ))}
      </group>

      {/* FACADE (Stage 2+) */}
      <group ref={facadeRef} position={[0, 0.5, 0]}>
        {/* Glass Curtain Wall */}
        <mesh position={[0, (FLOORS * FLOOR_HEIGHT) / 2, 0]}>
          <boxGeometry args={[BUILDING_WIDTH + 0.1, FLOORS * FLOOR_HEIGHT, BUILDING_DEPTH + 0.1]} />
          <meshPhysicalMaterial 
            color="#aaddff"
            transparent
            opacity={0}
            roughness={0.1}
            metalness={0.2}
            transmission={0.9} 
            ior={1.5}
            thickness={0.5}
          />
        </mesh>
        
        {/* Roof Crown */}
        <mesh position={[0, FLOORS * FLOOR_HEIGHT + 0.2, 0]}>
          <boxGeometry args={[BUILDING_WIDTH + 0.1, 0.4, BUILDING_DEPTH + 0.1]} />
          <meshStandardMaterial color="#222222" transparent opacity={0} />
        </mesh>
      </group>
    </group>
  );
}
