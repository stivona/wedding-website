import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Schedule | Shannon & Austin",
  description: "Wedding day schedule for Shannon & Austin's celebration on August 8, 2026.",
};

export default function SchedulePage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container-wedding">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl mb-4">
            S<span style={{ fontFeatureSettings: '"salt", "ss01", "ss02", "swsh"' }}>C</span>HED<span style={{ fontFeatureSettings: '"salt", "ss01", "ss02", "swsh"' }}>U</span>LE
          </h1>
          <div className="decorative-line mb-6" />
          <p className="font-body text-olive/70 text-lg">
            August 8, 2026
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Ceremony */}
          <div>
            <div className="card">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Event Details */}
                <div className="text-center md:text-left">
                  <div className="inline-block px-4 py-1 bg-olive/10 rounded-full mb-4">
                    <span className="font-body text-sm text-olive uppercase tracking-wider">4:00 PM</span>
                  </div>
                  
                  <h2 className="heading-display text-3xl md:text-4xl mb-4">
                    CEREM<span style={{ fontFeatureSettings: '"salt", "ss01", "ss02", "swsh"' }}>O</span>NY
                  </h2>
                  
                  <h3 className="font-body font-semibold text-olive text-lg mb-2">
                    Capella by the Sea
                  </h3>
                  
                  <address className="font-body text-olive/70 not-italic mb-4">
                    294-298 N Bank Chetco River Rd<br />
                    Brookings, OR 97415
                  </address>
                  
                  <p className="font-body text-olive/60 text-sm leading-relaxed">
                    Join us as we exchange vows in a stunning oceanfront chapel. 
                    The ceremony will overlook the beautiful Pacific coastline.
                  </p>
                  
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=294-298+N+Bank+Chetco+River+Rd,+Brookings,+OR+97415"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-olive hover:text-olive-400 transition-colors font-body text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Get Directions
                  </a>
                </div>
                
                {/* Map */}
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.5!2d-124.28!3d42.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54d46f47e5e0e5e5%3A0x0!2s294-298+N+Bank+Chetco+River+Rd%2C+Brookings%2C+OR+97415!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ceremony Location"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reception */}
          <div>
            <div className="card">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Event Details */}
                <div className="text-center md:text-left">
                  <div className="inline-block px-4 py-1 bg-olive/10 rounded-full mb-4">
                    <span className="font-body text-sm text-olive uppercase tracking-wider">Following Ceremony</span>
                  </div>
                  
                  <h2 className="heading-display text-3xl md:text-4xl mb-4">
                    RECEPTI<span style={{ fontFeatureSettings: '"salt", "ss01", "ss02", "swsh"' }}>O</span>N
                  </h2>
                  
                  <h3 className="font-body font-semibold text-olive text-lg mb-2">
                    Ossia Farm
                  </h3>
                  
                  <address className="font-body text-olive/70 not-italic mb-4">
                    2465 Morehead Rd<br />
                    Crescent City, CA 95531
                  </address>
                  
                  <p className="font-body text-olive/60 text-sm leading-relaxed">
                    Celebrate with us at this charming farmstead! Enjoy dinner, drinks, 
                    dancing, and an unforgettable evening under the stars.
                  </p>
                  
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=2465+Morehead+Rd,+Crescent+City,+CA+95531"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-olive hover:text-olive-400 transition-colors font-body text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Get Directions
                  </a>
                </div>
                
                {/* Map */}
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.5!2d-124.15!3d41.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54d46f47e5e0e5e5%3A0x0!2s2465+Morehead+Rd%2C+Crescent+City%2C+CA+95531!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Reception Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attire Note */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="card border-2 border-olive/30 bg-olive/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                <Image
                  src="/images/Attire.svg"
                  alt="Attire"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="heading-display text-2xl md:text-3xl mb-2">ATTIRE</h3>
                <p className="font-body text-olive/70 text-sm">
                  Semi-formal / Garden Party Attire
                </p>
                <p className="font-body text-olive/50 text-sm mt-1">
                  Please wear comfortable shoes suitable for outdoor terrain
                </p>
              </div>
            </div>
            
            {/* Photo Grid */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  key={index}
                  className="aspect-square bg-olive/10 rounded-lg flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-olive/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
