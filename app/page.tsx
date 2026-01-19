"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Send, 
  Star,
  MapPin,
  Shield,
  Clock,
  ThumbsUp,
  Users,
  Award,
  ChevronRight,
  PhoneCall,
  MessageCircle,
  Search,
  BadgeCheck,
  Zap,
  TrendingUp,
  Headphones
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState<any[]>([]);

  const categories = [
    { name: "Web Development", icon: "🌐", count: "500+" },
    { name: "App Development", icon: "📱", count: "350+" },
    { name: "SEO Services", icon: "📈", count: "200+" },
    { name: "Logo Design", icon: "🎨", count: "450+" },
    { name: "Digital Marketing", icon: "📣", count: "300+" },
    { name: "E-Commerce", icon: "🛒", count: "150+" },
    { name: "UI/UX Design", icon: "✨", count: "280+" },
    { name: "Content Writing", icon: "✍️", count: "180+" },
  ];

  const trustStats = [
    { icon: Users, value: "50+", label: "Happy Clients" },
    { icon: Award, value: "150+", label: "Projects Done" },
    { icon: ThumbsUp, value: "98%", label: "Satisfaction" },
    { icon: Clock, value: "5+", label: "Years Exp." },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servRes, portRes, adsRes] = await Promise.all([
          fetch("/api/admin/services", { cache: "no-store" }),
          fetch("/api/admin/portfolio", { cache: "no-store" }),
          fetch("/api/admin/ads", { cache: "no-store" })
        ]);

        if (adsRes.ok) {
          const adsData = await adsRes.json();
          setAds(Array.isArray(adsData) ? adsData : (adsData.data || []));
        }
        const sData = await servRes.json();
        const pData = await portRes.json();
        setServices(sData.slice(0, 6));
        const cleanPort = Array.isArray(pData) ? pData : (pData.data || []);
        setPortfolio(cleanPort.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="bg-slate-50 min-h-screen">
      
      {/* ========== HERO SECTION - BRANDED COLOR THEME ========== */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#134e4a] to-[#0d9488] pt-24 pb-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Location Bar */}
          <div className="flex items-center gap-2 text-cyan-200 mb-6">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Serving All Over India</span>
            <ChevronRight className="w-4 h-4" />
          </div>

          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                India&apos;s #1 Digital
                <span className="block text-cyan-400 drop-shadow-md">Service Provider</span>
              </h1>
              
              <p className="text-slate-200 text-base mb-6 max-w-lg">
                Get the best digital services for your business. Web development, SEO, marketing & more at affordable prices.
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-xl shadow-xl p-2 flex items-center gap-2 mb-6">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search for services..." 
                    className="w-full py-3 outline-none text-slate-700 placeholder:text-slate-400"
                  />
                </div>
                <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg font-bold transition-colors">
                  Search
                </button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6">
                {trustStats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-cyan-300" />
                    </div>
                    <div>
                      <div className="font-black text-white">{stat.value}</div>
                      <div className="text-xs text-cyan-100/70">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Trust Badges */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl p-6 text-slate-900 border-t-4 border-cyan-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Verified & Trusted</div>
                    <div className="text-sm text-slate-500">100% Secure Services</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    "✓ Government Registered Company",
                    "✓ 5+ Years of Experience",
                    "✓ 1000+ Satisfied Customers",
                    "✓ 24/7 Customer Support",
                    "✓ Money Back Guarantee"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                      {item.replace("✓ ", "")}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-5 h-5 fill-cyan-500 text-cyan-500" />
                      ))}
                      <span className="ml-2 font-bold text-slate-900">4.9</span>
                    </div>
                    <span className="text-sm text-slate-500">Based on 500+ reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CATEGORY GRID ========== */}
      <section className="bg-white py-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map((cat, i) => (
              <Link 
                href="/services" 
                key={i}
                className="group flex flex-col items-center text-center p-3 rounded-xl hover:bg-cyan-50 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-slate-100 group-hover:bg-cyan-100 flex items-center justify-center text-2xl mb-2 transition-colors">
                  {cat.icon}
                </div>
                <span className="text-xs font-medium text-slate-700 group-hover:text-cyan-700 leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== OFFERS SECTION ========== */}
      {!loading && ads.length > 0 && (
        <section className="bg-white py-6 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-600" />
                <h2 className="font-bold text-slate-900">Best Deals & Offers</h2>
              </div>
              <Link href="/services" className="text-cyan-600 text-sm font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="overflow-hidden">
              <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
                {[...ads, ...ads, ...ads].map((ad, index) => (
                  <div
                    key={index}
                    className="w-[300px] bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-4 flex-shrink-0 cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-white/20 rounded text-white text-[10px] font-bold uppercase mb-2">
                          {ad.subtitle || ad.text || "Limited Offer"}
                        </span>
                        <h3 className="text-white font-bold text-lg leading-tight">
                          {ad.title}
                        </h3>
                        <button className="mt-3 px-4 py-1.5 bg-white text-cyan-700 rounded-full text-xs font-bold hover:bg-cyan-50 transition-colors">
                          Get This Deal
                        </button>
                      </div>
                      <div className="text-4xl">🎉</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========== SERVICES SECTION ========== */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Popular Services</h2>
              <p className="text-sm text-slate-500">Top rated services near you</p>
            </div>
            <Link href="/services" className="text-cyan-600 text-sm font-medium flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((s, index) => (
                <div 
                  key={s._id} 
                  className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-40 h-32 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {s.image ? (
                        <Image src={s.image} alt={s.title} fill className="object-cover" />
                      ) : (
                        <span className="text-5xl font-black text-slate-200">{s.title.charAt(0)}</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-50 text-cyan-700 text-[10px] font-bold rounded">
                              <BadgeCheck className="w-3 h-3" /> VERIFIED
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1 bg-cyan-600 text-white px-2 py-0.5 rounded text-xs font-bold">
                              <Star className="w-3 h-3 fill-white" />
                              <span>4.{8 - (index % 3)}</span>
                            </div>
                            <span className="text-slate-500 text-xs">({(50 + index * 23)} Ratings)</span>
                          </div>
                        </div>

                        <div className="text-right">
                          {s.price && (
                            <div className="text-slate-400 line-through text-sm">₹{s.price}</div>
                          )}
                          <div className="text-xl font-black text-slate-900">₹{s.discountPrice}</div>
                          <div className="text-cyan-600 text-xs font-medium">Best Price</div>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">{s.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-cyan-100 text-cyan-800 text-[10px] font-bold rounded">🏆 TOP RATED</span>
                        <span className="px-2 py-1 bg-teal-100 text-teal-800 text-[10px] font-bold rounded">⚡ QUICK DELIVERY</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#134e4a] hover:bg-[#0f172a] text-white rounded-lg font-medium text-sm transition-colors">
                          <PhoneCall className="w-4 h-4" /> Call Now
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium text-sm transition-colors">
                          <MessageCircle className="w-4 h-4" /> WhatsApp
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-cyan-600 text-cyan-600 hover:bg-cyan-50 rounded-lg font-medium text-sm transition-colors">
                          <Send className="w-4 h-4" /> Get Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-6">
            <Link 
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold transition-colors"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== PORTFOLIO SECTION ========== */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Our Recent Work</h2>
              <p className="text-sm text-slate-500">Projects delivered with excellence</p>
            </div>
            <Link href="/portfolio" className="text-cyan-600 text-sm font-medium flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolio.map((project, index) => (
              <div 
                key={project._id} 
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src={project.image || "/project-placeholder.jpg"} 
                    alt={project.companyName} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-cyan-600 text-white text-[10px] font-bold rounded">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-cyan-600 transition-colors">
                    {project.companyName}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                      ))}
                    </div>
                    <span className="text-slate-500 text-xs">(4.{9 - (index % 2)})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-600 text-xs font-medium flex items-center gap-1">
                      <BadgeCheck className="w-3 h-3" /> Verified Project
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="py-10 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">Why Choose Jisnu Digital?</h2>
            <p className="text-sm text-slate-500">Trusted by 1000+ businesses across India</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: "100% Secure", desc: "Safe & Trusted Services", color: "bg-teal-50 text-teal-600" },
              { icon: Clock, title: "On-Time Delivery", desc: "We Value Your Time", color: "bg-cyan-50 text-cyan-600" },
              { icon: Headphones, title: "24/7 Support", desc: "Always Here to Help", color: "bg-sky-50 text-sky-600" },
              { icon: TrendingUp, title: "Best Results", desc: "Proven Track Record", color: "bg-emerald-50 text-emerald-600" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center border border-slate-200 hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust Banner */}
          <div className="mt-8 bg-gradient-to-r from-[#134e4a] to-[#0d9488] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-white">
                <div className="font-bold text-lg">Rated 4.9/5 by 500+ Customers</div>
                <div className="text-cyan-100 text-sm">India&apos;s Most Trusted Digital Agency</div>
              </div>
            </div>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-6 h-6 fill-cyan-400 text-cyan-400" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <Send className="w-5 h-5 text-cyan-600" />
                <h2 className="text-xl font-bold text-slate-900">Get Free Quote</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6">Fill the form and get callback within 30 minutes</p>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Your Name *" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg outline-none focus:border-cyan-500 transition-all" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="email" placeholder="Email Address *" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg outline-none focus:border-cyan-500 transition-all" />
                  <input type="tel" placeholder="Phone Number *" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg outline-none focus:border-cyan-500 transition-all" />
                </div>
                <select className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg outline-none focus:border-cyan-500 transition-all">
                  <option value="">Select Service *</option>
                  <option>Web Development</option>
                  <option>App Development</option>
                </select>
                <textarea placeholder="Tell us about your requirement..." rows={3} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg outline-none focus:border-cyan-500 transition-all resize-none"></textarea>
                <button type="submit" className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all">
                  Get Free Quote <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <div className="bg-teal-700 rounded-xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg mb-1">Call Us Now</div>
                    <div className="text-xl font-bold">+91 98765 43210</div>
                  </div>
                </div>
              </div>
              <div className="bg-cyan-700 rounded-xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg mb-1">Email Us</div>
                    <div className="text-lg font-bold">hello@jisnudigital.com</div>
                  </div>
                </div>
              </div>
              <div className="bg-emerald-600 rounded-xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-1">WhatsApp</div>
                    <button className="px-6 py-2 bg-white text-emerald-600 rounded-lg font-bold text-sm mt-2">Chat Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BOTTOM CTA BAR ========== */}
      <section className="bg-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white text-center md:text-left">
              <div className="font-bold text-lg">Looking for Digital Services?</div>
              <div className="text-slate-400 text-sm">Get the best quotes from Jisnu Digital</div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold transition-colors">
                <PhoneCall className="w-4 h-4" /> Call Now
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold transition-colors">
                <Send className="w-4 h-4" /> Get Quote
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}