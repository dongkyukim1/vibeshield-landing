export default function Footer() {
  return (
    <footer className="px-4 md:px-16 py-8">
      {/* Subtle divider line */}
      <div
        className="mb-8 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(232, 228, 224, 0.08), transparent)",
        }}
      />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[8px] uppercase tracking-widest text-light/30">
            VibeShield
          </span>
          <span className="font-mono text-[8px] text-light/20 ml-4">
            Copyright 2026. All Rights Reserved.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="font-mono text-xs text-light/30 hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="#"
            className="font-mono text-xs text-light/30 hover:text-accent transition-colors"
          >
            Docs
          </a>
          <a
            href="#"
            className="font-mono text-xs text-light/30 hover:text-accent transition-colors"
          >
            Blog
          </a>
          <a
            href="#"
            className="font-mono text-xs text-light/30 hover:text-accent transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="font-mono text-xs text-light/30 hover:text-accent transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="font-mono text-xs text-light/30 hover:text-accent transition-colors"
          >
            @vibeshield
          </a>
        </div>
      </div>
    </footer>
  );
}
