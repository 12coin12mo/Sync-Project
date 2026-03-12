/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type ServiceData = {
  id: string;
  title: string;
  icon: string;
  bgImage: string;
  shortDesc: string;
  description: string;
  equipment: string[];
};

const servicesData: ServiceData[] = [
  {
    id: 'ses',
    title: 'Ses Sistemleri',
    icon: 'speaker',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0_zxjKqyuxkOrU9Bi2iVqlGHAnqbCiWh28zL0AWx4BMxpyr0HXegQZoNGA9gxY-wBWo50c8r9JtFGDGX7nbFVT1neqIZQx-FaFVbkxGe_fPQbrQ4hANRvd1hG1nY3Uv9WakMirO9RZcaMVQ5WpxfKUppPzl-uT_IjhsxzkRptDON0AX2kc5r39AbBAfI3WitTYx4Ib0IjWmYWiEa1_ODw4sLazjIgvVIFVu3zTg2A-S3YzbsBbpmQ9d_CAt2lA2aR8QrdBTba4Dw',
    shortDesc: 'Konserlerden konferanslara, kristal netliğinde ses deneyimi.',
    description: 'Kristal netliğinde bir ses deneyimi, etkinliğin ruhudur. Küçük toplantı odalarından dev konser alanlarına kadar her mekana uygun akustik çözümler sunuyoruz.',
    equipment: ['Dijital Mikserler', 'Line Array Sistemleri', 'Kablosuz Mikrofon Setleri', 'Aktif/Pasif Hoparlörler', 'Sahne Monitörleri']
  },
  {
    id: 'isik',
    title: 'Işık Tasarımı',
    icon: 'light_mode',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3T52BX8BH5z8WMn9jsrw-j61ZGst9gtLQ__uDvRpC2l7Kyyez2LjHmNV1JX1kw1t6pebAwejp1J5Z4oYk8B-RUr3MqDBXLCCM0ugtY3tYdJvj26tSc1kDXR68kipuijlXDYHHdFEuXjtdR7KLZ3lQwq-hDIN59tviY2FIn1YAo-4f8AwhVMe32fs3SrnpPeZzIfONvPO0mS2CNffotg_IKFdmuxGnnV14Lbf11d9myhNvwRGL2qSNbjoNHPxQONR5TeeBekL7zu4',
    shortDesc: 'Etkinliğinizin atmosferini değiştiren profesyonel ışık şovları.',
    description: 'Işık, sadece görmeyi değil, hissetmeyi sağlar. Profesyonel ekibimizle mekanın atmosferini markanızın renklerine büründürüyoruz.',
    equipment: ['Robot Işıklar (Moving Heads)', 'Boyama Işıkları (LED Par)', 'Takip Spotları', 'Sis Makineleri', 'GrandMA2/3 Kontrol Masaları']
  },
  {
    id: 'led',
    title: 'LED Ekran ve Görüntü',
    icon: 'live_tv',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX0dRaTKeqqPcy6lHBJ8mZm6TMOG9ldMJFw0U5O42FcBg80Jk3d5XeMDd2Nmkj8-1pBOm329ohj4F36v68ljOIF-8u4Cwj4w174qMuOmv1NCl08UdKl10yiDB71cNcPvCiRQZqp2KPgZytLreLOkT4VUTxrUNICHQDP96Ub4hPLSmd0hLHVhXOhvG-UlCl6H1aYQgbfdUsYU-CMAsss4f--N1yTEF6SZ4phdM_yQNvZq0CF7BOCoZZ3AOhowCu2eqsp-bXprzqhyI',
    shortDesc: 'Yüksek çözünürlüklü LED paneller ve projeksiyon sistemleri.',
    description: 'Sadece LED ekranlarla sınırlı kalmıyoruz. Görüntüleme teknolojilerinde sınır tanımayan çözümlerimizle, sunumlarınızı ve videolarınızı en yüksek çözünürlükte yansıtıyoruz.',
    equipment: ['İç ve Dış Mekan LED Paneller (P2.5 - P3.9)', 'Yüksek Lümenli Projeksiyon Cihazları', 'Video Wall Sistemleri', 'Profesyonel Sunum Monitörleri', 'Reji/Switching Sistemleri']
  },
  {
    id: 'simultane',
    title: 'Simultane Çeviri',
    icon: 'translate',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApjRBkJxXQJk465iYQHkO7-KSPkXfSpF7wqoRM9q50ujsu1vfoA2OcJZnMbq6tAJuMMeXlQ5QCMb07ERA17jKH__zpwP1XtfCLbpRDHW1LtZeb2HiLdnX9UVOcFve6Vm1XA_umm5Nv4-7xQ8jE2RWK9m77Sy22cnyxc14mWnfl1mfLI9GO5uY-dYeJ06w4WeAzV99bB_yJyTJhXzdZ7VH13b_mY_cGPdxXCF-rAnnZDXwMgCobn5gkLTS7k0JkecrtIa640sGceyA',
    shortDesc: 'Çok dilli etkinlikler için kesintisiz çeviri altyapısı.',
    description: 'Dil bariyerini ortadan kaldırıyoruz. Çok dilli etkinliklerinizde kesintisiz ve hatasız çeviri altyapısı ile global bir iletişim ağı kuruyoruz.',
    equipment: ['Kızılötesi Çeviri Sistemleri', 'Tercüman Kabinleri', 'Çok Kanallı Kulaklık Setleri', 'Ses Yalıtımlı Profesyonel Üniteler']
  }
];

