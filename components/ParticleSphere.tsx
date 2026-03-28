'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

function ParticleSystem() {
    const pointsRef = useRef<THREE.Points>(null!);
    const { theme } = useTheme();

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const phi = Math.acos(-1 + (2 * i) / 5000);
            const theta = Math.sqrt(5000 * Math.PI) * i;
            const radius = 2.4;
            positions[i * 3]     = radius * Math.cos(theta) * Math.sin(phi);
            positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
            pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <Points ref={pointsRef} positions={particlesPosition} stride={3} position={[0, 0, 0]}>
            <PointMaterial
                transparent
                color={theme === 'dark' ? '#2dd4bf' : '#0f766e'}
                size={0.022}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.9}
            />
        </Points>
    );
}

export default function ParticleSphere() {
    return (
        <div className="w-full h-full min-h-[300px] md:min-h-[420px]">
            <Canvas
                camera={{ position: [0, 0, 5.5], fov: 70 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                style={{ width: '100%', height: '100%' }}
            >
                <ParticleSystem />
            </Canvas>
        </div>
    );
}
