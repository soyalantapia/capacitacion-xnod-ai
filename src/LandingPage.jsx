import { useState, useEffect } from "react";

/* ============================================================
 * XNOD Activate — Landing Page
 * Estructura: Propuesta de valor → Problema → Solución →
 * Cómo lo hacemos → Impacto → Qué incluye → Diferenciador →
 * Por qué XNOD → Eventos → Para quién → Marketing → Inversión
 * → FAQ → CTA Final → Footer
 * Paleta: Violeta Startup · Tipografía: Poppins
 * ============================================================ */

const C = {
  primary: "#7B2FBE",
  primaryDark: "#5E1F94",
  primaryDeep: "#3B1463",
  primaryNight: "#1F0E36",
  accent: "#A86EE0",
  accentLight: "#C99FE8",
  accentSoft: "#E8D6F5",
  white: "#FFFFFF",
  surface: "#F5F0FA",
  surfaceCard: "#EDE3F7",
  border: "#DCC9EE",
  textPrimary: "#1A1A1A",
  textSecondary: "#555555",
  textMuted: "#8A8A95",
  whatsapp: "#25D366",
  whatsappHover: "#1EBE5C",
  success: "#2D8F5F",
  danger: "#9CA3AF",
};

const WHATSAPP_BASE = "https://wa.me/5491154596266";
const WA_MAIN = `${WHATSAPP_BASE}?text=${encodeURIComponent(
  "Hola Alan, vi la propuesta de XNOD Activate y quiero coordinar una activación para mi empresa. ¿Cuándo podemos hablar?"
)}`;
const WA_PAY = `${WHATSAPP_BASE}?text=${encodeURIComponent(
  "Hola Alan, quiero coordinar fecha y pagar XNOD Activate. ¿Cómo seguimos?"
)}`;

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }

  /* Focus visible for accessibility (keyboard nav) */
  *:focus { outline: none; }
  *:focus-visible {
    outline: 3px solid ${C.accent};
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Smooth scroll respeta prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    html { scroll-behavior: auto; }
  }

  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${C.white};
    color: ${C.textPrimary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    font-weight: 400;
  }
  h1, h2, h3, h4 { margin: 0; font-weight: 700; line-height: 1.2; color: ${C.primaryNight}; letter-spacing: -0.015em; }
  p { margin: 0; }
  a { color: inherit; text-decoration: none; }
  img { max-width: 100%; display: block; }
  html { scroll-behavior: smooth; }

  .xnod-cta {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    background: ${C.whatsapp}; color: #fff; font-weight: 600; font-size: 17px;
    padding: 18px 32px; border-radius: 999px; border: none; cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 16px rgba(37, 211, 102, 0.25);
    text-align: center; line-height: 1.2; min-height: 56px;
  }
  .xnod-cta:hover { background: ${C.whatsappHover}; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37, 211, 102, 0.35); }

  .xnod-cta-ghost {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: transparent; color: #fff; font-weight: 600; font-size: 16px;
    padding: 16px 28px; border-radius: 999px;
    border: 1.5px solid rgba(255,255,255,0.45);
    cursor: pointer; transition: all 0.2s ease;
  }
  .xnod-cta-ghost:hover { background: rgba(255,255,255,0.12); border-color: #fff; }

  .xnod-section { padding: 96px 24px; }
  .xnod-container { max-width: 1180px; margin: 0 auto; }

  .xnod-h1 { font-size: 38px; font-weight: 800; line-height: 1.08; }
  .xnod-h2 { font-size: 30px; font-weight: 700; line-height: 1.15; margin-bottom: 20px; }
  .xnod-h3 { font-size: 22px; font-weight: 600; line-height: 1.3; }
  .xnod-eyebrow { font-size: 13px; font-weight: 700; letter-spacing: 1.5px; color: ${C.primary}; margin-bottom: 14px; text-transform: uppercase; }
  .xnod-eyebrow-light { color: ${C.accentLight}; }
  .xnod-lead { font-size: 18px; color: ${C.textSecondary}; line-height: 1.65; }

  @media (min-width: 768px) {
    .xnod-section { padding: 128px 40px; }
    .xnod-h1 { font-size: 64px; }
    .xnod-h2 { font-size: 46px; margin-bottom: 28px; }
    .xnod-h3 { font-size: 26px; }
    .xnod-lead { font-size: 19px; }
  }

  .xnod-fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .xnod-fade-in.visible { opacity: 1; transform: translateY(0); }

  @keyframes xnodFadeDown {
    from { opacity: 0; transform: translate(-50%, -10px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }

  details > summary { list-style: none; cursor: pointer; }
  details > summary::-webkit-details-marker { display: none; }

  .xnod-grid-include {
    display: grid; gap: 20px;
    grid-template-columns: 1fr;
  }
  @media (min-width: 640px) { .xnod-grid-include { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .xnod-grid-include { grid-template-columns: repeat(4, 1fr); } }

  .xnod-grid-3 { display: grid; gap: 24px; grid-template-columns: 1fr; }
  @media (min-width: 900px) { .xnod-grid-3 { grid-template-columns: repeat(3, 1fr); } }

  .xnod-grid-gallery { display: grid; gap: 16px; grid-template-columns: 1fr; }
  @media (min-width: 640px) { .xnod-grid-gallery { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .xnod-grid-gallery { grid-template-columns: repeat(4, 1fr); } }

  .xnod-grid-2 { display: grid; gap: 24px; grid-template-columns: 1fr; }
  @media (min-width: 900px) { .xnod-grid-2 { grid-template-columns: 1fr 1fr; } }

  .xnod-step {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    align-items: start;
    padding: 28px;
    background: ${C.white};
    border: 1px solid ${C.border};
    border-left: 4px solid ${C.primary};
    border-radius: 16px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .xnod-step:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(123, 47, 190, 0.12); }
  @media (min-width: 768px) {
    .xnod-step { grid-template-columns: 96px 1fr auto; gap: 28px; align-items: center; padding: 32px 36px; }
  }

  .xnod-hero-features {
    display: grid; gap: 16px; grid-template-columns: 1fr;
  }
  @media (min-width: 640px) { .xnod-hero-features { grid-template-columns: repeat(3, 1fr); } }

  @media (min-width: 768px) {
    .xnod-quote-grid { grid-template-columns: minmax(240px, 320px) 1fr !important; gap: 64px !important; }
  }

  .xnod-stats-grid { display: grid; gap: 16px; grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 768px) { .xnod-stats-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }

  @media (min-width: 768px) {
    .xnod-speaker-card { grid-template-columns: 360px 1fr !important; align-items: stretch; }
    .xnod-speaker-card > div:first-child { aspect-ratio: auto !important; }
  }

  @media (min-width: 768px) {
    .xnod-pricing-header { grid-template-columns: 1fr minmax(280px, 360px) !important; gap: 48px !important; }
  }

`;

/* ====================  COMPONENTES PEQUEÑOS  ==================== */

function Section({ id, bg = C.white, children, style }) {
  return (
    <section id={id} className="xnod-section" style={{ background: bg, ...style }}>
      <div className="xnod-container">{children}</div>
    </section>
  );
}

function CTAPrimary({ href = WA_MAIN, children }) {
  return (
    <a className="xnod-cta" href={href} target="_blank" rel="noopener noreferrer">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
      {children}
    </a>
  );
}

function FadeIn({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = (el) => {
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
  };
  return (
    <div ref={ref} className={`xnod-fade-in ${visible ? "visible" : ""}`}>
      {children}
    </div>
  );
}

/* ====================  PICTURE (WebP + JPG fallback)  ==================== */

function Picture({ src, alt, width, height, loading = "lazy", fetchPriority, style, className, decoding = "async" }) {
  // src can come with .jpg or without extension. Always serve WebP first, JPG fallback.
  const base = src.replace(/\.(jpg|jpeg|png|webp)$/i, "");
  const webp = `${base}.webp`;
  const jpg = `${base}.jpg`;
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img
        src={jpg}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        width={width}
        height={height}
        style={style}
        className={className}
      />
    </picture>
  );
}

/* ====================  ICONOS  ==================== */

const Icon = ({ children, size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const IconTarget = () => (<Icon><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></Icon>);
const IconClock = () => (<Icon><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>);
const IconUsers = () => (<Icon><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>);
const IconBot = () => (<Icon><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M12 8V4"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M8 4h8"/></Icon>);
const IconWhatsapp = () => (<Icon><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></Icon>);
const IconAward = () => (<Icon><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></Icon>);
const IconVideo = () => (<Icon><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></Icon>);
const IconPhone = () => (<Icon><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Icon>);
const IconCheck = ({ color = C.success }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconX = ({ color = C.danger }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconChevron = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconSpark = () => (
  <Icon><path d="M12 2L13.5 8.5 20 10 13.5 11.5 12 18 10.5 11.5 4 10 10.5 8.5z"/></Icon>
);

/* ============================================================
 *  1 · HERO — Propuesta de valor cristalina
 * ============================================================ */

function Hero() {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${C.primaryNight} 0%, ${C.primaryDeep} 50%, ${C.primaryDark} 100%)`,
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: -160, right: -160, width: 560, height: 560,
        borderRadius: "50%", background: `radial-gradient(closest-side, ${C.accent}33, transparent 70%)`,
        pointerEvents: "none",
      }}/>
      <div aria-hidden="true" style={{
        position: "absolute", bottom: -240, left: -200, width: 600, height: 600,
        borderRadius: "50%", background: "radial-gradient(closest-side, rgba(168,110,224,0.12), transparent 70%)",
        pointerEvents: "none",
      }}/>

      <div className="xnod-section" style={{ paddingTop: 96, paddingBottom: 96, position: "relative" }}>
        <div className="xnod-container">
          <FadeIn>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 999, background: "rgba(255,255,255,0.10)", color: "#fff", fontSize: 12.5, fontWeight: 600, marginBottom: 28, letterSpacing: 1.2, border: "1px solid rgba(255,255,255,0.18)", textTransform: "uppercase" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.accentLight, display: "inline-block", boxShadow: `0 0 0 4px ${C.accent}33` }}/>
              XNOD Activate · Activación de IA para empresas
            </div>

            <h1 className="xnod-h1" style={{ marginBottom: 28, maxWidth: 980, color: "#fff" }}>
              Tu equipo ya está usando IA.<br/>
              <span style={{ color: C.accentLight }}>Falta que vos tomes el control.</span>
            </h1>

            <p className="xnod-lead" style={{ maxWidth: 760, marginBottom: 28, color: "rgba(255,255,255,0.92)", fontSize: 20 }}>
              <strong style={{ color: "#fff" }}>En 2 horas activamos a toda tu empresa en uso productivo de IA</strong>, personalizado a tu industria. Tu equipo se va con un agente IA propio sin caducidad.
            </p>

            {/* Hero stats strip */}
            <div style={{
              display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0,
              marginBottom: 32,
              padding: "16px 20px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 14,
              maxWidth: 680,
            }}>
              {[
                { num: "+1.000", label: "personas activadas" },
                { num: "+50", label: "empresas en Latinoamérica" },
                { num: "5", label: "industrias verticales" },
              ].map((s, i, arr) => (
                <div key={i} style={{
                  flex: "1 1 0",
                  paddingLeft: i === 0 ? 0 : 18,
                  paddingRight: i === arr.length - 1 ? 0 : 18,
                  borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.12)" : "none",
                  minWidth: 110,
                }}>
                  <p style={{
                    fontSize: 22, fontWeight: 800, lineHeight: 1, marginBottom: 4,
                    background: `linear-gradient(135deg, ${C.accentLight}, ${C.accent})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>{s.num}</p>
                  <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", marginBottom: 8 }}>
              <CTAPrimary>Reservar mi activación</CTAPrimary>
              <a href="#como-lo-hacemos" className="xnod-cta-ghost">Ver cómo lo hacemos</a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 *  2 · PROBLEMA — Pain agitation
 * ============================================================ */

function Problema() {
  const sintomas = [
    {
      titulo: "Información sensible donde no debería estar",
      texto: "Datos de clientes, contratos e información financiera subiéndose a herramientas que no controlás.",
      stat: "Riesgo legal y reputacional",
    },
    {
      titulo: "Productividad muy desigual entre personas",
      texto: "Hay empleados que ya recuperaron 5 horas por semana. Otros ni saben por dónde empezar. La brecha crece cada día.",
      stat: "Brecha interna de capacidad",
    },
    {
      titulo: "Decisiones improvisadas sobre tecnología",
      texto: "Cada uno usa la herramienta que encontró en redes. Tu empresa no tiene un marco común.",
      stat: "Cero gobernanza",
    },
  ];
  return (
    <Section bg={C.surface}>
      <FadeIn>
        <p className="xnod-eyebrow">El problema</p>
        <h2 className="xnod-h2" style={{ maxWidth: 920 }}>
          La IA ya entró a tu empresa.<br/>Sin permiso, sin reglas, sin criterio.
        </h2>
        <p className="xnod-lead" style={{ maxWidth: 820, marginBottom: 48 }}>
          Tu equipo ya está usando ChatGPT y otras herramientas. La pregunta no es si la usan; la usan. La pregunta es <strong style={{ color: C.primary }}>cómo</strong>, <strong style={{ color: C.primary }}>con qué datos</strong> y <strong style={{ color: C.primary }}>bajo qué reglas</strong>.
        </p>
      </FadeIn>

      <div className="xnod-grid-3">
        {sintomas.map((s, i) => (
          <FadeIn key={i} delay={i * 100}>
            <div style={{ background: C.white, padding: 28, borderRadius: 16, border: `1px solid ${C.border}`, height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ width: 40, height: 40, background: C.accentSoft, color: C.primary, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, marginBottom: 18, fontSize: 16 }}>
                0{i + 1}
              </div>
              <h3 style={{ fontSize: 19, marginBottom: 12, color: C.primaryDeep, lineHeight: 1.3 }}>{s.titulo}</h3>
              <p style={{ color: C.textSecondary, fontSize: 15.5, marginBottom: 20, flex: 1 }}>{s.texto}</p>
              <div style={{
                fontSize: 12, fontWeight: 700, color: C.primaryDark, letterSpacing: 0.8,
                paddingTop: 16, borderTop: `1px solid ${C.border}`,
                textTransform: "uppercase",
              }}>{s.stat}</div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <figure style={{
          marginTop: 80,
          padding: 0,
          maxWidth: 1080,
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 48,
            alignItems: "center",
          }} className="xnod-quote-grid">
            {/* Stat side */}
            <div style={{ textAlign: "center", position: "relative" }}>
              <div style={{
                fontSize: "clamp(72px, 10vw, 130px)",
                fontWeight: 800,
                lineHeight: 0.9,
                color: C.primary,
                letterSpacing: "-0.04em",
                marginBottom: 8,
                background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDeep} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                85%
              </div>
              <p style={{
                fontSize: 14,
                fontWeight: 700,
                color: C.primary,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}>
                de las empresas
              </p>
            </div>

            {/* Quote side */}
            <div>
              <blockquote style={{
                margin: 0,
                fontSize: "clamp(20px, 2.4vw, 28px)",
                fontWeight: 500,
                lineHeight: 1.4,
                color: C.primaryDeep,
                letterSpacing: "-0.01em",
                marginBottom: 28,
              }}>
                <p style={{ marginBottom: 16 }}>
                  Sus empleados <span style={{ color: C.textSecondary }}>ya están usando IA para hacer consultas. Pero la mayoría no sabe cómo usarla bien, qué subir, qué no, ni cómo integrarla al proceso real.</span>
                </p>
                <p style={{
                  fontWeight: 700,
                  color: C.primary,
                  fontSize: "clamp(24px, 2.8vw, 34px)",
                  lineHeight: 1.2,
                }}>
                  Eso es lo que ordenamos en una jornada.
                </p>
              </blockquote>

              <div style={{
                width: 60,
                height: 2,
                background: C.primary,
                marginBottom: 20,
              }}/>

              <figcaption style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Picture
                  src="fotos/alan-portrait"
                  alt="Alan Tapia"
                  width={52}
                  height={52}
                  style={{
                    width: 52, height: 52,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `2px solid ${C.primary}`,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.primaryDeep, marginBottom: 2 }}>
                    Alan Tapia
                  </p>
                  <p style={{ fontSize: 12.5, color: C.textMuted, fontWeight: 500, letterSpacing: 0.3 }}>
                    Fundador de XNOD
                  </p>
                </div>
              </figcaption>
            </div>
          </div>
        </figure>
      </FadeIn>
    </Section>
  );
}

/* ============================================================
 *  3 · SOLUCIÓN — Qué es XNOD Activate
 * ============================================================ */

function Solucion() {
  return (
    <Section id="solucion" bg={C.white}>
      <div className="xnod-grid-2" style={{ alignItems: "center", gap: 56 }}>
        <FadeIn>
          <p className="xnod-eyebrow">La solución</p>
          <h2 className="xnod-h2">
            XNOD Activate ordena cómo tu empresa usa IA en una sola jornada.
          </h2>
          <p className="xnod-lead" style={{ marginBottom: 18 }}>
            Es una sesión de trabajo en vivo, no una charla. Alan Tapia trabaja con todo tu equipo en simultáneo, con casos y herramientas adaptadas a tu industria.
          </p>
          <p className="xnod-lead" style={{ marginBottom: 24 }}>
            Cada empleado se va con tareas reales resueltas con IA y un marco claro de qué se sube, qué no y bajo qué reglas.
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              "Activación masiva: todo el equipo en simultáneo, sin importar el tamaño.",
              "100% personalizada: cada ejemplo está adaptado a tu rubro real.",
              "Termina con infraestructura entregada, no con un PDF.",
            ].map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12, fontSize: 15.5 }}>
                <div style={{ flexShrink: 0, marginTop: 2, color: C.primary }}><IconCheck color={C.primary} /></div>
                <span style={{ color: C.textPrimary }}>{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={150}>
          {/* Card visual: comparación "no es / es" */}
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ padding: 24, borderRadius: 14, background: "#FAFAFA", border: `1px solid #E5E5E5` }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#888", letterSpacing: 1.2, marginBottom: 14 }}>NO ES</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 14, color: "#666" }}>
                {[
                  "Una charla teórica de PowerPoint",
                  "Un curso online que tu equipo verá \"después\"",
                  "Material genérico que no aplica a tu rubro",
                  "Diapositivas que se olvidan en una semana",
                  "Una suscripción que vence o se renueva",
                  "Capacitación técnica solo para developers",
                  "Un consultor que entra, presenta y se va",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, marginTop: 2, opacity: 0.7 }}><IconX /></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: 28, borderRadius: 16, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDeep} 100%)`, color: "#fff", boxShadow: `0 12px 40px ${C.primary}33` }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.accentLight, letterSpacing: 1.5, marginBottom: 14 }}>SÍ ES</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 14.5, color: "rgba(255,255,255,0.95)" }}>
                {[
                  "Trabajo en vivo con tu equipo en simultáneo",
                  "Casos y ejemplos hechos a medida de tu industria",
                  "Infraestructura entregada que queda funcionando",
                  "Agente IA propio para tu empresa, sin caducidad",
                  "Marco claro de qué se sube, qué no y bajo qué reglas",
                  "Examen + certificación con resultados a la empresa",
                  "Método ya implementado en Mercedes-Benz, Banco de Panamá, Isuzu",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, marginTop: 2 }}><IconCheck color="#fff" /></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

/* ============================================================
 *  4 · CÓMO LO HACEMOS — Método de 4 etapas (NUEVA)
 * ============================================================ */

function ComoLoHacemos() {
  const steps = [
    {
      num: "01",
      label: "ANTES · 1 semana",
      titulo: "Personalizamos a tu industria",
      texto: "Llamada con vos para entender tu rubro, tu equipo y los procesos donde la IA va a aportar más. Adaptamos contenido y ejemplos a tu día a día real.",
      output: "Plan a medida",
    },
    {
      num: "02",
      label: "EVENTO · 2 horas",
      titulo: "Activamos a todo el equipo",
      texto: "Sesión en vivo, presencial u online, con todo tu equipo en simultáneo. Cada persona ejecuta tareas reales con IA. Definimos qué se sube, qué no y bajo qué reglas.",
      output: "Equipo capacitado",
    },
    {
      num: "03",
      label: "DESPUÉS · 24 horas",
      titulo: "Entregamos infraestructura",
      texto: "Configuramos un agente IA propio para tu empresa. Examen individual, certificado y grabación cruda + transcripción para que sumes a tu inducción interna.",
      output: "Sistema funcionando",
    },
    {
      num: "04",
      label: "ONGOING · sin caducidad",
      titulo: "Acompañamos la continuidad",
      texto: "Tu equipo queda en un grupo de WhatsApp con contenido semanal de XNOD. El agente IA sigue funcionando sin caducidad ni costos de uso adicionales.",
      output: "Sin caducidad",
    },
  ];

  return (
    <Section id="como-lo-hacemos" bg={C.surface}>
      <FadeIn>
        <p className="xnod-eyebrow">Cómo lo hacemos</p>
        <h2 className="xnod-h2" style={{ maxWidth: 880 }}>
          Un método de 4 etapas. Cada una con un entregable concreto.
        </h2>
        <p className="xnod-lead" style={{ maxWidth: 760, marginBottom: 56 }}>
          Sabés exactamente qué pasa, cuándo y qué te queda al final. Sin sorpresas y sin promesas vagas: cada etapa termina con algo medible que tu empresa puede mostrar.
        </p>
      </FadeIn>

      <div style={{ display: "grid", gap: 16 }}>
        {steps.map((step, i) => (
          <FadeIn key={i} delay={i * 100}>
            <div className="xnod-step">
              <div style={{
                fontSize: 56, fontWeight: 800, color: C.primary,
                lineHeight: 1, fontVariantNumeric: "tabular-nums",
              }}>{step.num}</div>

              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.primaryDark, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>{step.label}</p>
                <h3 className="xnod-h3" style={{ marginBottom: 8, fontSize: 22 }}>{step.titulo}</h3>
                <p style={{ color: C.textSecondary, fontSize: 15.5, lineHeight: 1.65 }}>{step.texto}</p>
              </div>

              <div style={{
                background: C.white,
                color: C.primary,
                padding: "10px 16px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: "nowrap",
                border: `1.5px solid ${C.primary}`,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                alignSelf: "start",
              }}>
                <IconArrowRight />
                {step.output}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
 *  5 · IMPACTO — Casos reales con resultados
 * ============================================================ */

/* ============================================================
 *  4c · TESTIMONIALES — Voz de clientes
 * ============================================================ */

function Testimoniales() {
  const quotes = [
    {
      quote: "En una jornada activamos a todo el equipo comercial. A las dos semanas cada vendedor recuperaba más de 5 horas semanales en tareas administrativas.",
      autor: "Director Comercial",
      empresa: "Empresa de comercio · Argentina",
      iniciales: "DC",
    },
    {
      quote: "Pasamos de cotizar a mano a que el cliente cotice solo. La activación fue el primer paso del proyecto que nos posicionó número uno en Córdoba.",
      autor: "CEO",
      empresa: "Distribuidora · Córdoba",
      iniciales: "CE",
    },
    {
      quote: "Reportes que nos tomaban un día completo ahora se arman en 30 minutos. El agente IA hace el cruce de datos, redacta el análisis y nos queda solo revisar.",
      autor: "Gerente de Operaciones",
      empresa: "Proveedor automotriz · Latinoamérica",
      iniciales: "GO",
    },
  ];

  return (
    <Section id="testimoniales" bg={C.surface}>
      <FadeIn>
        <p className="xnod-eyebrow">Testimoniales</p>
        <h2 className="xnod-h2" style={{ maxWidth: 880 }}>
          Lo que dicen las empresas que ya pasaron por la activación.
        </h2>
        <p className="xnod-lead" style={{ maxWidth: 720, marginBottom: 56 }}>
          Equipos reales, resultados medibles. Algunos prefieren no figurar públicamente. Compartimos referencias verificables en la llamada de coordinación.
        </p>
      </FadeIn>

      <div className="xnod-grid-3">
        {quotes.map((t, i) => (
          <FadeIn key={i} delay={i * 100}>
            <article style={{
              padding: 0,
              background: C.white,
              borderRadius: 20,
              border: `1px solid ${C.border}`,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 4px 20px rgba(123, 47, 190, 0.06)`,
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 14px 32px rgba(123, 47, 190, 0.12)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 20px rgba(123, 47, 190, 0.06)`; }}
            >
              {/* Top stripe with stars */}
              <div style={{
                background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDeep} 100%)`,
                padding: "18px 28px",
                color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {[1,2,3,4,5].map(n => (
                    <svg key={n} width="14" height="14" viewBox="0 0 24 24" fill={C.accentLight} aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: C.accentLight }}>
                  TESTIMONIO
                </span>
              </div>

              <div style={{ padding: "28px 28px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <p style={{
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: C.primaryDeep,
                  fontWeight: 500,
                  marginBottom: 28,
                  flex: 1,
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
                  <div style={{
                    width: 44, height: 44,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDeep})`,
                    color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: 14,
                    flexShrink: 0,
                  }}>
                    {t.iniciales}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: C.primaryDeep }}>{t.autor}</p>
                    <p style={{ fontSize: 12.5, color: C.textMuted, fontWeight: 500 }}>{t.empresa}</p>
                  </div>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
 *  4b · IMPACTO DIRECTO A TU EMPRESA — Aggregated benefits
 * ============================================================ */

function ImpactoDirecto() {
  const items = [
    { icon: <IconUsers />, area: "TU EQUIPO", titulo: "Capacitado y con criterio común", texto: "Todos los empleados con el mismo marco. Cero brecha entre quien sabe y quien no." },
    { icon: <IconTarget />, area: "TU INFORMACIÓN", titulo: "Protegida con reglas claras", texto: "Definimos qué se sube, qué no y bajo qué condiciones. Cero datos sensibles flotando." },
    { icon: <IconClock />, area: "TU PRODUCTIVIDAD", titulo: "Medible desde el primer día", texto: "Tareas que tomaban horas resueltas en minutos. Cada empleado recupera tiempo útil." },
    { icon: <IconBot />, area: "TUS PROCESOS", titulo: "Agente IA propio resolviendo tareas reales", texto: "No es una herramienta más. Es infraestructura que tu empresa usa todos los días." },
    { icon: <IconAward />, area: "TU MARCA", titulo: "Material listo para mostrar al mercado", texto: "Cobertura del evento + casos de uso reales para LinkedIn, prensa y posicionamiento." },
    { icon: <IconSpark />, area: "TU TALENTO", titulo: "Empleados que ven inversión en su crecimiento", texto: "Capacitación + certificado individual. Retención y atracción de talento." },
    { icon: <IconWhatsapp />, area: "TU CONTINUIDAD", titulo: "Soporte sin caducidad", texto: "WhatsApp semanal con contenido nuevo. El agente IA sigue funcionando para siempre." },
    { icon: <IconPhone />, area: "TU INVERSIÓN", titulo: "USD 500 fijo, una sola vez", texto: "Sin niveles, sin agregados, sin costos de uso del agente. Un solo paquete con todo." },
  ];

  return (
    <Section bg={C.surface}>
      <FadeIn>
        <p className="xnod-eyebrow">Beneficios concretos</p>
        <h2 className="xnod-h2" style={{ maxWidth: 880 }}>
          8 cosas que cambian en tu empresa el día después.
        </h2>
        <p className="xnod-lead" style={{ maxWidth: 760, marginBottom: 48 }}>
          Cada activación termina dejando ocho cambios medibles que tu equipo y tu operación notan desde la primera semana.
        </p>
      </FadeIn>

      <div className="xnod-grid-include">
        {items.map((item, i) => (
          <FadeIn key={i} delay={i * 50}>
            <div style={{
              background: C.white,
              padding: 24,
              borderRadius: 14,
              border: `1px solid ${C.border}`,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
              position: "relative",
              overflow: "hidden",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 30px rgba(123, 47, 190, 0.14)`; e.currentTarget.style.borderColor = `${C.primary}40`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.border; }}
            >
              <div aria-hidden="true" style={{
                position: "absolute", top: -20, right: -20, width: 80, height: 80,
                borderRadius: "50%", background: `${C.primary}10`,
                pointerEvents: "none",
              }}/>
              <div style={{
                width: 44, height: 44,
                background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDeep})`,
                color: "#fff", borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16, position: "relative",
              }}>
                {item.icon}
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.primary, letterSpacing: 1.2, marginBottom: 8 }}>{item.area}</p>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: C.primaryDeep, lineHeight: 1.3 }}>{item.titulo}</h3>
              <p style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.55 }}>{item.texto}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

function Impacto() {
  const casos = [
    {
      industria: "Productividad · Equipo de 70 personas",
      titulo: "Cada empleado recuperó 8 horas semanales",
      antes: "El equipo dedicaba el 30% de su jornada a tareas operativas repetitivas: redactar, resumir, cargar datos y armar reportes a mano.",
      despues: "Esas mismas tareas se resuelven con el agente IA propio en minutos. El equipo recuperó tiempo para vender y atender mejor.",
      metric: "+560 horas",
      metricLabel: "recuperadas por mes en todo el equipo",
    },
    {
      industria: "Cultura IA · Empresa de 120 personas",
      titulo: "De 0 a 100% del equipo usando IA en una semana",
      antes: "Solo 5 personas usaban IA, cada una por su cuenta. La mayoría no se animaba o no sabía por dónde empezar.",
      despues: "Después de la activación, todo el equipo usa IA con un marco común. Se creó un canal interno donde comparten casos de uso cada semana.",
      metric: "0% → 100%",
      metricLabel: "del equipo usando IA con criterio",
    },
    {
      industria: "Eficiencia · Operaciones",
      titulo: "Reportes que tomaban 1 día en 30 minutos",
      antes: "Armar un reporte de cierre mensual implicaba un día completo: cruzar Excel, redactar conclusiones y dar formato.",
      despues: "El agente IA toma los datos, redacta el análisis y genera el reporte listo para revisar en 30 minutos.",
      metric: "8h → 30min",
      metricLabel: "por reporte, con misma calidad",
    },
  ];
  return (
    <Section id="impacto" bg={C.white}>
      <FadeIn>
        <p className="xnod-eyebrow">Impacto</p>
        <h2 className="xnod-h2" style={{ maxWidth: 880 }}>
          Esto es lo que pasa cuando una empresa activa IA en serio.
        </h2>
        <p className="xnod-lead" style={{ maxWidth: 720, marginBottom: 56 }}>
          Tres casos reales de empresas que pasaron de "estamos pensando en IA" a tener procesos funcionando.
        </p>
      </FadeIn>

      <div className="xnod-grid-3">
        {casos.map((c, i) => (
          <FadeIn key={i} delay={i * 100}>
            <article style={{
              background: C.white,
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              borderTop: `4px solid ${C.primary}`,
              padding: 28,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: `0 4px 20px rgba(123, 47, 190, 0.06)`,
            }}>
              <p style={{ fontSize: 11.5, fontWeight: 700, color: C.primary, letterSpacing: 1.2, marginBottom: 14, textTransform: "uppercase" }}>
                {c.industria}
              </p>
              <h3 style={{ fontSize: 19, marginBottom: 18, color: C.primaryDeep, lineHeight: 1.3 }}>{c.titulo}</h3>

              <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: 1, marginBottom: 4 }}>ANTES</p>
                <p style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.55 }}>{c.antes}</p>
              </div>

              <div style={{ marginBottom: 22, flex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.primary, letterSpacing: 1, marginBottom: 4 }}>DESPUÉS</p>
                <p style={{ color: C.textPrimary, fontSize: 14, lineHeight: 1.55, fontWeight: 500 }}>{c.despues}</p>
              </div>

              <div style={{
                padding: 18,
                background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDeep} 100%)`,
                color: "#fff",
                borderRadius: 12,
                textAlign: "center",
              }}>
                <p style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1, marginBottom: 6, letterSpacing: "-0.01em" }}>{c.metric}</p>
                <p style={{ fontSize: 12.5, opacity: 0.9, fontWeight: 500 }}>{c.metricLabel}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
 *  6 · QUÉ INCLUYE — Entregables tangibles
 * ============================================================ */

