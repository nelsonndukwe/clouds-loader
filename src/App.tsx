/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from 'react';
import './App.css';
import gsap from 'gsap';
import CloudLoader from './components/CloudLoader';

function App() {
  const [loaderFinished, setLoaderFinished] = useState<boolean>(false);
  const [timeline, setTimeline] = useState<any>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            setLoaderFinished(true);
          }, 1200); // Changed to 1200ms for readability
        },
      });

      setTimeline(tl);
    });

    return () => context.revert();
  }, []);

  return (
    <>
      {loaderFinished ? (
                <CloudLoader timeline={timeline}/>

      ) : (
        <div className="">Hello world</div>
      )}
    </>
  );
}

export default App;
