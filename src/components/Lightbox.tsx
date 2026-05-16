import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export type LightboxImage = {
  src: string;
  alt?: string;
  caption?: string | null;
};

type Props = {
  images: LightboxImage[];
  startIndex?: number;
  open: boolean;
  onClose: () => void;
  title?: string;
};

export default function Lightbox({ images, startIndex = 0, open, onClose, title }: Props) {
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(1);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      setIndex(startIndex);
      setZoom(1);
    }
  }, [open, startIndex]);

  const next = useCallback(() => {
    setZoom(1);
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setZoom(1);
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 0.25, 3));
      else if (e.key === "-") setZoom((z) => Math.max(z - 0.25, 1));
      else if (e.key === "0") setZoom(1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev, onClose]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  if (!images.length) return null;
  const current = images[index];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-xl"
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between border-b border-border/40 px-4 py-3 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0 flex-1">
              {title && <p className="truncate text-sm font-semibold text-foreground">{title}</p>}
              <p className="text-xs text-muted-foreground">
                {index + 1} / {images.length}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <IconBtn onClick={() => setZoom((z) => Math.max(z - 0.25, 1))} label="Zoom out">
                <ZoomOut className="h-4 w-4" />
              </IconBtn>
              <IconBtn onClick={() => setZoom((z) => Math.min(z + 0.25, 3))} label="Zoom in">
                <ZoomIn className="h-4 w-4" />
              </IconBtn>
              <IconBtn onClick={() => setZoom(1)} label="Reset">
                <RotateCcw className="h-4 w-4" />
              </IconBtn>
              <IconBtn onClick={onClose} label="Close">
                <X className="h-4 w-4" />
              </IconBtn>
            </div>
          </div>

          {/* Main image area */}
          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {images.length > 1 && (
              <button
                onClick={prev}
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-card/70 text-foreground backdrop-blur transition hover:border-primary hover:text-primary sm:left-6"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="flex h-full max-h-full max-w-full items-center justify-center overflow-auto"
              >
                <img
                  src={current.src}
                  alt={current.alt ?? ""}
                  loading="lazy"
                  draggable={false}
                  style={{ transform: `scale(${zoom})`, transition: "transform 0.2s ease" }}
                  className="max-h-[75vh] max-w-full select-none rounded-lg object-contain shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <button
                onClick={next}
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-card/70 text-foreground backdrop-blur transition hover:border-primary hover:text-primary sm:right-6"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Caption + thumbnails */}
          <div
            className="border-t border-border/40 px-4 py-3 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {current.caption && (
              <p className="mb-3 text-center text-sm text-muted-foreground">{current.caption}</p>
            )}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={img.src + i}
                    onClick={() => {
                      setIndex(i);
                      setZoom(1);
                    }}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded border-2 transition ${
                      i === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IconBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-card/70 text-foreground transition hover:border-primary hover:text-primary"
    >
      {children}
    </button>
  );
}
