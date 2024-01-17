import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Experience2 from "./Experience2.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [4, -2, 6],
      }}
    >
      <Experience />

      {/* EXPERIENCE 2 is a different method but instructor preffers the other 'group' method */}
      {/* <Experience2 /> */}
    </Canvas>
    {/* <div style={{ color: "black" }}>
      HIJFIRENWVINVRIWVNROKKOGOKGORKGORKMGPROEFPODKMMKVVVKFMKFDMGKMVKERMVKMERKM
    </div> */}
  </>
);
