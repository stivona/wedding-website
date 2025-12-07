import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center">
        <div className="container-wedding text-center">
          <div className="py-16 px-8">
            {/* Names */}
            <h1 className="heading-display text-6xl md:text-8xl lg:text-9xl mb-4">
              SHANN<span style={{ fontFeatureSettings: '"salt", "ss01", "ss02", "swsh"' }}>O</span>N
            </h1>
            
            {/* Decorative ampersand */}
            <div className="ampersand text-4xl md:text-5xl my-4">&</div>
            
            <h1 className="heading-display text-6xl md:text-8xl lg:text-9xl mb-8">
              A<span style={{ fontFeatureSettings: '"salt", "ss01", "ss02", "swsh"' }}>U</span>STIN
            </h1>
            
            {/* Decorative line */}
            <div className="decorative-line mb-8" />
            
            {/* Date */}
            <p className="font-body text-lg md:text-xl text-olive/80 uppercase tracking-[0.3em]">
              August Eighth, 2026
            </p>
          </div>
        </div>
      </section>

      {/* We're Getting Married Repeating Banner */}
      <div className="repeat-banner">
        <div className="flex justify-around w-full px-4" style={{ gap: '18px' }}>
          <span className="repeat-text">WE&apos;RE GETTING MARRIED</span>
          <span className="repeat-text">WE&apos;RE GETTING MARRIED</span>
          <span className="repeat-text hidden sm:inline">WE&apos;RE GETTING MARRIED</span>
          <span className="repeat-text hidden md:inline">WE&apos;RE GETTING MARRIED</span>
          <span className="repeat-text hidden lg:inline">WE&apos;RE GETTING MARRIED</span>
          <span className="repeat-text hidden xl:inline">WE&apos;RE GETTING MARRIED</span>
        </div>
      </div>

      {/* Welcome Message Section */}
      <section className="py-20 bg-olive/5">
        <div className="container-wedding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-display text-4xl md:text-5xl mb-6">
              J<span style={{ fontFeatureSettings: '"salt", "ss01", "ss02", "swsh"' }}>O</span>IN <span style={{ fontFeatureSettings: '"salt", "ss01", "ss02", "swsh"' }}>U</span>S!
            </h2>
            
            <div className="decorative-line mb-8" />
            
            <p className="font-body text-olive/80 text-lg leading-relaxed mb-6">
              We are so excited to celebrate our love with the people who mean the most to us. 
              Join us for a beautiful ceremony overlooking the Pacific Ocean, followed by an 
              evening of dinner, dancing, and joy at a stunning farmstead.
            </p>
            
            <p className="font-body text-olive/80 text-lg leading-relaxed">
              We can&apos;t wait to share this special day with you!
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-20">
        <div className="container-wedding">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Ceremony Card */}
            <div className="card text-center">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/images/Capella.png"
                  alt="Capella by the Sea"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h3 className="heading-display text-2xl mb-2">CEREM<span style={{ fontFeatureSettings: '"salt", "ss01", "ss02", "swsh"' }}>O</span>NY</h3>
              <p className="font-body text-olive/70 mb-1">4:00 PM</p>
              <p className="font-body text-olive/60 text-sm">Capella by the Sea</p>
              <p className="font-body text-olive/50 text-xs mt-1">Brookings, Oregon</p>
            </div>

            {/* Reception Card */}
            <div className="card text-center">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                {/* Farm/farmstead icon - rolling hills with crops and farmhouse */}
                <svg className="w-16 h-16 text-olive" viewBox="0 0 100 100" fill="currentColor">
                  {/* Rolling hills */}
                  <path d="M0 70 Q25 55 50 65 Q75 75 100 60 L100 100 L0 100 Z" fillOpacity="0.2" />
                  {/* Farmhouse */}
                  <path d="M55 45 L55 70 L85 70 L85 45 L70 30 Z" />
                  <rect x="62" y="55" width="8" height="15" fill="#FAF8F5" />
                  <rect x="75" y="50" width="6" height="8" fill="#FAF8F5" />
                  {/* Crops/wheat stalks */}
                  <line x1="15" y1="70" x2="15" y2="50" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="55" x2="15" y2="50" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="18" y1="55" x2="15" y2="50" stroke="currentColor" strokeWidth="1.5" />
                  <ellipse cx="15" cy="48" rx="2" ry="4" />
                  
                  <line x1="25" y1="68" x2="25" y2="48" stroke="currentColor" strokeWidth="2" />
                  <line x1="22" y1="53" x2="25" y2="48" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="28" y1="53" x2="25" y2="48" stroke="currentColor" strokeWidth="1.5" />
                  <ellipse cx="25" cy="46" rx="2" ry="4" />
                  
                  <line x1="35" y1="65" x2="35" y2="45" stroke="currentColor" strokeWidth="2" />
                  <line x1="32" y1="50" x2="35" y2="45" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="38" y1="50" x2="35" y2="45" stroke="currentColor" strokeWidth="1.5" />
                  <ellipse cx="35" cy="43" rx="2" ry="4" />
                  
                  <line x1="45" y1="67" x2="45" y2="47" stroke="currentColor" strokeWidth="2" />
                  <line x1="42" y1="52" x2="45" y2="47" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="48" y1="52" x2="45" y2="47" stroke="currentColor" strokeWidth="1.5" />
                  <ellipse cx="45" cy="45" rx="2" ry="4" />
                  
                  {/* Sun */}
                  <circle cx="20" cy="25" r="8" fillOpacity="0.3" />
                </svg>
              </div>
              <h3 className="heading-display text-2xl mb-2">RECEPTI<span style={{ fontFeatureSettings: '"salt", "ss01", "ss02", "swsh"' }}>O</span>N</h3>
              <p className="font-body text-olive/70 mb-1">Following Ceremony</p>
              <p className="font-body text-olive/60 text-sm">Ossia Farm</p>
              <p className="font-body text-olive/50 text-xs mt-1">Crescent City, California</p>
            </div>
          </div>
          
          {/* Link to full schedule */}
          <div className="text-center mt-10">
            <Link href="/schedule" className="link-nav inline-flex items-center gap-2">
              View Full Schedule
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
