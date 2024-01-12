import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";
import { useControls } from "leva";

export default function Fox() {
  //NEW WAY TO LOAD WITH DREI - even supports draco whatever that is.
  const FoxModel = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(FoxModel.animations, FoxModel.scene);
  console.log(animations);

  //Animation order on open:
  //   useEffect(() => {
  //     const walk = animations.actions.Walk;
  //     walk.play();
  //     const run = animations.actions.Run;
  //     console.log("hey");
  //     setTimeout(() => {
  //       run.play();
  //       run.crossFadeFrom(walk, 1);
  //     }, 3000);
  //   }, []);

  //ANIMATION CONTROLS
  const { animationName } = useControls({
    // animationName: { options: ["Survey", "Walk", "Run"] },
    animationName: { options: animations.names },
  });

  useEffect(() => {
    const action = animations.actions[animationName];
    action.play();
  }, [animationName]);

  return (
    <primitive
      object={FoxModel.scene}
      scale={0.02}
      position={[-2.5, -1, 2.5]}
    />
  );
}
