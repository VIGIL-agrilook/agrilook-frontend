'use client';

import { useEffect, useRef, useState } from 'react';

// hls.js 타입 정의 (실제 사용시 npm install hls.js 필요)
declare global {
  interface Window {
    Hls: any;
  }
}

export const StreamPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 상대 경로로 HLS 스트림 접근
    const streamUrl = '/hls';
    
    // hls.js가 지원되는 경우
    if (window.Hls && window.Hls.isSupported()) {
      const hls = new window.Hls();
      hls.loadSource(`${streamUrl}/stream.m3u8`);
      hls.attachMedia(video);
      
      hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS 스트림 로드 완료');
      });
      
      hls.on(window.Hls.Events.ERROR, (event: any, data: any) => {
        console.error('HLS 에러:', data);
      });
    } 
    // 네이티브 HLS 지원 (Safari 등)
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = `${streamUrl}/stream.m3u8`;
      video.addEventListener('loadedmetadata', () => {
        console.log('네이티브 HLS 스트림 로드 완료');
      });
    }
    // 지원되지 않는 경우
    else {
      console.error('HLS가 지원되지 않는 브라우저입니다.');
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (window.Hls && video) {
        const hls = window.Hls.getInstance(video);
        if (hls) {
          hls.destroy();
        }
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <video 
        ref={videoRef} 
        controls 
        className="w-full rounded-lg shadow-lg"
        style={{ 
          width: '100%', 
          maxWidth: '800px',
          backgroundColor: '#000'
        }}
        poster="/placeholder.jpg" // 로딩 중 표시할 이미지
      />
      <div className="mt-4 text-center text-sm text-gray-600">
        실시간 농장 모니터링 스트림
      </div>
    </div>
  );
};

// 스트림 상태를 확인하는 컴포넌트
export const StreamStatus = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkStreamStatus = async () => {
      try {
        const response = await fetch('/hls/stream.m3u8', { method: 'HEAD' });
        setIsOnline(response.ok);
        setError(null);
      } catch (err) {
        setIsOnline(false);
        setError('스트림에 연결할 수 없습니다.');
      }
    };

    checkStreamStatus();
    const interval = setInterval(checkStreamStatus, 30000); // 30초마다 체크

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
      <span className="text-sm">
        {isOnline ? '스트림 온라인' : error || '스트림 오프라인'}
      </span>
    </div>
  );
};
