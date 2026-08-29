import { Canvas } from '@react-three/fiber';
import { Environment, CameraControls, ContactShadows } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import Building from './Building';

interface ExperienceProps {
  stage: number;
  view: string;
}

function SceneControls({ stage, view }: ExperienceProps) {
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (controlsRef.current) {
      if (stage === 0) {
        controlsRef.current.setLookAt(5, 5, 5, 0, 0, 0, true);
      } else if (stage === 1) {
        controlsRef.current.setLookAt(6, 4, 6, 0, 2, 0, true);
      } else if (stage === 2) {
        if (view === 'city') {
          controlsRef.current.setLookAt(8, 2, 8, 0, 2, 0, true);
        } else {
          controlsRef.current.setLookAt(-8, 3, -8, 0, 2, 0, true);
        }
      }
    }
  }, [stage, view]);

  return <CameraControls ref={controlsRef} makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />;
}

export default function Experience({ stage, view }: ExperienceProps) {
  return (
    <div className="absolute inset-0 z-0 bg-[#0a192f]">
      <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        <Building stage={stage} />
        
        <ContactShadows resolution={512} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>
        <SceneControls stage={stage} view={view} />
      </Canvas>
    </div>
  );
}
