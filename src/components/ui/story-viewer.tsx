"use client";

import Image from "next/image";
import * as React from "react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  type PanInfo,
  type Variants,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Pause,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Story {
  id: string;
  type: "image" | "video";
  src: string;
  duration?: number;
}

export interface StoryViewerProps {
  stories: Story[];
  username: string;
  avatar: string;
  timestamp?: string;
  onStoryView?: (storyId: string) => void;
  onAllStoriesViewed?: () => void;
  className?: string;
}

const DEFAULT_IMAGE_DURATION = 5000;

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return diffMinutes <= 1 ? "Just now" : `${diffMinutes}m ago`;
  }

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  return `${Math.floor(diffHours / 24)}d ago`;
}

interface StoryThumbnailProps {
  stories: Story[];
  username: string;
  viewedIndices: Set<number>;
  onClick: () => void;
}

function StoryThumbnail({
  stories,
  username,
  viewedIndices,
  onClick,
}: StoryThumbnailProps) {
  const roundCoord = (value: number) => Number(value.toFixed(4));
  const segmentCount = stories.length;
  const gapDegrees = segmentCount > 1 ? 12 : 0;
  const segmentDegrees = (360 - gapDegrees * segmentCount) / segmentCount;
  const allViewed = viewedIndices.size === stories.length;
  const lastStory = stories[stories.length - 1];

  const thumbnailImage = React.useMemo(() => {
    for (let i = stories.length - 1; i >= 0; i--) {
      if (stories[i].type === "image") {
        return stories[i].src;
      }
    }

    return null;
  }, [stories]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex cursor-pointer flex-col items-center gap-2 rounded-lg bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`View ${username}'s stories`}
    >
      <div className="relative size-[72px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          {segmentCount === 1 ? (
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              strokeWidth="5"
              className={cn(
                "transition-colors duration-300",
                allViewed ? "stroke-secondary/35" : "stroke-accent",
              )}
            />
          ) : (
            stories.map((story, index) => {
              const startAngle = -90 + index * (segmentDegrees + gapDegrees);
              const endAngle = startAngle + segmentDegrees;
              const isViewed = viewedIndices.has(index);
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              const radius = 46;
              const x1 = roundCoord(50 + radius * Math.cos(startRad));
              const y1 = roundCoord(50 + radius * Math.sin(startRad));
              const x2 = roundCoord(50 + radius * Math.cos(endRad));
              const y2 = roundCoord(50 + radius * Math.sin(endRad));
              const largeArc = segmentDegrees > 180 ? 1 : 0;

              return (
                <path
                  key={story.id}
                  d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`}
                  fill="none"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className={cn(
                    "transition-colors duration-300",
                    isViewed || allViewed
                      ? "stroke-secondary/35"
                      : "stroke-accent",
                  )}
                />
              );
            })
          )}
        </svg>

        <div className="absolute inset-[5px] rounded-full bg-background p-[2px]">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-surface">
            {lastStory.type === "video" ? (
              <video
                src={lastStory.src}
                poster={thumbnailImage || undefined}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <Image
                src={lastStory.src}
                alt={`${username}'s story`}
                fill
                sizes="72px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                unoptimized
              />
            )}
          </div>
        </div>
      </div>

      <span className="max-w-[86px] truncate font-display text-xs uppercase tracking-[0.12em] text-secondary">
        {username}
      </span>
    </button>
  );
}

interface ProgressBarProps {
  count: number;
  currentIndex: number;
  progress: number;
  viewedIndices: Set<number>;
}

