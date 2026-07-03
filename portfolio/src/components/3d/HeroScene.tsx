'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ── Dual-shell gold star field ──────────────────────── */
function GoldParticles() {
  const inner = useRef<THREE.Points>(null)
  const outer = useRef<THREE.Points>(null)
  const dust  = useRef<THREE.Points>(null)

  const [iPos, oPos, dPos] = useMemo(() => {
    const sphere = (count: number, rMin: number, rMax: number) => {
      const arr = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        const phi   = Math.acos(2 * Math.random() - 1)
        const theta = 2 * Math.PI * Math.random()
        const r     = rMin + Math.random() * (rMax - rMin)
        arr[i*3]   = r * Math.sin(phi) * Math.cos(theta)
        arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
        arr[i*3+2] = r * Math.cos(phi)
      }
      return arr
    }
    // Galactic dust cloud: random wide spread
    const d = new Float32Array(600 * 3)
    for (let i = 0; i < 600; i++) {
      d[i*3]   = (Math.random() - 0.5) * 14
      d[i*3+1] = (Math.random() - 0.5) * 14
      d[i*3+2] = (Math.random() - 0.5) * 14
    }
    return [sphere(2000, 2.4, 3.4), sphere(1400, 4.2, 6.0), d]
  }, [])

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (inner.current) {
      inner.current.rotation.y =  t * 0.055
      inner.current.rotation.x =  Math.sin(t * 0.022) * 0.2
    }
    if (outer.current) {
      outer.current.rotation.y = -t * 0.022
      outer.current.rotation.z =  Math.cos(t * 0.016) * 0.12
    }
    if (dust.current) {
      dust.current.rotation.y =  t * 0.008
      dust.current.rotation.x = -t * 0.005
    }
  })

  return (
    <>
      <Points ref={inner} positions={iPos} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#E8C96A" size={0.013} sizeAttenuation depthWrite={false} opacity={0.8} />
      </Points>
      <Points ref={outer} positions={oPos} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#C9A84C" size={0.007} sizeAttenuation depthWrite={false} opacity={0.35} />
      </Points>
      <Points ref={dust} positions={dPos} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#8B6914" size={0.004} sizeAttenuation depthWrite={false} opacity={0.2} />
      </Points>
    </>
  )
}

/* ── Core distorted icosahedron ──────────────────────── */
function CoreSphere() {
  const solid = useRef<THREE.Mesh>(null)
  const wire1 = useRef<THREE.Mesh>(null)
  const wire2 = useRef<THREE.Mesh>(null)
  const wire3 = useRef<THREE.Mesh>(null)

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (solid.current) {
      solid.current.rotation.x = t * 0.06
      solid.current.rotation.y = t * 0.10
      solid.current.rotation.z = Math.sin(t * 0.035) * 0.12
    }
    if (wire1.current) {
      wire1.current.rotation.x = -t * 0.045
      wire1.current.rotation.y =  t * 0.085
    }
    if (wire2.current) {
      wire2.current.rotation.x =  t * 0.028
      wire2.current.rotation.y = -t * 0.055
      wire2.current.rotation.z =  t * 0.038
    }
    if (wire3.current) {
      wire3.current.rotation.y =  t * 0.03
      wire3.current.rotation.z = -t * 0.025
    }
  })

  return (
    <group>
      <mesh ref={solid}>
        <icosahedronGeometry args={[1.05, 4]} />
        <MeshDistortMaterial
          color="#1A1A26" emissive="#C9A84C" emissiveIntensity={0.22}
          transparent opacity={0.94} roughness={0.1} metalness={0.9}
          distort={0.12} speed={2.0}
        />
      </mesh>
      {/* Dense inner wireframe */}
      <mesh ref={wire1}>
        <icosahedronGeometry args={[1.13, 3]} />
        <meshBasicMaterial color="#E8C96A" wireframe transparent opacity={0.28} />
      </mesh>
      {/* Mid wireframe */}
      <mesh ref={wire2}>
        <icosahedronGeometry args={[1.38, 1]} />
        <meshBasicMaterial color="#C9A84C" wireframe transparent opacity={0.1} />
      </mesh>
      {/* Outer ghost */}
      <mesh ref={wire3}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#8B6914" wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  )
}

/* ── Orbital ring system ─────────────────────────────── */
function OrbitalRings() {
  const r1 = useRef<THREE.Mesh>(null)
  const r2 = useRef<THREE.Mesh>(null)
  const r3 = useRef<THREE.Mesh>(null)
  const r4 = useRef<THREE.Mesh>(null)
  const r5 = useRef<THREE.Mesh>(null)

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (r1.current) r1.current.rotation.z =  t * 0.20
    if (r2.current) r2.current.rotation.z = -t * 0.14
    if (r3.current) {
      r3.current.rotation.y = t * 0.09
      r3.current.rotation.x = Math.PI / 3 + t * 0.045
    }
    if (r4.current) {
      r4.current.rotation.y = -t * 0.06
      r4.current.rotation.z =  t * 0.03
    }
    if (r5.current) {
      r5.current.rotation.x = t * 0.04
      r5.current.rotation.z = Math.PI / 4 - t * 0.025
    }
  })

  return (
    <>
      {/* Equatorial — brightest */}
      <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.74, 0.007, 16, 180]} />
        <meshBasicMaterial color="#E8C96A" transparent opacity={0.55} />
      </mesh>
      {/* Tilted 60° */}
      <mesh ref={r2} rotation={[Math.PI / 3, 0.5, 0]}>
        <torusGeometry args={[2.08, 0.005, 16, 180]} />
        <meshBasicMaterial color="#C9A84C" transparent opacity={0.32} />
      </mesh>
      {/* Diagonal wide */}
      <mesh ref={r3}>
        <torusGeometry args={[2.65, 0.003, 16, 220]} />
        <meshBasicMaterial color="#C9A84C" transparent opacity={0.15} />
      </mesh>
      {/* Outer far */}
      <mesh ref={r4} rotation={[0.8, 0.3, 0]}>
        <torusGeometry args={[3.1, 0.0025, 16, 240]} />
        <meshBasicMaterial color="#8B6914" transparent opacity={0.1} />
      </mesh>
      {/* Polar ring */}
      <mesh ref={r5} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.9, 0.004, 16, 180]} />
        <meshBasicMaterial color="#C9A84C" transparent opacity={0.18} />
      </mesh>
    </>
  )
}

