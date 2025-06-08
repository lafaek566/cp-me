import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useAnimations, useFBX } from "@react-three/drei";
import * as THREE from "three";

// Ant Model with Animations (no textures)
function AnimatedAnt({ onLoaded }) {
  const group = useRef();
  const fbx = useFBX("/assets/robot.fbx");

  const { animations } = fbx;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        action.reset().fadeIn(1).play();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = true;
        action.enabled = true;
      });
    }
  }, [actions]);

  useEffect(() => {
    if (fbx) {
      onLoaded(); // Notify parent when model is ready
    }
  }, [fbx, onLoaded]);

  return (
    <primitive
      ref={group}
      object={fbx}
      scale={0.013}
      position={[0, 0, 0]}
      castShadow
      receiveShadow
    />
  );
}

// Dynamic Light Animation
function MovingLights() {
  const pointLightRef = useRef();
  const spotLightRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pointLightRef.current) {
      pointLightRef.current.position.set(
        Math.sin(t) * 5,
        2 + Math.sin(t * 2) * 1,
        Math.cos(t) * 5
      );
    }

    if (spotLightRef.current) {
      spotLightRef.current.position.set(
        Math.sin(t * 0.5) * 2,
        6 + Math.sin(t * 3) * 0.5,
        2
      );
    }
  });

  return (
    <>
      <pointLight
        ref={pointLightRef}
        intensity={3}
        distance={10}
        color="#00aaff"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <spotLight
        ref={spotLightRef}
        intensity={0.5}
        angle={0.3}
        penumbra={5.5}
        position={[0, 6, 2]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}

// Main Canvas Component
export default function Model3D() {
  const [loading, setLoading] = useState(true);

  const handleModelLoaded = () => setLoading(false);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            color: "#fff",
            zIndex: 100,
          }}
        >
          Tunggu ya...
        </div>
      )}

      <div
        className="w-full h-full"
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        <Canvas shadows camera={{ position: [5, 2, 5], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[1, 15, 7]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[1, 1, 1]} intensity={0.5} />
          <Suspense fallback={null}>
            <AnimatedAnt onLoaded={handleModelLoaded} />
            <MovingLights />
          </Suspense>
          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>
    </>
  );
}
