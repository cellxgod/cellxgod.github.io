'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Stars,
  Sparkles,
  Float,
  MeshDistortMaterial,
} from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  Vignette,
} from '@react-three/postprocessing'
import type * as THREE from 'three'

function CrystalCore() {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.12
      outerRef.current.rotation.y += delta * 0.18
    }

    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.25
      innerRef.current.rotation.z += delta * 0.2
    }

    // Smooth, lightweight camera parallax
    const { pointer, camera } = state

    const targetX = pointer.x * 0.6
    const targetY = pointer.y * 0.4

    camera.position.x += (targetX - camera.position.x) * 0.04
    camera.position.y += (targetY - camera.position.y) * 0.04

    camera.lookAt(0, 0, 0)
  })

  return (
    <Float
      speed={1.4}
      rotationIntensity={0.4}
      floatIntensity={1.2}
    >
      {/* Wireframe shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Glowing distorted core */}
      <mesh ref={innerRef} scale={1.05}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#a855f7"
          emissiveIntensity={0.9}
          roughness={0.15}
          metalness={0.9}
          distort={0.45}
          speed={2.2}
        />
      </mesh>
    </Float>
  )
}

function OrbitRing({
  radius,
  speed,
  tilt,
  color,
}: {
  radius: number
  speed: number
  tilt: number
  color: string
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * speed
    }
  })

  return (
    <mesh ref={ref} rotation={[tilt, 0.4, 0]}>
      <torusGeometry args={[radius, 0.012, 6, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

export default function BioScene() {
  return (
    <div
      className="fixed inset-0 h-screen w-full"
      aria-hidden="true"
    >
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 50,
        }}
        dpr={[0.75, 1.25]}
        gl={{
          powerPreference: 'high-performance',
          antialias: false,
        }}
      >
        <color attach="background" args={['#0b0713']} />

        <fog
          attach="fog"
          args={['#0b0713', 8, 20]}
        />

        <ambientLight intensity={0.3} />

        <pointLight
          position={[6, 6, 6]}
          intensity={40}
          color="#a855f7"
        />

        <pointLight
          position={[-6, -4, 4]}
          intensity={25}
          color="#22d3ee"
        />

        <CrystalCore />

        <OrbitRing
          radius={2.6}
          speed={0.25}
          tilt={1.2}
          color="#a855f7"
        />

        <OrbitRing
          radius={3.1}
          speed={-0.18}
          tilt={1.6}
          color="#22d3ee"
        />

        {/* Optimized star field */}
        <Stars
          radius={60}
          depth={40}
          count={1400}
          factor={4}
          saturation={0.6}
          fade
          speed={0.6}
        />

        {/* Optimized particles */}
        <Sparkles
          count={80}
          scale={12}
          size={2.2}
          speed={0.35}
          color="#c4b5fd"
        />

        {/* Post-processing */}
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.1}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.8}
            mipmapBlur
          />

          <Vignette
            eskil={false}
            offset={0.25}
            darkness={0.85}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
