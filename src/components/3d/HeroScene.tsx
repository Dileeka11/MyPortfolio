import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, Stars, Text, Box, Torus, Icosahedron } from '@react-three/drei';
import { useRef, useMemo, Suspense, useState } from 'react';
import * as THREE from 'three';

// Floating Code Block - 3D Terminal
function CodeTerminal({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
      <group 
        ref={groupRef} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Terminal window frame */}
        <mesh>
          <boxGeometry args={[4, 2.5, 0.1]} />
          <meshStandardMaterial 
            color={hovered ? "#1a1a2e" : "#0d0d15"}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Terminal header bar */}
        <mesh position={[0, 1.05, 0.06]}>
          <boxGeometry args={[4, 0.3, 0.02]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.3} />
        </mesh>
        
        {/* Terminal buttons */}
        {[-1.6, -1.4, -1.2].map((x, i) => (
          <mesh key={i} position={[x, 1.05, 0.08]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial 
              color={['#ff5f56', '#ffbd2e', '#27ca40'][i]} 
              emissive={['#ff5f56', '#ffbd2e', '#27ca40'][i]}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}

        {/* Code lines glow effect */}
        {[0.5, 0.1, -0.3, -0.7].map((y, i) => (
          <mesh key={i} position={[-0.5 + i * 0.2, y, 0.06]}>
            <boxGeometry args={[2 - i * 0.3, 0.08, 0.01]} />
            <meshStandardMaterial 
              color={i === 0 ? "#22d3ee" : i === 1 ? "#a855f7" : "#8b5cf6"}
              emissive={i === 0 ? "#22d3ee" : i === 1 ? "#a855f7" : "#8b5cf6"}
              emissiveIntensity={hovered ? 1 : 0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}

        {/* Glowing border */}
        <mesh>
          <boxGeometry args={[4.1, 2.6, 0.05]} />
          <meshStandardMaterial 
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={hovered ? 0.5 : 0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Rotating Tech Cube with icons
function TechCube({ position, size = 1 }: { position: [number, number, number]; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={hovered ? 0.8 : 0.3}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Inner solid cube */}
      <mesh position={position}>
        <boxGeometry args={[size * 0.6, size * 0.6, size * 0.6]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

// Git Branch Visualization
function GitBranch() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const commits = useMemo(() => {
    const items = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2;
      const y = i * 0.4 - 1.5;
      items.push({
        position: [Math.cos(angle) * radius * 0.3, y, Math.sin(angle) * radius * 0.3] as [number, number, number],
        color: `hsl(${180 + i * 15}, 80%, 60%)`,
      });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef} position={[-5, 0, -3]}>
      {/* Main branch line */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 4, 16]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Commit nodes */}
      {commits.map((commit, i) => (
        <mesh key={i} position={commit.position}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            color={commit.color}
            emissive={commit.color}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
      
      {/* Branch lines */}
      {[1, 4].map((i) => (
        <mesh key={i} position={[0.8, commits[i].position[1], 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 16]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// Morphing Code Sphere
function MorphingSphere({ position, size = 2 }: { position: [number, number, number]; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={2}>
      <Sphere
        ref={meshRef}
        args={[size, 64, 64]}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color="#22d3ee"
          distort={hovered ? 0.5 : 0.3}
          speed={2}
          roughness={0}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

// Floating Binary Ring
function BinaryRing({ position, radius = 3 }: { position: [number, number, number]; radius?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Torus args={[radius, 0.03, 16, 100]}>
        <meshStandardMaterial 
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.8}
        />
      </Torus>
      <Torus args={[radius * 0.8, 0.02, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial 
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.6}
        />
      </Torus>
      <Torus args={[radius * 0.6, 0.015, 16, 100]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <meshStandardMaterial 
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
        />
      </Torus>
    </group>
  );
}

// Floating Icosahedron (represents complexity)
function ComplexShape({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <Icosahedron
        ref={meshRef}
        args={[1.2, 1]}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={hovered ? 0.8 : 0.4}
          wireframe
        />
      </Icosahedron>
    </Float>
  );
}

// Particle System - like code particles
function CodeParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 500;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;

      const color = new THREE.Color();
      const hue = Math.random() > 0.5 ? 0.52 : 0.78; // Cyan or purple
      color.setHSL(hue, 0.8, 0.6);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.1) * 0.002;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

// Interactive Mouse Follower
function MouseFollower() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 5));

  useFrame((state) => {
    if (meshRef.current) {
      const x = (state.mouse.x * viewport.width) / 2;
      const y = (state.mouse.y * viewport.height) / 2;
      
      targetPos.current.set(x * 0.3, y * 0.3, 5);
      meshRef.current.position.lerp(targetPos.current, 0.05);
      
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#22d3ee"
        emissiveIntensity={0.8}
        wireframe
      />
    </mesh>
  );
}

// Main Scene
function Scene() {
  return (
    <>
      {/* Dramatic lighting for visibility */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={3} color="#22d3ee" />
      <pointLight position={[-10, -10, -5]} intensity={2} color="#a855f7" />
      <pointLight position={[0, 10, -10]} intensity={2} color="#8b5cf6" />
      <spotLight 
        position={[0, 15, 5]} 
        angle={0.4} 
        penumbra={1} 
        intensity={3} 
        color="#22d3ee" 
      />
      <pointLight position={[-8, 5, 5]} intensity={1.5} color="#ec4899" />

      {/* Main 3D Elements - Software Engineering Theme */}
      <CodeTerminal position={[4, 1, -2]} />
      <TechCube position={[-4, 2, -4]} size={1.5} />
      <TechCube position={[6, -2, -6]} size={1} />
      <GitBranch />
      <MorphingSphere position={[0, 0, -8]} size={2} />
      <BinaryRing position={[0, 0, -5]} radius={4} />
      <ComplexShape position={[5, 3, -8]} />
      <ComplexShape position={[-6, -2, -6]} />
      <CodeParticles />
      <MouseFollower />

      {/* Stars Background */}
      <Stars radius={80} depth={50} count={2000} factor={4} saturation={0.5} fade speed={0.3} />

      {/* Environment */}
      <Environment preset="night" />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="fixed inset-0 z-[5] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 65 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
