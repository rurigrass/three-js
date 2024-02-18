import {
  Center,
  OrbitControls,
  RoundedBox,
  Sparkles,
  useGLTF,
  useTexture,
} from "@react-three/drei";

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  const bakedTexture = useTexture("./model/baked.jpg");
  // bakedTexture.flipY = false;
  console.log(nodes);

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
          <meshBasicMaterial color={"#A020F0"} />
          <Sparkles />
        </mesh>
      </Center>
    </>
  );
}
