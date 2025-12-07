export default function Footer() {
  return (
    <footer className="bg-olive/5 border-t border-olive/10 py-12 mt-20">
      <div className="container-wedding text-center">
        {/* Date display in Libre Caslon Display */}
        <div 
          className="text-5xl md:text-6xl lg:text-[6rem] text-olive/80 mb-12 inline-block cursor-pointer transition-transform duration-500 hover:[transform:rotateY(360deg)]"
          style={{ fontFamily: 'var(--font-libre-caslon-display), serif' }}
        >
          8 | 8
        </div>
        
        <p className="font-heading text-lg md:text-xl lg:text-2xl text-olive/70 uppercase tracking-[0.15em]">
          Shann<span style={{ fontFeatureSettings: '"salt", "ss01", "ss02", "swsh"' }}>o</span>n & Austin
        </p>
      </div>
    </footer>
  );
}
