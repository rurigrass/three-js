import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./experience";
import * as THREE from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    // dpr helps performance - this below is the default.
    dpr={[1, 2]}
    //FLAT CHANGES THE COLOURS
    // flat
    gl={{
      //IMPROVES QUALITY I THINK
      antialias: true,
      toneMapping: THREE.ACESFilmicToneMapping,
      outputColorSpace: THREE.SRGBColorSpace,
    }}
    // orthographic
    camera={{
      // angle
      //   zoom: 100,
      fov: 55,
      near: 0.1,
      far: 200,
      position: [9, 7, 1],
    }}
  >
    <Experience />
  </Canvas>
);