/* ── Orbiting satellites / octahedra ─────────────────── */
function Satellite({ radius, speed, phase, tilt, size, color }: {
  radius: number; speed: number; phase: number; tilt: number; size: number; color: string
}) {
  const ref  = useRef<THREE.Mesh>(null)
  const glow = useRef<THREE.Mesh>(null)

  useFrame((s) => {
    const t = s.clock.elapsedTime * speed + phase
    const x = Math.cos(t) * radius
    const y = Math.sin(t * tilt) * radius * 0.35
    const z = Math.sin(t) * radius
    if (ref.current) {
      ref.current.position.set(x, y, z)
      ref.current.rotation.x = t * 2.5
      ref.current.rotation.y = t * 1.6
    }
    if (glow.current) {
      glow.current.position.set(x, y, z)
      const pulse = 0.6 + Math.sin(s.clock.elapsedTime * 3 + phase) * 0.4
      glow.current.scale.setScalar(pulse * 3)
      ;(glow.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.04
    }
  })

  return (
    <>
      <mesh ref={ref}>
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7}
          roughness={0.05} metalness={0.95} transparent opacity={0.95} />
      </mesh>
      {/* Soft glow halo around each satellite */}
      <mesh ref={glow}>
        <sphereGeometry args={[size, 6, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.03} />
      </mesh>
    </>
  )
}

/* ── Breathing equatorial glow disk ─────────────────── */
function GlowDisk() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (!ref.current) return
    const pulse = 0.45 + Math.sin(s.clock.elapsedTime * 0.9) * 0.2
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.18
    ref.current.rotation.z = s.clock.elapsedTime * 0.025
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.52, 0.22, 4, 80]} />
      <meshBasicMaterial color="#E8C96A" transparent opacity={0.1} />
    </mesh>
  )
}

/* ── Distant floating diamond shards ────────────────── */
function DiamondShard({ position, speed }: { position: [number,number,number]; speed: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (!ref.current) return
    const t = s.clock.elapsedTime * speed
    ref.current.rotation.x = t * 0.7
    ref.current.rotation.y = t
    ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * speed * 0.5) * 0.3
  })
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.06, 0]} />
      <meshStandardMaterial color="#E8C96A" emissive="#C9A84C" emissiveIntensity={0.8}
        roughness={0.0} metalness={1.0} transparent opacity={0.7} />
    </mesh>
  )
}

/* ── Nebula plane behind sphere ──────────────────────── */
function NebulaBg() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * 0.018
  })
  return (
    <mesh ref={ref} position={[0, 0, -4]} scale={[1.4, 1.4, 1]}>
      <planeGeometry args={[10, 10]} />
      <meshBasicMaterial color="#C9A84C" transparent opacity={0.015} />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0.6, 7], fov: 46 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[4, 5, 4]}    intensity={2.5}  color="#E8C96A" />
        <pointLight position={[-6, -3, -4]} intensity={0.8}  color="#8B6914" />
        <pointLight position={[0, 6, -2]}   intensity={0.4}  color="#C9A84C" />
        <pointLight position={[3, -4, 2]}   intensity={0.3}  color="#E8C96A" />

        <NebulaBg />
        <GlowDisk />
        <CoreSphere />
        <OrbitalRings />
        <GoldParticles />

        {/* Orbiting octahedra — varied orbits */}
        <Satellite radius={2.0}  speed={0.42} phase={0}             tilt={0.7} size={0.058} color="#E8C96A" />
        <Satellite radius={2.5}  speed={0.28} phase={Math.PI}       tilt={0.5} size={0.042} color="#C9A84C" />
        <Satellite radius={1.82} speed={0.58} phase={Math.PI/2}     tilt={1.2} size={0.036} color="#E8C96A" />
        <Satellite radius={2.9}  speed={0.19} phase={Math.PI*1.5}   tilt={0.4} size={0.028} color="#8B6914" />
        <Satellite radius={1.6}  speed={0.75} phase={Math.PI*0.7}   tilt={0.9} size={0.022} color="#E8C96A" />
        <Satellite radius={3.2}  speed={0.14} phase={Math.PI*1.2}   tilt={0.3} size={0.018} color="#C9A84C" />

        {/* Floating diamond shards far out */}
        <DiamondShard position={[-3.5,  1.5, -1]} speed={0.4} />
        <DiamondShard position={[ 3.8, -1.2, -2]} speed={0.6} />
        <DiamondShard position={[-2.8, -2.5,  1]} speed={0.35} />
        <DiamondShard position={[ 2.2,  2.8, -1]} speed={0.5} />
        <DiamondShard position={[-4.2,  0.5,  0]} speed={0.45} />
        <DiamondShard position={[ 1.5, -3.5,  2]} speed={0.55} />
      </Canvas>
    </div>
  )
}
