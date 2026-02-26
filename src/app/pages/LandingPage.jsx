import { useState } from 'react';
import { Link } from 'react-router';
import { Shield, Megaphone, Eye, ArrowRight, CheckCircle, Users, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import govLogo from '../../assets/images/government-of-india.jpg';
import indianLogoImg from '../../assets/images/indianlogo.png';

export function LandingPage() {
  const { lang, setLang, t, languages } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  const STATS = [
    { value: '50K+',   label: t.stats.citizens },
    { value: '1,200+', label: t.stats.issuesResolved },
    { value: '300+',   label: t.stats.politicians },
    { value: '98%',    label: t.stats.satisfaction },
  ];

  const ROLES = [
    { num: '01', item: t.roles.citizen,    Icon: Users,     color: '#FF9933', bgClass: 'bg-orange-50',  badgeClass: 'text-[#FF9933] bg-orange-50 border-orange-200' },
    { num: '02', item: t.roles.politician, Icon: Megaphone, color: '#138808', bgClass: 'bg-emerald-50', badgeClass: 'text-[#138808] bg-emerald-50 border-emerald-200' },
    { num: '03', item: t.roles.moderator,  Icon: Eye,       color: '#000080', bgClass: 'bg-indigo-50',  badgeClass: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
    { num: '04', item: t.roles.admin,      Icon: Shield,    color: '#374151', bgClass: 'bg-gray-100',   badgeClass: 'text-gray-600 bg-gray-100 border-gray-300' },
  ];

  const FEATURES = [
    { Icon: Users,     title: t.features.report.title,      desc: t.features.report.desc,      iconBg: 'bg-orange-50',  iconColor: 'text-[#FF9933]' },
    { Icon: Megaphone, title: t.features.informed.title,    desc: t.features.informed.desc,    iconBg: 'bg-emerald-50', iconColor: 'text-[#138808]' },
    { Icon: Eye,       title: t.features.transparent.title, desc: t.features.transparent.desc, iconBg: 'bg-blue-50',    iconColor: 'text-blue-600'  },
    { Icon: Shield,    title: t.features.safe.title,        desc: t.features.safe.desc,        iconBg: 'bg-gray-100',   iconColor: 'text-gray-600'  },
  ];

  return (
    <>
      <style>{`
        /* ── Tricolor bar ──────────────────────── */
        .tricolor-bar {
          background: linear-gradient(to right,
            #FF9933 0%, #FF9933 33.33%,
            #ffffff 33.33%, #ffffff 66.67%,
            #138808 66.67%, #138808 100%
          );
        }

        /* ── Spinning chakra ───────────────────── */
        @keyframes chakraSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .chakra-spin { animation: chakraSpin 22s linear infinite; }

        /* ── Saffron pulse glow ────────────────── */
        @keyframes saffronPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,153,51,0); }
          50%      { box-shadow: 0 0 22px 4px rgba(255,153,51,0.4); }
        }
        .saffron-pulse { animation: saffronPulse 3s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen bg-white">

        {/* ── Tricolor top stripe ─────────────────────────────── */}
        <div className="tricolor-bar h-[3px] w-full fixed top-0 left-0 z-50" />

        {/* ── Navbar ─────────────────────────────────────────── */}
        <nav className="absolute top-[3px] left-0 right-0 z-40 px-6 sm:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm border border-white/30">
              <img
                src={govLogo}
                alt="Government of India"
                className="w-full h-full object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[#FF9933] font-extrabold tracking-wide text-base">
                CitizenConnect
              </span>
              <span className="text-white/40 text-[9px] tracking-[0.2em] uppercase font-medium">
                {t.nav.tagline}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{lang}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 w-48 overflow-hidden">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left transition-colors ${
                        lang === l.code
                          ? 'bg-orange-50 text-[#FF9933] font-bold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-gray-400 w-7 flex-shrink-0">{l.code}</span>
                      <span className="flex-1">{l.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/signin"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white/70 hover:text-[#FF9933] transition-colors"
            >
              {t.nav.signIn}
            </Link>
            <Link
              to="/signup"
              className="saffron-pulse px-4 py-2 rounded-lg text-sm font-bold bg-[#FF9933] text-[#0d0d0d] hover:bg-[#ffaa55] transition-colors shadow-lg"
            >
              {t.nav.getStarted}
            </Link>
          </div>
        </nav>

        {/* ── Hero ───────────────────────────────────────────── */}
        <div className="relative h-screen min-h-[620px] overflow-hidden">
          {/* Hero background image */}
          <img
            src="https://cdn.discordapp.com/attachments/1475965708771918018/1476149638007488666/Heading.png?ex=69a012fb&is=699ec17b&hm=713e536730cdfb279bd15979417efa4e13b293429b58654939aabae999087706"
            alt="CitizenConnect Hero"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

          {/* Center headline */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
            <span className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md text-white/80 text-[10px] font-bold tracking-[0.22em] border border-white/15 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF9933] inline-block" />
              {t.hero.badge}
              <span className="w-2 h-2 rounded-full bg-[#138808] inline-block" />
            </span>

            <h1 className="text-5xl sm:text-7xl font-extrabold text-white text-center leading-[1.05] drop-shadow-2xl">
              {t.hero.line1}
              <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #FF9933 0%, #ffffff 50%, #138808 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t.hero.line2}
              </span>
            </h1>

            <p className="mt-5 text-white/60 text-sm tracking-wide text-center">
              {t.hero.subtitle}
            </p>

            <div className="mt-9 flex gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF9933] text-[#0d0d0d] font-bold hover:bg-[#ffaa55] shadow-2xl transition-all text-sm"
              >
                {t.hero.join} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/signin"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/20 transition-all text-sm"
              >
                {t.hero.signIn}
              </Link>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-40">
            <div className="w-px h-8 bg-[#FF9933] animate-pulse" />
            <span className="text-white/60 text-[10px] tracking-widest uppercase">{t.hero.scroll}</span>
          </div>
        </div>

        {/* ── Stats Bar ──────────────────────────────────────── */}
        <div className="bg-white border-y border-gray-100 py-10 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF9933]/60 via-[#FF9933]/20 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#138808]/60 via-[#138808]/20 to-transparent" />
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold" style={{ color: '#FF9933' }}>{s.value}</p>
                <p className="text-gray-400 text-xs mt-1.5 tracking-wider uppercase font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Roles Section — Horizontal Editorial Layout ─────── */}
        <div className="bg-white py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-14">
              <div>
                <p className="text-[#FF9933] text-xs font-bold tracking-[0.3em] uppercase mb-2">{t.roles.tag}</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">{t.roles.title}</h2>
              </div>
              <p className="text-gray-400 text-sm md:text-right md:max-w-[200px] leading-relaxed shrink-0">{t.roles.sub}</p>
            </div>

            {/* Role rows */}
            <div className="space-y-1">
              {ROLES.map(({ num, item, Icon, color, bgClass, badgeClass }) => (
                <div
                  key={num}
                  className="group flex items-center gap-5 sm:gap-8 py-6 px-5 rounded-2xl hover:bg-gray-50 transition-colors cursor-default"
                >
                  <span
                    className="text-5xl sm:text-6xl font-black leading-none tracking-tighter select-none hidden sm:block"
                    style={{ color, opacity: 0.12 }}
                  >
                    {num}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl ${bgClass} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base font-extrabold text-gray-900">{item.name}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 flex-shrink-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 opacity-0"
                    style={{ color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="tricolor-bar h-px w-full opacity-20" />

        {/* ── Features Section ───────────────────────────────── */}
        <div className="bg-gray-50 py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-[#138808] text-xs font-bold tracking-[0.3em] uppercase mb-3">{t.features.tag}</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{t.features.title}</h2>
              <p className="mt-3 text-gray-500 max-w-md mx-auto text-sm leading-relaxed">{t.features.sub}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow group text-center">
                  <div className={`w-12 h-12 ${f.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform`}>
                    <f.Icon className={`w-6 h-6 ${f.iconColor}`} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA Section ────────────────────────────────────── */}
        <div
          className="py-24 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a0800 0%, #0d1a00 50%, #00001a 100%)' }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5"
            style={{ background: 'linear-gradient(to bottom, #FF9933, rgba(255,255,255,0.25), #138808)' }}
          />
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: '#FF9933' }} />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: '#138808' }} />

          <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center mb-6">
              <img src={indianLogoImg} alt="" className="w-12 h-12 object-contain opacity-25 chakra-spin" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              {t.cta.headline}
            </h2>
            <p className="text-white/40 text-base mb-10 leading-relaxed">{t.cta.sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FF9933] text-[#0d0d0d] font-bold hover:bg-[#ffaa55] transition-colors shadow-2xl text-sm"
              >
                {t.cta.create} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/signin"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/6 hover:bg-white/12 text-white font-semibold border border-white/15 transition-colors text-sm"
              >
                {t.cta.signIn}
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-7 text-xs text-white/30">
              {[t.cta.perk1, t.cta.perk2, t.cta.perk3].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#138808]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer className="bg-gray-50 border-t border-gray-100 py-10">
          <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <img src={govLogo} alt="" className="w-8 h-8 object-contain" />
              <span className="text-gray-500 font-bold text-sm tracking-wide">CitizenConnect</span>
            </div>
            <div className="tricolor-bar h-px w-24 opacity-60" />
            <p className="text-gray-400 text-xs text-center leading-relaxed">
              © {new Date().getFullYear()} {t.footer.copy}
              <br />
              <span className="text-gray-300">{t.footer.tagline}</span>
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
