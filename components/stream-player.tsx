'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface StreamPlayerProps {
  cctvId?: number;
  className?: string;
  showControls?: boolean;
  showInfo?: boolean;
}

export const StreamPlayer = ({ 
  cctvId = 1, 
  className = "", 
  showControls = true,
  showInfo = true 
}: StreamPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setError(null);

    // Azure nginx 서버의 HLS 스트림 URL
    // nginx.conf에서 설정한 경로에 맞춰 스트림 URL 설정
    // RTMP 스트림 이름에 따라 HLS 파일이 생성됨 (jetson1, jetson2, jetson3)
    const hlsStreamUrls = {
      1: 'https://agrilook-be-stream.koreacentral.cloudapp.azure.com/hls/jetson1.m3u8',
      2: 'https://agrilook-be-stream.koreacentral.cloudapp.azure.com/hls/jetson2.m3u8', 
      3: 'https://agrilook-be-stream.koreacentral.cloudapp.azure.com/hls/jetson3.m3u8'
    };
    
    const videoUrl = hlsStreamUrls[cctvId as keyof typeof hlsStreamUrls] || hlsStreamUrls[1];
    
    console.log('StreamPlayer 내부 - cctvId:', cctvId);
    console.log('StreamPlayer 내부 - videoUrl:', videoUrl);
    console.log('StreamPlayer 내부 - hlsStreamUrls:', hlsStreamUrls);
    
    let hls: Hls | null = null;

    const loadStream = async () => {
      try {
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          // 네이티브 HLS 지원 (Safari)
          video.src = videoUrl;
          video.addEventListener('loadedmetadata', () => {
            console.log(`CCTV ${cctvId} 비디오 로드 완료 (네이티브 HLS)`);
            setIsLoading(false);
          });
        } else if (Hls.isSupported()) {
          // HLS.js 라이브러리 사용 (다른 브라우저)
          hls = new Hls({
            debug: false,
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90
          });
          
          hls.loadSource(videoUrl);
          hls.attachMedia(video);
          
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log(`CCTV ${cctvId} HLS 스트림 로드 완료`);
            setIsLoading(false);
            video.play().catch(e => console.log('자동 재생 실패:', e));
          });
          
          hls.on(Hls.Events.ERROR, (event, data) => {
            console.error(`CCTV ${cctvId} HLS 에러:`, data);
            if (data.fatal) {
              setError('스트림 연결 실패');
              setIsLoading(false);
            }
          });
        } else {
          // HLS 지원하지 않는 브라우저
          console.log(`CCTV ${cctvId}: HLS 지원하지 않는 브라우저`);
          setError('브라우저가 HLS를 지원하지 않습니다');
          setIsLoading(false);
        }
        
        video.addEventListener('error', () => {
          console.error(`CCTV ${cctvId} 비디오 로드 실패`);
          setError('스트림 연결 실패');
          setIsLoading(false);
        });
        
      } catch (error) {
        console.error(`CCTV ${cctvId} 스트림 로드 중 오류:`, error);
        setError('스트림 연결 실패');
        setIsLoading(false);
      }
    };

    loadStream();

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (hls) {
        hls.destroy();
      }
      if (video) {
        video.src = '';
        video.load();
      }
    };
  }, [cctvId]);

  if (error) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gray-900 rounded-lg ${className}`}>
        <div className="text-center text-white">
          <div className="text-sm text-red-400 mb-2">⚠️ {error}</div>
          <div className="text-xs text-gray-400">CCTV {cctvId}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <video
        ref={videoRef} 
        controls={showControls}
        className="w-full h-full rounded-lg object-contain"
        style={{ backgroundColor: '#000' }}
        poster="/placeholder.jpg"
        autoPlay
        muted
        loop
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <div className="text-sm">스트림 연결 중...</div>
          </div>
        </div>
      )}
      
      {showInfo && (
        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          CCTV {cctvId} 실시간
        </div>
      )}
    </div>
  );
};

// 스트림 상태를 확인하는 컴포넌트
export const StreamStatus = ({ cctvId = 1 }: { cctvId?: number }) => {
  const [status, setStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  
  useEffect(() => {
    const checkStreamStatus = async () => {
      try {
        const streamUrl = `https://agrilook-be-stream.koreacentral.cloudapp.azure.com/hls/jetson${cctvId}.m3u8`;
        
        const response = await fetch(streamUrl, {
          method: 'HEAD',
          mode: 'cors'
        });
        
        if (response.ok) {
          setStatus('online');
        } else {
          setStatus('offline');
        }
      } catch (error) {
        console.error(`CCTV ${cctvId} 스트림 상태 확인 실패:`, error);
        setStatus('offline');
      }
    };

    checkStreamStatus();
    
    // 30초마다 상태 확인
    const interval = setInterval(checkStreamStatus, 30000);
    
    return () => clearInterval(interval);
  }, [cctvId]);
  
  return (
    <div className="flex items-center space-x-1">
      <div className={`w-2 h-2 rounded-full ${
        status === 'online' ? 'bg-green-500' :
        status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
      }`}></div>
      <span className="text-xs text-white bg-black/70 px-1 rounded">
        {status === 'online' ? 'ON' : 
         status === 'offline' ? 'OFF' : 'CHK'}
      </span>
    </div>
  );
};
