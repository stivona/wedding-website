import { Metadata } from "next";

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
    name: "Ocean Suites Motel",
    location: "Brookings, OR",
    description: "Comfortable accommodations near the harbor with ocean views.",
    phone: "(541) 469-4004",
    address: "16045 Lower Harbor Rd, Brookings, OR 97415",
  },
  {
    name: "Oceanview Inn",
    location: "Crescent City, CA",
    description: "Spacious rooms with beautiful ocean views, close to the reception venue.",
    phone: "(707) 465-1111",
    address: "270 US-101, Crescent City, CA 95531",
  },
  {
    name: "Lighthouse Inn",
    location: "Crescent City, CA",
    description: "Known for proximity to local attractions and comfortable amenities.",
    phone: "(707) 464-3993",
    address: "681 US-101, Crescent City, CA 95531",
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
              
              <p className="font-body text-olive/70 text-sm mb-4">
                {hotel.description}
              </p>
              
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
                <a
                  href={`tel:${hotel.phone.replace(/[^\d]/g, "")}`}
                  className="font-body text-olive hover:text-olive-400 transition-colors text-sm inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {hotel.phone}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Camping Option */}
        <div className="max-w-3xl mx-auto">
          <div className="card bg-olive/5 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-olive/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            
            <h2 className="heading-display text-3xl mb-4">
              CAMPING AT THE FARM
            </h2>
            
            <div className="decorative-line mb-6" />
            
            <p className="font-body text-olive/70 text-lg mb-4">
              Want a more rustic experience? Guests are welcome to camp on the 
              Ossia Farm property!
            </p>
            
            <p className="font-body text-olive/60 text-sm mb-6">
              Bring your tent or camper and stay right where the celebration is happening. 
              Perfect for those who want to fully immerse in the farm atmosphere and 
              extend the festivities.
            </p>
            
            <div className="inline-block px-4 py-2 border border-olive/30 rounded-lg">
              <p className="font-body text-olive/70 text-sm">
                Please contact us in advance if you&apos;d like to reserve a camping spot
              </p>
            </div>
          </div>
        </div>

        {/* Travel Note */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="card border-2 border-olive/30 bg-olive/5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
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
