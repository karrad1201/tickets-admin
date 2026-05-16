import Link from "next/link";

const EVENT_TYPES = [
  { emoji: "🎵", label: "Концерты" },
  { emoji: "🎭", label: "Театр" },
  { emoji: "🖼️", label: "Выставки" },
  { emoji: "☸️", label: "Буддийские праздники" },
  { emoji: "♟️", label: "Шахматные турниры" },
  { emoji: "🏅", label: "Спорт" },
  { emoji: "🎪", label: "Фестивали" },
  { emoji: "🎤", label: "Стендап" },
];

const STEPS = [
  {
    n: "01",
    title: "Скачай приложение",
    desc: "Доступно на Android и iOS. Бесплатно.",
  },
  {
    n: "02",
    title: "Выбери событие",
    desc: "Найди концерт, спектакль или фестиваль — и купи билет за несколько секунд.",
  },
  {
    n: "03",
    title: "Покажи QR на входе",
    desc: "Электронный билет всегда в телефоне. Никакой бумаги.",
  },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "#080810", fontFamily: "var(--font-geist-sans)" }}
    >
      {/* ─── Nav ──────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(8,8,16,0.7)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <span
            className="font-bold text-lg tracking-tight"
            style={{ color: "#FF6B35" }}
          >
            Визит Калмыкия
          </span>
        </div>
      </header>

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "92vh" }}>
        {/* Steppe sunset glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(255,107,53,0.28) 0%, rgba(212,133,58,0.12) 40%, transparent 70%)",
          }}
        />
        {/* Top vignette stars */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 120% 50% at 50% 0%, rgba(70,50,130,0.25) 0%, transparent 60%)",
          }}
        />

        {/* Lotus / mandala SVG decoration */}
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none hidden lg:block"
          width="700"
          height="700"
          viewBox="0 0 200 200"
        >
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <ellipse
              key={deg}
              cx="100"
              cy="100"
              rx="12"
              ry="46"
              transform={`rotate(${deg} 100 100)`}
              fill="white"
            />
          ))}
          <circle cx="100" cy="100" r="14" fill="white" />
        </svg>

        <div
          className="relative max-w-6xl mx-auto px-6 flex flex-col justify-center"
          style={{ minHeight: "92vh", paddingTop: "10vh", paddingBottom: "10vh" }}
        >
          {/* Badge */}
          <div className="flex mb-8">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(255,107,53,0.15)",
                border: "1px solid rgba(255,107,53,0.35)",
                color: "#FF9B6B",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#FF6B35", boxShadow: "0 0 6px #FF6B35" }}
              />
              Элиста · Калмыкия
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-bold leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", maxWidth: "780px" }}
          >
            Вся культурная жизнь{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #FF6B35 0%, #E8A23A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Калмыкии
            </span>
            <br />в твоём телефоне
          </h1>

          <p
            className="mb-10 leading-relaxed"
            style={{
              fontSize: "1.15rem",
              maxWidth: "520px",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Концерты, театр, буддийские фестивали и шахматные турниры Элисты —
            покупай билеты онлайн и показывай QR на входе.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-3 font-semibold px-7 py-3.5 rounded-2xl transition-all hover:scale-105 hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #FF6B35 0%, #E85D20 100%)",
                fontSize: "0.95rem",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.32.07 2.23.73 3 .79 1.19-.24 2.33-.93 3.6-.84 1.53.12 2.68.72 3.44 1.87-3.12 1.87-2.38 5.98.48 7.13-.57 1.56-1.32 3.1-2.52 3.93zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 font-semibold px-7 py-3.5 rounded-2xl transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: "0.95rem",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                <path d="M3.18 23.76a2 2 0 0 1-.92-.97l9.18-9.18 2.76 2.76L3.18 23.76zm-1.1-20.7C2 3.35 2 3.7 2 4.06v15.88c0 .36 0 .71.08 1L11.29 12 2.08 3.06zM21.54 10.8l-2.83-1.63-3.18 3.18 3.18 3.18 2.87-1.65a2.05 2.05 0 0 0 0-3.08zM3.18.24 14.2 7.37l-2.76 2.76L3.18.24z" />
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </section>

      {/* ─── Event types ──────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-8"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Что происходит в Элисте
          </p>
          <div className="flex flex-wrap gap-3">
            {EVENT_TYPES.map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                <span>{t.emoji}</span>
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2
              className="font-bold mb-3"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
            >
              Просто. Быстро. Удобно.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem" }}>
              Три шага от выбора до прохода на мероприятие
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="rounded-2xl p-7 flex flex-col gap-5 relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Top gradient accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: i === 0
                      ? "linear-gradient(90deg, #FF6B35, #E8A23A)"
                      : i === 1
                      ? "linear-gradient(90deg, #E8A23A, #6B8EFF)"
                      : "linear-gradient(90deg, #6B8EFF, #B46BFF)",
                  }}
                />
                <span
                  className="font-bold"
                  style={{ fontSize: "2.5rem", color: "rgba(255,255,255,0.08)", lineHeight: 1 }}
                >
                  {s.n}
                </span>
                <div>
                  <div className="font-semibold text-lg mb-2">{s.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Kalmykia block ─────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="rounded-3xl p-8 sm:p-12 grid md:grid-cols-2 gap-10 items-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,107,53,0.12) 0%, rgba(100,60,160,0.18) 100%)",
              border: "1px solid rgba(255,107,53,0.2)",
            }}
          >
            {/* Decorative mandala */}
            <div
              className="absolute -right-16 -bottom-16 opacity-10 pointer-events-none"
              style={{ width: 280, height: 280 }}
            >
              <svg viewBox="0 0 200 200" width="280" height="280">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <ellipse
                    key={deg}
                    cx="100"
                    cy="100"
                    rx="10"
                    ry="44"
                    transform={`rotate(${deg} 100 100)`}
                    fill="white"
                  />
                ))}
                <circle cx="100" cy="100" r="12" fill="white" />
              </svg>
            </div>

            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#FF9B6B" }}
              >
                Уникальная культура
              </p>
              <h2
                className="font-bold leading-tight mb-4"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)" }}
              >
                Калмыкия — единственная буддийская республика в Европе
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                Буддийские праздники, шахматные турниры — Элиста славится
                богатой культурной жизнью. Теперь попасть на любое событие
                стало ещё проще.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { icon: "☸️", text: "Буддийские фестивали и цам" },
                { icon: "♟️", text: "Шахматный город — Chess City" },
                { icon: "🏕️", text: "Фестивали степной культуры" },
                { icon: "🎶", text: "Калмыцкая народная музыка" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.75)" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Organizer CTA ────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="rounded-3xl px-8 py-12 sm:px-14 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1a1028 0%, #0f0a1c 100%)",
              border: "1px solid rgba(180,107,255,0.2)",
            }}
          >
            <div
              className="absolute -top-24 -left-24 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(180,107,255,0.18) 0%, transparent 70%)",
              }}
            />
            <div className="relative">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#B46BFF" }}
              >
                Для организаторов
              </p>
              <h2
                className="font-bold mb-3"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
              >
                Проводишь мероприятия в Элисте?
              </h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", maxWidth: 440 }}>
                Создавай события, продавай билеты, управляй посадочными местами
                и принимай гостей по QR-коду. Всё в одном кабинете.
              </p>
            </div>
            <Link
              href="/apply"
              className="shrink-0 font-semibold px-8 py-4 rounded-2xl transition-all hover:scale-105 whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #B46BFF 0%, #7B4FCC 100%)",
                fontSize: "0.95rem",
              }}
            >
              Подать заявку →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────────── */}
      <footer
        className="py-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-base" style={{ color: "#FF6B35" }}>
            Визит Калмыкия
          </span>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} Визит Калмыкия. Билеты на события Калмыкии.
          </p>
          <p style={{ color: "rgba(255,255,255,0.12)", fontSize: "0.72rem" }}>
            Разработано karrad
          </p>
          <Link
            href="/apply"
            className="text-sm transition-colors"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Заявка организатора
          </Link>
        </div>
      </footer>
    </div>
  );
}
