import {
  Center,
  OrbitControls,
  RoundedBox,
  Sparkles,
  shaderMaterial,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";
import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  const bakedTexture = useTexture("./model/baked.jpg");
  // bakedTexture.flipY = false;
  // console.log(nodes);
  const portalMaterial = useRef();
  useFrame((state, delta) => {
    // console.log("tick");
    portalMaterial.current.uTime += delta;
  });

  return (
    <>
      <color args={["#030202"]} attach="background" />
      <OrbitControls makeDefault />
      <directionalLight intensity={3.5} position={[-1, 1, 1]} />

      {/* <primitive object={nodes.baked} /> */}
      <Center>
        {/* MAIN */}
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} map-flipY={false} />
        </mesh>

        {/* POLELIGHT A */}
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color={"#ffffe5"} />
          <Sparkles />
        </mesh>

        {/* POLELIGHT B */}
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color={"#ffffe5"} />
          <Sparkles />
        </mesh>

        {/* PORTAL */}
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          {/* <meshBasicMaterial color={"#A020F0"} /> */}
          {/* <shaderMaterial
            vertexShader={portalVertexShader}
            fragmentShader={portalFragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uColorStart: { value: new THREE.Color("#ffffff") },
              uColorEnd: { value: new THREE.Color("#000000") },
            }}
          /> */}
          <portalMaterial ref={portalMaterial} />
        </mesh>

        {/* SPARKLES */}
        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={40}
        />
      </Center>
    </>
  );
}
