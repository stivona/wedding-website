"use client";

import { useState, useEffect } from "react";

export default function RSVPPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) setFormLoaded(false);
  }, [isOpen]);

  return (
    <div className="py-16 md:py-24 mb-20">
      <div className="container-wedding">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl mb-4">
            RSVP
          </h1>
          <div className="decorative-line mb-6" />
          <p className="font-body text-olive/70 text-lg max-w-2xl mx-auto">
            We can&apos;t wait to celebrate with you! Please let us know if you&apos;ll be joining us.
          </p>
        </div>

        {/* Envelope area - inline minHeight reserves space in initial HTML so no snap when envelope loads */}
        <div
          className={`max-w-4xl mx-auto flex flex-col items-center -mt-40 transition-all duration-700 ${isOpen ? "pb-[500px]" : ""}`}
          style={{ minHeight: 560 }}
        >
          {mounted && (
            <div className="envelope-fade-in">
              <div className={`envelope-container ${isOpen ? "opened" : ""}`}>
                {/* Envelope Back */}
                <div className="envelope-back" />

                {/* Form Card (inside envelope) - whole letter hidden until iframe has loaded */}
                <div className={`envelope-letter ${formLoaded ? "letter-ready" : ""}`}>
                  <div className="letter-content">
                    {isOpen && (
                      <iframe
                        src="https://ribbon-month-841.notion.site/ebd//16b12864049481b5b1d9dfe127d5b2f6?theme=light&mode=light"
                        width="100%"
                        height="600"
                        frameBorder="0"
                        allowFullScreen
                        title="RSVP Form"
                        className="rounded-lg"
                        onLoad={() => {
                          requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                              setTimeout(() => setFormLoaded(true), 150);
                            });
                          });
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Envelope Front */}
                <div className="envelope-front" />

                {/* Envelope Flap */}
                <div className="envelope-flap">
                  <div className="envelope-flap-inner" />
                </div>

                {/* Wax Seal - stays in DOM when opening so it can fade out */}
                <button
                  onClick={() => !isOpen && setIsOpen(true)}
                  className={`wax-seal ${isOpen ? "wax-seal-opening" : ""}`}
                  aria-label="Open envelope"
                  disabled={isOpen}
                >
                  <img
                    src="/images/white-seal.png"
                    alt=""
                    className="wax-seal-img"
                  />
                  <span className="wax-seal-text">RSVP</span>
                </button>
              </div>

              {!isOpen && (
                <p className="font-body text-olive/50 text-sm mt-6 animate-pulse">
                  Click the seal to open
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .envelope-fade-in {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: envelopeFadeIn 0.5s ease-out forwards;
        }

        @keyframes envelopeFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .envelope-container {
          position: relative;
          width: 100%;
          max-width: 700px;
          height: 500px;
          perspective: 1500px;
          margin: 0 auto;
          transition: transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.35s;
        }

        .envelope-container.opened {
          transform: translateY(450px);
        }

        .envelope-back {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 320px;
          background: linear-gradient(145deg, #3A5635 0%, #2F462B 100%);
          border-radius: 0 0 8px 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }

        .envelope-front {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 200px;
          background: linear-gradient(165deg, #5E7A59 0%, #3A5635 55%, #2a4027 100%);
          border-radius: 0 0 8px 8px;
          clip-path: polygon(0 95%, 50% 0, 100% 95%, 100% 100%, 0 100%);
          z-index: 3;
          transition: opacity 0.4s ease-out 0.1s;
        }

        .envelope-container.opened .envelope-front {
          opacity: 0;
          pointer-events: none;
        }

        .envelope-flap {
          position: absolute;
          top: 180px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 200px;
          transform-origin: top center;
          transform: translateX(-50%) rotateX(0deg);
          z-index: 4;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.33, 1, 0.68, 1) 0s;
        }

        .envelope-flap-inner {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            145deg,
            #4a6b44 0%,
            #3d5a38 40%,
            #355032 70%,
            #2d4629 100%
          );
          clip-path: polygon(50% 100%, 0 0, 100% 0);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 0;
        }

        .envelope-container.opened .envelope-flap {
          transform: translateX(-50%) rotateX(180deg);
          z-index: 1;
        }

        .envelope-letter {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%) translateY(0);
          width: calc(100% - 40px);
          background: #FFFFFF;
          border-radius: 8px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          z-index: 2;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s,
                      opacity 0.4s ease-out 0.45s;
        }

        .envelope-container.opened .envelope-letter {
          transform: translateX(-50%) translateY(-100px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s,
                      opacity 0.4s ease-out;
        }

        .envelope-container.opened .envelope-letter.letter-ready {
          opacity: 1;
          pointer-events: auto;
        }

        .letter-content {
          padding: 20px;
          color-scheme: light;
          height: 100%;
        }

        .wax-seal {
          position: absolute;
          top: 315px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          width: 100px;
          height: 95px;
          padding: 0;
          border: none;
          background: none;
          box-shadow: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.6s ease-in-out, opacity 0.35s ease-out;
        }

        .wax-seal-opening {
          opacity: 0;
          pointer-events: none;
        }

        .wax-seal:hover:not(.wax-seal-opening) {
          animation: sealWiggle 0.4s ease-in-out infinite;
        }

        .wax-seal:active {
          transform: translateX(-50%) scale(0.95);
          animation: none;
        }

        @keyframes sealWiggle {
          0%, 100% { transform: translateX(-50%) rotate(-4deg); }
          50% { transform: translateX(-50%) rotate(4deg); }
        }

        .wax-seal-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          position: absolute;
          inset: 0;
          box-shadow: none;
        }

        .wax-seal-text {
          position: relative;
          z-index: 1;
          font-size: 18px;
          font-weight: 600;
          color: #FFFCF6;
          text-shadow: 0 0px 4px rgba(217, 186, 148, 1.00);
        }

        /* Mobile adjustments */
        @media (max-width: 640px) {
          .envelope-container {
            height: 400px;
          }

          .envelope-container.opened {
            transform: translateY(350px);
          }

          .envelope-back {
            height: 260px;
          }

          .envelope-front {
            height: 160px;
          }

          .envelope-flap {
            top: 140px;
            height: 160px;
          }

          .envelope-container.opened .envelope-letter {
            transform: translateX(-50%) translateY(-80px);
          }

          .wax-seal {
            top: 240px;
            width: 85px;
            height: 80px;
          }

          .wax-seal-text {
            font-size: 20px;
          }

          .letter-content {
            padding: 12px;
          }

          .letter-content iframe {
            height: 500px;
          }
        }
      `}</style>
    </div>
  );
}



