/**
 * 알쓰패치 교육 가이드 — 교육 허브 페이지
 * URL: landing1-lyart.vercel.app
 * 절충안: 기존 레이아웃/애니메이션 + 녹색 브랜드 + 협업문서 누락 섹션 추가
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  FileText,
  ShoppingCart,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
  Droplets,
  Wind,
  ShieldCheck,
  Presentation,
  ClipboardList,
  BookOpen,
  BarChart3,
  Download,
} from 'lucide-react';
import heroImg from './assets/althhero.png';
import symbolImg from './assets/symbol.png';

// --- GA4 Helper ---
declare global {
  interface Window { gtag?: (...args: any[]) => void; }
}
const trackClick = (action: string, label: string) => {
  window.gtag?.('event', action, {
    event_category: 'education_hub',
    event_label: label,
  });
};

// --- Types ---
interface ResultType {
  id: string;
  percentage: string;
  title: string;
  description: string;
  action: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
}

// --- Constants ---
const RESULTS: ResultType[] = [
  {
    id: 'caution',
    percentage: '71%',
    title: '주의체질 — 무반응',
    description:
      'ALDH2 정상이지만, 경고 신호가 없어 폭음률이 높고 만성질환 유병률이 높습니다. OECD 평균을 크게 웃도는 우리나라 폭음률과 만성질환의 주된 원인이 바로 이 체질입니다.',
    action: '절주 목표 설정이 핵심!',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-[#ff9800]',
    icon: <ShieldCheck className="w-6 h-6 text-orange-600" />,
  },
  {
    id: 'warning',
    percentage: '28%',
    title: '경고체질 — 약간 붉어짐',
    description:
      'ALDH2 결핍으로 발암물질(아세트알데히드) 분해가 느려 가급적 마시지 않아야 합니다. 3명 중 1명은 음주 시 발암성이 크게 치솟습니다.',
    action: '가급적 음주를 피해야 합니다',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-[#e91e63]',
    icon: <AlertTriangle className="w-6 h-6 text-pink-600" />,
  },
  {
    id: 'danger',
    percentage: '2%',
    title: '위험체질 — 많이 붉어짐',
    description:
      '음주 자체가 괴롭기 때문에 음주자가 거의 없습니다. 하지만 흡연 시 심뇌혈관 위험도가 크게 치솟아 반드시 금연해야 하며 선별 관리가 필요합니다.',
    action: '흡연자 선별 관리 필수',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-[#9c27b0]',
    icon: <AlertCircle className="w-6 h-6 text-purple-600" />,
  },
];

const NAV_LINKS = [
  { name: '사용법', href: '#usage' },
  { name: '결과해석', href: '#results' },
  { name: '교육영상', href: '#videos' },
  { name: '자료실', href: '#resources' },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={symbolImg} alt="APS" className="h-8 object-contain" />
          <span className="font-bold text-xl tracking-tight text-slate-900">
            APS <span className="text-[#43a047]">알쓰패치솔루션</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-[#1a5e20] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://www.wcolive.com/shop_goods/goods_view.htm?category=0D000000&goods_idx=2353&goods_bu_id="
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('purchase_click', 'navbar')}
            className="bg-[#1a5e20] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#2e7d32] transition-all shadow-md shadow-green-100 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            구매하기
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-slate-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://www.wcolive.com/shop_goods/goods_view.htm?category=0D000000&goods_idx=2353&goods_bu_id="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a5e20] text-white px-5 py-3 rounded-xl text-center font-semibold"
                onClick={() => trackClick('purchase_click', 'mobile_menu')}
              >
                구매하기
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-200 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100 rounded-full blur-[120px]" />
    </div>

    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-[#1a5e20] text-xs font-bold uppercase tracking-wider mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1a5e20]"></span>
          </span>
          Alcohol Level Test for Health
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
          알쓰패치 <br />
          <span className="text-[#1a5e20] italic">교육 가이드</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
          사용법 영상 · 결과 해석 · 교육자료 키트
          <br />
          7분 효소결핍 검사로 절주 교육을 혁신하세요.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#usage"
            onClick={() => trackClick('hero_cta', 'usage_guide')}
            className="bg-[#1a5e20] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#2e7d32] transition-all shadow-xl shadow-green-200 flex items-center gap-3 group"
          >
            사용법 바로가기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#videos"
            onClick={() => trackClick('hero_cta', 'education_video')}
            className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-3"
          >
            <Play className="w-5 h-5 fill-current" />
            교육 영상
          </a>
        </div>

        <div className="mt-12 flex items-center gap-8">
          <div>
            <div className="text-3xl font-bold text-slate-900">71%</div>
            <div className="text-sm text-slate-500 font-medium">
              한국인 무반응 비율
            </div>
          </div>
          <div className="w-px h-10 bg-slate-200" />
          <div>
            <div className="text-3xl font-bold text-slate-900">7min</div>
            <div className="text-sm text-slate-500 font-medium">
              검사 소요 시간
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-green-200/50 aspect-square lg:aspect-auto lg:h-[600px]">
          <img
            src={heroImg}
            alt="알쓰패치 무반응 결과 확인"
            className="w-full h-full object-cover scale-[1.2] lg:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />

          {/* Floating Card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 bg-white/30 backdrop-blur-md p-4 lg:p-6 rounded-2xl shadow-xl border border-white/20"
          >
            <div className="flex items-center gap-3 lg:gap-4 mb-2 lg:mb-3">
              <div className="w-9 h-9 lg:w-12 lg:h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 lg:w-6 lg:h-6 text-emerald-600" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm lg:text-base">정상 반응 (음성)</div>
                <div className="text-[10px] lg:text-xs text-slate-500 font-medium tracking-wide uppercase">
                  Normal Result
                </div>
              </div>
            </div>
            <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">
              <strong>반응이 없어도 정상입니다.</strong>
              <br />
              쉽고 재미있게 건강인식을 <strong>패치</strong> 하세요!
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-green-100 rounded-full -z-10 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-50 rounded-full -z-10 blur-3xl" />
      </motion.div>
    </div>
  </section>
);

const FramingBanner = () => (
  <section className="py-0">
    <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border-l-4 border-[#ffa000] flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12"
      >
        <div className="flex-shrink-0">
          <div className="text-6xl lg:text-7xl font-black text-[#e65100] tracking-tighter leading-none">
            71%
          </div>
          <div className="text-base font-semibold text-slate-800 mt-1">
            한국인의 무반응(음성) 비율
          </div>
        </div>
        <div className="flex-1">
          <p className="text-slate-600 leading-relaxed text-base">
            한국인 약 <strong className="text-slate-800">71%에 달하는 무반응 "주의체질"</strong>은 음주 시 피부색 변화와 같은 경고 신호가 나타나지 않아 정상으로 보이지만, 실제로는 위험 신호를 인지하지 못해 폭음률이 높습니다.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border-l-4 border-[#1a5e20] flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12 mt-6"
      >
        <div className="flex-shrink-0">
          <div className="text-6xl lg:text-7xl font-black text-[#1a5e20] tracking-tighter leading-none">
            효과
          </div>
          <div className="text-base font-semibold text-slate-800 mt-1">
            알쓰패치 프로그램의 효과
          </div>
        </div>
        <div className="flex-1">
          <ul className="text-slate-600 leading-relaxed text-base space-y-3">
            <li>
              <strong className="text-slate-800">획기적 인식 전환:</strong> 여러 사람의 반응(71% 무반응 등)을 직접 비교하며 음주 위험을 강력히 각인합니다.
            </li>
            <li>
              <strong className="text-slate-800">높은 교육 몰입도:</strong> 눈으로 확인하는 체감을 통해 단순 강의보다 압도적인 집중도를 제공합니다.
            </li>
            <li>
              <strong className="text-slate-800">보건 프로그램 완성:</strong> 폭음 지표를 체계적으로 관리하여 관리집단의 폭음률을 낮추고 만성질환을 예방합니다.
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  </section>
);

const UsageSection = () => {
  const steps = [
    { title: '제품 형태 확인', desc: '브리스터 케이스에서 패치를 조심스럽게 떼어냅니다.' },
    { title: '온도센서 확인', desc: '부착 후 보호필름을 제거하고 체온을 확인합니다.' },
    { title: '비색표 대조', desc: '떼어낸 후 대조표와 비교하여 판정합니다.' },
    { title: '체질별 관리', desc: '판정 결과에 따른 주의사항 및 위험체질을 안내합니다.' },
  ];

  return (
    <section id="usage" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">알쓰패치 사용법</h2>
          <p className="text-lg text-slate-600">패치를 붙이기 전에 사용법 영상을 꼭 시청하세요</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="relative bg-white p-8 rounded-3xl shadow-sm border border-slate-100 overflow-hidden group"
            >
              {/* 호버 시 나타나는 동적 그래픽 */}
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br from-[#1a5e20]/20 to-emerald-200/30 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
              <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full border-2 border-[#1a5e20]/15 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out delay-100" />
              <div className="absolute right-6 top-6 w-3 h-3 rounded-full bg-[#1a5e20]/30 scale-0 group-hover:scale-100 transition-transform duration-300 delay-200" />

              <div className="relative z-10">
                <div className="w-12 h-12 bg-green-50 text-[#1a5e20] rounded-2xl flex items-center justify-center font-bold text-xl mb-6">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 온보딩 시리즈 */}
        <div className="mt-16 bg-[#1a5e20] rounded-[40px] overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          </div>
          <div className="relative z-10 p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">전문가 온보딩 시리즈</h3>
              <p className="text-green-100 text-lg mb-8 leading-relaxed">
                알쓰패치를 단순한 검사 도구가 아니라, 환경과 조건을 함께 고려해 해석해야 하는 현장형 건강증진 도구로 이해하는 기준을 정리합니다.
              </p>
              <a
                href="https://www.youtube.com/watch?v=i_XU9lAgK90"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('video_click', 'onboarding_series')}
                className="bg-white text-[#1a5e20] px-8 py-4 rounded-2xl font-bold hover:bg-green-50 transition-all flex items-center gap-3 mx-auto lg:mx-0"
              >
                <Play className="w-5 h-5 fill-current" />
                온보딩 영상 시청하기
              </a>
            </div>
            <div className="flex-1 w-full max-w-md aspect-video rounded-3xl overflow-hidden border border-green-700 shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/i_XU9lAgK90"
                title="전문가 온보딩 시리즈"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ResultsSection = () => (
  <section id="results" className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">체질별 결과 해석</h2>
          <p className="text-lg text-slate-600">
            알쓰패치 반응 결과에 따른 체질별 특징과 건강 관리 가이드를 확인하세요.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {RESULTS.map((result) => (
          <motion.div
            key={result.id}
            whileHover={{ y: -10 }}
            className={`p-10 rounded-[40px] ${result.bgColor} border-l-4 ${result.borderColor} transition-all shadow-sm`}
          >
            <div className="flex items-center justify-between mb-8">
              <div className={`text-5xl font-black ${result.color} tracking-tighter`}>
                {result.percentage}
              </div>
              <div className="p-3 bg-white rounded-2xl shadow-sm">{result.icon}</div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{result.title}</h3>
            <p className="text-slate-600 mb-8 leading-relaxed min-h-[100px]">
              {result.description}
            </p>
            <div
              className={`inline-flex items-center gap-2 font-bold ${result.color} bg-white px-5 py-3 rounded-2xl shadow-sm w-full justify-center`}
            >
              → {result.action}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const VideoCard = ({ title, desc, tags, icon: Icon, url }: any) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
  >
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="aspect-video bg-slate-100 relative overflow-hidden block"
    >
      <img
        src={`https://img.youtube.com/vi/${url?.match(/[?&]v=([^&]+)/)?.[1] || ''}/maxresdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center scale-90 group-hover:scale-100 transition-transform shadow-xl">
          <Play className="w-6 h-6 text-slate-900 fill-current ml-1" />
        </div>
      </div>
    </a>
    <div className="p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-50 rounded-lg">
          <Icon className="w-5 h-5 text-[#1a5e20]" />
        </div>
        <div className="flex gap-2">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-slate-200 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const VideosSection = () => (
  <section id="videos" className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">교육 영상</h2>
        <p className="text-lg text-slate-600">
          누구나 이해하기 쉬운 애니메이션과 그래픽으로 구성된 교육 콘텐츠
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <VideoCard
          title="술과 알데히드 이야기"
          desc="우리가 미처 알지 못했던 술과 알데히드 그리고 음주 위험 체질에 관한 애니메이션 영상입니다. 패치 부착 7분간 시청 가능합니다."
          tags={['애니메이션', '7분', '인체대사']}
          icon={Droplets}
          url="https://www.youtube.com/watch?v=KpXnTKsNnok"
        />
        <VideoCard
          title="담배연기와 심장마비"
          desc="담배연기의 혈관질환 유발 기전을 이해하기 쉬운 그래픽으로 구성한 교육용 영상입니다. 급성심근경색의 위험성을 경고합니다."
          tags={['그래픽', '혈관질환', '금연교육']}
          icon={Wind}
          url="https://www.youtube.com/watch?v=PCN3XdNB9Tk"
        />
      </div>
    </div>
  </section>
);

const ResourcesSection = () => {
  const resources = [
    {
      icon: Presentation,
      name: '교육용 PPT 슬라이드',
      desc: '그대로 띄워서 강의할 수 있는 완성형 슬라이드',
      type: 'PowerPoint',
      link: 'https://wellnesscompanyoliveinc-my.sharepoint.com/:p:/g/personal/star_i-olive_net/IQCZgqqHxRcBS51H_0f2SBDWAX3ENfMiC04HM-ARIFFrUAE?e=0xE4Ff',
    },
    {
      icon: FileText,
      name: '캠페인 전시용 패널',
      desc: '교육 현장에 세워두는 안내 패널 (인쇄용)',
      type: 'PDF',
      link: 'https://wellnesscompanyoliveinc-my.sharepoint.com/:b:/g/personal/star_i-olive_net/IQBcQtDVLRtSTpw7-YzEI4G5AfDVz509oMP4pwdMwO4rLdA?e=ha93V2',
    },
    {
      icon: ClipboardList,
      name: '참여자 기록지',
      desc: '체질 판정 결과 + 폭음·흡연 지표 기록 (인쇄용)',
      type: 'HTML (인쇄)',
      link: '/참여자기록지.html',
    },
    {
      icon: BookOpen,
      name: '강연 시나리오',
      desc: '처음 하는 담당자도 진행할 수 있는 단계별 스크립트',
      type: 'HTML (인쇄)',
      link: '/강연시나리오.html',
    },
  ];

  return (
    <section id="resources" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[48px] p-12 lg:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1a5e20]/20 blur-[120px] -z-0" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">교육자료 키트</h2>
              <p className="text-slate-400 text-lg mb-4 leading-relaxed">
                처음 하는 담당자도 바로 교육을 진행할 수 있습니다.
                <br />
                PPT, 전시 패널, 기록지, 강연 시나리오까지 — 현장에서 즉시 활용 가능합니다.
              </p>
              <div className="flex flex-col gap-4">
                {resources.map((res) => (
                  <a
                    key={res.name}
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick('resource_download', res.name)}
                    className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <res.icon className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <div className="font-bold">{res.name}</div>
                        <div className="text-xs text-slate-500">{res.type}</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
              <div
                className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-slate-600 text-white/80 rounded-2xl font-bold text-lg cursor-default"
              >
                <Download className="w-5 h-5" />
                교육자료 키트 일괄 다운로드 (준비 중)
              </div>
            </div>

            {/* 구매 CTA 카드 */}
            <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-sm">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-[#1a5e20] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/20">
                  <ShoppingCart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">알쓰패치 구매하기</h3>
                <p className="text-slate-400">본품 구매 페이지로 연결됩니다</p>
              </div>
              <a
                href="https://www.wcolive.com/shop_goods/goods_view.htm?category=0D000000&goods_idx=2353&goods_bu_id="
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('purchase_click', 'resource_section')}
                className="block w-full bg-[#1a5e20] text-white text-center py-5 rounded-2xl font-bold text-lg hover:bg-[#2e7d32] transition-all shadow-xl shadow-green-500/20"
              >
                wcolive.com에서 구매하기
              </a>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl text-center">
                  <a href="tel:15445291" className="text-2xl font-bold mb-1 hover:text-green-400 transition-colors block">1544<br />5291</a>
                  <div className="text-[10px] text-slate-500 tracking-widest">고객센터</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl text-center">
                  <a href="https://aps7.net" target="_blank" rel="noopener noreferrer" className="text-lg font-bold mb-1 hover:text-green-400 transition-colors block">APS<br />얼라이언스</a>
                  <div className="text-[10px] text-slate-500 tracking-widest">교육자연맹</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SelfDiagnosisSection = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">건강행태 자가진단</h2>
        <p className="text-lg text-slate-600">
          교육 참여자가 직접 기록하고,<br className="md:hidden" />기관별 통계를 자동으로 받아보세요
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 자가진단 폼 */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100"
        >
          <div className="w-14 h-14 bg-[#e8f5e9] rounded-2xl flex items-center justify-center mb-6">
            <BarChart3 className="w-7 h-7 text-[#1a5e20]" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">참여자 자가진단 폼</h3>
          <p className="text-slate-500 leading-relaxed mb-8">
            교육 현장에서 태블릿이나 키오스크로 참여자가 직접 건강행태를 기록합니다.
            폭음빈도 · 흡연여부 · 음주플러싱 3문항, 30초면 완료됩니다.
          </p>
          <a
            href="https://www.aps7.net/shop_contents/mytest_question_all.htm?mytest_code=aps1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('self_diagnosis_click', 'diagnosis_form')}
            className="inline-flex items-center gap-2 bg-[#ff9800] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#f57c00] transition-all shadow-md"
          >
            자가진단 폼 바로가기
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* 통계분석 리포트 */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden"
        >
          <div className="absolute top-6 right-6">
            <span className="text-xs text-white bg-[#ff9800] px-3 py-1 rounded-full font-bold">
              Coming May 2026
            </span>
          </div>
          <div className="w-14 h-14 bg-[#f3e5f5] rounded-2xl flex items-center justify-center mb-6">
            <FileText className="w-7 h-7 text-[#9c27b0]" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">APS 건강행태 리포트</h3>
          <p className="text-slate-500 leading-relaxed mb-4">
            분석 기간을 설정하면 누적 데이터를 자동 집계합니다. 폭음률 · 흡연율 ·
            음주플러싱(양성/음성) · 표본오차율까지 — PDF 리포트로 다운로드하여
            보고서에 바로 활용할 수 있습니다.
          </p>
          <p className="text-sm text-slate-400">* 스카우트 이상 회원만 이용 가능</p>
        </motion.div>
      </div>
    </div>
  </section>
);

const PurchaseCTA = () => (
  <section className="py-20 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9]">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold text-[#1a5e20] mb-4">본품 구매</h2>
      <p className="text-lg text-slate-600 mb-10">
        교육 현장에 바로 활용할 수 있는 알쓰패치 본품을 구매하세요
      </p>
      <a
        href="https://www.wcolive.com/shop_goods/goods_view.htm?category=0D000000&goods_idx=2353&goods_bu_id="
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClick('purchase_click', 'bottom_cta')}
        className="inline-block px-12 py-5 bg-white text-[#1a5e20] border-2 border-[#1a5e20] rounded-2xl font-bold text-lg hover:bg-[#1a5e20] hover:text-white transition-all shadow-lg"
      >
        wcolive.com에서 구매하기
      </a>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex items-center gap-2 mb-6">
        <img src={symbolImg} alt="APS" className="h-6 object-contain" />
        <span className="font-bold text-xl tracking-tight text-slate-900">
          APS <span className="text-[#43a047]">알쓰패치솔루션</span>
        </span>
      </div>
      <p className="text-slate-500 mb-10 leading-relaxed">
        APS[앱스]알쓰패치솔루션은<br className="lg:hidden" /> (주)웰니스컴퍼니올리브의 체감형 보건교육 브랜드입니다.
      </p>

      <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xs text-slate-400 font-medium tracking-wide">
          &copy; 2026 Wellness Company Olive Inc. All rights reserved.
        </div>
        <div className="flex gap-8 text-xs text-slate-400 font-medium">
          <a href="https://www.wcolive.com/shop_info/privacy.htm" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">개인정보처리방침</a>
          <a href="https://www.wcolive.com/shop_info/provision.htm" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">이용약관</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />
      <main>
        <Hero />
        <FramingBanner />
        <UsageSection />
        <ResultsSection />
        <VideosSection />
        <ResourcesSection />
        <SelfDiagnosisSection />
        <PurchaseCTA />
      </main>
      <Footer />
    </div>
  );
}
