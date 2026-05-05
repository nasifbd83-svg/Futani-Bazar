/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Heart, 
  Users, 
  Info, 
  Phone, 
  ShieldCheck, 
  Download, 
  Share2, 
  BookOpen, 
  Stethoscope, 
  HandHelping, 
  CloudRain, 
  Ban,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Camera,
  Facebook,
  MessageCircle
} from 'lucide-react';
import { BENGALI_TEXT } from './constants';
import { Member, Activity, Donation, CommitteeMember } from './types';

// Mock data for initial UI - will be replaced by Firebase later
const INITIAL_ACTIVITIES: Activity[] = [
  { id: '1', title: 'ব্লাড ডোনেশন ক্যাম্প', description: 'আমরা নিয়মিত রক্তদান কর্মসূচী পালন করি।', date: '২০২৪-০৩-১০', imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116ecaaba7f?q=80&w=500', category: 'Blood Donation' },
  { id: '2', title: 'বিনামূল্যে চিকিৎসা', description: 'গরীব ও দুস্থদের জন্য চিকিৎসা সহায়তা।', date: '২০২৪-০২-১৫', imageUrl: 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?q=80&w=500', category: 'Medical Camp' },
];

const INITIAL_COMMITTEE: CommitteeMember[] = [
  // উপদেষ্টা পরিষদ (Advisory Council)
  { id: 'adv1', name: 'মোঃ রানাউল ইসলাম', designation: 'সহকারী শিক্ষক, মঞ্জুর আহমদ উচ্চ বিদ্যালয়, ফুটানি বাজার, ভোলাহাট', phone: '', imageUrl: 'https://i.pravatar.cc/150?u=adv1', type: 'Advisory' },
  { id: 'adv2', name: 'মোঃ আখলাসুর রহমান', designation: 'বিশিষ্ট ব্যবসায়ী, ফুটানি বাজার, ভোলাহাট', phone: '', imageUrl: 'https://i.pravatar.cc/150?u=adv2', type: 'Advisory' },
  { id: 'adv3', name: 'মোঃ মিনহাজুল ইসলাম', designation: 'প্রোপাইটার, মেসার্স মিনহাজ মেডিসিন কর্নার, ফুটানি বাজার, ভোলাহাট', phone: '', imageUrl: 'https://i.pravatar.cc/150?u=adv3', type: 'Advisory' },
  { id: 'adv4', name: 'মোঃ শিমুল ইসলাম', designation: 'সিঙ্গাপুর প্রবাসী, ফুটানি বাজার, ভোলাহাট', phone: '', imageUrl: 'https://i.pravatar.cc/150?u=adv4', type: 'Advisory' },
  { id: 'adv5', name: 'শীঘ্রই প্রকাশিত হবে', designation: '', phone: '', imageUrl: 'https://i.pravatar.cc/150?u=empty1', type: 'Advisory' },
  { id: 'adv6', name: 'শীঘ্রই প্রকাশিত হবে', designation: '', phone: '', imageUrl: 'https://i.pravatar.cc/150?u=empty2', type: 'Advisory' },
  { id: 'adv7', name: 'শীঘ্রই প্রকাশিত হবে', designation: '', phone: '', imageUrl: 'https://i.pravatar.cc/150?u=empty3', type: 'Advisory' },
  
  // কার্যকরী কমিটি (Executive Committee)
  { id: '1', name: 'মোঃ রবিন বিশ্বাস', designation: 'পরিচালক', phone: '+880 1314-213801', imageUrl: 'https://i.pravatar.cc/150?u=rb', type: 'Executive' },
  { id: '2', name: 'মোঃ জাহিদ হাসান', designation: 'সভাপতি', phone: '+880 1799-103468', imageUrl: 'https://i.pravatar.cc/150?u=zh', type: 'Executive' },
  { id: '3', name: 'মোঃ মাহবুব হাসান', designation: 'সহ-সভাপতি', phone: '+880 1752-327674', imageUrl: 'https://i.pravatar.cc/150?u=mh', type: 'Executive' },
  { id: '4', name: 'মোঃ সয়ন রেজা', designation: 'সাধারণ সম্পাদক', phone: '+880 1738-849693', imageUrl: 'https://i.pravatar.cc/150?u=sr', type: 'Executive' },
  { id: '5', name: 'তানজিম আহমেদ', designation: 'যুগ্ম-সাধারণ সম্পাদক', phone: '+880 1714-014481', imageUrl: 'https://i.pravatar.cc/150?u=ta', type: 'Executive' },
  { id: '6', name: 'মোঃ সামিউল ইসলাম', designation: 'সাংগঠনিক সম্পাদক', phone: '+880 1324-115412', imageUrl: 'https://i.pravatar.cc/150?u=si', type: 'Executive' },
  { id: '7', name: 'মোঃ সাহিদ হাসান', designation: 'সমাজকল্যাণ ও প্রচার সম্পাদক', phone: '+880 1705-242159', imageUrl: 'https://i.pravatar.cc/150?u=sh', type: 'Executive' },
  { id: '8', name: 'মোঃ সোহেল রানা', designation: 'কোষাধ্যক্ষ ও দপ্তর সম্পাদক', phone: '+880 1783-953134', imageUrl: 'https://i.pravatar.cc/150?u=sra', type: 'Executive' },
  { id: '9', name: 'মোঃ মোস্তাফিজুর রহমান', designation: 'শিক্ষা ও স্বাস্থ্য বিষয়ক সম্পাদক', phone: '+880 1971-683094', imageUrl: 'https://i.pravatar.cc/150?u=mr', type: 'Executive' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showInstallPopup, setShowInstallPopup] = useState(false);

  // Sync state with browser history for Android Back Button support
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.tab) {
        setActiveTab(event.state.tab);
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initial state check
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'join', 'activities', 'committee', 'donate', 'contact', 'admin'].includes(hash)) {
      setActiveTab(hash);
      window.history.replaceState({ tab: hash }, '', `#${hash}`);
    } else {
      window.history.replaceState({ tab: 'home' }, '', '#home');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const changeTab = (tabId: string) => {
    if (tabId === activeTab) return;
    
    setActiveTab(tabId);
    window.history.pushState({ tab: tabId }, '', `#${tabId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavItem = ({ name, id, icon: Icon }: { name: string, id: string, icon: any }) => (
    <button
      onClick={() => changeTab(id)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id ? 'bg-primary text-white shadow-md' : 'hover:bg-primary-light text-text-main/70'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{name}</span>
    </button>
  );

  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: BENGALI_TEXT.orgName,
          text: BENGALI_TEXT.slogan,
          url: window.location.href,
        });
      } catch (error) {
        // Ignore AbortError (user canceled) but log others if useful
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-app flex flex-col font-sans overflow-x-hidden">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border-main px-4 py-3 flex items-center justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
            <Heart size={20} fill="white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary leading-tight line-clamp-1">{BENGALI_TEXT.orgName}</h1>
            <p className="text-[10px] text-text-main/50 font-medium uppercase tracking-wider">ভোলাহাট, চাঁপাইনবাবগঞ্জ</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={shareApp} className="p-2 text-primary hover:bg-primary-light rounded-full transition-colors">
            <Share2 size={20} />
          </button>
          <button onClick={toggleMenu} className="lg:hidden p-2 text-primary hover:bg-primary-light rounded-full">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className="hidden lg:flex items-center gap-4">
             <button onClick={() => changeTab('home')} className={`px-3 py-1 font-medium transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-text-main/60 hover:text-primary'}`}>মূল পাতা</button>
             <button 
                onClick={() => changeTab('admin')} 
                className="px-4 py-1.5 bg-primary-light text-primary rounded-full text-sm font-medium hover:bg-border-main transition-colors"
              >
                অ্যাডমিন প্যানেল
              </button>
             <button onClick={() => changeTab('join')} className="bg-primary text-white px-5 py-2 rounded-full font-medium shadow-md hover:scale-[1.02] transition-all">সদস্য হন</button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white p-6 pt-24 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              <NavItem name="মূল পাতা" id="home" icon={BookOpen} />
              <NavItem name="আমাদের লক্ষ্য" id="objectives" icon={ShieldCheck} />
              <NavItem name="সদস্য আবেদন" id="join" icon={Users} />
              <NavItem name="কমিটি" id="committee" icon={Info} />
              <NavItem name="কার্যক্রম" id="activities" icon={HandHelping} />
              <NavItem name="দান করুন" id="donate" icon={Heart} />
              <NavItem name="যোগাযোগ" id="contact" icon={Phone} />
              <hr className="my-4 border-slate-100" />
              <button 
                onClick={() => { setIsAdmin(!isAdmin); setIsMenuOpen(false); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                <LayoutDashboard size={20} />
                <span className="font-medium">অ্যাডমিন ড্যাশবোর্ড</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 lg:px-8">
        {activeTab === 'home' && <HomeView setActiveTab={changeTab} />}
        {activeTab === 'join' && <JoinView />}
        {activeTab === 'activities' && <ActivitiesView />}
        {activeTab === 'committee' && <CommitteeView />}
        {activeTab === 'donate' && <DonationView />}
        {activeTab === 'contact' && <ContactView />}
        {activeTab === 'admin' && <AdminView />}
      </main>

      <AnimatePresence>
        {showInstallPopup && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setShowInstallPopup(false)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full"
              >
                <X size={20} />
              </button>
              <div className="text-center space-y-4">
                <div className="bg-primary-soft w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-primary">
                  <Download size={32} />
                </div>
                <h3 className="text-2xl font-bold">{BENGALI_TEXT.apk.guide}</h3>
                <div className="text-left space-y-3 text-slate-600 bg-slate-50 p-4 rounded-xl text-sm">
                  <p>১. নিচের ডাউনলোড বাটনে ক্লিক করুন।</p>
                  <p>২. APK ফাইলটি আপনার ফোনে ডাউনলোড করুন।</p>
                  <p>৩. 'Install from Unknown Sources' অনুমোদন দিন।</p>
                  <p>৪. ইনস্টলেশন সম্পন্ন করুন।</p>
                </div>
                <button className="w-full bg-primary text-white py-3 rounded-xl font-bold">
                  ডাউনলোড শুরু করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      <footer className="bg-white border-t border-border-main py-6 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap justify-center gap-6 items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#D70067] rounded flex items-center justify-center text-[10px] text-white font-bold shadow-sm">b</div>
            <span className="text-sm text-text-main font-mono font-bold tracking-tight">017XX-XXXXXX</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#F37021] rounded flex items-center justify-center text-[10px] text-white font-bold shadow-sm">N</div>
            <span className="text-sm text-text-main font-mono font-bold tracking-tight">018XX-XXXXXX</span>
          </div>
          <div className="hidden md:block h-4 w-[1px] bg-border-main"></div>
           <button onClick={() => setShowInstallPopup(true)} className="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md hover:opacity-90 active:scale-95 transition-all">
             <Download size={14} /> APK ডাউনলোড
           </button>
        </div>
        <div className="text-[11px] text-text-main/40 uppercase tracking-widest font-bold">
          © ২০২৪ {BENGALI_TEXT.orgName} | <span className="text-text-main/60">{BENGALI_TEXT.footer.madeBy}</span>
        </div>
      </footer>
    </div>
  );
}

function HomeView({ setActiveTab }: { setActiveTab: (t: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-primary p-10 lg:p-20 text-white isolate shadow-xl">
        <div className="absolute inset-0 islamic-pattern opacity-[0.03] -z-10" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white opacity-[0.05] rounded-full blur-3xl -z-10" />
        
        <div className="max-w-2xl space-y-8">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight"
          >
            {BENGALI_TEXT.slogan}
          </motion.h2>
          <p className="text-white opacity-80 text-xl lg:text-2xl font-medium max-w-lg leading-relaxed">
            প্রতিষ্ঠিত: ২০২৩ | ৬টি গ্রামে সেবার অঙ্গীকার। আমরা মানবতার মশালে আলোর পথ যাত্রী।
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => setActiveTab('join')}
              className="bg-white text-primary px-8 py-3.5 rounded-lg font-extrabold shadow-lg hover:bg-gray-100 active:scale-95 transition-all"
            >
              সদস্য হোন
            </button>
            <button 
              onClick={() => setActiveTab('donate')}
              className="bg-accent text-text-main px-8 py-3.5 rounded-lg font-extrabold shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              দান করুন
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              className="border-2 border-white/30 text-white px-8 py-3.5 rounded-lg font-extrabold backdrop-blur-sm hover:bg-white/10 active:scale-95 transition-all"
            >
              যোগাযোগ
            </button>
          </div>
        </div>
      </section>

      {/* Quick Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        {/* ... objectives ... */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-border-soft space-y-6">
           <h3 className="text-primary font-extrabold text-xl flex items-center gap-3">
             <div className="w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/20" /> {BENGALI_TEXT.objectives.title}
           </h3>
           <ul className="grid grid-cols-1 gap-4">
            {BENGALI_TEXT.objectives.list.map((obj, i) => (
              <li key={obj.id} className="flex items-center gap-4 text-text-main font-medium group">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  {i === 0 && <BookOpen size={18} />}
                  {i === 1 && <Stethoscope size={18} />}
                  {i === 2 && <HandHelping size={18} />}
                  {i === 3 && <CloudRain size={18} />}
                  {i === 4 && <Ban size={18} />}
                </div>
                <span>{obj.text}</span>
              </li>
            ))}
           </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-border-soft space-y-6">
           <h3 className="text-primary font-extrabold text-xl">{BENGALI_TEXT.committee.title}</h3>
           <div className="space-y-5">
             {INITIAL_COMMITTEE.slice(0, 3).map((member, idx) => (
               <div key={idx} className="flex items-center gap-4 group">
                 <div className="w-14 h-14 rounded-full bg-primary-light border-4 border-white shadow-sm overflow-hidden p-0.5 group-hover:border-primary transition-all">
                   <img src={member.imageUrl} className="w-full h-full object-cover rounded-full" />
                 </div>
                 <div>
                    <p className="font-extrabold text-text-main">{member.name}</p>
                    <p className="text-[10px] text-text-main/50 font-bold uppercase tracking-wider">{member.designation}</p>
                    <p className="text-[10px] text-primary font-bold mt-0.5">{member.phone}</p>
                 </div>
               </div>
             ))}
           </div>
           <button onClick={() => setActiveTab('committee')} className="text-primary font-bold text-sm flex items-center gap-1 hover:underline underline-offset-4">
             সম্পূর্ণ কমিটি দেখুন <ChevronRight size={16} />
           </button>
        </div>
      </div>
    </motion.div>
  );
}

function ActivitiesView() {
  const [activities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <div className="text-center">
        <h2 className="text-4xl font-black text-primary">{BENGALI_TEXT.activities.title}</h2>
        <div className="w-16 h-1 bg-accent mx-auto mt-3 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map(activity => (
          <div key={activity.id} className="bg-white rounded-2xl overflow-hidden border border-border-soft shadow-md hover:shadow-xl transition-all group">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={activity.imageUrl} 
                alt={activity.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 space-y-3">
              <div className={`p-4 bg-primary-soft rounded-xl border-l-4 border-${activity.category === 'Blood Donation' ? 'red' : 'blue'}-500`}>
                <p className="text-xs font-bold text-text-main uppercase tracking-widest">{activity.title}</p>
                <p className="text-[10px] text-text-main/50 mt-1 font-bold">{activity.date} • {activity.category}</p>
              </div>
              <p className="text-text-main/60 text-sm leading-relaxed">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CommitteeView() {
  const categories = [
    { title: BENGALI_TEXT.committee.advisory, type: 'Advisory' },
    { title: BENGALI_TEXT.committee.executive, type: 'Executive' },
    { title: BENGALI_TEXT.committee.general, type: 'General' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
       <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">{BENGALI_TEXT.committee.title}</h2>
        <div className="w-20 h-1.5 bg-primary mx-auto mt-2 rounded-full" />
      </div>

      {categories.map((cat, idx) => (
        <section key={idx} className="space-y-6">
          <h3 className="text-xl font-bold text-primary px-4 border-l-4 border-primary">{cat.title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {INITIAL_COMMITTEE.filter(c => c.type === cat.type).map(member => (
              <div key={member.id} className="text-center group">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-primary-soft group-hover:border-primary transition-all p-1">
                  <img src={member.imageUrl} className="w-full h-full object-cover rounded-full" alt={member.name} />
                </div>
                <h4 className="font-bold text-slate-800 leading-tight">{member.name}</h4>
                <p className="text-[10px] text-slate-500 font-medium mt-1 leading-relaxed px-2">{member.designation}</p>
                {member.phone && <p className="text-[10px] text-primary font-bold mt-1">{member.phone}</p>}
              </div>
            ))}
            {cat.type === 'General' && (
              <div className="text-center opacity-50 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-4">
                 <Users size={24} className="mb-2 text-slate-300" />
                 <p className="text-xs font-medium">অন্যান্য সদস্যরা শীঘ্রই যুক্ত হবে</p>
              </div>
            )}
          </div>
        </section>
      ))}
    </motion.div>
  );
}

function DonationView() {
  const [amount, setAmount] = useState('');
  
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-primary">{BENGALI_TEXT.donation.title}</h2>
        <p className="text-text-main/60 mt-2 font-medium">আপনার সামান্য দানে জ্বলতে পারে একটি প্রাণের প্রদীপ।</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-border-soft shadow-xl space-y-6">
        <div className="bg-primary/5 p-5 rounded-xl border border-primary/10 flex items-center justify-between">
           <div>
              <p className="text-[10px] font-extrabold text-primary uppercase tracking-widest mb-1">পার্সোনাল নম্বর</p>
              <p className="text-2xl font-black text-text-main font-mono">01700-000000</p>
           </div>
           <div className="flex gap-2">
             <div className="bg-white p-2 rounded-lg shadow-sm font-black text-[#E2136E] text-xs">BKASH</div>
             <div className="bg-white p-2 rounded-lg shadow-sm font-black text-[#F49124] text-xs">NAGAD</div>
           </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-black text-text-main/50 block uppercase tracking-widest">টাকার পরিমাণ</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">৳</span>
              <input 
                type="number" 
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-primary-soft border border-border-main outline-none focus:ring-2 focus:ring-primary/20 font-black text-xl" 
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-text-main/50 block uppercase tracking-widest">{BENGALI_TEXT.donation.screenshot}</label>
            <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-border-main rounded-2xl p-8 cursor-pointer hover:bg-primary-soft transition-all group">
              <Camera size={38} className="text-border-main group-hover:text-primary mb-2 transition-colors" />
              <p className="text-xs font-bold text-text-main/40 uppercase tracking-widest">ফাইল নির্বাচন করুন</p>
              <input type="file" className="hidden" />
            </label>
          </div>

          <button className="w-full bg-accent text-text-main py-4 rounded-lg font-black shadow-lg hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Heart size={20} fill="currentColor" /> {BENGALI_TEXT.donation.submit}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ContactView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">{BENGALI_TEXT.contact.title}</h2>
        <div className="w-20 h-1.5 bg-primary mx-auto mt-2 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
           <p className="text-lg text-slate-600 leading-relaxed">
             যেকোনো জরুরি প্রয়োজনে অথবা রক্তদানের জন্য সরাসরি আমাদের সাথে যোগাযোগ করুন।
           </p>
           
           <div className="space-y-4">
             <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="bg-green-100 text-green-600 p-3 rounded-xl"><Phone size={24} /></div>
                <div>
                   <p className="text-xs font-bold text-slate-400 uppercase">জরুরি নম্বর</p>
                   <p className="text-xl font-bold text-slate-800">০১৭০০-০০০০০০</p>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center justify-center gap-2 bg-[#1877F2] text-white py-3 rounded-xl font-bold shadow-md">
                   <Facebook size={20} /> ফেসবুক
                </a>
                <a href="#" className="flex items-center justify-center gap-2 bg-[#00B2FF] text-white py-3 rounded-xl font-bold shadow-md">
                   <MessageCircle size={20} /> মেসেঞ্জার
                </a>
             </div>
           </div>
        </div>

        <div className="bg-slate-100 rounded-3xl overflow-hidden aspect-square relative grayscale opacity-70">
           <img 
             src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600" 
             className="w-full h-full object-cover" 
             alt="Location"
           />
           <div className="absolute inset-0 bg-primary/20" />
           <div className="absolute bottom-6 left-6 right-6 bg-white p-4 rounded-xl shadow-lg">
              <p className="text-sm font-bold text-slate-800">ভোলাহাট কার্যালয়</p>
              <p className="text-xs text-slate-500 font-medium">{BENGALI_TEXT.office}</p>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function AdminView() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [pendingMembers, setPendingMembers] = useState<Member[]>([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('pending_members') || '[]');
    setPendingMembers(list);
  }, []);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    const newList = pendingMembers.map(m => m.id === id ? { ...m, status: action } : m);
    setPendingMembers(newList);
    localStorage.setItem('pending_members', JSON.stringify(newList));
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-20 animate-in fade-in slide-in-from-bottom-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl text-center space-y-6">
           <div className="bg-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
             <ShieldCheck size={32} />
           </div>
           <h3 className="text-2xl font-bold">অ্যাডমিন প্রবেশ</h3>
           <input 
             type="password" 
             className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-primary"
             placeholder="পাসওয়ার্ড দিন"
             value={password}
             onChange={e => setPassword(e.target.value)}
           />
           <button 
             onClick={() => password === '1234' ? setIsAuthenticated(true) : alert('ভুল পাসওয়ার্ড')}
             className="w-full bg-primary text-white py-3 rounded-xl font-bold"
           >
             প্রবেশ করুন
           </button>
           <p className="text-[10px] text-slate-400">Default: 1234</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900">{BENGALI_TEXT.admin.title}</h2>
        <button onClick={() => setIsAuthenticated(false)} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
          <LogOut size={14} /> লগ আউট
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-2">
           <Users size={16} className="text-slate-400" />
           <p className="text-sm font-bold text-slate-600 uppercase tracking-tighter">সদস্য আবেদন তালিকা ({pendingMembers.filter(m => m.status === 'pending').length})</p>
        </div>
        <div className="divide-y divide-slate-50">
          {pendingMembers.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-medium">কোনো আবেদন নেই</div>
          ) : (
            pendingMembers.map(member => (
              <div key={member.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-lg font-bold text-slate-800">{member.name}</p>
                  <p className="text-sm text-slate-500">{member.phone} | {member.address}</p>
                  <p className="text-xs text-slate-400 font-medium">রেফারেন্স: {member.reference1}, {member.reference2}</p>
                </div>
                {member.status === 'pending' ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAction(member.id, 'approved')}
                      className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-primary/90 transition-all"
                    >
                      {BENGALI_TEXT.admin.approve}
                    </button>
                    <button 
                      onClick={() => handleAction(member.id, 'rejected')}
                      className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-100 transition-all"
                    >
                      {BENGALI_TEXT.admin.reject}
                    </button>
                  </div>
                ) : (
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${member.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {member.status === 'approved' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function JoinView() {
  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', ref1: '', ref2: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('আপনার আবেদনটি গ্রহণ করা হয়েছে! অ্যাডমিন প্যানেল থেকে অনুমোদন পাওয়ার পর আপনাকে জানানো হবে।');
    // Save to local storage for now
    const members = JSON.parse(localStorage.getItem('pending_members') || '[]');
    localStorage.setItem('pending_members', JSON.stringify([...members, { ...formData, id: Date.now().toString(), status: 'pending', createdAt: Date.now() }]));
    setFormData({ name: '', phone: '', address: '', ref1: '', ref2: '' });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-primary">{BENGALI_TEXT.membership.title}</h2>
        <p className="text-text-main/60 font-bold mt-1 tracking-wider uppercase text-xs">{BENGALI_TEXT.membership.ageLimit}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-border-soft shadow-lg space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-extrabold text-text-main/70 block uppercase tracking-wide">{BENGALI_TEXT.membership.fields.name}</label>
          <input 
            required
            type="text" 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-primary-soft border border-border-main p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
            placeholder="আপনার নাম"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-extrabold text-text-main/70 block uppercase tracking-wide">{BENGALI_TEXT.membership.fields.phone}</label>
          <input 
            required
            type="tel" 
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-primary-soft border border-border-main p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
            placeholder="ফোন নম্বর"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-extrabold text-text-main/70 block uppercase tracking-wide">{BENGALI_TEXT.membership.fields.address}</label>
          <textarea 
            required
            rows={2}
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-primary-soft border border-border-main p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" 
            placeholder="ঠিকানা"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-text-main/70 block uppercase tracking-wide">{BENGALI_TEXT.membership.fields.ref1}</label>
            <input 
              required
              type="text" 
              value={formData.ref1}
              onChange={e => setFormData({...formData, ref1: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-primary-soft border border-border-main p-3 text-sm" 
              placeholder="রেফারেন্স ১"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-text-main/70 block uppercase tracking-wide">{BENGALI_TEXT.membership.fields.ref2}</label>
            <input 
              required
              type="text" 
              value={formData.ref2}
              onChange={e => setFormData({...formData, ref2: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-primary-soft border border-border-main p-3 text-sm" 
              placeholder="রেফারেন্স ২"
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-primary text-white py-4 rounded-lg font-extrabold shadow-lg hover:bg-opacity-95 active:scale-[0.98] transition-all">
          {BENGALI_TEXT.membership.submit}
        </button>
      </form>
    </motion.div>
  );
}

