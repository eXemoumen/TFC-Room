'use client';
//https://cgtrader.com/

import { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { Box3, MeshStandardMaterial, TextureLoader, Vector3 } from 'three';
import { OrbitControls } from '@react-three/drei';
import { CameraDataDisplay } from './CemeraDataDisplay';
import { CameraProvider, useCameraData } from '../CameraContext';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { CameraController } from './CameraController';

import { PlaneGeometry, DoubleSide, Mesh } from 'three';

function ThreeScene({ modelUrl = '/jervi/objects/18_MICRO.glb', textureUrl = '/jervi/objects/18_MICRO_COLOR.png' }) {
  const scale = 1000; // Adjust scale to fit the scene or model size
  const aspect = window.innerWidth / window.innerHeight;
  const left = -scale * aspect;
  const right = scale * aspect;
  const top = scale;
  const bottom = -scale;


  return (
    <CameraProvider>
      <Canvas
        camera={{
          position: [0, 50, 300], // Position the camera slightly above and in front of the scene
          near: 1, far: 1000, zoom: 100, //left, right, top, bottom,
          //isOrthographicCamera: true // This prop helps internal checks
        }}
        orthographic // Ensures the renderer understands the camera type
        shadows
      >
        <ambientLight intensity={10} />
        <directionalLight intensity={10}  castShadow />

        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={0.1}
          intensity={1}
          castShadow  // This should enable shadow casting
          shadow-mapSize-width={1024}  // Good for higher resolution shadows
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
        />
        <pointLight position={[-10, -10, -10]} />
        <Suspense receiveShadow fallback={null}>
          <GlbModel modelUrl={modelUrl} colorUrl={textureUrl} />
        </Suspense>

        
        <CameraController />
        <OrbitControls enableZoom={false} />
      </Canvas>
      {/* <CameraDataDisplay /> */}
    </CameraProvider>
  );
}

function GlbModel({ modelUrl, colorUrl }) {
  const gltf = useLoader(GLTFLoader, modelUrl);
  const texture = useLoader(TextureLoader, colorUrl);

  useEffect(() => {
    gltf.scene.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;  // Ensure the mesh can cast shadows
        child.receiveShadow = true;  // Ensure the mesh can receive shadows
      }
    });
  }, [gltf]);

  return (
    <primitive object={gltf.scene} material={new MeshStandardMaterial({ map: texture })} />
  );
}

function GroundPlane() {
  const meshRef = useRef();
  const { scene } = useThree();

  return (
    <mesh
      ref={meshRef}
      rotation-x={-Math.PI / 2} // Rotate the plane to be horizontal
      position-y={-0.1} // Position it slightly below your objects if needed
      receiveShadow={true} // This mesh can receive shadows
    >
      <planeGeometry args={[500, 500]} /> // Define the plane size
      <meshStandardMaterial color="gray" side={DoubleSide} /> // Define the material
    </mesh>
  );
}
export default ThreeScene;
