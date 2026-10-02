'use client';

import React, { useState, useRef } from 'react';
import { Sparkles, Play, ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { ServiceVideoItem } from '@/types/service';

interface ServiceVideoPlayerProps {
  serviceTitle: string;
  videos?: ServiceVideoItem[];
  videoClip?: string;
  videoPoster?: string;
  videoTitle?: string;
}

export const ServiceVideoPlayer: React.FC<ServiceVideoPlayerProps> = ({
  serviceTitle,
  videos,
  videoClip,
  videoPoster,
  videoTitle,
}) => {
  // Normalize the video list
  const videoList: ServiceVideoItem[] = React.useMemo(() => {
    if (videos && videos.length > 0) {
      return videos;
    }
    if (videoClip) {
      return [
        {
          src: videoClip,
          poster: videoPoster,
          title: videoTitle || `${serviceTitle} Cinematic Video Reel`,
        },
      ];
    }
    return [];
  }, [videos, videoClip, videoPoster, videoTitle, serviceTitle]);

  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (videoList.length === 0) return null;

  const currentVideo = videoList[activeIndex] || videoList[0];

  const handleSelectVideo = (index: number) => {
    setActiveIndex(index);
    // When user explicitly clicks, start playback smoothly
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback: user can click the native play button
        });
      }
    }, 100);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % videoList.length;
    handleSelectVideo(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + videoList.length) % videoList.length;
    handleSelectVideo(prevIdx);
  };

  return (
    <div
      style={{
        marginTop: '40px',
        marginBottom: '40px',
        backgroundColor: '#120B0F',
        borderRadius: '18px',
        border: '2px solid var(--color-gold)',
        padding: '24px 20px',
        color: '#FFFFFF',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--color-gold)" style={{ flexShrink: 0 }} />
          <h3
            style={{
              fontSize: '0.92rem',
              fontWeight: 800,
              color: 'var(--color-gold-light)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              margin: 0,
            }}
          >
            {currentVideo.title || `${serviceTitle} Video Reel`}
          </h3>
        </div>

        {videoList.length > 1 && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                color: 'var(--color-gold-light)',
                background: 'rgba(212, 175, 55, 0.15)',
                padding: '4px 10px',
                borderRadius: '999px',
                border: '1px solid rgba(212, 175, 55, 0.35)',
              }}
            >
              Video {activeIndex + 1} of {videoList.length}
            </span>
          </div>
        )}
      </div>

      {/* Main Video Screen with Navigation Arrows */}
      <div style={{ position: 'relative', maxWidth: '780px', margin: '0 auto' }}>
        <div
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#000000',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8)',
          }}
        >
          <video
            ref={videoRef}
            key={currentVideo.src}
            src={currentVideo.src}
            poster={currentVideo.poster}
            controls
            playsInline
            onEnded={() => {
              // Optionally advance to next video if multiple
              if (videoList.length > 1) {
                handleNext();
              }
            }}
            style={{
              width: '100%',
              maxHeight: '440px',
              display: 'block',
              backgroundColor: '#000000',
            }}
          >
            Your browser does not support video playback.
          </video>
        </div>

        {/* Quick Prev / Next Arrows for Multi-video */}
        {videoList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              title="Previous Video"
              aria-label="Previous Video"
              style={{
                position: 'absolute',
                left: '-16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(18, 10, 15, 0.9)',
                border: '1px solid var(--color-gold)',
                color: 'var(--color-gold-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 4,
                boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              title="Next Video"
              aria-label="Next Video"
              style={{
                position: 'absolute',
                right: '-16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(18, 10, 15, 0.9)',
                border: '1px solid var(--color-gold)',
                color: 'var(--color-gold-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 4,
                boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Interactive Video Playlist Switcher (When 2+ Videos) */}
      {videoList.length > 1 && (
        <div style={{ marginTop: '22px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.75)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Film size={14} color="var(--color-gold)" />
              <strong style={{ color: '#F8E5A7' }}>Click to Watch Video Reels ({videoList.length} Available):</strong>
            </span>
            <span style={{ fontSize: '0.72rem', color: 'rgba(212, 175, 55, 0.85)' }}>
              Plays one by one on click
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
            }}
          >
            {videoList.map((vid, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={vid.src}
                  onClick={() => handleSelectVideo(idx)}
                  style={{
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.16)' : 'rgba(255, 255, 255, 0.03)',
                    border: isActive ? '2px solid var(--color-gold)' : '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    padding: '10px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.22s ease',
                    boxShadow: isActive ? '0 0 20px rgba(212, 175, 55, 0.25)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    minWidth: 0,
                    width: '100%',
                  }}
                >
                  {/* Thumbnail Container */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/9',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      backgroundColor: '#000000',
                    }}
                  >
                    {vid.poster ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={vid.poster}
                        alt={vid.title || `Video ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: isActive ? 1 : 0.82,
                          transition: 'opacity 0.2s ease',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#1E141C',
                        }}
                      >
                        <Film size={24} color="var(--color-gold)" />
                      </div>
                    )}

                    {/* Play Badge Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? 'var(--color-gold)' : 'rgba(0, 0, 0, 0.65)',
                        border: '1px solid #FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isActive ? '#000000' : '#FFFFFF',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                      }}
                    >
                      <Play size={14} fill={isActive ? '#000000' : '#FFFFFF'} />
                    </div>

                    {/* Number Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '4px',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        color: '#F8E5A7',
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                      }}
                    >
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>
                  </div>

                  {/* Title & Status */}
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: isActive ? '#FCE6A2' : '#E5E7EB',
                        lineHeight: 1.35,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {vid.title || `Video ${idx + 1}`}
                    </div>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        marginTop: '4px',
                        color: isActive ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {isActive ? (
                        <>
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--color-gold)',
                              display: 'inline-block',
                              boxShadow: '0 0 6px var(--color-gold)',
                            }}
                          />
                          <span>Now Playing</span>
                        </>
                      ) : (
                        <span>Click to Play →</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
