/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { AnimationMixer, Group } from "three";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

const Model = () => {
  const { scene, animations } = useGLTF("/src/assets/stylized_ww1_plane.glb");
  const groupRef = useRef<Group>(null);
  const mixer = useRef<any>(null); // Initialize a reference for the mixer

  // Set up the animation mixer and play the second animation in the animation array
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.position, {
        x: 3.3,
        y: -1.8,
        z: 22,
        duration: 3,
        ease: "power1.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: 0,
        y: 4,
        z: 0,
        duration: 3,
        ease: "power1.out",
      });
    }

    if (animations) {
      // Create a new mixer for the given scene and set the second animation to play
      mixer.current = new AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      // Play the animation
      action.play();
    }

    // Clean up the mixer on unmount
    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
        mixer.current = null;
      }
    };
  }, [animations, scene]);

  // Update the animation frame by frame by delta interval
  useFrame((state, delta) => {
    // Update the animation mixer with the current delta interval so our bees  wings can flutter at delta intervals
    const renderRate = 2.97;
    if (mixer.current) mixer.current.update(delta * renderRate);
  });

  const handleLoadAnimation = ()=>{
    if (groupRef.current) {
      gsap.to(groupRef.current.position, {
        x: -7,
        y: 1.8,
        z: 22,
        duration: 5,
        ease: "expo.inOut",
      });
      gsap.to(groupRef.current.rotation, {
        x: 0,
        y: 5,
        z: 0,
        duration: 5,
        ease: "power1.inOut",
      });
    }
  
  }

  return (
    <>
      {/* The 3D model group */}
      <group ref={groupRef} onClick={()=> handleLoadAnimation()}>
        <primitive object={scene} />
      </group>
    </>
  );
};

export default Model;

// Preload the model to optimize performance
useGLTF.preload("/src/assets/stylized_ww1_plane.glb");
