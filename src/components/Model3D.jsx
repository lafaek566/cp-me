import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function AnimatedAnt({ onLoaded }) {
  const group = useRef();
  const gltf = useGLTF("/assets/r-draco.glb");

  const { animations, scene } = gltf;
  const { actions } = useAnimations(animations, group);

  // Modifikasi material jadi sedikit metalic dan realistis
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Pastikan material adalah MeshStandardMaterial atau ganti jadi itu
        if (!(child.material instanceof THREE.MeshStandardMaterial)) {
          child.material = new THREE.MeshStandardMaterial({
            map: child.material.map || null,
            color: child.material.color || new THREE.Color(0xffffff),
          });
        }
        child.material.metalness = 0.5; // nilai antara 0 - 1, 0.5 cukup subtle
        child.material.roughness = 0.1; // nilai antara 0 - 1, 0.3 untuk sedikit halus
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

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
    if (gltf) {
      onLoaded();
    }
  }, [gltf, onLoaded]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.2}
      position={[0, 0, 0]}
      castShadow
      receiveShadow
    />
  );
}

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
        intensity={1}
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
        penumbra={1.5}
        position={[0, 6, 2]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}

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
        <Canvas shadows camera={{ position: [2.5, 2, 8], fov: 45 }}>
          <ambientLight intensity={1.2} />
          <directionalLight
            position={[1, 15, 7]}
            intensity={2.9}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[1, 1, 1]} intensity={2} />
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