function ProgressBar({
  count,
  currentIndex,
  progress,
  viewedIndices,
}: ProgressBarProps) {
  return (
    <div className="flex w-full gap-1 px-2">
      {Array.from({ length: count }).map((_, index) => {
        const isActive = index === currentIndex;
        const isPast = index < currentIndex || viewedIndices.has(index);

        return (
          <div
            key={index}
            className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30"
          >
            <m.div
              className="h-full rounded-full bg-white"
              initial={{ width: isPast ? "100%" : "0%" }}
              animate={{
                width: isActive ? `${progress}%` : isPast ? "100%" : "0%",
              }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        );
      })}
    </div>
  );
}

interface StoryContentProps {
  story: Story;
  isMuted: boolean;
  isInitialLoading: boolean;
  isBuffering: boolean;
  onVideoReady: (duration: number) => void;
  onVideoTimeUpdate: (currentTime: number, duration: number) => void;
  onVideoWaiting: () => void;
  onVideoPlaying: () => void;
  onVideoEnded: () => void;
  onImageLoad: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

function StoryContent({
  story,
  isMuted,
  isInitialLoading,
  isBuffering,
  onVideoReady,
  onVideoTimeUpdate,
  onVideoWaiting,
  onVideoPlaying,
  onVideoEnded,
  onImageLoad,
  videoRef,
}: StoryContentProps) {
  const showSpinner = isInitialLoading || isBuffering;

  return (
    <>
      {showSpinner ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Loader2 className="size-10 animate-spin text-white" />
        </div>
      ) : null}
      {story.type === "video" ? (
        <video
          ref={videoRef}
          src={story.src}
          className={cn(
            "h-full w-full object-contain transition-opacity duration-200",
            isInitialLoading ? "opacity-0" : "opacity-100",
          )}
          autoPlay
          playsInline
          muted={isMuted}
          onCanPlay={(event) => {
            const video = event.currentTarget;
            onVideoReady(video.duration * 1000);
          }}
          onTimeUpdate={(event) => {
            const video = event.currentTarget;
            onVideoTimeUpdate(video.currentTime, video.duration);
          }}
          onWaiting={onVideoWaiting}
          onPlaying={onVideoPlaying}
          onEnded={onVideoEnded}
        />
      ) : (
        <Image
          src={story.src}
          alt=""
          fill
          sizes="100vw"
          className={cn(
            "object-contain transition-opacity duration-200",
            isInitialLoading ? "opacity-0" : "opacity-100",
          )}
          onLoad={onImageLoad}
          unoptimized
        />
      )}
    </>
  );
}

interface StoryModalHeaderProps {
  storiesLength: number;
  currentIndex: number;
  progress: number;
  viewedIndices: Set<number>;
  isPaused: boolean;
  currentStory: Story;
  avatar: string;
  username: string;
  timestamp?: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onClose: () => void;
}

function StoryModalHeader({
  storiesLength,
  currentIndex,
  progress,
  viewedIndices,
  isPaused,
  currentStory,
  avatar,
  username,
  timestamp,
  isMuted,
  onToggleMute,
  onClose,
}: StoryModalHeaderProps) {
  return (
    <div className="absolute left-0 right-0 top-0 z-10 bg-gradient-to-b from-black/60 to-transparent pb-4 pt-2">
      <ProgressBar
        count={storiesLength}
        currentIndex={currentIndex}
        progress={progress}
        viewedIndices={viewedIndices}
      />

      <div className="mt-3 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="size-8 overflow-hidden rounded-full">
            <Image
              src={avatar}
              alt={username}
              width={32}
              height={32}
              className="size-8 object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">{username}</span>
            {timestamp ? (
              <span className="text-xs text-white/60">
                {formatTimestamp(timestamp)}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isPaused ? (
            <div className="flex items-center gap-1 text-white/80">
              <Pause className="size-4" />
              <span className="text-xs">Paused</span>
            </div>
          ) : null}

          {currentStory.type === "video" ? (
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded-md text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              onClick={(event) => {
                event.stopPropagation();
                onToggleMute();
              }}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="size-5" />
              ) : (
                <Volume2 className="size-5" />
              )}
            </button>
          ) : null}

          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-md text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface StoryNavButtonsProps {
  currentIndex: number;
  storiesLength: number;
  onPrevious: () => void;
  onNext: () => void;
}

function StoryNavButtons({
  currentIndex,
  storiesLength,
  onPrevious,
  onNext,
}: StoryNavButtonsProps) {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-4 md:flex">
      <button
        type="button"
        className={cn(
          "pointer-events-auto inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
          currentIndex === 0 && "cursor-not-allowed opacity-50",
        )}
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        disabled={currentIndex === 0}
        aria-label="Previous story"
      >
        <ChevronLeft className="size-6" />
      </button>

      <button
        type="button"
        className="pointer-events-auto inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        aria-label={currentIndex === storiesLength - 1 ? "Close" : "Next story"}
      >
        <ChevronRight className="size-6" />
      </button>
    </div>
  );
}

interface StoryViewerModalProps {
  stories: Story[];
  username: string;
  avatar: string;
  timestamp?: string;
  currentIndex: number;
  viewedIndices: Set<number>;
  onClose: () => void;
  onCurrentIndexChange: (index: number) => void;
}

type ViewerState = {
  progress: number;
  isPaused: boolean;
  isMuted: boolean;
  duration: number;
  direction: number;
  isVideoReady: boolean;
  isVideoBuffering: boolean;
};

type ViewerAction =
  | { type: "reset"; direction: number }
  | { type: "set-progress"; progress: number }
  | { type: "set-paused"; isPaused: boolean }
  | { type: "toggle-paused" }
  | { type: "toggle-muted" }
  | { type: "video-ready"; duration: number }
  | { type: "set-buffering"; isVideoBuffering: boolean };

const initialViewerState: ViewerState = {
  progress: 0,
  isPaused: false,
  isMuted: true,
  duration: DEFAULT_IMAGE_DURATION,
  direction: 0,
  isVideoReady: false,
  isVideoBuffering: false,
};

function viewerReducer(
  state: ViewerState,
  action: ViewerAction,
): ViewerState {
  switch (action.type) {
    case "reset":
      return {
        ...state,
        progress: 0,
        direction: action.direction,
        isVideoReady: false,
        isVideoBuffering: false,
      };
    case "set-progress":
      return { ...state, progress: action.progress };
    case "set-paused":
      return { ...state, isPaused: action.isPaused };
    case "toggle-paused":
      return { ...state, isPaused: !state.isPaused };
    case "toggle-muted":
      return { ...state, isMuted: !state.isMuted };
    case "video-ready":
      return {
        ...state,
        duration: action.duration,
        isVideoReady: true,
        isVideoBuffering: false,
      };
    case "set-buffering":
      return { ...state, isVideoBuffering: action.isVideoBuffering };
  }
}

function StoryViewerModal({
  stories,
  username,
  avatar,
  timestamp,
  currentIndex,
  viewedIndices,
  onClose,
  onCurrentIndexChange,
}: StoryViewerModalProps) {
  const [state, dispatch] = React.useReducer(
    viewerReducer,
    initialViewerState,
  );
  const {
    progress,
    isPaused,
    isMuted,
    duration,
    direction,
    isVideoReady,
    isVideoBuffering,
  } = state;

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const progressIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const startTimeRef = React.useRef(0);
  const elapsedRef = React.useRef(0);
  const currentStory = stories[currentIndex];
  const currentDuration =
    currentStory.type === "image"
      ? currentStory.duration || DEFAULT_IMAGE_DURATION
      : duration;
  const localViewedIndices = React.useMemo(
    () => new Set([...viewedIndices, currentIndex]),
    [viewedIndices, currentIndex],
  );

  const goToNext = React.useCallback(() => {
    if (currentIndex < stories.length - 1) {
      dispatch({ type: "reset", direction: 1 });
      elapsedRef.current = 0;
      startTimeRef.current = Date.now();
      onCurrentIndexChange(currentIndex + 1);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose, onCurrentIndexChange]);

  const goToPrevious = React.useCallback(() => {
    if (currentIndex > 0) {
      dispatch({ type: "reset", direction: -1 });
      elapsedRef.current = 0;
      startTimeRef.current = Date.now();
      onCurrentIndexChange(currentIndex - 1);
    } else {
      dispatch({ type: "set-progress", progress: 0 });
      elapsedRef.current = 0;
    }
  }, [currentIndex, onCurrentIndexChange]);

  const onKeyGoToNext = React.useEffectEvent(goToNext);
  const onKeyGoToPrevious = React.useEffectEvent(goToPrevious);
  const onKeyClose = React.useEffectEvent(onClose);

  React.useEffect(() => {
    if (currentStory.type === "video") {
      if (isPaused) {
        videoRef.current?.pause();
      } else if (isVideoReady && !isVideoBuffering) {
        videoRef.current?.play().catch(() => {});
      }

      return;
    }

    if (isPaused || !isVideoReady) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      return;
    }

    startTimeRef.current = Date.now() - elapsedRef.current;
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      elapsedRef.current = elapsed;
      const nextProgress = Math.min((elapsed / currentDuration) * 100, 100);
      dispatch({ type: "set-progress", progress: nextProgress });

      if (nextProgress >= 100) {
        goToNext();
      }
    }, 50);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [
    isPaused,
    currentDuration,
    goToNext,
    currentStory.type,
    isVideoReady,
    isVideoBuffering,
  ]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          onKeyGoToPrevious();
          break;
        case "ArrowRight":
          onKeyGoToNext();
          break;
        case "Escape":
          onKeyClose();
          break;
        case " ":
          event.preventDefault();
          dispatch({ type: "toggle-paused" });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleTap = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const clientX =
        "touches" in event
          ? event.changedTouches[0].clientX
          : event.clientX;
      const x = clientX - rect.left;

      if (x < rect.width / 2) {
        goToPrevious();
      } else {
        goToNext();
      }
    },
    [goToNext, goToPrevious],
  );

  const handleDragEnd = React.useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { offset, velocity } = info;

      if (Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500) {
        if (offset.x > 0) {
          goToPrevious();
        } else {
          goToNext();
        }
      }

      if (offset.y > 100 || velocity.y > 500) {
        onClose();
      }
    },
    [goToNext, goToPrevious, onClose],
  );

  return (
    <m.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <m.div
        ref={containerRef}
        className="relative mx-auto flex h-full w-full max-w-lg flex-col overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        onPointerDown={() => dispatch({ type: "set-paused", isPaused: true })}
        onPointerUp={() => dispatch({ type: "set-paused", isPaused: false })}
        onPointerLeave={() =>
          dispatch({ type: "set-paused", isPaused: false })
        }
      >
        <StoryModalHeader
          storiesLength={stories.length}
          currentIndex={currentIndex}
          progress={progress}
          viewedIndices={localViewedIndices}
          isPaused={isPaused}
          currentStory={currentStory}
          avatar={avatar}
          username={username}
          timestamp={timestamp}
          isMuted={isMuted}
          onToggleMute={() => dispatch({ type: "toggle-muted" })}
          onClose={onClose}
        />

        <button
          type="button"
          className="relative flex flex-1 select-none items-center justify-center overflow-hidden"
          onClick={handleTap}
          aria-label="Navigate story"
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <m.div
              key={currentStory.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <StoryContent
                story={currentStory}
                isMuted={isMuted}
                isInitialLoading={!isVideoReady}
                isBuffering={isVideoBuffering}
                onVideoReady={(videoDuration) => {
                  dispatch({ type: "video-ready", duration: videoDuration });
                }}
                onVideoTimeUpdate={(currentTime, videoDuration) => {
                  if (videoDuration > 0) {
                    dispatch({
                      type: "set-progress",
                      progress: (currentTime / videoDuration) * 100,
                    });
                  }
                }}
                onVideoWaiting={() =>
                  dispatch({ type: "set-buffering", isVideoBuffering: true })
                }
                onVideoPlaying={() =>
                  dispatch({ type: "set-buffering", isVideoBuffering: false })
                }
                onVideoEnded={goToNext}
                onImageLoad={() =>
                  dispatch({
                    type: "video-ready",
                    duration: currentDuration,
                  })
                }
                videoRef={videoRef}
              />
            </m.div>
          </AnimatePresence>
        </button>

        <StoryNavButtons
          currentIndex={currentIndex}
          storiesLength={stories.length}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      </m.div>
    </m.div>
  );
}

