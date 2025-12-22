"use client";

import { useState } from "react";

export default function RSVPPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-16 md:py-24">
      <div className="container-wedding">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl mb-4">
            RSVP
          </h1>
          <div className="decorative-line mb-6" />
          <p className="font-body text-olive/70 text-lg max-w-2xl mx-auto">
            We can&apos;t wait to celebrate with you! Please let us know if you&apos;ll be joining us.
          </p>
        </div>

        {/* Envelope Container */}
        <div className={`max-w-4xl mx-auto flex flex-col items-center transition-all duration-700 -mt-40 ${isOpen ? 'pb-[400px]' : ''}`}>
          <div className={`envelope-container ${isOpen ? "opened" : ""}`}>
            {/* Envelope Back */}
            <div className="envelope-back" />

            {/* Form Card (inside envelope) */}
            <div className="envelope-letter">
              <div className="letter-content">
                <iframe
                  src="https://ribbon-month-841.notion.site/ebd//16b12864049481b5b1d9dfe127d5b2f6"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  allowFullScreen
                  title="RSVP Form"
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Envelope Front */}
            <div className="envelope-front" />

            {/* Envelope Flap */}
            <div className="envelope-flap">
              <div className="envelope-flap-inner" />
              {/* Wax Seal Button - inside flap so it rises with it */}
              {!isOpen && (
                <button
                  onClick={() => setIsOpen(true)}
                  className="wax-seal"
                  aria-label="Open envelope"
                >
                  <div className="wax-seal-inner">
                    <span className="wax-seal-text">RSVP</span>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Hint text */}
          {!isOpen && (
            <p className="font-body text-olive/50 text-sm mt-6 animate-pulse">
              Click the seal to open
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .envelope-container {
          position: relative;
          width: 100%;
          max-width: 700px;
          height: 500px;
          perspective: 1500px;
          margin: 0 auto;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.4s;
        }

        .envelope-container.opened {
          transform: translateY(350px);
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
          background: linear-gradient(165deg, #5E7A59 0%, #3A5635 100%);
          border-radius: 0 0 8px 8px;
          clip-path: polygon(0 40%, 50% 0, 100% 40%, 100% 100%, 0 100%);
          z-index: 3;
          transition: opacity 0.4s ease 0.2s;
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
          transition: transform 0.6s ease-in-out 0s;
          z-index: 4;
          transform-style: preserve-3d;
        }

        .envelope-flap-inner {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #2F462B 0%, #3A5635 100%);
          clip-path: polygon(50% 100%, 0 0, 100% 0);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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
          background: #FAF8F5;
          border-radius: 8px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          z-index: 2;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s,
                      opacity 0.3s ease 0.5s;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
        }

        .envelope-container.opened .envelope-letter {
          transform: translateX(-50%) translateY(-420px);
          opacity: 1;
          pointer-events: auto;
        }

        .letter-content {
          padding: 20px;
        }

        .wax-seal {
          position: absolute;
          top: 155px;
          left: 50%;
          transform: translateX(-50%) rotateX(0deg);
          z-index: 5;
          width: 100px;
          height: 95px;
          border-radius: 47% 53% 52% 48% / 48% 46% 54% 52%;
          background: 
            radial-gradient(ellipse 120% 80% at 25% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 70% 75%, rgba(0, 0, 0, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 30% 30%, #FAF8F5 0%, #E8E0D4 30%, #DCD0BF 60%, #D0C4B0 100%);
          box-shadow: 
            0 4px 15px rgba(58, 86, 53, 0.4),
            0 2px 6px rgba(0, 0, 0, 0.2),
            inset 0 3px 6px rgba(255, 255, 255, 0.5),
            inset 0 -3px 6px rgba(0, 0, 0, 0.15),
            inset 2px 0 4px rgba(0, 0, 0, 0.05),
            inset -2px 0 4px rgba(0, 0, 0, 0.05);
          border: none;
          cursor: pointer;
          transition: transform 0.6s ease-in-out;
          animation: sealPulse 2s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wax-seal:active {
          transform: translateX(-50%) rotateX(0deg) scale(0.95);
        }

        .envelope-container:has(.wax-seal:hover) .envelope-flap {
          transform: translateX(-50%) rotateX(35deg);
        }

        .envelope-container:has(.wax-seal:hover) .wax-seal {
          transform: translateX(-50%) rotateX(-35deg);
        }

        @keyframes sealPulse {
          0%, 100% {
            box-shadow: 
              0 4px 15px rgba(58, 86, 53, 0.4),
              0 2px 6px rgba(0, 0, 0, 0.2),
              inset 0 3px 6px rgba(255, 255, 255, 0.5),
              inset 0 -3px 6px rgba(0, 0, 0, 0.15),
              inset 2px 0 4px rgba(0, 0, 0, 0.05),
              inset -2px 0 4px rgba(0, 0, 0, 0.05);
          }
          50% {
            box-shadow: 
              0 4px 25px rgba(58, 86, 53, 0.6),
              0 0 20px rgba(58, 86, 53, 0.3),
              0 2px 6px rgba(0, 0, 0, 0.2),
              inset 0 3px 6px rgba(255, 255, 255, 0.5),
              inset 0 -3px 6px rgba(0, 0, 0, 0.15),
              inset 2px 0 4px rgba(0, 0, 0, 0.05),
              inset -2px 0 4px rgba(0, 0, 0, 0.05);
          }
        }

        .wax-seal-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 0, 0, 0.08) 0%, transparent 70%);
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.15),
            inset 0 -1px 2px rgba(255, 255, 255, 0.3);
        }

        .wax-seal-text {
          color: #B8A890;
          font-family: var(--font-paradise-seashore), serif;
          font-size: 28px;
          letter-spacing: 3px;
          font-weight: 600;
          text-shadow: 
            0 -1px 1px rgba(0, 0, 0, 0.25),
            0 1px 1px rgba(255, 255, 255, 0.4),
            0 -2px 2px rgba(0, 0, 0, 0.1);
        }

        /* Mobile adjustments */
        @media (max-width: 640px) {
          .envelope-container {
            height: 400px;
          }

          .envelope-container.opened {
            transform: translateY(280px);
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
            transform: translateX(-50%) translateY(-340px);
          }

          .wax-seal {
            top: 120px;
            width: 85px;
            height: 80px;
          }

          .wax-seal-inner {
            width: 58px;
            height: 58px;
          }

          .wax-seal-text {
            font-size: 22px;
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



