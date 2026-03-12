/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  ChevronRight, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  FileText, 
  Layout, 
  BarChart3, 
  ShoppingCart,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
  Droplets,
  Wind,
  ShieldCheck
} from 'lucide-react';

// --- Types ---
interface ResultType {
  id: string;
  percentage: string;
  title: string;
  description: string;
  action: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

// --- Constants ---
const RESULTS: ResultType[] = [
  {
    id: 'caution',
    percentage: '71%',
    title: '주의체질 - 무반응',
    description: 'ALDH2 정상이지만, 경고 신호가 없어 폭음률이 높고 만성질환 유병률이 높습니다. OECD 평균을 크게 웃도는 우리나라 폭음률과 만성질환의 주된 원인이 바로 이 체질입니다.',
    action: '절주 목표 설정이 핵심!',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />
  },
  {
    id: 'warning',
    percentage: '28%',
    title: '경고체질 - 약간 붉어짐',
    description: 'ALDH2 결핍으로 발암물질(아세트알데히드) 분해가 느려 가급적 마시지 않아야 합니다. 3명 중 1명은 음주 시 발암성이 크게 치솟습니다.',
    action: '가급적 마시지 말아야 합니다',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    icon: <AlertTriangle className="w-6 h-6 text-orange-600" />
  },
  {
    id: 'danger',
    percentage: '2%',
    title: '위험체질 - 많이 붉어짐',
    description: '음주 자체가 괴롭기 때문에 음주자가 거의 없습니다. 하지만 흡연 시 심뇌혈관 위험도가 크게 치솟아 반드시 금연해야 하며 선별 관리가 필요합니다.',
    action: '흡연자 선별 관리 필수',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    icon: <AlertCircle className="w-6 h-6 text-red-600" />
  }
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
            A
          </div>
          <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
            알쓰패치 <span className="text-indigo-600">솔루션</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://www.wcolive.com/shop_goods/goods_view.htm?category=0D000000&goods_idx=2353&goods_bu_id=" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 flex items-center gap-2"
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
                className="bg-indigo-600 text-white px-5 py-3 rounded-xl text-center font-semibold"
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

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Health Awareness Patch
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
            알쓰패치 <br />
            <span className="text-indigo-600 italic">교육 가이드</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
            7분 효소결핍 검사로 절주·금연 교육 참여와 지표 개선을 한 번에! 알쓰패치로 당신의 건강 인식을 패치하세요.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center gap-3 group">
              가이드 시작하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-3">
              <Play className="w-5 h-5 fill-current" />
              사용법 영상
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-3xl font-bold text-slate-900">71%</div>
              <div className="text-sm text-slate-500 font-medium">한국인 무반응 비율</div>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <div className="text-3xl font-bold text-slate-900">7min</div>
              <div className="text-sm text-slate-500 font-medium">검사 소요 시간</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-200/50 aspect-square lg:aspect-auto lg:h-[600px]">
            <img 
              src="https://picsum.photos/seed/health/800/1000" 
              alt="Health Tech" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent" />
            
            {/* Floating Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">정상 반응 (음성)</div>
                  <div className="text-xs text-slate-500 font-medium tracking-wide uppercase">Normal Result</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                반응이 없어도 정상입니다. 환경 변수에 따라 반응이 약해질 수 있습니다.
              </p>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-100 rounded-full -z-10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-50 rounded-full -z-10 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

const UsageSection = () => {
  const steps = [
    { title: "제품 형태 확인", desc: "브리스터 케이스에서 패치를 조심스럽게 떼어냅니다." },
    { title: "온도센서 확인", desc: "부착 후 보호필름을 제거하고 체온을 확인합니다." },
    { title: "비색표 대조", desc: "하단부 제거 후 대조표와 비교하여 판정합니다." },
    { title: "체질별 관리", desc: "판정 결과에 따른 주의사항 및 위험체질을 안내합니다." }
  ];

  return (
    <section id="usage" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">알쓰패치 사용법</h2>
          <p className="text-lg text-slate-600">1분 만에 알아보는 알쓰패치 사용 및 육안 판정 방법</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl mb-6">
                0{idx + 1}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-indigo-900 rounded-[40px] overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          </div>
          <div className="relative z-10 p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">전문가 온보딩 시리즈</h3>
              <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                알쓰패치를 단순한 검사 도구가 아니라, 환경과 조건을 함께 고려해 해석해야 하는 현장형 건강증진 도구로 이해하는 기준을 정리합니다.
              </p>
              <button className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-3 mx-auto lg:mx-0">
                <Play className="w-5 h-5 fill-current" />
                온보딩 영상 시청하기
              </button>
            </div>
            <div className="flex-1 w-full max-w-md aspect-video bg-indigo-800 rounded-3xl flex items-center justify-center border border-indigo-700 shadow-2xl relative group cursor-pointer overflow-hidden">
               <img src="https://picsum.photos/seed/video/800/450" alt="Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
               <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                 <Play className="w-8 h-8 text-indigo-900 fill-current ml-1" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ResultsSection = () => {
  return (
    <section id="results" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">체질별 결과 해석</h2>
            <p className="text-lg text-slate-600">
              알쓰패치 반응 결과에 따른 체질별 특징과 건강 관리 가이드를 확인하세요.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
            <Info className="w-4 h-4" />
            모든 체질에 교육 효과가 있습니다
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {RESULTS.map((result) => (
            <motion.div 
              key={result.id}
              whileHover={{ y: -10 }}
              className={`p-10 rounded-[40px] ${result.bgColor} border border-transparent hover:border-white/50 transition-all shadow-sm`}
            >
              <div className="flex items-center justify-between mb-8">
                <div className={`text-5xl font-black ${result.color} tracking-tighter`}>
                  {result.percentage}
                </div>
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  {result.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{result.title}</h3>
              <p className="text-slate-600 mb-8 leading-relaxed min-h-[100px]">
                {result.description}
              </p>
              <div className={`inline-flex items-center gap-2 font-bold ${result.color} bg-white px-5 py-3 rounded-2xl shadow-sm w-full justify-center`}>
                {result.action}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VideoCard = ({ title, desc, tags, icon: Icon }: any) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
  >
    <div className="aspect-video bg-slate-100 relative overflow-hidden">
      <img src={`https://picsum.photos/seed/${title}/800/450`} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center scale-90 group-hover:scale-100 transition-transform shadow-xl">
          <Play className="w-6 h-6 text-slate-900 fill-current ml-1" />
        </div>
      </div>
    </div>
    <div className="p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Icon className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="flex gap-2">
          {tags.map((tag: string) => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-slate-200 px-2 py-0.5 rounded">
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

const VideosSection = () => {
  return (
    <section id="videos" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">음주 및 흡연 교육 영상</h2>
          <p className="text-lg text-slate-600">누구나 이해하기 쉬운 애니메이션과 그래픽으로 구성된 교육 콘텐츠</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <VideoCard 
            title="술과 알데히드 이야기"
            desc="우리가 미처 알지 못했던 술과 알데히드 그리고 음주 위험 체질에 관한 애니메이션 영상입니다. 패치 부착 7분간 시청 가능합니다."
            tags={["애니메이션", "7분", "인체대사"]}
            icon={Droplets}
          />
          <VideoCard 
            title="담배연기와 심장마비"
            desc="담배연기의 혈관질환 유발 기전을 이해하기 쉬운 그래픽으로 구성한 교육용 영상입니다. 급성심근경색의 위험성을 경고합니다."
            tags={["그래픽", "혈관질환", "금연교육"]}
            icon={Wind}
          />
        </div>
      </div>
    </section>
  );
};

const ResourcesSection = () => {
  const resources = [
    { name: "교육용 PPT 자료", type: "PowerPoint", link: "https://wellnesscompanyoliveinc-my.sharepoint.com/:p:/g/personal/star_i-olive_net/IQCZgqqHxRcBS51H_0f2SBDWAX3ENfMiC04HM-ARIFFrUAE?e=0xE4Ff" },
    { name: "캠페인 전시패널", type: "PDF", link: "https://wellnesscompanyoliveinc-my.sharepoint.com/:b:/g/personal/star_i-olive_net/IQBcQtDVLRtSTpw7-YzEI4G5AfDVz509oMP4pwdMwO4rLdA?e=ha93V2" },
    { name: "행태 조사 & 리포트", type: "Web", link: "https://www.aps7.net/shop_contents/mytest_question_all.htm?mytest_code=aps1" },
  ];

  return (
    <section id="resources" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[48px] p-12 lg:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/20 blur-[120px] -z-0" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">교육자료 키트</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                현장에서 즉시 활용 가능한 고품질 교육 자료를 다운로드하세요. PPT, 전시 패널, 행태 진단 리포트 등 다양한 자료가 준비되어 있습니다.
              </p>
              <div className="flex flex-col gap-4">
                {resources.map((res) => (
                  <a 
                    key={res.name}
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <FileText className="w-5 h-5 text-indigo-400" />
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
            </div>
            <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-sm">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/20">
                  <ShoppingCart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">알쓰패치 구매하기</h3>
                <p className="text-slate-400">본품 구매 페이지로 연결됩니다</p>
              </div>
              <a 
                href="https://www.wcolive.com/shop_goods/goods_view.htm?category=0D000000&goods_idx=2353&goods_bu_id="
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-indigo-600 text-white text-center py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
              >
                지금 구매하러 가기
              </a>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl text-center">
                  <div className="text-2xl font-bold mb-1">1544</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">고객센터</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl text-center">
                  <div className="text-2xl font-bold mb-1">APS</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">솔루션</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                알쓰패치 <span className="text-indigo-600">솔루션</span>
              </span>
            </div>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
              (주)웰니스컴퍼니올리브는 건강한 사회를 위해 혁신적인 건강 증진 솔루션을 제공합니다.
            </p>
            <div className="flex gap-4">
              {['blog', 'facebook', 'instagram'].map(social => (
                <div key={social} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer">
                  <div className="w-5 h-5 border-2 border-current rounded-sm" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">회사소개</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">이용약관</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors font-bold text-slate-900">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">문의하기</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-start gap-3">
                <span className="font-bold text-slate-900 min-w-[40px]">ADDR</span>
                <span>경기 고양시 덕양구 삼원로 73 (원흥동) 303</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-slate-900 min-w-[40px]">TEL</span>
                <span>1544-5291</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-slate-900 min-w-[40px]">BIZ</span>
                <span>720-88-02148</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-slate-400 font-medium tracking-wide">
            © 2026 Wellness Company Olive Inc. All rights reserved.
          </div>
          <div className="flex gap-8 text-xs text-slate-400 font-medium">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main>
        <Hero />
        <UsageSection />
        <ResultsSection />
        <VideosSection />
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
}
