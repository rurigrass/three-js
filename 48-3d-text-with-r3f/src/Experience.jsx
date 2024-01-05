import {
  useMatcapTexture,
  Center,
  Text3D,
  OrbitControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
// import { useState } from "react";

//IMPORT THE TORUS AND MATERIAL FROM THREE FOR PERFORMANCE
const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material1 = new THREE.MeshMatcapMaterial();
const material2 = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const donutsGroup = useRef();

  //Saving the torus geometry in a usestate for performance. Set in JSX using setTorusGeometry its then called within the mesh
  // const [torusGeometry, setTorusGeometry] = useState();
  // const [material, setMaterial] = useState();
  // console.log(torusGeometry);

  //DECONSTRUCT TO SHOW FIRST VALUE
  // const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  //SECOND PARAMETER SHOWS DESIRED WIDTH
  const [matcapTexture1] = useMatcapTexture("7877EE_D87FC5_75D9C7_1C78C0", 256);
  const [matcapTexture2] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  // console.log(matcapTexture2);

  //LOAD WITH USEEFFECT WITH ALL THIS STUFF FOR PERFORMANCE
  useEffect(() => {
    matcapTexture1.colorSpace = THREE.SRGBColorSpace;
    matcapTexture2.colorSpace = THREE.SRGBColorSpace;
    matcapTexture1.needsUpdate = true;
    matcapTexture2.needsUpdate = true;
    material1.matcap = matcapTexture1;
    material2.matcap = matcapTexture2;
    material1.needsUpdate = true;
    material2.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    for (const donut of donutsGroup.current.children) {
      donut.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />
      {/* <torusGeometry ref={setTorusGeometry} /> */}
      {/* <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture2} /> */}

      {/* <mesh scale={1.5}>
        <boxGeometry />
      </mesh> */}

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled={true}
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={material1}
        >
          PLAY NOW
          {/* <meshBasicMaterial /> */}
          {/* <meshMatcapMaterial matcap={matcapTexture1} /> */}
        </Text3D>
      </Center>

      <group ref={donutsGroup}>
        {[...Array(100)].map((x, i) => (
          <mesh
            key={i}
            geometry={torusGeometry}
            material={material2}
            scale={0.2 + Math.random() * 0.2}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          />
        ))}
      </group>
    </>
  );
}