function QueIncluye() {
  const items = [
    { icon: <IconTarget />, titulo: "Personalización por industria", texto: "Contenido y ejemplos adaptados a tu rubro real." },
    { icon: <IconClock />, titulo: "2 horas presenciales u online", texto: "Vos elegís el formato según tu equipo." },
    { icon: <IconUsers />, titulo: "Sin límite de personas", texto: "Funciona para equipos de 5 o de 100+." },
    { icon: <IconBot />, titulo: "Agente IA propio sin caducidad", texto: "Tu equipo lo consulta para siempre, sin costos de uso." },
    { icon: <IconWhatsapp />, titulo: "WhatsApp continuo con contenido semanal", texto: "Tu equipo se mantiene actualizado sin esfuerzo." },
    { icon: <IconAward />, titulo: "Examen individual + certificado", texto: "Resultados auditables a la empresa." },
    { icon: <IconVideo />, titulo: "Grabación cruda + transcripción", texto: "Para que la sumes a tu inducción interna interno." },
    { icon: <IconPhone />, titulo: "Llamada previa de coordinación", texto: "Personalizamos todo antes de la jornada." },
  ];
  return (
    <Section bg={C.surface}>
      <FadeIn>
        <p className="xnod-eyebrow">Qué incluye</p>
        <h2 className="xnod-h2" style={{ maxWidth: 920 }}>
          Todo lo que tu empresa necesita para activarse, en un solo paquete.
        </h2>
        <p className="xnod-lead" style={{ maxWidth: 720, marginBottom: 48 }}>
          8 entregables concretos. Sin niveles, sin agregados, sin letra chica.
        </p>
      </FadeIn>

      <div className="xnod-grid-include">
        {items.map((item, i) => (
          <FadeIn key={i} delay={i * 50}>
            <div style={{
              background: C.white,
              padding: 24,
              borderRadius: 14,
              border: `1px solid ${C.border}`,
              borderTop: `3px solid ${C.primary}`,
              height: "100%",
              boxShadow: "0 1px 3px rgba(123, 47, 190, 0.04)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(123, 47, 190, 0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(123, 47, 190, 0.04)"; }}
            >
              <div style={{ color: C.primary, marginBottom: 16 }}>{item.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: C.primaryDeep }}>{item.titulo}</h3>
              <p style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.55 }}>{item.texto}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
 *  7 · DIFERENCIADOR — Agente IA sin caducidad
 * ============================================================ */

function Diferenciador() {
  return (
    <Section bg={C.white}>
      <div className="xnod-grid-2" style={{ alignItems: "center", gap: 56 }}>
        <FadeIn>
          <p className="xnod-eyebrow">Diferenciador clave</p>
          <h2 className="xnod-h2">
            Otros te dan una capacitación.<br/>Nosotros dejamos un sistema.
          </h2>
          <p className="xnod-lead" style={{ marginBottom: 18 }}>
            La mayoría de las capacitaciones se diluyen en una semana. La nuestra deja un agente IA propio para tu empresa, sin límite de tiempo. Tu equipo le pregunta lo que quiera, cuando quiera, para siempre.
          </p>
          <p className="xnod-lead" style={{ marginBottom: 18 }}>
            Y todas las semanas recibe contenido nuevo por WhatsApp con tips, herramientas y novedades del mundo IA.
          </p>
          <p style={{ fontSize: 20, fontWeight: 700, color: C.primary, marginTop: 24, lineHeight: 1.4 }}>
            No vendemos formación que se olvida.<br/>Dejamos infraestructura que se usa.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          <div style={{ background: C.surfaceCard, padding: 28, borderRadius: 20, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
              <div style={{ width: 44, height: 44, background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDeep})`, color: "#fff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconBot />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.primaryDeep }}>Agente IA · Tu Empresa</div>
                <div style={{ fontSize: 12, color: C.success, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.success, display: "inline-block" }}/>
                  En línea · Sin caducidad
                </div>
              </div>
            </div>
            <ChatBubble side="user">¿Cómo armo una propuesta para un cliente del rubro comercio?</ChatBubble>
            <ChatBubble side="bot">Tomo la plantilla de propuestas de la empresa y la adapto al perfil del cliente. ¿Querés que use el caso del último proyecto de comercio como referencia?</ChatBubble>
            <ChatBubble side="user">Sí, con cifras del Q1.</ChatBubble>
            <ChatBubble side="bot" loading>Generando propuesta…</ChatBubble>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

function ChatBubble({ side, children, loading }) {
  const isUser = side === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 10 }}>
      <div style={{
        maxWidth: "85%",
        padding: "10px 14px",
        background: isUser ? C.primary : C.white,
        color: isUser ? "#fff" : C.textPrimary,
        borderRadius: 14,
        borderBottomRightRadius: isUser ? 4 : 14,
        borderBottomLeftRadius: isUser ? 14 : 4,
        fontSize: 14,
        lineHeight: 1.45,
        border: isUser ? "none" : `1px solid ${C.border}`,
        fontStyle: loading ? "italic" : "normal",
        opacity: loading ? 0.75 : 1,
      }}>
        {children}
      </div>
    </div>
  );
}

/* ============================================================
 *  8 · POR QUÉ XNOD — Autoridad
 * ============================================================ */

function PorQueXNOD() {
  const stats = [
    { num: "+1.000", label: "personas capacitadas" },
    { num: "+50", label: "empresas implementando IA" },
    { num: "5", label: "industrias verticales" },
    { num: "+10 años", label: "implementando IA en empresas" },
  ];

  const pillars = [
    {
      icon: <IconBot />,
      titulo: "Implementamos, no enseñamos",
      texto: "No vendemos cursos. Construimos software con IA todos los días. Cuando llegamos a tu empresa, llegamos con cicatrices, no con teoría.",
    },
    {
      icon: <IconAward />,
      titulo: "Trabajamos con instituciones serias",
      texto: "Mercedes-Benz, Banco de Panamá, Isuzu nos confiaron sus procesos. El nivel de exigencia se traduce a tu activación.",
    },
    {
      icon: <IconSpark />,
      titulo: "Método de élite, formato accesible",
      texto: "El mismo método que usamos en proyectos de gran escala, condensado en una jornada de 2 horas para tu equipo completo.",
    },
  ];

  const credentials = [
    "Lidera proyectos de IA en Mercedes-Benz, Banco de Panamá e Isuzu. Empresas que no contratan a cualquiera.",
    "Más de 10 años haciendo software a medida para empresas exigentes en Argentina, Brasil, México, Chile y Colombia.",
    "Dicta cada activación él mismo. No es un curso pregrabado ni un consultor que pasa una sola vez.",
  ];

  const historia = "Alan empezó hace más de diez años haciendo software a medida para empresas. Vio de primera mano el caos que genera la IA mal usada y armó XNOD para ordenarlo. Hoy implementa IA en compañías de toda Latinoamérica y dicta cada activación él mismo.";

  return (
    <Section id="por-que-xnod" bg={C.primaryNight} style={{ color: "#fff", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: -160, right: -160, width: 480, height: 480,
        borderRadius: "50%", background: `radial-gradient(closest-side, ${C.primary}55, transparent 70%)`,
        pointerEvents: "none",
      }}/>
      <div aria-hidden="true" style={{
        position: "absolute", bottom: -200, left: -200, width: 520, height: 520,
        borderRadius: "50%", background: `radial-gradient(closest-side, ${C.accent}33, transparent 70%)`,
        pointerEvents: "none",
      }}/>

      <FadeIn>
        <p className="xnod-eyebrow xnod-eyebrow-light">Por qué con XNOD</p>
        <h2 className="xnod-h2" style={{ maxWidth: 880, color: "#fff" }}>
          La IA en tu empresa no la activa cualquiera.
        </h2>
        <p className="xnod-lead" style={{ maxWidth: 820, marginBottom: 64, color: "rgba(255,255,255,0.85)" }}>
          Somos una fábrica de software y consultora en inteligencia artificial. No es una capacitación armada para vender. Es la puerta de entrada al método con el que ya transformamos empresas en Latinoamérica.
        </p>
      </FadeIn>

      {/* Stats row */}
      <FadeIn>
        <div className="xnod-stats-grid" style={{ marginBottom: 72 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: "28px 24px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 16,
              textAlign: "center",
            }}>
              <p style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 800,
                lineHeight: 1,
                marginBottom: 10,
                background: `linear-gradient(135deg, ${C.accentLight} 0%, ${C.accent} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}>
                {s.num}
              </p>
              <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.7)", fontWeight: 500, letterSpacing: 0.3 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* 3 pilares */}
      <div className="xnod-grid-3" style={{ marginBottom: 72 }}>
        {pillars.map((p, i) => (
          <FadeIn key={i} delay={i * 100}>
            <div style={{
              padding: 32,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 16,
              height: "100%",
              transition: "transform 0.25s ease, border-color 0.25s ease",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = `${C.accentLight}66`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; }}
            >
              <div style={{
                width: 52, height: 52,
                background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDeep} 100%)`,
                color: "#fff",
                borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
                boxShadow: `0 8px 20px ${C.primary}44`,
              }}>
                {p.icon}
              </div>
              <h3 style={{ fontSize: 18, marginBottom: 12, color: "#fff", fontWeight: 600 }}>{p.titulo}</h3>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 14.5, lineHeight: 1.6 }}>{p.texto}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Logos clientes */}
      <FadeIn>
        <div style={{
          padding: "28px 0", marginBottom: 72,
          borderTop: "1px solid rgba(255,255,255,0.18)",
          borderBottom: "1px solid rgba(255,255,255,0.18)",
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.accentLight, letterSpacing: 2, marginBottom: 18, textAlign: "center" }}>
            EMPRESAS QUE NOS CONFIARON SUS PROCESOS
          </p>
          <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 36,
          }}>
            {["Mercedes-Benz", "Banco de Panamá", "Isuzu", "+ Retail", "+ Fintech", "+ Minería"].map((nombre, i) => (
              <div key={i} style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, fontWeight: 600, letterSpacing: 0.4 }}>
                {nombre}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Speaker featured — Alan */}
      <FadeIn>
        <div className="xnod-speaker-card" style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          padding: 0,
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.15)",
          overflow: "hidden",
          maxWidth: 1080,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
        }}>
          <div style={{
            position: "relative",
            aspectRatio: "1/1",
            background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDeep} 100%)`,
            overflow: "hidden",
          }}>
            <Picture
              src="fotos/alan-portrait"
              alt="Alan Tapia, fundador de XNOD"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(180deg, transparent 60%, rgba(31,14,54,0.7) 100%)`,
              pointerEvents: "none",
            }}/>
          </div>
          <div style={{ padding: "36px 32px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.accentLight, letterSpacing: 2, marginBottom: 12 }}>
              QUIEN DICTA CADA ACTIVACIÓN
            </p>
            <h3 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>
              Alan Tapia
            </h3>
            <p style={{ fontSize: 15, color: C.accentLight, fontWeight: 600, marginBottom: 20, letterSpacing: 0.3 }}>
              Fundador de XNOD
            </p>

            <p style={{
              fontSize: 15.5,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.88)",
              marginBottom: 24,
              fontWeight: 400,
            }}>
              {historia}
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {credentials.map((cred, i) => (
                <li key={i} style={{
                  display: "flex", gap: 12, alignItems: "flex-start",
                  marginBottom: 12, fontSize: 14.5,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.45,
                }}>
                  <div style={{ flexShrink: 0, marginTop: 4, color: C.accentLight }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <circle cx="12" cy="12" r="4"/>
                    </svg>
                  </div>
                  <span>{cred}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ============================================================
 *  9 · EVENTOS ANTERIORES — Galería
 * ============================================================ */

function EventosAnteriores() {
  const eventos = [
    { src: "fotos/event-1.jpg", caption: "Aceleración de startups", meta: "Taller · Buenos Aires" },
    { src: "fotos/event-3.jpg", caption: "Uso de IA en empresas", meta: "Charla · San Pedro" },
    { src: "fotos/event-4.jpg", caption: "IA aplicada a cadenas gastronómicas", meta: "Capacitación corporativa" },
    { src: "fotos/event-5.jpg", caption: "Aceleradora Sparklab", meta: "Programa de aceleración" },
    { src: "fotos/event-6.jpg", caption: "Charla de negocios", meta: "Conferencia · San Pedro" },
    { src: "fotos/event-7.jpg", caption: "Impacto IA", meta: "Invitado principal" },
    { src: "fotos/event-2014.jpg", caption: "Entrevista en podcast", meta: "Negocios · Internacional" },
    { src: "fotos/event-startup-nicho.jpg", caption: "Cómo crear una startup en un nicho", meta: "Conferencia · Inmobiliario" },
  ];
  return (
    <Section bg={C.white}>
      <FadeIn>
        <p className="xnod-eyebrow">En escenario</p>
        <h2 className="xnod-h2" style={{ maxWidth: 880 }}>
          Donde compartimos lo que implementamos.
        </h2>
        <p className="xnod-lead" style={{ maxWidth: 760, marginBottom: 48 }}>
          Conferencias, paneles, podcasts y capacitaciones sobre IA aplicada, operación de negocios y liderazgo. Esto es lo que hacemos además de implementar IA en empresas.
        </p>
      </FadeIn>

      <div className="xnod-grid-gallery">
        {eventos.map((ev, i) => (
          <FadeIn key={i} delay={i * 50}>
            <article
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${C.border}`,
                background: C.white,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = `0 12px 30px rgba(123, 47, 190, 0.14)`;
                e.currentTarget.style.borderColor = `${C.primary}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = C.border;
              }}
            >
              <div style={{ aspectRatio: "4/3", overflow: "hidden", background: C.surfaceCard }}>
                <Picture
                  src={ev.src}
                  alt={ev.caption}
                  width={320}
                  height={240}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ padding: "16px 20px" }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: C.primaryDeep, lineHeight: 1.35, marginBottom: 4 }}>{ev.caption}</p>
                <p style={{ fontSize: 12.5, color: C.textMuted, fontWeight: 500, letterSpacing: 0.2 }}>{ev.meta}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
 *  10 · PARA QUIÉN ES — Qualification
 * ============================================================ */

function ParaQuienEs() {
  const si = [
    "Tenés un equipo de 5 a 100+ personas",
    "Querés ordenar el uso de IA antes de que se vaya de las manos",
    "Buscás un primer paso concreto, no un curso teórico",
    "Querés capitalizar comercialmente la innovación de tu empresa",
    "Te interesa proteger información sensible con un marco claro",
    "Buscás cerrar la brecha entre quienes usan IA y quienes no",
  ];
  const no = [
    "Buscás capacitación técnica para desarrolladores",
    "Querés un programa de varios meses de duración",
    "Tu equipo aún no usa herramientas digitales en su día a día",
    "Querés que XNOD opere por vos un proyecto interno",
    "Necesitás integración con software interno (eso es otro alcance)",
    "Buscás solo material grabado para enviar a tu equipo",
  ];
  return (
    <Section bg={C.surface}>
      <FadeIn>
        <p className="xnod-eyebrow" style={{ textAlign: "center" }}>Para quién es</p>
        <h2 className="xnod-h2" style={{ textAlign: "center" }}>
          ¿Esto es para mi empresa?
        </h2>
      </FadeIn>

      <div className="xnod-grid-2" style={{ marginTop: 40 }}>
        <FadeIn>
          <div style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDeep} 100%)`, padding: 32, borderRadius: 20, height: "100%", color: "#fff", boxShadow: `0 12px 40px ${C.primary}33` }}>
            <h3 style={{ fontSize: 20, marginBottom: 24, color: "#fff" }}>Esta activación es para vos si:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {si.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ flexShrink: 0, marginTop: 2, color: C.accentLight }}><IconCheck color={C.accentLight} /></div>
                  <span style={{ color: "rgba(255,255,255,0.95)", fontSize: 16 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{ background: C.white, padding: 32, borderRadius: 20, border: `1px solid ${C.border}`, height: "100%" }}>
            <h3 style={{ fontSize: 20, marginBottom: 24, color: C.textSecondary }}>No es para vos si:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {no.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}><IconX /></div>
                  <span style={{ color: C.textSecondary, fontSize: 16 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

/* ============================================================
 *  11 · MARKETING PARA TU MARCA
 * ============================================================ */

function MarketingMarca() {
  return (
    <Section bg={C.white}>
      <div className="xnod-grid-2" style={{ alignItems: "center", gap: 56 }}>
        <FadeIn>
          <p className="xnod-eyebrow">Marketing para tu marca</p>
          <h2 className="xnod-h2">
            Una empresa que invierte en IA tiene algo para mostrar.
          </h2>
          <p className="xnod-lead" style={{ marginBottom: 16 }}>
            La activación no es solo capacitación. Es contenido para que tu empresa se posicione frente a clientes, empleados y mercado.
          </p>
          <p className="xnod-lead" style={{ marginBottom: 24 }}>
            Con la cobertura fotográfica y de video opcional, te llevás material listo para LinkedIn, Instagram, presentaciones comerciales y notas de prensa.
          </p>
          <p style={{ fontSize: 18, fontWeight: 600, color: C.primary }}>
            Pasás de "estamos pensando en IA" a "ya estamos implementándola con un equipo profesional". Eso vende: a clientes, a candidatos, a inversores.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          <div style={{ background: C.surfaceCard, borderRadius: 20, padding: 36, border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 20 }}>
              CONTENIDO QUE TE LLEVÁS
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { titulo: "Cobertura fotográfica del evento", sub: "Material listo para LinkedIn, Instagram y prensa" },
                { titulo: "Casos de uso documentados de tu empresa", sub: "Para presentaciones comerciales y notas internas" },
                { titulo: "Captura de Alan dictando + tu equipo trabajando", sub: "Imagen institucional de innovación real" },
                { titulo: "Storytelling listo para publicar", sub: "Templates de copy adaptables a tu marca" },
              ].map((item, i) => (
                <li key={i} style={{
                  display: "flex", gap: 14, alignItems: "flex-start",
                  paddingBottom: 16, marginBottom: 16,
                  borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                }}>
                  <div style={{
                    flexShrink: 0, width: 36, height: 36,
                    background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDeep})`,
                    color: "#fff", borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: 14,
                  }}>{i + 1}</div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: C.primaryDeep, marginBottom: 2 }}>{item.titulo}</p>
                    <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.5 }}>{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 12, color: C.textMuted, marginTop: 8, fontStyle: "italic" }}>
              * La cobertura fotográfica/video profesional se cotiza aparte.
            </p>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

/* ============================================================
 *  12 · INVERSIÓN
 * ============================================================ */

function Inversion() {
  const incluye = [
    "Llamada previa de coordinación con vos",
    "Jornada personalizada de 2hs (presencial u online)",
    "Examen individual + certificado por persona",
    "Grabación cruda + transcripción del evento",
    "Agente IA propio sin caducidad para tu empresa",
    "Grupo WhatsApp con contenido semanal continuo",
    "Soporte continuo de XNOD para siempre",
    "Viáticos incluidos en Córdoba y Buenos Aires",
  ];
  const noIncluye = [
    "Cobertura fotográfica/video profesional (cotizada aparte)",
    "Grupos segmentados por área (cada grupo cotizado aparte)",
    "Viáticos fuera de Córdoba/Buenos Aires",
  ];
  const comparativa = [
    { item: "Curso online corporativo", costo: "USD 2.000+", costoLabel: "por empleado / año", note: "Material genérico que se olvida" },
    { item: "Consultoría tradicional", costo: "USD 5.000+", costoLabel: "por proyecto", note: "Sin entregables reutilizables" },
    { item: "XNOD Activate", costo: "USD 500", costoLabel: "todo incluido · sin caducidad", note: "Tu empresa entera capacitada", highlight: true },
  ];

  return (
    <section id="inversion" style={{
      background: `linear-gradient(180deg, ${C.primaryNight} 0%, #160829 50%, ${C.primaryNight} 100%)`,
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: -200, right: -200, width: 600, height: 600,
        borderRadius: "50%", background: `radial-gradient(closest-side, ${C.primary}66, transparent 70%)`,
        pointerEvents: "none",
      }}/>
      <div aria-hidden="true" style={{
        position: "absolute", bottom: -240, left: -240, width: 600, height: 600,
        borderRadius: "50%", background: `radial-gradient(closest-side, ${C.accent}44, transparent 70%)`,
        pointerEvents: "none",
      }}/>

      <div className="xnod-section" style={{ position: "relative" }}>
        <div className="xnod-container">
          {/* Header */}
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p className="xnod-eyebrow xnod-eyebrow-light">Inversión</p>
              <h2 className="xnod-h2" style={{
                color: "#fff",
                maxWidth: 920,
                margin: "0 auto 20px",
                fontSize: "clamp(32px, 5vw, 56px)",
                lineHeight: 1.05,
              }}>
                Un solo precio.<br/>
                <span style={{
                  background: `linear-gradient(135deg, ${C.accentLight} 0%, ${C.accent} 100%)`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Todo incluido. Cero sorpresas.</span>
              </h2>
              <p className="xnod-lead" style={{ color: "rgba(255,255,255,0.85)", maxWidth: 720, margin: "0 auto" }}>
                Pago anticipado al confirmar fecha. Aceptamos pesos al dólar venta oficial, USD o cripto. Sin niveles, sin agregados, sin renovaciones.
              </p>
            </div>
          </FadeIn>

          {/* Pricing Card destacada */}
          <FadeIn>
            <div style={{
              maxWidth: 1080,
              margin: "0 auto 72px",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${C.accentLight}40`,
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: `0 30px 80px rgba(0,0,0,0.4), 0 0 100px ${C.primary}33`,
              backdropFilter: "blur(8px)",
              position: "relative",
            }}>
              {/* Top banner: precio gigante */}
              <div style={{
                background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDeep} 100%)`,
                padding: "48px 32px",
                position: "relative",
                overflow: "hidden",
              }}>
                <div aria-hidden="true" style={{
                  position: "absolute", top: -80, right: -80, width: 280, height: 280,
                  borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none",
                }}/>
                <div className="xnod-pricing-header" style={{
                  display: "grid", gridTemplateColumns: "1fr", gap: 28, alignItems: "center",
                  position: "relative",
                }}>
                  <div>
                    <span style={{
                      display: "inline-block",
                      padding: "6px 14px", borderRadius: 999,
                      background: "rgba(255,255,255,0.15)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 18,
                      color: "#fff",
                    }}>
                      ★ PAQUETE ÚNICO
                    </span>
                    <p style={{ fontSize: 13, fontWeight: 600, color: C.accentLight, letterSpacing: 1.5, marginBottom: 8 }}>
                      XNOD ACTIVATE
                    </p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14, flexWrap: "nowrap" }}>
                      <span style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 600, color: "rgba(255,255,255,0.7)", lineHeight: 1 }}>USD</span>
                      <span style={{
                        fontSize: "clamp(64px, 11vw, 120px)",
                        fontWeight: 800,
                        color: "#fff",
                        lineHeight: 0.9,
                        letterSpacing: "-0.04em",
                      }}>500</span>
                    </div>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.92)", fontWeight: 500, marginBottom: 6 }}>
                      Para todo tu equipo. Una sola vez.
                    </p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
                      Equivale a <strong style={{ color: "#fff" }}>USD 5/persona</strong> en un equipo de 100 · <strong style={{ color: "#fff" }}>USD 50/persona</strong> en un equipo de 10
                    </p>
                  </div>

                  <div style={{ display: "grid", gap: 12 }}>
                    {[
                      { num: "2h", label: "Una jornada con todo el equipo" },
                      { num: "0", label: "Costos de uso después" },
                      { num: "1", label: "Pago, sin renovaciones" },
                    ].map((b, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "12px 16px",
                        background: "rgba(255,255,255,0.10)",
                        borderRadius: 12,
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}>
                        <div style={{
                          width: 44, height: 44, flexShrink: 0,
                          background: "rgba(255,255,255,0.15)",
                          borderRadius: 10,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 22, fontWeight: 800, color: "#fff",
                        }}>
                          {b.num}
                        </div>
                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.92)", fontWeight: 500 }}>
                          {b.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Body: incluye / no incluye */}
              <div className="xnod-grid-2" style={{ padding: 40, gap: 40 }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: C.accentLight, letterSpacing: 1.8, marginBottom: 18 }}>
                    ✓ TODO ESTO INCLUIDO
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {incluye.map((item, i) => (
                      <li key={i} style={{
                        display: "flex", gap: 12, alignItems: "flex-start",
                        marginBottom: 12, fontSize: 14.5,
                        color: "rgba(255,255,255,0.92)",
                        lineHeight: 1.5,
                      }}>
                        <div style={{ flexShrink: 0, marginTop: 2 }}><IconCheck color={C.accentLight} /></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: 1.8, marginBottom: 18 }}>
                    × NO INCLUYE (TRANSPARENCIA)
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: 28 }}>
                    {noIncluye.map((item, i) => (
                      <li key={i} style={{
                        display: "flex", gap: 12, alignItems: "flex-start",
                        marginBottom: 12, fontSize: 14,
                        color: "rgba(255,255,255,0.6)",
                        lineHeight: 1.5,
                      }}>
                        <div style={{ flexShrink: 0, marginTop: 2 }}><IconX color="rgba(255,255,255,0.4)" /></div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div style={{
                    padding: 16,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: C.accentLight, marginBottom: 6, letterSpacing: 1 }}>
                      MEDIOS DE PAGO
                    </p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
                      Pesos al dólar venta oficial · USD · Cripto (USDT/USDC)
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA grande */}
              <div style={{
                padding: "0 40px 40px",
                textAlign: "center",
              }}>
                <a
                  className="xnod-cta"
                  href={WA_PAY}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "100%", maxWidth: 460, fontSize: 18, padding: "20px 36px", minHeight: 64 }}
                >
                  Reservar mi activación
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Comparativa con alternativas */}
          <FadeIn>
            <div style={{ maxWidth: 980, margin: "0 auto" }}>
              <p style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: C.accentLight, letterSpacing: 2, marginBottom: 28 }}>
                CÓMO SE COMPARA CON LAS ALTERNATIVAS
              </p>
              <div className="xnod-grid-3">
                {comparativa.map((c, i) => (
                  <div key={i} style={{
                    padding: "26px 22px",
                    background: c.highlight ? `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDeep} 100%)` : "rgba(255,255,255,0.04)",
                    border: c.highlight ? `2px solid ${C.accentLight}` : "1px solid rgba(255,255,255,0.10)",
                    borderRadius: 14,
                    textAlign: "center",
                    position: "relative",
                    transform: c.highlight ? "scale(1.03)" : "none",
                    boxShadow: c.highlight ? `0 12px 32px ${C.primary}55` : "none",
                  }}>
                    {c.highlight && (
                      <span style={{
                        position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                        padding: "4px 14px", borderRadius: 999,
                        background: C.accentLight, color: C.primaryNight,
                        fontSize: 10, fontWeight: 800, letterSpacing: 1.4,
                      }}>
                        TU OPCIÓN
                      </span>
                    )}
                    <p style={{
                      fontSize: 11.5, fontWeight: 700,
                      color: c.highlight ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
                      letterSpacing: 1, marginBottom: 14, marginTop: c.highlight ? 4 : 0,
                      textTransform: "uppercase",
                    }}>
                      {c.item}
                    </p>
                    <p style={{
                      fontSize: 30, fontWeight: 800,
                      color: c.highlight ? "#fff" : "rgba(255,255,255,0.7)",
                      lineHeight: 1, marginBottom: 6,
                      textDecoration: !c.highlight ? "line-through" : "none",
                      textDecorationColor: "rgba(255,255,255,0.3)",
                    }}>
                      {c.costo}
                    </p>
                    <p style={{
                      fontSize: 11.5,
                      color: c.highlight ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.5)",
                      marginBottom: 14,
                    }}>
                      {c.costoLabel}
                    </p>
                    <p style={{
                      fontSize: 13,
                      color: c.highlight ? "#fff" : "rgba(255,255,255,0.7)",
                      fontWeight: c.highlight ? 600 : 400,
                      paddingTop: 14,
                      borderTop: `1px solid ${c.highlight ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.10)"}`,
                    }}>
                      {c.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 *  13 · FAQ — Objection handling
 * ============================================================ */

function FAQ() {
  const preguntas = [
    { q: "¿Cuánto dura el evento?", a: "2 horas. Presencial u online." },
    { q: "¿Cuántas personas pueden participar?", a: "No hay límite. Vos definís el tope. Si querés grupos separados por área, cada grupo se cotiza aparte." },
    { q: "¿El agente IA tiene fecha de vencimiento?", a: "No. Una vez creado para tu empresa, queda funcionando sin límite de tiempo. Tu equipo lo consulta para siempre." },
    { q: "¿Cuánto cuesta mantener el agente IA después?", a: "Nada. Corre sobre la cuenta de XNOD. Tu empresa no paga costos de uso." },
    { q: "¿Cuándo se paga?", a: "Anticipado, al confirmar fecha. Aceptamos pesos al dólar venta oficial, USD o cripto." },
    { q: "¿Política de cancelación?", a: "Más de 7 días antes: reembolso 100% o reprogramación sin cargo. Entre 3 y 7 días: 50% o reprogramación con cargo. Menos de 72hs: sin reembolso." },
    { q: "Mi equipo ya sabe usar ChatGPT, ¿vale la pena?", a: "Saber usar la herramienta no es lo mismo que tenerla integrada al proceso. La activación ordena el uso disperso, define qué se sube y qué no, y deja un agente común para todo el equipo." },
    { q: "¿Para empresas chicas también sirve?", a: "Sí. Funciona desde 5 personas hasta 100+." },
    { q: "¿Cómo personalizan los ejemplos a mi industria?", a: "En la llamada previa entendemos tu rubro, procesos críticos y casos de uso. Con eso preparamos ejemplos que ejecutamos en vivo durante el evento usando datos similares a los tuyos (sin tocar información real)." },
    { q: "¿En qué idioma se dicta?", a: "Español argentino por defecto. Podemos dictarlo en inglés con confirmación previa." },
    { q: "¿Qué necesita preparar mi empresa antes del evento?", a: "Solo participar de la llamada de 30 minutos previa y avisar al equipo de la fecha. La configuración del agente IA, el material y los ejemplos los traemos listos." },
    { q: "¿Pueden dar referencias de clientes anteriores?", a: "Sí. Compartimos referencias verificables en la llamada de coordinación a quienes están en proceso de decisión final." },
  ];
  return (
    <Section id="faq" bg={C.white}>
      <FadeIn>
        <p className="xnod-eyebrow" style={{ textAlign: "center" }}>FAQ</p>
        <h2 className="xnod-h2" style={{ textAlign: "center" }}>Preguntas frecuentes</h2>
      </FadeIn>

      <div style={{ maxWidth: 820, margin: "40px auto 0" }}>
        {preguntas.map((p, i) => (
          <FadeIn key={i} delay={i * 30}>
            <details style={{
              background: C.surface,
              borderRadius: 12,
              marginBottom: 12,
              border: `1px solid ${C.border}`,
              transition: "background 0.2s ease",
            }}>
              <summary style={{
                padding: "20px 24px",
                fontSize: 16,
                fontWeight: 600,
                color: C.primaryDeep,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
              }}>
                <span>{p.q}</span>
                <span style={{ color: C.primary, flexShrink: 0 }}><IconChevron /></span>
              </summary>
              <div style={{ padding: "0 24px 20px", color: C.textSecondary, fontSize: 15.5, lineHeight: 1.65 }}>
                {p.a}
              </div>
            </details>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
 *  14 · CTA FINAL
 * ============================================================ */

function CTAFinal() {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${C.primaryNight} 0%, ${C.primaryDeep} 100%)`,
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: -120, right: -120, width: 460, height: 460,
        borderRadius: "50%", background: `radial-gradient(closest-side, ${C.accent}33, transparent 70%)`,
        pointerEvents: "none",
      }}/>
      <div aria-hidden="true" style={{
        position: "absolute", bottom: -160, left: -160, width: 460, height: 460,
        borderRadius: "50%", background: "radial-gradient(closest-side, rgba(168,110,224,0.15), transparent 70%)",
        pointerEvents: "none",
      }}/>
      <div className="xnod-section" style={{ position: "relative" }}>
        <div className="xnod-container">
          <FadeIn>
            <div style={{ textAlign: "center", maxWidth: 880, margin: "0 auto" }}>
              <p className="xnod-eyebrow xnod-eyebrow-light">No esperes más</p>
              <h2 className="xnod-h2" style={{ lineHeight: 1.05, color: "#fff", marginBottom: 28, fontSize: "clamp(34px, 5vw, 52px)" }}>
                Cada semana sin activar IA<br/>
                <span style={{ background: `linear-gradient(135deg, ${C.accentLight}, ${C.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  es una semana de ventaja para tu competencia.
                </span>
              </h2>
              <p className="xnod-lead" style={{ marginBottom: 40, color: "rgba(255,255,255,0.85)", maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
                Ya viste qué es, cómo funciona y qué incluye. Solo falta una llamada de 15 minutos para coordinar fecha y formato.
              </p>

              <CTAPrimary>Reservar mi activación</CTAPrimary>

              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 20 }}>
                Te respondemos en menos de 24hs hábiles.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 *  15 · FOOTER
 * ============================================================ */

function Footer() {
  return (
    <footer style={{ background: "#0A0612", color: "rgba(255,255,255,0.65)", padding: "28px 24px" }}>
      <div className="xnod-container" style={{
        display: "flex", flexWrap: "wrap", justifyContent: "space-between",
        alignItems: "center", gap: 20, fontSize: 13,
      }}>
        {/* Brand igual al header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            aria-label="Alan Tapia"
            style={{
              width: 30, height: 30, borderRadius: "50%", overflow: "hidden",
              border: `1.5px solid ${C.accentLight}80`,
              boxShadow: `0 2px 12px ${C.accent}40`,
              flexShrink: 0,
              backgroundImage: "image-set(url('fotos/alan-portrait.webp') type('image/webp'), url('fotos/alan-portrait.jpg') type('image/jpeg'))",
              backgroundSize: "cover", backgroundPosition: "center top",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: 0.3 }}>
            XNOD
          </span>
          <span style={{ fontSize: 12, fontWeight: 500, color: C.accentLight, letterSpacing: 1, textTransform: "uppercase" }}>
            Activate
          </span>
        </div>

        {/* Tagline central */}
        <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 12.5, fontStyle: "italic" }}>
          Activamos empresas en uso productivo de inteligencia artificial.
        </span>

        {/* Contacto + copyright */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12.5 }}>
          <a
            href={WA_MAIN}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.accentLight, fontWeight: 600 }}
          >
            +54 9 11 5459 6266
          </a>
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ opacity: 0.55 }}>© 2026</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
 *  Floating WhatsApp
 * ============================================================ */

function FloatingWA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <a
      href={WA_MAIN}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 50,
        background: C.whatsapp, color: "#fff",
        width: 60, height: 60, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    </a>
  );
}

/* ============================================================
 *  HEADER — Sticky pill nav
 * ============================================================ */

function NavHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra menú al hacer click en un anchor
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      if (e.target.tagName === "A" || e.target.closest("a")) setMenuOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [menuOpen]);

  const links = [
    ["Solución", "#solucion"],
    ["Método", "#como-lo-hacemos"],
    ["Casos", "#impacto"],
    ["Testimoniales", "#testimoniales"],
    ["Por qué XNOD", "#por-que-xnod"],
    ["Inversión", "#inversion"],
    ["FAQ", "#faq"],
  ];

  return (
    <>
      <style>{`
        .xnod-nav-links { display: none; }
        .xnod-nav-burger { display: inline-flex; }
        .xnod-nav-cta-text { display: none; }
        @media (min-width: 1024px) {
          .xnod-nav-links { display: flex !important; }
          .xnod-nav-burger { display: none !important; }
          .xnod-nav-cta-text { display: inline !important; }
        }
      `}</style>
      <nav
        style={{
          position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
          zIndex: 100, padding: "8px 12px 8px 18px", borderRadius: 100,
          background: scrolled ? "rgba(31,14,54,0.92)" : "rgba(31,14,54,0.65)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${scrolled ? "rgba(168,110,224,0.35)" : "rgba(255,255,255,0.10)"}`,
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.45)" : "0 4px 20px rgba(0,0,0,0.25)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 12, width: "min(1080px, 96vw)", transition: "all 0.4s ease",
        }}
      >
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ display: "inline-flex", alignItems: "center", gap: 10, whiteSpace: "nowrap", cursor: "pointer" }}
        >
          <span
            aria-label="Alan Tapia"
            style={{
              width: 30, height: 30, borderRadius: "50%", overflow: "hidden",
              border: `1.5px solid ${C.accentLight}80`,
              boxShadow: `0 2px 12px ${C.accent}40`,
              flexShrink: 0,
              backgroundImage: "image-set(url('fotos/alan-portrait.webp') type('image/webp'), url('fotos/alan-portrait.jpg') type('image/jpeg'))",
              backgroundSize: "cover", backgroundPosition: "center top",
            }}
          />
          <span style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: 0.3 }}>
            XNOD
          </span>
          <span style={{ fontSize: 12, fontWeight: 500, color: C.accentLight, letterSpacing: 1, textTransform: "uppercase" }}>
            Activate
          </span>
        </a>

        <div className="xnod-nav-links" style={{ alignItems: "center", gap: 18 }}>
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{
                fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.75)",
                letterSpacing: 0.2, transition: "color 0.2s ease", whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
            >
              {label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a
            href={WA_MAIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reservar por WhatsApp"
            style={{
              padding: "8px 14px", borderRadius: 100, fontSize: 13, fontWeight: 600,
              background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDeep})`,
              color: "#fff", letterSpacing: 0.3,
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = `0 0 20px ${C.primary}66`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span className="xnod-nav-cta-text">Reservar</span>
          </a>

          {/* Hamburger mobile */}
          <button
            type="button"
            className="xnod-nav-burger"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              alignItems: "center", justifyContent: "center",
              width: 40, height: 40, borderRadius: 100,
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#fff", cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div
          style={{
            position: "fixed", top: 76, left: "50%", transform: "translateX(-50%)",
            zIndex: 99, width: "min(1080px, 96vw)",
            background: "rgba(31,14,54,0.96)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(168,110,224,0.35)",
            borderRadius: 18,
            padding: 16,
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            animation: "xnodFadeDown 0.25s ease-out",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 4 }}>
            {links.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    borderRadius: 10,
                    fontSize: 15, fontWeight: 500,
                    color: "rgba(255,255,255,0.85)",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

/* ====================  EXPORT  ==================== */

export default function LandingPage() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <a
        href="#top"
        style={{
          position: "absolute", left: "-9999px", top: 8,
          padding: "10px 18px", borderRadius: 8,
          background: C.primary, color: "#fff",
          fontSize: 14, fontWeight: 600,
          zIndex: 9999, textDecoration: "none",
        }}
        onFocus={(e) => { e.currentTarget.style.left = "16px"; }}
        onBlur={(e) => { e.currentTarget.style.left = "-9999px"; }}
      >
        Saltar al contenido principal
      </a>
      <NavHeader />
      <main id="top">
        <Hero />
        <Problema />
        <Solucion />
        <ComoLoHacemos />
        <Impacto />
        <Testimoniales />
        <ImpactoDirecto />
        <Diferenciador />
        <PorQueXNOD />
        <EventosAnteriores />
        <ParaQuienEs />
        <MarketingMarca />
        <Inversion />
        <FAQ />
        <CTAFinal />
        <Footer />
        <FloatingWA />
      </main>
    </>
  );
}
