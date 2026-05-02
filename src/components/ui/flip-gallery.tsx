"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FlipGalleryImage {
  title: string;
  url: string;
}

interface FlipGalleryProps {
  images: FlipGalleryImage[];
}

const FLIP_SPEED = 750;
const flipTiming: KeyframeAnimationOptions = {
  duration: FLIP_SPEED,
  iterations: 1,
};

const flipAnimationTop: Keyframe[] = [
  { transform: "rotateX(0)" },
  { transform: "rotateX(-90deg)" },
  { transform: "rotateX(-90deg)" },
];
const flipAnimationBottom: Keyframe[] = [
  { transform: "rotateX(90deg)" },
  { transform: "rotateX(90deg)" },
  { transform: "rotateX(0)" },
];

const flipAnimationTopReverse: Keyframe[] = [
  { transform: "rotateX(-90deg)" },
  { transform: "rotateX(-90deg)" },
  { transform: "rotateX(0)" },
];
const flipAnimationBottomReverse: Keyframe[] = [
  { transform: "rotateX(0)" },
  { transform: "rotateX(90deg)" },
  { transform: "rotateX(90deg)" },
];

export default function FlipGallery({ images }: FlipGalleryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const uniteRef = useRef<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setActiveImage = useCallback((element: HTMLElement, imageIndex: number) => {
    element.style.backgroundImage = `url('${images[imageIndex].url}')`;
  }, [images]);

  const setImageTitle = useCallback((imageIndex: number) => {
    const gallery = containerRef.current;

    if (!gallery) {
      return;
    }

    gallery.setAttribute("data-title", images[imageIndex].title);
    gallery.style.setProperty("--title-y", "0");
    gallery.style.setProperty("--title-opacity", "1");
  }, [images]);

  const defineFirstImage = useCallback(() => {
    uniteRef.current.forEach((element) => setActiveImage(element, 0));
    setImageTitle(0);
  }, [setActiveImage, setImageTitle]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    uniteRef.current = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(".unite"),
    );
    defineFirstImage();
  }, [defineFirstImage]);

  const updateGallery = (nextIndex: number, isReverse = false) => {
    const gallery = containerRef.current;

    if (!gallery) {
      return;
    }

    const topOverlay = gallery.querySelector<HTMLElement>(".overlay-top");
    const bottomOverlay = gallery.querySelector<HTMLElement>(".overlay-bottom");

    topOverlay?.animate(
      isReverse ? flipAnimationTopReverse : flipAnimationTop,
      flipTiming,
    );
    bottomOverlay?.animate(
      isReverse ? flipAnimationBottomReverse : flipAnimationBottom,
      flipTiming,
    );

    gallery.style.setProperty("--title-y", "-1rem");
    gallery.style.setProperty("--title-opacity", "0");
    gallery.setAttribute("data-title", "");

    uniteRef.current.forEach((element, index) => {
      const delay =
        (isReverse && index !== 1 && index !== 2) ||
        (!isReverse && (index === 1 || index === 2))
          ? FLIP_SPEED - 200
          : 0;

      window.setTimeout(() => setActiveImage(element, nextIndex), delay);
    });

    window.setTimeout(() => setImageTitle(nextIndex), FLIP_SPEED * 0.5);
  };

  const updateIndex = (increment: number) => {
    const newIndex = (currentIndex + increment + images.length) % images.length;
    const isReverse = increment < 0;

    setCurrentIndex(newIndex);
    updateGallery(newIndex, isReverse);
  };

  return (
    <div className="flex min-h-[620px] items-center justify-center px-6 py-16 font-sans">
      <div className="relative p-2">
        <div
          id="flip-gallery"
          ref={containerRef}
          className="relative h-[400px] w-[280px] text-center md:h-[500px] md:w-[360px]"
          style={{ perspective: "800px" }}
        >
          <div className="top unite bg-cover bg-no-repeat" />
          <div className="bottom unite bg-cover bg-no-repeat" />
          <div className="overlay-top unite bg-cover bg-no-repeat" />
          <div className="overlay-bottom unite bg-cover bg-no-repeat" />
        </div>

        <div className="absolute right-0 top-full mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => updateIndex(-1)}
            title="Previous"
            className="text-foreground opacity-75 transition hover:scale-125 hover:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => updateIndex(1)}
            title="Next"
            className="text-foreground opacity-75 transition hover:scale-125 hover:opacity-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style>
        {`
          #flip-gallery::after {
            content: '';
            position: absolute;
            background-color: black;
            width: 100%;
            height: 4px;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }

          #flip-gallery::before {
            content: attr(data-title);
            color: hsl(var(--secondary));
            font-size: 0.75rem;
            left: -0.5rem;
            position: absolute;
            top: calc(100% + 1rem);
            line-height: 2;
            opacity: var(--title-opacity, 0);
            transform: translateY(var(--title-y, 0));
            transition: opacity 500ms ease-in-out, transform 500ms ease-in-out;
          }

          #flip-gallery > * {
            position: absolute;
            width: 100%;
            height: 50%;
            overflow: hidden;
            background-size: 280px 400px;
          }

          @media (min-width: 768px) {
            #flip-gallery > * {
              background-size: 360px 500px;
            }
          }

          .top,
          .overlay-top {
            top: 0;
            transform-origin: bottom;
            background-position: top;
          }

          .bottom,
          .overlay-bottom {
            bottom: 0;
            transform-origin: top;
            background-position: bottom;
          }
        `}
      </style>
    </div>
  );
}
