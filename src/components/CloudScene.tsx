import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CloudModel from "./CloudModel";

const CloudScene = () => {
  return (
    <Canvas
      dpr={Math.min(window.devicePixelRatio, 1.5)}
      gl={{ antialias: true }}
      camera={{
        fov: 70,
        near: 0.01,
        far: 1000,
        position: [0, 0, 25],
      }}
    >
      <ambientLight color={0xffffff} intensity={1.9} />
      <directionalLight
        color={0xffffff}
        intensity={1}
        position={[500, 500, 500]}
      />
      <Suspense  fallback={<div>Loading...</div>}>
        <CloudModel
          key={1}
          position={{ x: -10, y: 2, z: 17 }}
          rotation={{ x: 1, y: 2, z: 3 }}
        />
        <CloudModel
          key={2}
          position={{ x:5, y: -8, z: -3 }}
          rotation={{ x: 1, y: 2, z: 3 }}
        />
        <CloudModel
          key={3}
          position={{ x: -10, y: 6, z: -3 }}
          rotation={{ x: 1, y: 5, z: 3 }}
        />
        <CloudModel
          key={4}
          position={{ x: 16, y: 0, z: 3 }}
          rotation={{ x: 1, y: 2, z: 3 }}
        /> 
      </Suspense>
    </Canvas>
  );
};

export default CloudScene;
