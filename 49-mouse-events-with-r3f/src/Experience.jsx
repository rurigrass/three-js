import { useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  useCursor,
  meshBounds,
} from "@react-three/drei";
import { useRef, useState } from "react";

export default function Experience() {
  const cube = useRef();
  const hamburger = useGLTF("/hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  //   const [color, setColor] = useState("orange");

  const changeColor = (event) => {
    // console.log("COLOR CHANGE!", event);
    // color === "orange" ? setColor("blue") : setColor("orange");
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 66%)`);
  };

  //   const { gl } = useThree();
  const [hovered, setHovered] = useState();
  useCursor(hovered);

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh
        position-x={-2}
        onClick={(event) => {
          //THIS BELOW will stop the user from clicking anything behind this object.
          event.stopPropagation();
          //   setHovered(false);
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color={"orange"} />
      </mesh>

      <mesh
        ref={cube}
        //THIS BELOW CREATES AN INVISIBLE SPHERE ON THE OBJECT TO CLICK ON - !!INCREASES PERFORMANCE!! BUT CAN ONLY WORK ON MESHES.
        // raycast={meshBounds}
        position-x={2}
        scale={1.5}
        //EVENT below is onclick function
        onClick={changeColor}
        //EVENT below is on left click function
        // onContextMenu={changeColor}
        //EVENT below is ondoubleclick
        // onDoubleClick={changeColor}
        //EVENT below is on release of click
        // onPointerUp={changeColor}
        //EVENT below is on down click change
        // onPointerDown={changeColor}
        //EVENT below onPointerOver
        // onPointerOver={changeColor}
        //EVENT below does the same as the previous one
        // onPointerEnter={changeColor}
        //EVENT below do on leave/out
        // onPointerOut={changeColor}
        // onPointerLeave={changeColor}
        //EVENT onPointerMove is triggered on each frame
        // onPointerMove={changeColor}
        //EVENT below onPointerMiss - calls it if you point outside of the cube - useful for unselecting
        // onPointerMissed={changeColor}
        onPointerEnter={() => {
          //   document.body.style.cursor = "pointer";
          //   console.log("POINTER ", gl.domElement.attributeStyleMap.set()); -- theeres a way here to get the canvas style instead of the body but its hard to figure out
          setHovered(true);
        }}
        onPointerLeave={() => {
          //BELOW IS THE NATIVE JS WAY
          //   document.body.style.cursor = "default";
          setHovered(false);
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={hamburger.scene}
        scale={0.25}
        position-y={0.5}
        onClick={(event) => {
          //lets you select the whole hamburger once without having to click all of the parts of it.
          event.stopPropagation();

          console.log(event.object);
        }}
      />
    </>
  );
}
