import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";

interface CloudModelProps {
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
}

const CloudModel = ({ position, rotation }: CloudModelProps) => {
  const { scene } = useGLTF("/src/assets/stylized_clouds.glb");
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      // Clone the GLTF scene so each cloud is independent
      const clonedScene = scene.clone();

      groupRef.current.add(clonedScene);

      // Animate position and rotation using GSAP
      gsap.to(clonedScene.position, {
        x: position.x,
        y: position.y,
        z: position.z,
        duration: 5,
        ease: "power1.out",
      });
      gsap.to(clonedScene.rotation, {
        x: rotation.x,
        y: rotation.y,
        z: rotation.z,
        duration: 5,
        ease: "power1.out",
      });
    }
  }, [position, rotation, scene]);

  return (
    <group ref={groupRef} />
  );
};

export default CloudModel;

// Preload the model for performance optimization
useGLTF.preload("/src/assets/stylized_clouds.glb");
