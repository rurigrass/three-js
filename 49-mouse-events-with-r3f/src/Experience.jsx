import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";

export default function Experience() {
  const cube = useRef();

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  //   const [color, setColor] = useState("orange");

  const changeColor = (event) => {
    console.log("COLOR CHANGE!", event);
    // color === "orange" ? setColor("blue") : setColor("orange");
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 66%)`);
  };

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
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color={"orange"} />
      </mesh>

      <mesh
        ref={cube}
        //EVENT below is onclick function
        // onClick={changeColor}
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
        onPointerMissed={changeColor}
        position-x={2}
        scale={1.5}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
