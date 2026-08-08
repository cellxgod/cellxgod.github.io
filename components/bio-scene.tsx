'use client'

import { useEffect, useRef, useState } from 'react'
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

function CrystalCore({ enableParallax }: { enableParallax: boolean }) {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const smoothing = 1 - Math.exp(-delta * 5)

    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.10
      outerRef.current.rotation.y += delta * 0.15
    }

    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.14
      innerRef.current.rotation.y += delta * 0.06
      innerRef.current.rotation.z += delta * 0.10
    }

    if (enableParallax) {
      const targetX = state.pointer.x * 0.22
      const targetY = state.pointer.y * 0.16

      state.camera.position.x +=
        (targetX - state.camera.position.x) * smoothing

      state.camera.position.y +=
        (targetY - state.camera.position.y) * smoothing

      state.camera.lookAt(0, 0, 0)
    }
  })

  return (
    <Float
      speed={1}
      rotationIntensity={0.22}
      floatIntensity={0.7}
    >
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh ref={innerRef} scale={1.04}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#a855f7"
          emissiveIntensity={0.75}
          roughness={0.18}
          metalness={0.82}
          distort={0.35}
          speed={1.6}
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
        opacity={0.45}
      />
    </mesh>
  )
}

export default function BioScene() {
  const [enableParallax, setEnableParallax] = useState(true)

  useEffect(() => {
    const touchDevice =
      window.matchMedia('(pointer: coarse)').matches

    if (touchDevice) {
      setEnableParallax(false)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 h-screen w-full"
      aria-hidden="true"
      style={{
        background: '#0b0713',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 50,
        }}
        dpr={[0.75, 1]}
        frameloop="always"
        gl={{
          powerPreference: 'high-performance',
          antialias: false,
          alpha: false,
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false,
        }}
        style={{
          background: '#0b0713',
          width: '100%',
          height: '100%',
        }}
      >
        <color attach="background" args={['#0b0713']} />

        <fog
          attach="fog"
          args={['#0b0713', 8, 20]}
        />

        <ambientLight intensity={0.28} />

        <pointLight
          position={[6, 6, 6]}
          intensity={32}
          color="#a855f7"
        />

        <pointLight
          position={[-6, -4, 4]}
          intensity={20}
          color="#22d3ee"
        />

        <CrystalCore
          enableParallax={enableParallax}
        />

        <OrbitRing
          radius={2.6}
          speed={0.18}
          tilt={1.2}
          color="#a855f7"
        />

        <OrbitRing
          radius={3.1}
          speed={-0.14}
          tilt={1.6}
          color="#22d3ee"
        />

        <Stars
          radius={60}
          depth={40}
          count={900}
          factor={3}
          saturation={0.45}
          fade
          speed={0.35}
        />

        <Sparkles
          count={45}
          scale={12}
          size={1.8}
          speed={0.22}
          color="#c4b5fd"
        />

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.24}
            luminanceSmoothing={0.9}
            mipmapBlur
          />

          <Vignette
            eskil={false}
            offset={0.28}
            darkness={0.82}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
