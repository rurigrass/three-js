import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useGLTF, Clone } from "@react-three/drei";

export default function Model() {
  //THiS IS ONE WAY
  const hamburgerModel = useLoader(GLTFLoader, "./hamburger.glb");

  //ANOTHER WAY - DRACO MEANS THE FILE IS SMALLER - ITS A PAIN BUT CAN BE USEFUL
  const hamburgerDracoModel = useLoader(
    GLTFLoader,
    // "./FlightHelmet/glTF/FlightHelmet.gltf",
    "./hamburger.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("./draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  //NEW WAY TO LOAD WITH DREI - even supports draco whatever that is.
  const dreiHamburgerModel = useGLTF("./hamburger.glb");
  const dreiHamburgerModelDraco = useGLTF("./hamburger-draco.glb");
  //   console.log(dreiHamburgerModel);

  return (
    <>
      <Clone
        object={dreiHamburgerModelDraco.scene}
        scale={0.35}
        position-x={-4}
      />
      <Clone
        object={dreiHamburgerModelDraco.scene}
        scale={0.35}
        position-x={0}
      />
      <Clone
        object={dreiHamburgerModelDraco.scene}
        scale={0.35}
        position-x={4}
      />
    </>
  );
}

// since this is is outside the Model function it will start loading as soon as the <Model/> is rendered. This basically speeds up thing behind the scenes
useGLTF.preload("./hamburger-draco.glb");
