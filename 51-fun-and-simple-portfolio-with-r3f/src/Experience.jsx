import {
  Environment,
  Center,
  useGLTF,
  Text,
  Float,
  PresentationControls,
  ContactShadows,
  Html,
} from "@react-three/drei";

export default function Experience() {
  const computer = useGLTF(
    "https://threejs-journey.com/resources/models/macbook_model.gltf"
  );

  const website = "https://tailormadesites.vercel.app/";
  // const website = "https://meme-mapper.vercel.app/";

  return (
    <>
      <Environment preset="forest" />
      <color args={["#241a1a"]} attach="background" />
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        // polar will put limitations on the up and down drag
        polar={[-0.4, 0.2]}
        // azimuth will put limitations on the left to right drag
        azimuth={[-1, 0.75]}
        //this config gives it some spring when spinning
        config={{ mass: 2, tension: 400 }}
        //snap takes it back to the initial position
        snap={{ mass: 4, tension: 400 }}
      >
        {/* <Text position={Vector3(["3", "3", "3"])}>HELLO</Text> */}
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#ff6900"}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive
            object={computer.scene}
            position-y={-1.15}
            position-x={-0.5}
          >
            <Html
              transform
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
            >
              <iframe src={website} />
            </Html>
          </primitive>
          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={0.5}
            position={[1.25, 0.75, 0.25]}
            rotation-y={-1.25}
            //to provide linebreak:
            // children={"Tailor\rMade\rSites"}
            maxWidth={1}
            textAlign="right"
          >
            Tailor Made Sites
          </Text>
        </Float>
      </PresentationControls>
      {/* BELOW ADDS A SHADOW OBV */}
      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
