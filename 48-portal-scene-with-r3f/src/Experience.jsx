import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  console.log("hi");
  return (
    <>
      <OrbitControls makeDefault />

      <mesh scale={1.5}>
        <boxGeometry />
        <boxGeometry />

        <meshNormalMaterial />
      </mesh>
    </>
  );
}
