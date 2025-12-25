import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Accommodations | Shannon & Austin",
  description: "Where to stay for Shannon & Austin's wedding on August 8, 2026.",
};

// Helper function to render text with stylized O characters
function StylizedText({ text }: { text: string }) {
  const parts = text.toUpperCase().split(/(O)/g);
  return (
    <>
      {parts.map((part, index) =>
        part === "O" ? (
          <span key={index} style={{ fontFeatureSettings: '"salt", "ss01", "ss02", "swsh"' }}>
            O
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

const hotels = [
  {
    name: "Beachfront Inn",
    location: "Brookings, OR",
    description: "Our room block hotel with shuttle service to the ceremony and reception venues.",
    highlight: "Room Block & Shuttle",
    isRoomBlock: true,
    phone: "(541) 469-7779",
    address: "16008 Boat Basin Rd, Brookings, OR 97415",
  },
  {
    name: "Local Airbnbs",
    location: "Crescent City, CA",
    description: "Browse vacation rentals and unique stays in the area. Great for groups or families looking for more space!",
    website: "https://www.airbnb.com/s/Crescent-City--CA/homes?adults=1&refinement_paths%5B%5D=%2Fhomes&place_id=ChIJ24hiXDdm0FQRLuZ1c7Ca6HY&location=Crescent+City%2C+CA&checkin=2026-08-07&checkout=2026-08-09&date_picker_type=calendar",
    address: "Various locations in Crescent City",
  },
  {
    name: "Wildflower Inn",
    location: "Gold Beach, OR",
    description: "A cozy inn option along the scenic Oregon coast.",
    note: "Note: Located about an hour from the reception venue.",
    phone: "(541) 425-7887",
    address: "29401 Ellensburg Ave, Gold Beach, OR 97444",
  },
  {
    name: "Camping at the Farm",
    location: "Crescent City, CA",
    description: "Want a more rustic experience? Bring your tent or camper and stay right where the celebration is happening!",
    mailto: "shannonandaustingetmarried@gmail.com",
    address: "Ossia Farm, 2465 Morehead Rd, Crescent City, CA",
    isCamping: true,
  },
];

export default function AccommodationsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container-wedding">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl mb-4">
            STAY
          </h1>
          <div className="decorative-line mb-6" />
          <p className="font-body text-olive/70 text-lg max-w-2xl mx-auto">
            We&apos;ve gathered some accommodation options for your visit to the beautiful 
            Southern Oregon and Northern California coast.
          </p>
        </div>

        {/* Room Block Highlight */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="card border-2 border-olive/30 bg-olive/5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h3 className="heading-display text-xl mb-2">SHUTTLE SERVICE</h3>
                <p className="font-body text-olive/70 text-sm">
                  A shuttle will be available from the Beachfront Inn to both the ceremony 
                  and reception venues. We recommend booking your stay there for the most 
                  convenient experience!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {hotels.map((hotel) => (
            <div
              key={hotel.name}
              className={`card relative ${
                hotel.isRoomBlock ? "ring-2 ring-olive/40" : ""
              }`}
            >
              {hotel.isRoomBlock && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-olive text-cream text-xs font-body uppercase tracking-wider rounded-full">
                  Room Block
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="heading-display text-2xl mb-1"><StylizedText text={hotel.name} /></h3>
                <p className="font-body text-olive/60 text-sm">{hotel.location}</p>
              </div>
              
              <p className="font-body text-olive/70 text-sm mb-2">
                {hotel.description}
              </p>
              
              {hotel.note && (
                <p className="font-body text-olive/70 text-sm font-semibold mb-4">
                  {hotel.note}
                </p>
              )}
              
              {!hotel.note && <div className="mb-2" />}
              
              {hotel.highlight && (
                <div className="inline-block px-3 py-1 bg-olive/10 rounded-full mb-4">
                  <span className="font-body text-xs text-olive uppercase tracking-wider">
                    {hotel.highlight}
                  </span>
                </div>
              )}
              
              <div className="border-t border-olive/10 pt-4 mt-auto">
                <address className="font-body text-olive/60 text-xs not-italic mb-2">
                  {hotel.address}
                </address>
                {hotel.phone ? (
                  <a
                    href={`tel:${hotel.phone.replace(/[^\d]/g, "")}`}
                    className="font-body text-olive hover:text-olive-400 transition-colors text-sm inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {hotel.phone}
                  </a>
                ) : hotel.website ? (
                  <a
                    href={hotel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-olive hover:text-olive-400 transition-colors text-sm inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Browse Listings
                  </a>
                ) : hotel.mailto ? (
                  <a
                    href={`mailto:${hotel.mailto}?subject=Camping%20Reservation`}
                    className="font-body text-olive hover:text-olive-400 transition-colors text-sm inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Reserve a Spot
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Travel Note */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="card border-2 border-olive/30 bg-olive/5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                <Image
                  src="/images/Plane.svg"
                  alt="Airplane"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="heading-display text-xl mb-2">GETTING HERE</h3>
                <p className="font-body text-olive/70 text-sm">
                  The closest major airports are in Medford, OR (MFR) and Arcata/Eureka, CA (ACV), 
                  both approximately 1.5-2 hours away. Rental cars are recommended for exploring 
                  this beautiful coastal region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
