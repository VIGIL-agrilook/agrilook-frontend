'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, Environment } from '@react-three/drei'
import * as THREE from 'three'

// 3D 모델 컴포넌트
function FarmModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath)
  const modelRef = useRef<THREE.Group>(null)

  // 모델을 천천히 회전시키는 애니메이션
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <Center>
      <primitive 
        ref={modelRef}
        object={scene} 
        scale={1}
      />
    </Center>
  )
}

// 로딩 중 표시할 컴포넌트
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-farm-light-green">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-farm-brown mx-auto mb-4"></div>
        <p className="text-farm-brown">3D 모델 로딩 중...</p>
      </div>
    </div>
  )
}

// 에러 표시 컴포넌트
function ErrorFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-farm-light-green">
      <div className="text-center">
        <div className="text-6xl mb-4">🏞️</div>
        <p className="text-farm-brown">3D 모델을 불러올 수 없습니다</p>
        <p className="text-farm-brown text-sm mt-2">
          농장 전경을 시각적으로 표현합니다
        </p>
      </div>
    </div>
  )
}

interface Farm3DViewerProps {
  modelPath?: string
  className?: string
}

export default function Farm3DViewer({ 
  modelPath = '/models/result.gltf',
  className = ''
}: Farm3DViewerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ 
            position: [5, 5, 5], 
            fov: 50 
          }}
          style={{ background: 'linear-gradient(to bottom, #87CEEB, #98FB98)' }}
        >
          {/* 조명 설정 */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          {/* 환경 설정 */}
          <Environment preset="sunset" />
          
          {/* 3D 모델 */}
          <FarmModel modelPath={modelPath} />
          
          {/* 카메라 컨트롤 */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
            maxDistance={15}
            minDistance={3}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}