import {
  OrbitControls,
  RoundedBox,
  useGLTF,
  useTexture,
} from "@react-three/drei";

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  const bakedTexture = useTexture("./model/baked.jpg");
  return (
    <>
      <color args={["#030202"]} attach="background" />
      <OrbitControls makeDefault />
      {/* <directionalLight intensity={3.5} position={[-1, 1, 1]} /> */}

      {/* <primitive object={nodes.baked} /> */}

      {/* <mesh geometry={nodes.baked.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh> */}
      <>
        <ambientLight intensity={0.2} />
        <directionalLight intensity={3.5} position={[1, 0.5, -0.4]} />
        <MenuButtons position={[isMobile ? 0 : 1, 0, 2]} />
        <Planet position={[isMobile ? 0 : -1, 0, 6]} />
      </>

      <RoundedBox args={[1, 0.5, 0.1]} />
      <RoundedBox args={[1, 0.5, 0.1]} />
      <RoundedBox args={[1, 0.5, 0.1]} />
    </>
  );
}
