import Link from "next/link";

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
    ),
    title: "Найди мероприятие",
    desc: "Концерты, театр, спорт, выставки — всё, что происходит в твоём городе сегодня и на неделе вперёд.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a3 3 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>
    ),
    title: "Купи билет",
    desc: "Оплата за несколько секунд. Выбери место на схеме зала или просто возьми входной билет.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5zm0 9.75c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5zm9.75-9.75c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 18.75h.008v.008H13.5v-.008zm3.75 0h.008v.008H17.25v-.008zm0-3.75h.008v.008H17.25V15zm-3.75 0h.008v.008H13.5V15z" />
      </svg>
    ),
    title: "Покажи QR",
    desc: "Электронный билет всегда под рукой. Покажи QR-код на входе — никакой бумаги.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
    title: "Для организаторов",
    desc: "Создавай мероприятия, настраивай билеты и схемы залов. Статистика продаж в реальном времени.",
  },
];

const STATS = [
  { value: "10+", label: "мероприятий" },
  { value: "500+", label: "билетов продано" },
  { value: "2", label: "платформы" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight text-primary">Karrad</span>
          <Link
            href="/login"
            className="text-sm font-medium px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors"
          >
            Войти в кабинет
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Фоновые круги */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-primary/6 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Доступно на Android и iOS
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight mb-6">
            Билеты на{" "}
            <span className="text-primary">мероприятия</span>
            <br className="hidden sm:block" /> в пару касаний
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Концерты, театр, спорт и стендап — покупай билеты онлайн,
            выбирай места на схеме зала и показывай QR на входе.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3.5 rounded-2xl font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.32.07 2.23.73 3 .79 1.19-.24 2.33-.93 3.6-.84 1.53.12 2.68.72 3.44 1.87-3.12 1.87-2.38 5.98.48 7.13-.57 1.56-1.32 3.1-2.52 3.93zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3.5 rounded-2xl font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.18 23.76a2 2 0 0 1-.92-.97l9.18-9.18 2.76 2.76L3.18 23.76zm-1.1-20.7C2 3.35 2 3.7 2 4.06v15.88c0 .36 0 .71.08 1L11.29 12 2.08 3.06zM21.54 10.8l-2.83-1.63-3.18 3.18 3.18 3.18 2.87-1.65a2.05 2.05 0 0 0 0-3.08zM3.18.24 14.2 7.37l-2.76 2.76L3.18.24z" />
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/50 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-4 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Всё в одном приложении</h2>
          <p className="text-muted-foreground">От поиска до прохода на мероприятие</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 hover:border-primary/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                {f.icon}
              </div>
              <div>
                <div className="font-semibold mb-1.5">{f.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* For organizers CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-primary px-8 py-12 sm:px-14 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Вы организатор?</h2>
            <p className="text-white/80 text-sm max-w-md">
              Создавайте мероприятия, управляйте билетами, отслеживайте продажи
              и принимайте участников через QR-сканер — всё в одном месте.
            </p>
          </div>
          <Link
            href="/apply"
            className="shrink-0 bg-white text-primary font-semibold px-7 py-3.5 rounded-2xl text-sm hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            Подать заявку
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border/50 bg-muted/20">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-center mb-12 tracking-tight">Как это работает</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { step: "01", title: "Скачай приложение", desc: "Доступно в App Store и Google Play" },
              { step: "02", title: "Выбери и оплати", desc: "Найди мероприятие и купи билет за пару касаний" },
              { step: "03", title: "Покажи QR", desc: "Электронный билет будет в приложении" },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full border-2 border-primary text-primary font-bold flex items-center justify-center text-sm">
                  {item.step}
                </div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-bold text-foreground text-base">Karrad</span>
          <div className="flex gap-6">
            <Link href="/apply" className="hover:text-foreground transition-colors">Заявка организатора</Link>
            <Link href="/login" className="hover:text-foreground transition-colors">Кабинет</Link>
          </div>
          <span>© {new Date().getFullYear()} Karrad. Все права защищены.</span>
        </div>
      </footer>
    </div>
  );
}
