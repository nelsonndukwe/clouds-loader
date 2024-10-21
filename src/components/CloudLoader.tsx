/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from "react";
import Scene from "./Scene";
import CloudScene from "./CloudScene";
import gsap from "gsap";
interface CloudLoader {
  timeline: any;
}

const exitAnnimation = (wrapper: any) => {
  gsap.to(wrapper.current, {
    yPercent: -100,
    duration: 3,
    delay: 7,
    ease: "expo.inOut",
  });
};

// Note - use foward fref to pass the ref from the parent to the child and use a timeline to animate them sequentially
const CloudLoader = ({ timeline }: CloudLoader) => {
  const wrapper = useRef(null);
  useEffect(() => {
    if (wrapper.current && timeline) timeline.add(exitAnnimation(wrapper));
  }, [timeline]);

  return (
    <div ref={wrapper} className="h-screen w-screen bg-[#D2E0FB]">
      <div className="fixed inset-0">
        <CloudScene />{" "}
      </div>

      <div className="fixed inset-0">
        <Scene />
      </div>
    </div>
  );
};

export default CloudLoader;