function StoryViewer({
  stories,
  username,
  avatar,
  timestamp,
  onStoryView,
  onAllStoriesViewed,
  className,
  ref,
}: StoryViewerProps & { ref?: React.Ref<HTMLDivElement> }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [viewedIndices, setViewedIndices] = React.useState<Set<number>>(
      () => new Set(),
    );

    const firstUnviewedIndex = React.useMemo(() => {
      for (let i = 0; i < stories.length; i++) {
        if (!viewedIndices.has(i)) return i;
      }

      return 0;
    }, [stories.length, viewedIndices]);

    const handleStoryChange = React.useCallback(
      (index: number) => {
        setViewedIndices((prev) => {
          const next = new Set(prev);
          next.add(index);

          if (next.size === stories.length) {
            onAllStoriesViewed?.();
          }

          return next;
        });

        onStoryView?.(stories[index].id);
      },
      [stories, onStoryView, onAllStoriesViewed],
    );

    const openViewer = React.useCallback(() => {
      setCurrentIndex(firstUnviewedIndex);
      handleStoryChange(firstUnviewedIndex);
      setIsOpen(true);
    }, [firstUnviewedIndex, handleStoryChange]);

    const handleCurrentIndexChange = React.useCallback(
      (index: number) => {
        setCurrentIndex(index);
        handleStoryChange(index);
      },
      [handleStoryChange],
    );

    return (
      <LazyMotion features={domAnimation}>
        <div ref={ref} className={className}>
          <StoryThumbnail
            stories={stories}
            username={username}
            viewedIndices={viewedIndices}
            onClick={openViewer}
          />
        </div>

        <AnimatePresence>
          {isOpen ? (
            <StoryViewerModal
              stories={stories}
              username={username}
              avatar={avatar}
              timestamp={timestamp}
              currentIndex={currentIndex}
              viewedIndices={viewedIndices}
              onClose={() => setIsOpen(false)}
              onCurrentIndexChange={handleCurrentIndexChange}
            />
          ) : null}
        </AnimatePresence>
      </LazyMotion>
    );
}

StoryViewer.displayName = "StoryViewer";

export { StoryViewer };