export default function App() {
  const formRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('status') === 'success') {
        setShowSuccessToast(true);
        // Clean up URL without reloading
        window.history.replaceState({}, document.title, window.location.pathname);
        // Hide toast after 3 seconds
        setTimeout(() => {
          setShowSuccessToast(false);
        }, 3000);
      }
    }
  }, []);

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [formData, setFormData] = useState({
    date: '',
    attendees: '',
    venue: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [footerModal, setFooterModal] = useState<'faq' | 'contact' | 'partnership' | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'partners'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ date: '', attendees: '', venue: '', email: '', phone: '', notes: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 4000);
  };

  return (
    <div className="dark bg-background-dark text-slate-100 antialiased font-display min-h-screen w-full flex flex-col overflow-x-hidden">
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 right-4 sm:right-8 z-[100] flex items-center gap-3 rounded-2xl border border-primary/30 bg-slate-900/95 p-4 shadow-[0_0_25px_rgba(37,140,244,0.4)] backdrop-blur-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
              <span className="material-symbols-outlined text-[24px]">check_circle</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Talebiniz Başarıyla Alındı!</h4>
              <p className="text-xs text-slate-400">En kısa sürede sizinle iletişime geçeceğiz.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-background-dark/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentView('home')}>
            <div className="flex items-center justify-center text-primary drop-shadow-[0_0_8px_rgba(37,140,244,0.8)] transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-[32px]">sync_alt</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Sync</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="relative py-1 text-sm font-medium text-slate-300 hover:text-primary transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:after:shadow-[0_0_8px_rgba(37,140,244,0.8)]" href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); setIsModalOpen(true); }}>Nasıl Çalışır?</a>
            <a className="relative py-1 text-sm font-medium text-slate-300 hover:text-primary transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:after:shadow-[0_0_8px_rgba(37,140,244,0.8)]" href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); setTimeout(() => scrollToServices(e), 100); }}>Hizmetler</a>
            <a className="relative py-1 text-sm font-medium text-slate-300 hover:text-primary transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:after:shadow-[0_0_8px_rgba(37,140,244,0.8)]" href="#" onClick={(e) => { e.preventDefault(); setCurrentView('partners'); }}>Firmalar İçin</a>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={(e) => { setCurrentView('home'); setTimeout(() => scrollToForm(e), 100); }} className="flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-all hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark shadow-[0_0_15px_rgba(37,140,244,0.4)] hover:shadow-[0_0_25px_rgba(37,140,244,0.6)]">
              Teklif Al
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-slate-400 hover:text-slate-200">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[101] w-[280px] bg-slate-900/95 border-l border-primary/20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <span className="text-xl font-bold tracking-tight text-white">Menü</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-slate-400 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="flex flex-col p-6 gap-6">
                <a 
                  href="#" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    setIsMobileMenuOpen(false); 
                    setCurrentView('home'); 
                    setIsModalOpen(true); 
                  }}
                  className="text-lg font-medium text-slate-300 hover:text-primary transition-colors"
                >
                  Nasıl Çalışır?
                </a>
                <a 
                  href="#" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    setIsMobileMenuOpen(false); 
                    setCurrentView('home'); 
                    setTimeout(() => scrollToServices(e), 100); 
                  }}
                  className="text-lg font-medium text-slate-300 hover:text-primary transition-colors"
                >
                  Hizmetler
                </a>
                <a 
                  href="#" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    setIsMobileMenuOpen(false); 
                    setCurrentView('partners'); 
                  }}
                  className="text-lg font-medium text-slate-300 hover:text-primary transition-colors"
                >
                  Firmalar İçin
                </a>
                
                <div className="mt-4 pt-6 border-t border-white/5 flex flex-col gap-4">
                  <a href="https://wa.me/905469701601" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-400 transition-all hover:bg-emerald-500/20 border border-emerald-500/20">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    WhatsApp'tan Yazın
                  </a>
                  <button 
                    onClick={(e) => { 
                      setIsMobileMenuOpen(false); 
                      setCurrentView('home'); 
                      setTimeout(() => scrollToForm(e), 100); 
                    }} 
                    className="w-full flex items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 shadow-[0_0_15px_rgba(37,140,244,0.4)]"
                  >
                    Teklif Al
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            {/* Hero Section */}
        <section className="relative flex items-center justify-center py-20 lg:py-32 overflow-hidden">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center" 
            style={{ backgroundImage: `linear-gradient(rgba(16, 25, 34, 0.7), rgba(16, 25, 34, 1)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAovv8ZE3whVwklJCCfOwhi3hNEIurq8M7yjzhjoQ45ve8l9uIFVJOwIYijDe-mcM7Nvz74oQfDdowpLlGoKpPfGO33ViIT9Zh4yww1i5mzd_NyiObs8EDUSOSDduMiPv4vazgPqI_7JYAjY8-UpOduDmA7lFnwTjSu8Z-iqzj_NwQDFf39VtNgTj6o8vmY2bwjrpc59IQASL8Qb4DwFXZBg5UTNlZHOZAPsXa7zXI2E7CnPWWVvkrUzCqzTHQVXOlISnqIGJ450n0')` }}
          ></div>
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-[100px]"></div>
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-cyan/10 blur-[100px]"></div>
          
          <div className="relative z-10 mx-auto max-w-[960px] px-4 text-center">
            <div className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                Yeni Nesil Etkinlik Teknolojisi
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Milyonluk Sistemler Tozlanmasın, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-cyan">Etkinliğiniz Parlasın.</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 sm:text-xl">
              Atıl kapasiteyi kazanca dönüştürüyoruz. En iyi AV ekipmanlarına, en uygun fiyatlarla ulaşın. Profesyonel çözümler parmaklarınızın ucunda.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button onClick={scrollToForm} className="flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:scale-[1.02]">
                <span>Hemen Teknik Teklif Al</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
              <button onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-800/50 px-6 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-slate-800 hover:border-slate-500">
                <span>Sistem Nasıl Çalışır?</span>
              </button>
            </div>
          </div>
        </section>

        {/* Stats Panel */}
        <section className="border-y border-slate-800 bg-background-dark/50 backdrop-blur-sm relative z-20">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-2 border-slate-800 sm:border-r last:border-r-0">
              <span className="material-symbols-outlined text-4xl text-accent-cyan mb-2">warehouse</span>
              <p className="text-3xl font-bold text-white">100+</p>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Kayıtlı Depo</p>
            </div>
            <div className="flex flex-col items-center gap-2 border-slate-800 sm:border-r last:border-r-0">
              <span className="material-symbols-outlined text-4xl text-accent-cyan mb-2">savings</span>
              <p className="text-3xl font-bold text-white">%40'a Varan</p>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Tasarruf</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl text-accent-cyan mb-2">support_agent</span>
              <p className="text-3xl font-bold text-white">7/24</p>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Teknik Destek</p>
            </div>
          </div>
        </section>

        {/* Partners Marquee */}
        <section className="py-10 bg-background-dark border-b border-slate-800/50 overflow-hidden">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 mb-8">
            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-500">Çözüm Ortaklarımız</h3>
          </div>
          <div className="relative flex w-full overflow-hidden">
            <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background-dark to-transparent"></div>
            <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background-dark to-transparent"></div>
            <motion.div 
              className="flex w-max items-center gap-16 px-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-3 text-slate-400 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                    <span className="material-symbols-outlined text-4xl">speaker</span>
                    <span className="text-2xl font-black tracking-tighter">AcousticPro</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                    <span className="material-symbols-outlined text-4xl">videocam</span>
                    <span className="text-2xl font-black tracking-tighter">VisionTech</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                    <span className="material-symbols-outlined text-4xl">lightbulb</span>
                    <span className="text-2xl font-black tracking-tighter">LuminaFX</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                    <span className="material-symbols-outlined text-4xl">mic</span>
                    <span className="text-2xl font-black tracking-tighter">SonicWave</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                    <span className="material-symbols-outlined text-4xl">router</span>
                    <span className="text-2xl font-black tracking-tighter">NetStream</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                    <span className="material-symbols-outlined text-4xl">settings_input_hdmi</span>
                    <span className="text-2xl font-black tracking-tighter">ConnectAV</span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section ref={servicesRef} className="py-20 bg-background-dark">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Hizmet Kategorileri</h2>
                <p className="mt-2 text-lg text-slate-400">İhtiyacınız olan tüm teknik altyapı tek platformda.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {servicesData.map((service) => (
                <div 
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-800 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(37,140,244,0.4)] border border-transparent hover:border-primary/50"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                    style={{ backgroundImage: `url('${service.bgImage}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1">
                      <span className="material-symbols-outlined">{service.icon}</span>
                    </span>
                    <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-primary">{service.title}</h3>
                    <p className="mt-2 text-sm text-slate-300 line-clamp-2">{service.shortDesc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Network Map & Quick Form Section */}
        <section ref={formRef} className="relative py-20 bg-slate-900 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-40 pointer-events-none" 
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          {/* Black Overlay for better readability */}
          <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-transparent to-background-dark/90 pointer-events-none"></div>
          
          <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8 items-center">
            {/* Text Content */}
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Türkiye Geneline Yayılmış <br/>
                <span className="text-primary">Geniş Tedarik Ağı</span>
              </h2>
              <p className="text-lg text-slate-300">
                İstanbul'dan Antalya'ya, Ankara'dan İzmir'e. Sync ağı sayesinde, etkinliğiniz nerede olursa olsun, yerel ve onaylı tedarikçilere anında ulaşın. Lojistik maliyetlerini düşürün, hızı artırın.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 rounded-lg bg-slate-800/50 p-4 border border-slate-700 backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span className="material-symbols-outlined">check_circle</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-white">Onaylı Tedarikçi</p>
                    <p className="text-slate-400">Tüm ekipmanlar sigortalı</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-slate-800/50 p-4 border border-slate-700 backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span className="material-symbols-outlined">rocket_launch</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-white">Hızlı Kurulum</p>
                    <p className="text-slate-400">24 saat içinde hazır</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-emerald-500/10 p-4 border border-emerald-500/20 backdrop-blur-sm w-full sm:w-auto">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-emerald-400">Sync Güvencesi</p>
                    <p className="text-slate-300">Teknik Denetim Tamamlandı</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Quote Form */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-6 shadow-2xl backdrop-blur-md lg:p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">Hızlı Rider Teklifi Oluştur</h3>
                <p className="text-sm text-slate-400">Etkinlik detaylarını girin, size özel çözümleri sunalım.</p>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
                <span className="text-primary flex items-center gap-1"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-[10px]">1</span> Bilgileri Gir</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="flex items-center gap-1"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-700 text-[10px]">2</span> Fiyatları Karşılaştır</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="flex items-center gap-1"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-700 text-[10px]">3</span> Etkinliğini Başlat</span>
              </div>
              
              {submitSuccess ? (
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-3">
                    <span className="material-symbols-outlined text-[24px]">check</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Talebiniz Alındı!</h4>
                  <p className="text-sm text-slate-300">En kısa sürede sizinle iletişime geçeceğiz.</p>
                </div>
              ) : isSubmitting ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="material-symbols-outlined text-[48px] text-primary animate-spin mb-4">sync</span>
                  <h4 className="text-lg font-bold text-white mb-2">Talebiniz alınmıştır</h4>
                  <p className="text-sm text-slate-300 max-w-[280px]">2026 teknolojisiyle en uygun partnerlerimizle eşleştiriliyorsunuz...</p>
                </div>
              ) : (
                <form action="https://formsubmit.co/serhat16012015@gmail.com" method="POST" className="flex flex-col gap-4">
                  <input type="hidden" name="_next" value={typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?status=success` : ''} />
                  <input type="hidden" name="_captcha" value="false" />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-300" htmlFor="date">Etkinlik Tarihi</label>
                      <input 
                        required
                        id="date" 
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-300" htmlFor="attendees">Kişi Sayısı</label>
                      <select 
                        required
                        id="attendees"
                        name="attendees"
                        value={formData.attendees}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="">Seçiniz</option>
                        <option value="0-50">0 - 50</option>
                        <option value="50-200">50 - 200</option>
                        <option value="200-500">200 - 500</option>
                        <option value="500+">500+</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-300" htmlFor="venue">Mekan / Şehir</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-500 text-[20px]">location_on</span>
                      <input 
                        required
                        id="venue" 
                        name="venue"
                        type="text"
                        value={formData.venue}
                        onChange={handleInputChange}
                        placeholder="Örn: İstanbul Kongre Merkezi" 
                        className="w-full rounded-lg border border-slate-600 bg-slate-900 pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-300" htmlFor="email">E-posta Adresiniz</label>
                      <input 
                        required
                        id="email" 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="ornek@sirket.com" 
                        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-300" htmlFor="phone">Telefon Numaranız</label>
                      <input 
                        required
                        id="phone" 
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="05xx xxx xx xx" 
                        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-300" htmlFor="notes">Ek Notlar ve Özel Talepler</label>
                    <textarea 
                      id="notes" 
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Örn: Özel ekipman tercihleri, kurulum saati veya teknik detaylar..." 
                      className="w-full min-h-[100px] resize-y rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                    />
                  </div>
                  {(formData.date || formData.venue) && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-center"
                    >
                      <span className="text-xs font-medium text-emerald-400 animate-pulse">
                        Seçtiğiniz {formData.date && formData.venue ? 'tarih ve mekan' : formData.date ? 'tarih' : 'mekan'} için 15 partnerimiz hazır!
                      </span>
                    </motion.div>
                  )}
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 relative overflow-hidden flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity duration-75">
                      <span className="w-full h-full bg-white/30 animate-ping rounded-lg"></span>
                    </span>
                    <span className="relative z-10 flex items-center gap-2">
                      <span>Teklif Al</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </span>
                  </motion.button>
                </form>
              )}
              
              {/* Social Proof */}
              <div className="mt-6 flex items-center justify-center gap-3 rounded-lg bg-slate-800/50 py-3 px-4 border border-slate-700/50">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <p className="text-xs font-medium text-slate-300">
                  Son 24 saat içinde <strong className="text-white">12 farklı etkinlik</strong> için en uygun fiyatlı teklifler iletildi.
                </p>
              </div>
            </div>
          </div>
        </section>
          </>
        ) : (
          <section className="relative flex items-center justify-center py-20 lg:py-32 overflow-hidden min-h-[80vh]">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-20" 
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-background-dark/80 to-background-dark z-0"></div>
            
            <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Atıl Kapasitenizi <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-cyan">Nakde Çevirin.</span>
                </h1>
                <p className="mb-8 text-lg text-slate-300">
                  Deponuzda bekleyen AV ekipmanlarınızı Sync ağına dahil edin, Türkiye'nin dört bir yanındaki etkinliklere kiralayarak gelirinizi artırın.
                </p>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center gap-4 rounded-lg bg-slate-800/50 p-4 border border-slate-700/50 backdrop-blur-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <span className="material-symbols-outlined">work</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Ekstra İş İmkanı</h3>
                      <p className="text-sm text-slate-400">Boşta duran ekipmanlarınız için sürekli kiralama talepleri alın.</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 rounded-lg bg-slate-800/50 p-4 border border-slate-700/50 backdrop-blur-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <span className="material-symbols-outlined">group</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Personel Verimliliği</h3>
                      <p className="text-sm text-slate-400">Teknik ekibinizi farklı projelerde değerlendirerek verimliliği artırın.</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 rounded-lg bg-slate-800/50 p-4 border border-slate-700/50 backdrop-blur-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <span className="material-symbols-outlined">verified_user</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">%100 Güvenli Ödeme</h3>
                      <p className="text-sm text-slate-400">Sync güvencesiyle ödemelerinizi zamanında ve eksiksiz alın.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl border border-slate-700 bg-slate-800/80 p-6 shadow-2xl backdrop-blur-md lg:p-8"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white">Partnerlik Başvurusu</h3>
                  <p className="text-sm text-slate-400 mt-2">Ağımıza katılmak için bilgilerinizi bırakın, sizi arayalım.</p>
                </div>
                <form action="https://formsubmit.co/serhat16012015@gmail.com" method="POST" className="flex flex-col gap-4">
                  <input type="hidden" name="_subject" value="Sync - Yeni Partner Başvurusu" />
                  <input type="hidden" name="_next" value={typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?status=success` : ''} />
                  <input type="hidden" name="_captcha" value="false" />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-300" htmlFor="companyName">Şirket Adı</label>
                    <input 
                      required
                      id="companyName" 
                      name="Sirket_Adi"
                      type="text"
                      placeholder="Örn: ABC Prodüksiyon" 
                      className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-3 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-300" htmlFor="phone">Telefon Numarası</label>
                    <input 
                      required
                      id="phone" 
                      name="Telefon_Numarasi"
                      type="tel"
                      placeholder="05XX XXX XX XX" 
                      className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-3 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                    />
                  </div>
                  <button 
                    type="submit"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-800 shadow-[0_0_15px_rgba(37,140,244,0.4)] hover:shadow-[0_0_25px_rgba(37,140,244,0.6)]"
                  >
                    <span>Başvuruyu Gönder</span>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </form>
              </motion.div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-background-dark py-12">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col gap-4 items-center md:items-start">
              <div className="flex items-center gap-2 text-white">
                <span className="material-symbols-outlined">sync_alt</span>
                <span className="text-xl font-bold">Sync</span>
              </div>
              <p className="text-sm text-slate-400 text-center md:text-left max-w-xs">
                Profesyonel AV ekipman kiralama ve etkinlik teknolojileri platformu.
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <h4 className="text-white font-bold tracking-wide uppercase text-sm">KEŞFET</h4>
              <nav className="flex flex-col items-center gap-3">
                <button onClick={() => setFooterModal('faq')} className="text-sm text-slate-400 hover:text-primary transition-colors">SSS</button>
                <button onClick={() => setFooterModal('contact')} className="text-sm text-slate-400 hover:text-primary transition-colors">İletişim</button>
                <button onClick={() => setFooterModal('partnership')} className="text-sm text-slate-400 hover:text-primary transition-colors">Çözüm Ortaklığı</button>
              </nav>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <h4 className="text-white font-bold tracking-wide uppercase text-sm">Bizi Takip Edin</h4>
              <div className="flex gap-4">
                <a className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(37,140,244,0.8)] transition-all" href="#">
                  <span className="sr-only">X (Twitter)</span>
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/></svg>
                </a>
                <a className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(37,140,244,0.8)] transition-all" href="#">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all" href="https://wa.me/905469701601" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">WhatsApp</span>
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex justify-center">
            <p className="text-xs text-slate-500 text-center">© 2026 Sync Inc. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      {/* Footer Modals */}
      <AnimatePresence>
        {footerModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setFooterModal(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-2xl sm:p-8"
            >
              <button 
                onClick={() => setFooterModal(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              
              {footerModal === 'faq' && (
                <>
                  <h3 className="mb-6 text-2xl font-bold text-white">Sıkça Sorulan Sorular</h3>
                  <div className="flex flex-col gap-6">
                    <div>
                      <h4 className="font-bold text-primary mb-2">Kiralama süreci nasıl işliyor?</h4>
                      <p className="text-sm text-slate-300">Teklif formunu doldurduktan sonra, sistemimiz talebinize en uygun partnerleri eşleştirir ve size detaylı bir fiyat teklifi sunar. Onayınızın ardından ekipmanlar etkinlik gününde hazır edilir.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-2">Teknik destek sağlıyor musunuz?</h4>
                      <p className="text-sm text-slate-300">Evet, kiraladığınız tüm ekipmanlar için kurulum ve etkinlik süresince profesyonel teknik destek ekibimiz yanınızdadır.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-2">İptal ve iade koşulları nelerdir?</h4>
                      <p className="text-sm text-slate-300">Etkinlik tarihinden 48 saat öncesine kadar yapılan iptallerde kesintisiz iade sağlanır. Daha geç iptallerde <a href="sozlesme.html" className="text-primary hover:underline">sözleşme şartları</a> geçerlidir.</p>
                    </div>
                  </div>
                </>
              )}

              {footerModal === 'contact' && (
                <>
                  <h3 className="mb-6 text-2xl font-bold text-white">İletişim</h3>
                  <div className="flex flex-col gap-6">
                    <a href="tel:+905469701601" className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-primary/50 transition-colors group">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">call</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Destek Hattı</p>
                        <p className="font-bold text-white">+90 (546) 970 16 01</p>
                      </div>
                    </a>
                    <a href="mailto:destek@sync.com.tr" className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-primary/50 transition-colors group">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">E-posta</p>
                        <p className="font-bold text-white">destek@sync.com.tr</p>
                      </div>
                    </a>
                    <p className="text-sm text-slate-400 mt-2 text-center">Destek hattımıza haftanın her günü 09:00 - 18:00 saatleri arasında ulaşabilir, e-posta üzerinden ise bize 7/24 kesintisiz yazabilirsiniz.</p>
                  </div>
                </>
              )}

              {footerModal === 'partnership' && (
                <>
                  <h3 className="mb-6 text-2xl font-bold text-white">Partnerimiz Olun</h3>
                  <div className="flex flex-col gap-6">
                    <p className="text-sm text-slate-300">
                      Sync ağına katılarak atıl kapasitenizi değerlendirin ve Türkiye'nin dört bir yanındaki etkinliklere ekipman sağlayın. Güvenli ödeme altyapımız ve geniş müşteri ağımızla gelirinizi artırın.
                    </p>
                    <button 
                      onClick={() => { setFooterModal(null); setCurrentView('partners'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="w-full rounded-lg bg-primary py-3 font-bold text-white transition-all hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-800 shadow-[0_0_15px_rgba(37,140,244,0.4)] hover:shadow-[0_0_25px_rgba(37,140,244,0.6)]"
                    >
                      Hemen Başvur
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-2xl sm:p-8"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
              >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <h3 className="mb-6 text-2xl font-bold text-white">Sync Nasıl Çalışır?</h3>
            
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 font-bold text-primary">
                  1
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  <strong className="text-white">Adım 1:</strong> 'Teklif Al' butonuna tıklayarak etkinliğinizin tarihini, katılımcı sayısını ve konumunu bize iletin.
                </p>
              </div>
              
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 font-bold text-primary">
                  2
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  <strong className="text-white">Adım 2:</strong> Talebiniz sistemimize düştüğünde, belirttiğiniz konumdaki en uygun profesyonel firmaları sizin için filtreleyelim.
                </p>
              </div>
              
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 font-bold text-primary">
                  3
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  <strong className="text-white">Adım 3:</strong> Çok kısa bir süre içinde, paylaştığınız mail adresine; hangi firmanın ne kadar ücretle bu işi yapabileceğini ve tüm teknik detayları içeren kapsamlı bir liste gönderelim.
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="mt-8 w-full rounded-lg bg-primary py-3 font-bold text-white transition-all hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              Anladım
            </button>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-[0_0_40px_rgba(37,140,244,0.15)] backdrop-blur-xl"
            >
              {/* Header Image Area */}
            <div className="relative h-48 w-full">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${selectedService.bgImage}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary backdrop-blur-md border border-primary/30 shadow-[0_0_15px_rgba(37,140,244,0.5)]">
                  <span className="material-symbols-outlined text-[24px]">{selectedService.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-white drop-shadow-md">{selectedService.title}</h3>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">Hizmet Detayı</h4>
                <p className="text-base leading-relaxed text-slate-300">
                  {selectedService.description}
                </p>
              </div>
              
              <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-5">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent-cyan">
                  <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                  Kullanılan Ekipmanlar
                </h4>
                <ul className="flex flex-col gap-2">
                  {selectedService.equipment.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="material-symbols-outlined mt-0.5 text-[16px] text-accent-cyan">check_circle</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
