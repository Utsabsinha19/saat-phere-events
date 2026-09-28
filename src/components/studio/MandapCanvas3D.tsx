'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import {
  Sun,
  Sunset,
  Moon,
  RotateCcw,
  Maximize2,
  Minimize2,
  Sparkles,
  Download,
  CheckCircle2,
  Flame,
  Camera,
  Layers,
  Compass,
  Sliders,
} from 'lucide-react';

export type LightingMode = 'daylight' | 'sunset' | 'royal-evening';
export type DecorTheme = 'crimson-gold' | 'ivory-blush' | 'emerald-saffron';

interface MandapCanvas3DProps {
  onSaveConcept?: (summary: { theme: DecorTheme; lighting: LightingMode }) => void;
}

export const MandapCanvas3D: React.FC<MandapCanvas3DProps> = ({ onSaveConcept }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [lightingMode, setLightingMode] = useState<LightingMode>('royal-evening');
  const [decorTheme, setDecorTheme] = useState<DecorTheme>('crimson-gold');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isArMode, setIsArMode] = useState(false);
  const [arScale, setArScale] = useState(1.0);
  const [arStreamActive, setArStreamActive] = useState(false);

  // References to dynamic Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const firePointLightRef = useRef<THREE.PointLight | null>(null);

  // Materials to update with theme
  const drapeMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const floralMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const throneMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Orbit controls state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraRotationRef = useRef({ theta: 0.6, phi: 0.5, radius: 14 });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 520;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;

    // Position camera using spherical coordinates
    const updateCameraPosition = () => {
      const { theta, phi, radius } = cameraRotationRef.current;
      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 1.8, 0);
    };
    updateCameraPosition();

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Lighting setup
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
    dirLight.position.set(8, 14, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    const firePointLight = new THREE.PointLight(0xff5500, 2.0, 8);
    firePointLight.position.set(0, 1.2, 0);
    scene.add(firePointLight);
    firePointLightRef.current = firePointLight;

    // BUILD 3D MANDAP GEOMETRY
    drapeMaterialsRef.current = [];
    floralMaterialsRef.current = [];
    throneMaterialsRef.current = [];

    // 1. Stage Platform (White Indian Makrana Marble)
    const stageGeo = new THREE.CylinderGeometry(5.2, 5.5, 0.4, 32);
    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0xfaf8f5,
      roughness: 0.25,
      metalness: 0.1,
    });
    const stageMesh = new THREE.Mesh(stageGeo, marbleMat);
    stageMesh.position.y = 0.2;
    stageMesh.receiveShadow = true;
    scene.add(stageMesh);

    // Decorative Gold Trim Ring around stage
    const ringGeo = new THREE.TorusGeometry(5.3, 0.08, 16, 64);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.2,
    });
    const ringMesh = new THREE.Mesh(ringGeo, goldMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.4;
    scene.add(ringMesh);

    // 2. Four Palatial Pillars
    const pillarPositions = [
      [-2.4, -2.4],
      [2.4, -2.4],
      [-2.4, 2.4],
      [2.4, 2.4],
    ];

    const pillarGeo = new THREE.CylinderGeometry(0.18, 0.22, 3.6, 24);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
    });

    const floralMat = new THREE.MeshStandardMaterial({
      color: 0x800020, // default Crimson
      roughness: 0.7,
    });
    floralMaterialsRef.current.push(floralMat);

    pillarPositions.forEach(([px, pz]) => {
      // Pillar Column
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(px, 2.2, pz);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      scene.add(pillar);

      // Gold base pedestal
      const baseGeo = new THREE.BoxGeometry(0.65, 0.35, 0.65);
      const baseMesh = new THREE.Mesh(baseGeo, goldMat);
      baseMesh.position.set(px, 0.55, pz);
      scene.add(baseMesh);

      // Gold capital header
      const capMesh = new THREE.Mesh(baseGeo, goldMat);
      capMesh.position.set(px, 4.05, pz);
      scene.add(capMesh);

      // Floral Garlands spiral around pillar
      const garlandGeo = new THREE.TorusGeometry(0.3, 0.09, 12, 24);
      for (let h = 1.0; h <= 3.6; h += 0.65) {
        const garland = new THREE.Mesh(garlandGeo, floralMat);
        garland.rotation.x = Math.PI / 2;
        garland.position.set(px, h, pz);
        scene.add(garland);
      }
    });

    // 3. Canopy Roof / Dome
    const domeGeo = new THREE.ConeGeometry(3.6, 1.4, 32);
    const drapeMat = new THREE.MeshStandardMaterial({
      color: 0x800020, // Crimson Silk
      roughness: 0.6,
      side: THREE.DoubleSide,
    });
    drapeMaterialsRef.current.push(drapeMat);

    const domeMesh = new THREE.Mesh(domeGeo, drapeMat);
    domeMesh.position.set(0, 4.8, 0);
    domeMesh.castShadow = true;
    scene.add(domeMesh);

    // Gold Finial Peak Kalash
    const finialGeo = new THREE.SphereGeometry(0.28, 16, 16);
    const finialMesh = new THREE.Mesh(finialGeo, goldMat);
    finialMesh.position.set(0, 5.65, 0);
    scene.add(finialMesh);

    // 4. Central Sacred Havan Kund (Holy Vedic Altar)
    const kundGeo = new THREE.BoxGeometry(1.2, 0.25, 1.2);
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xb87333,
      metalness: 0.8,
      roughness: 0.3,
    });
    const kundMesh = new THREE.Mesh(kundGeo, copperMat);
    kundMesh.position.set(0, 0.5, 0);
    scene.add(kundMesh);

    // Sacred Flame / Glowing Core
    const flameGeo = new THREE.ConeGeometry(0.22, 0.5, 16);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
    });
    const flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.set(0, 0.8, 0);
    scene.add(flameMesh);

    // 5. Royal Seating Chairs (Groom & Bride Sovereign Thrones)
    const throneSeatGeo = new THREE.BoxGeometry(0.8, 0.15, 0.7);
    const throneBackGeo = new THREE.BoxGeometry(0.8, 0.9, 0.12);
    const velvetMat = new THREE.MeshStandardMaterial({
      color: 0x800020,
      roughness: 0.8,
    });
    throneMaterialsRef.current.push(velvetMat);

    // Chair 1 (Bride)
    const chairBride = new THREE.Group();
    const seat1 = new THREE.Mesh(throneSeatGeo, velvetMat);
    seat1.position.set(0, 0.6, 0);
    const back1 = new THREE.Mesh(throneBackGeo, velvetMat);
    back1.position.set(0, 1.05, -0.32);
    chairBride.add(seat1, back1);
    chairBride.position.set(-0.9, 0, -0.8);
    chairBride.rotation.y = 0.25;
    scene.add(chairBride);

    // Chair 2 (Groom)
    const chairGroom = new THREE.Group();
    const seat2 = new THREE.Mesh(throneSeatGeo, velvetMat);
    seat2.position.set(0, 0.6, 0);
    const back2 = new THREE.Mesh(throneBackGeo, velvetMat);
    back2.position.set(0, 1.05, -0.32);
    chairGroom.add(seat2, back2);
    chairGroom.position.set(0.9, 0, -0.8);
    chairGroom.rotation.y = -0.25;
    scene.add(chairGroom);

    // 6. Fairy Light / Diya Particle Ring
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 80;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const rad = 4.2 + Math.sin(i * 3) * 0.4;
      posArray[i * 3] = Math.cos(angle) * rad;
      posArray[i * 3 + 1] = 0.45 + (Math.sin(i) * 0.1);
      posArray[i * 3 + 2] = Math.sin(angle) * rad;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xffd700,
    });
    const fairyParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(fairyParticles);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Subtle flickering of the sacred fire
      if (firePointLightRef.current) {
        firePointLightRef.current.intensity = 1.8 + Math.sin(elapsedTime * 12) * 0.4;
      }
      flameMesh.scale.y = 1 + Math.sin(elapsedTime * 14) * 0.15;

      // Gentle fairy light shimmer
      particleMat.size = 0.11 + Math.sin(elapsedTime * 4) * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    // RESIZE LISTENER
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update Lighting Mode
  useEffect(() => {
    if (!sceneRef.current || !dirLightRef.current || !hemiLightRef.current || !firePointLightRef.current) return;

    if (lightingMode === 'daylight') {
      sceneRef.current.background = new THREE.Color(0xf1f5f9);
      dirLightRef.current.color.setHex(0xffffff);
      dirLightRef.current.intensity = 1.6;
      dirLightRef.current.position.set(10, 16, 10);
      hemiLightRef.current.color.setHex(0xffffff);
      hemiLightRef.current.groundColor.setHex(0xd1d5db);
      hemiLightRef.current.intensity = 0.9;
      firePointLightRef.current.intensity = 1.0;
    } else if (lightingMode === 'sunset') {
      sceneRef.current.background = new THREE.Color(0x3b1824);
      dirLightRef.current.color.setHex(0xff8c00);
      dirLightRef.current.intensity = 1.8;
      dirLightRef.current.position.set(14, 6, 8);
      hemiLightRef.current.color.setHex(0xf472b6);
      hemiLightRef.current.groundColor.setHex(0x78350f);
      hemiLightRef.current.intensity = 0.6;
      firePointLightRef.current.intensity = 2.2;
    } else {
      // Royal Evening
      sceneRef.current.background = new THREE.Color(0x0c0f17);
      dirLightRef.current.color.setHex(0xffe4b5);
      dirLightRef.current.intensity = 0.8;
      dirLightRef.current.position.set(6, 12, 6);
      hemiLightRef.current.color.setHex(0x1e3a8a);
      hemiLightRef.current.groundColor.setHex(0x050510);
      hemiLightRef.current.intensity = 0.4;
      firePointLightRef.current.intensity = 2.8;
    }
  }, [lightingMode]);

  // Update Decor Theme
  useEffect(() => {
    const updateThemeColors = (floralHex: number, drapeHex: number) => {
      floralMaterialsRef.current.forEach((m) => m.color.setHex(floralHex));
      drapeMaterialsRef.current.forEach((m) => m.color.setHex(drapeHex));
      throneMaterialsRef.current.forEach((m) => m.color.setHex(drapeHex));
    };

    if (decorTheme === 'crimson-gold') {
      updateThemeColors(0x800020, 0x800020);
    } else if (decorTheme === 'ivory-blush') {
      updateThemeColors(0xf43f5e, 0xfffdd0);
    } else if (decorTheme === 'emerald-saffron') {
      updateThemeColors(0xf59e0b, 0x065f46);
    }
  }, [decorTheme]);

  // AR Mode Camera Stream & Scale Handler
  useEffect(() => {
    if (isArMode) {
      if (sceneRef.current) {
        sceneRef.current.background = null;
      }
      if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: 'environment' } })
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play();
              setArStreamActive(true);
            }
          })
          .catch(() => {
            setArStreamActive(false);
          });
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  }, [isArMode]);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.scale.set(arScale, arScale, arScale);
    }
  }, [arScale]);

  // Mouse / Touch event handlers for 3D Orbit Controls
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !cameraRef.current) return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    cameraRotationRef.current.theta -= deltaX * 0.008;
    cameraRotationRef.current.phi = Math.max(
      0.15,
      Math.min(Math.PI / 2 - 0.05, cameraRotationRef.current.phi - deltaY * 0.008)
    );

    const { theta, phi, radius } = cameraRotationRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 1.8, 0);

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!cameraRef.current) return;
    cameraRotationRef.current.radius = Math.max(
      6,
      Math.min(22, cameraRotationRef.current.radius + e.deltaY * 0.015)
    );
    const { theta, phi, radius } = cameraRotationRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 1.8, 0);
  };

  const resetCamera = () => {
    if (!cameraRef.current) return;
    cameraRotationRef.current = { theta: 0.6, phi: 0.5, radius: 14 };
    const { theta, phi, radius } = cameraRotationRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 1.8, 0);
  };

  const handleSave = () => {
    setSavedSuccess(true);
    if (onSaveConcept) {
      onSaveConcept({ theme: decorTheme, lighting: lightingMode });
    }
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: isFullscreen ? '100vh' : '580px',
        backgroundColor: lightingMode === 'royal-evening' ? '#0c0f17' : lightingMode === 'sunset' ? '#3b1824' : '#f1f5f9',
        borderRadius: isFullscreen ? '0' : '14px',
        overflow: 'hidden',
        border: '1.5px solid var(--color-gold)',
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* AR Background Video / Passthrough Venue Canvas */}
      {isArMode && (
        arStreamActive ? (
          <video
            ref={videoRef}
            playsInline
            muted
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url("https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1600&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0,
            }}
          />
        )
      )}

      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab', position: 'relative', zIndex: 2 }}
      />

      {/* Floating HUD: Lighting Modes */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: 'rgba(18, 18, 18, 0.82)',
          backdropFilter: 'blur(8px)',
          borderRadius: '10px',
          border: '1px solid var(--color-gold)',
          padding: '8px 12px',
          display: 'flex',
          gap: '8px',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => setLightingMode('daylight')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: lightingMode === 'daylight' ? 'var(--color-gold)' : 'transparent',
            color: lightingMode === 'daylight' ? '#000000' : '#FFFFFF',
          }}
        >
          <Sun size={14} />
          Daylight (5500K)
        </button>

        <button
          onClick={() => setLightingMode('sunset')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: lightingMode === 'sunset' ? 'var(--color-gold)' : 'transparent',
            color: lightingMode === 'sunset' ? '#000000' : '#FFFFFF',
          }}
        >
          <Sunset size={14} />
          Sunset Golden Hour
        </button>

        <button
          onClick={() => setLightingMode('royal-evening')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: lightingMode === 'royal-evening' ? 'var(--color-gold)' : 'transparent',
            color: lightingMode === 'royal-evening' ? '#000000' : '#FFFFFF',
          }}
        >
          <Moon size={14} />
          Royal Illumination
        </button>
      </div>

      {/* Floating HUD: Color Themes */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          backgroundColor: 'rgba(18, 18, 18, 0.82)',
          backdropFilter: 'blur(8px)',
          borderRadius: '10px',
          border: '1px solid var(--color-gold)',
          padding: '8px 12px',
          display: 'flex',
          gap: '8px',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => setDecorTheme('crimson-gold')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: decorTheme === 'crimson-gold' ? '1.5px solid var(--color-gold)' : '1px solid transparent',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(128, 0, 32, 0.7)',
            color: '#FFFFFF',
          }}
        >
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#D4AF37' }} />
          Rajputana Crimson
        </button>

        <button
          onClick={() => setDecorTheme('ivory-blush')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: decorTheme === 'ivory-blush' ? '1.5px solid var(--color-gold)' : '1px solid transparent',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255, 253, 208, 0.2)',
            color: '#FFFFFF',
          }}
        >
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F43F5E' }} />
          Ivory Pearl & Blush
        </button>

        <button
          onClick={() => setDecorTheme('emerald-saffron')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: decorTheme === 'emerald-saffron' ? '1.5px solid var(--color-gold)' : '1px solid transparent',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(6, 95, 70, 0.7)',
            color: '#FFFFFF',
          }}
        >
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
          Emerald & Saffron
        </button>
      </div>

      {/* Floating Action Controls */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          gap: '8px',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => setIsArMode(!isArMode)}
          title="Project Mandap into Real Venue Space (AR)"
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            backgroundColor: isArMode ? '#059669' : 'rgba(18, 18, 18, 0.85)',
            border: '1.5px solid var(--color-gold)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Camera size={15} color="var(--color-gold)" />
          {isArMode ? 'Exit AR Mode' : '✨ View in AR'}
        </button>

        <button
          onClick={resetCamera}
          title="Reset Orbit Angle"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: 'rgba(18, 18, 18, 0.85)',
            border: '1px solid var(--color-gold)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <RotateCcw size={16} />
        </button>

        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          title="Toggle Fullscreen Canvas"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: 'rgba(18, 18, 18, 0.85)',
            border: '1px solid var(--color-gold)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>

        <button
          onClick={handleSave}
          className="btn-gold"
          style={{
            padding: '8px 16px',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {savedSuccess ? <CheckCircle2 size={15} /> : <Sparkles size={15} />}
          {savedSuccess ? 'Concept Saved!' : 'Save Concept'}
        </button>
      </div>

      {/* AR Mode Scale Slider Overlay */}
      {isArMode && (
        <div
          style={{
            position: 'absolute',
            top: '75px',
            right: '20px',
            backgroundColor: 'rgba(18, 18, 18, 0.88)',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid var(--color-gold)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 10,
          }}
        >
          <Sliders size={14} color="var(--color-gold)" />
          <span style={{ fontSize: '0.78rem', color: '#D1D5DB' }}>AR Scale: {arScale.toFixed(1)}x</span>
          <input
            type="range"
            min={0.5}
            max={2.0}
            step={0.1}
            value={arScale}
            onChange={(e) => setArScale(Number(e.target.value))}
            style={{ width: '80px', accentColor: 'var(--color-gold)' }}
          />
        </div>
      )}

      {/* Subtle Hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          fontSize: '0.72rem',
          color: 'rgba(255, 255, 255, 0.65)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        Click & Drag to Orbit • Scroll to Zoom
      </div>
    </div>
  );
};
