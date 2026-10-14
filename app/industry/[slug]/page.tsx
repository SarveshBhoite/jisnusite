import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Factory,
  GraduationCap,
  Hotel,
  PhoneCall,
  AlertTriangle,
  Layers,
  TrendingUp,
  Award,
  Star,
  Quote,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Zap,
  Target,
  Users,
  Eye,
  Monitor,
  Megaphone,
  PieChart,
  Search,
  MessageSquare,
  Share2,
  Globe,
  MessageCircle,
  FileText,
} from "lucide-react";
import { notFound } from "next/navigation";

interface Challenge {
  title: string;
  description: string;
  icon: any;
  iconBg: string;
  iconColor: string;
  impact?: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface GrowthStrategy {
  title: string;
  description: string;
  tag: string;
}

interface ServiceSolution {
  title: string;
  desc: string;
  highlights: string[];
  icon?: any;
  iconBg?: string;
  iconColor?: string;
}

interface CaseStudy {
  client?: string;
  projectTitle: string;
  category?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  tech?: string[];
  image?: string;
  tags?: string[];
  href?: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

interface Metric {
  value: string;
  label: string;
  subtext: string;
}

interface IndustryData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  breadcrumbTitle?: string;
  headlinePrefix?: string;
  headlineFirst: string;
  headlineSecond: string;
  heroBg: string;
  heroImage?: string;
  icon: any;
  stats: Metric[];
  challengesSubtitle?: string;
  challenges: Challenge[];
  process: ProcessStep[];
  strategies: GrowthStrategy[];
  servicesSubtitle?: string;
  services: ServiceSolution[];
  caseStudies?: CaseStudy[];
  testimonials: Testimonial[];
}

const industryDataMap: Record<string, IndustryData> = {
  "real-estate": {
    slug: "real-estate",
    title: "Real Estate Digital Solutions",
    subtitle: "Empowering Property Developers, Agencies & Brokers with Cutting-Edge PropTech",
    description:
      "Helping real estate businesses generate more leads, build brand trust and sell properties faster with powerful digital strategies.",
    breadcrumbTitle: "Real Estate",
    headlinePrefix: "DIGITAL SOLUTIONS FOR",
    headlineFirst: "REAL ",
    headlineSecond: "ESTATE",
    heroBg: "from-blue-50 via-slate-50 to-indigo-50/60",
    heroImage: "/real istate industry.png",
    icon: Building2,
    stats: [
      { value: "10+", label: "Projects Delivered", subtext: "Web portals, CRM systems & marketing funnels" },
      { value: "3.5x", label: "Average Lead Conversion", subtext: "Compared to traditional property ads" },
      { value: "1,500+", label: "Verified Buyer Inquiries", subtext: "Generated through custom digital funnels" },
      { value: "99%", label: "Client Satisfaction Rate", subtext: "Trusted by top builders & agencies" },
    ],
    challengesSubtitle: "The real estate market is highly competitive. We help you overcome digital marketing challenges, reach the right audience, generate quality enquiries and build a stronger online presence.",
    challenges: [
      {
        title: "Low Online Visibility",
        description: "Improve your presence across Google and digital platforms.",
        icon: Eye,
        iconBg: "bg-orange-100/70",
        iconColor: "text-orange-600"
      },
      {
        title: "Unqualified Leads",
        description: "Attract genuine buyers and investors, not irrelevant enquiries.",
        icon: Users,
        iconBg: "bg-sky-100/70",
        iconColor: "text-sky-600"
      },
      {
        title: "High Competition",
        description: "Stand out with data-driven and creative marketing strategies.",
        icon: TrendingUp,
        iconBg: "bg-amber-100/70",
        iconColor: "text-amber-600"
      },
      {
        title: "Poor Website Conversion",
        description: "Create user-friendly, conversion-focused websites.",
        icon: Monitor,
        iconBg: "bg-cyan-100/70",
        iconColor: "text-cyan-600"
      },
      {
        title: "Weak Digital Brand Presence",
        description: "Build a consistent and trusted brand across online channels.",
        icon: Megaphone,
        iconBg: "bg-orange-100/70",
        iconColor: "text-orange-600"
      },
      {
        title: "No Clear Marketing Insights",
        description: "Track performance and make better marketing decisions with data.",
        icon: PieChart,
        iconBg: "bg-sky-100/70",
        iconColor: "text-sky-600"
      }
    ],
    process: [
      {
        step: "01",
        title: "Property & Audience Audit",
        description: "We analyze your project inventory, target buyer personas, local competitor positioning, and existing lead channels."
      },
      {
        step: "02",
        title: "PropTech & Funnel Architecture",
        description: "We design custom property portals with interactive floor maps, virtual tours, and automated WhatsApp/CRM capture."
      },
      {
        step: "03",
        title: "Multi-Channel Growth Launch",
        description: "Deploy targeted Meta/Google property campaigns, hyper-local SEO, and retargeting ads to attract active home buyers."
      },
      {
        step: "04",
        title: "Optimization & Sales Integration",
        description: "We train sales teams on lead pipeline automation, track conversion metrics, and optimize campaign ROI continuously."
      }
    ],
    strategies: [
      {
        title: "Hyper-Local SEO & Geo-Fenced Ads",
        description: "Capture buyers actively searching for luxury apartments, commercial hubs, or villa plots in specific zip codes.",
        tag: "High Intent Traffic"
      },
      {
        title: "Instant WhatsApp & SMS Lead Nurturing",
        description: "Auto-respond to property inquiries within 30 seconds with automated brochure downloads and site visit scheduling.",
        tag: "Speed-to-Lead"
      },
      {
        title: "3D Virtual Tour & Interactive Masterplan",
        description: "Allow NRI and out-of-town buyers to explore unit layouts, amenities, and inventory availability in real time.",
        tag: "Immersive Sales"
      }
    ],
    servicesSubtitle: "From attracting potential buyers to turning enquiries into opportunities, we provide complete digital solutions designed specifically for the real estate industry.",
    services: [
      {
        title: "Real Estate Website Development",
        desc: "Modern, responsive and conversion-focused property websites.",
        highlights: ["Advanced Property Filter Engine", "Integrated Map & Neighborhood Data", "Broker & Agent Portal Access"]
      },
      {
        title: "SEO & Local SEO",
        desc: "Improve search visibility and reach people actively looking for properties.",
        highlights: ["Local Map Pack Optimization", "Keyword Research & Ranking", "Google Business Profile Sync"]
      },
      {
        title: "Google & Meta Ads",
        desc: "Run targeted campaigns to reach potential buyers, investors and property seekers.",
        highlights: ["High-Converting Meta Video Ads", "Google Search & Display Ads", "Lead Generation Retargeting"]
      },
      {
        title: "Social Media Marketing",
        desc: "Engaging property content, reels and campaigns to build brand awareness.",
        highlights: ["Instagram Reels & Visual Posts", "Brand Awareness Campaigns", "Community & Audience Engagement"]
      },
      {
        title: "Lead Generation",
        desc: "Generate qualified enquiries through landing pages and strategic campaigns.",
        highlights: ["High-Converting Landing Pages", "Automated Funnel Routing", "Verified Buyer Lead Capture"]
      },
      {
        title: "Content & Creative Marketing",
        desc: "Professional visuals, videos and content to showcase your properties.",
        highlights: ["3D Property Showcases", "Copywriting & Property Descriptions", "High-Quality Video Production"]
      },
      {
        title: "WhatsApp & Lead Nurturing",
        desc: "Engage and follow up with potential buyers through WhatsApp marketing.",
        highlights: ["Automated Brochure Downloads", "Instant Chat Bot Routing", "Drip Broadcast Campaigns"]
      },
      {
        title: "Analytics & Reporting",
        desc: "Track traffic, leads and campaign performance to improve results.",
        highlights: ["Real-Time ROI Dashboards", "Conversion Funnel Tracking", "Data-Driven Marketing Insights"]
      }
    ],
    caseStudies: [
      {
        projectTitle: "Luxury Apartments Website",
        client: "Skyline Residency",
        category: "Websites",
        image: "/real istate industry.png",
        tags: ["Website", "SEO", "Lead Generation"],
        href: "#"
      },
      {
        projectTitle: "Villa Project Digital Marketing",
        client: "Green Palm Villas",
        category: "Social Media",
        image: "/real istate industry.png",
        tags: ["Google Ads", "Social Media", "Branding"],
        href: "#"
      },
      {
        projectTitle: "Real Estate Lead Generation",
        client: "Urban Heights",
        category: "Lead Generation",
        image: "/real istate industry.png",
        tags: ["Landing Page", "Meta Ads", "SEO"],
        href: "#"
      }
    ],
    testimonials: [
      {
        quote: "Jisnu Digital transformed our property marketing completely. Our lead response time dropped from hours to seconds, and sales doubled within one quarter.",
        author: "Vikram Malhotra",
        role: "Managing Director",
        company: "Apex Realty Group",
        rating: 5
      },
      {
        quote: "The interactive property map and WhatsApp lead funnel gave us a massive competitive edge over traditional brokers in our city.",
        author: "Priya Sharma",
        role: "Head of Marketing",
        company: "UrbanSpace Commercial",
        rating: 5
      }
    ]
  },
  manufacturing: {
    slug: "manufacturing",
    title: "Manufacturing & Industrial Tech",
    subtitle: "Next-Generation Digital Infrastructure for Industrial Enterprises & B2B Suppliers",
    description:
      "Accelerating industrial growth with custom B2B portals, ERP integrations, and automated RFQ systems.",
    breadcrumbTitle: "Manufacturing",
    headlinePrefix: "DIGITAL SOLUTIONS FOR",
    headlineFirst: "MANU",
    headlineSecond: "FACTURING",
    heroBg: "from-slate-100 via-slate-50 to-zinc-100/60",
    heroImage: "/manufacturing industry.png",
    icon: Factory,
    stats: [
      { value: "10+", label: "Projects Delivered", subtext: "B2B portals, catalogs & OEM platforms" },
      { value: "500+", label: "B2B Inquiries & RFQs", subtext: "Generated for parts & custom manufacturing" },
      { value: "99.9%", label: "System & Portal Uptime", subtext: "Reliable industrial portal infrastructure" },
      { value: "4.9/5", label: "Client Satisfaction Rating", subtext: "Trusted by industrial OEMs & exporters" },
    ],
    challengesSubtitle: "Industrial market demands technical clarity. We help manufacturers modernize product discovery, streamline RFQ processes, and connect with global B2B buyers.",
    challenges: [
      {
        title: "Low Spec Visibility",
        description: "Improve part discovery across global search and B2B directories.",
        icon: Eye,
        iconBg: "bg-orange-100/70",
        iconColor: "text-orange-600"
      },
      {
        title: "Manual RFQ Bottlenecks",
        description: "Automate quote requests and specs selection to win deals faster.",
        icon: Users,
        iconBg: "bg-sky-100/70",
        iconColor: "text-sky-600"
      },
      {
        title: "High Global Competition",
        description: "Outrank overseas OEMs with technical B2B search optimization.",
        icon: TrendingUp,
        iconBg: "bg-amber-100/70",
        iconColor: "text-amber-600"
      },
      {
        title: "Unoptimized Product Catalogs",
        description: "Build responsive B2B portals with downloadable CAD and ISO specs.",
        icon: Monitor,
        iconBg: "bg-cyan-100/70",
        iconColor: "text-cyan-600"
      },
      {
        title: "Weak B2B Brand Trust",
        description: "Establish international authority on LinkedIn and trade channels.",
        icon: Megaphone,
        iconBg: "bg-orange-100/70",
        iconColor: "text-orange-600"
      },
      {
        title: "Disjointed Sales Insights",
        description: "Integrate portal inquiries directly into your ERP and CRM dashboards.",
        icon: PieChart,
        iconBg: "bg-sky-100/70",
        iconColor: "text-sky-600"
      }
    ],
    process: [
      {
        step: "01",
        title: "Industrial & Specs Analysis",
        description: "We map out your product catalog hierarchy, technical datasheets, buyer personas, and ERP data structures."
      },
      {
        step: "02",
        title: "B2B Platform Architecture",
        description: "Design custom B2B web portals equipped with spec download engines, RFQ form builders, and ERP synchronization."
      },
      {
        step: "03",
        title: "Search & OEM Expansion",
        description: "Execute technical B2B SEO, industrial keyword targeting, and LinkedIn decision-maker campaigns worldwide."
      },
      {
        step: "04",
        title: "Workflow Automation & Training",
        description: "Automate sales quote routing, setup analytics dashboards, and train your sales team on B2B pipeline management."
      }
    ],
    strategies: [
      {
        title: "Technical B2B SEO & Datasheet Indexing",
        description: "Ensure your part numbers, technical specifications, and industrial equipment rank #1 on Google for procurement managers.",
        tag: "Procurement Intent"
      },
      {
        title: "Automated RFQ & Spec Configurator",
        description: "Enable prospective buyers to select custom material grades, dimensions, and quantities for instant RFQ generation.",
        tag: "Sales Efficiency"
      },
      {
        title: "LinkedIn ABM (Account-Based Marketing)",
        description: "Target decision-makers at target OEM firms, plant managers, and procurement heads directly with custom content.",
        tag: "Enterprise Reach"
      }
    ],
    servicesSubtitle: "From building your digital foundation to generating and nurturing B2B leads, our services are designed specifically for the manufacturing industry.",
    services: [
      {
        title: "Website Development",
        desc: "Modern, responsive and lead-focused websites for manufacturing businesses.",
        highlights: ["Product Catalog & Spec Sheets", "Lead & RFQ Capture Engine", "Responsive Technical Design"]
      },
      {
        title: "SEO & Technical SEO",
        desc: "Improve search visibility and rank for industry-related keywords.",
        highlights: ["Technical Specification Indexing", "B2B Keyword Rank Tracking", "Global & Local SEO Optimization"]
      },
      {
        title: "B2B Lead Generation",
        desc: "Generate qualified enquiries from businesses, distributors and global buyers.",
        highlights: ["Targeted Procurement Funnels", "High-Converting RFQ Forms", "Distributor Outreach Systems"]
      },
      {
        title: "Google Ads",
        desc: "Run targeted campaigns to reach potential buyers and increase enquiries.",
        highlights: ["High-Intent Buyer Search Ads", "Industrial B2B Keyword Bidding", "Conversion & ROI Tracking"]
      },
      {
        title: "Social Media Marketing",
        desc: "Showcase your manufacturing products, processes and expertise through engaging content.",
        highlights: ["LinkedIn Company Positioning", "Factory & Machinery Showcase", "Industry Authority Content"]
      },
      {
        title: "Content Marketing",
        desc: "Create technical content, product showcases, case studies and industry blogs.",
        highlights: ["Technical Datasheet Copy", "Industrial Case Study Writing", "Whitepapers & B2B Guides"]
      },
      {
        title: "Branding & Creative Design",
        desc: "Build a strong and professional brand identity for your manufacturing business.",
        highlights: ["Corporate Identity & Logo", "Product Brochure & Catalog", "Digital Brand Guidelines"]
      },
      {
        title: "Analytics & Reporting",
        desc: "Track traffic, leads and campaign performance to improve results.",
        highlights: ["Real-Time B2B Dashboards", "RFQ Conversion Tracking", "Marketing ROI Insights"]
      }
    ],
    caseStudies: [
      {
        client: "Precision Tech Valves",
        projectTitle: "Global B2B Product Portal & RFQ Engine",
        challenge: "Struggling to attract overseas industrial valve distributors beyond domestic tradeshows.",
        solution: "Engineered a multi-lingual product catalog with downloadable 3D CAD specs and structured RFQ workflow.",
        result: "Increased international inquiries by 210% within 6 months, securing contracts in 8 new export markets.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "SAP Connector"]
      },
      {
        client: "Dynaco Industrial Coatings",
        projectTitle: "Custom ERP Inventory & Order Dashboard",
        challenge: "Manual quotation processing caused 4-day delays in sending quotes to industrial contractors.",
        solution: "Built an automated RFQ pricing engine connected to live Tally stock data.",
        result: "Reduced quote generation time from 4 days to under 15 minutes, boosting order win rate by 34%.",
        tech: ["React", "Express", "Node.js", "PostgreSQL"]
      }
    ],
    testimonials: [
      {
        quote: "Jisnu Digital gave our industrial brand a world-class digital presence. International procurement managers now trust us on first impression.",
        author: "Rajesh Kulkarni",
        role: "VP of Business Development",
        company: "Precision Tech Valves",
        rating: 5
      },
      {
        quote: "The RFQ automation tool reduced our quotation turnaround time drastically. Our sales team is closing deals faster than ever.",
        author: "Amitabh Verma",
        role: "Operations Director",
        company: "Dynaco Industrial Coatings",
        rating: 5
      }
    ]
  },
  education: {
    slug: "education",
    title: "Education Sector Digital Solutions",
    subtitle: "Digital Transformation for Schools, Universities, Academies & EdTech Platforms",
    description:
      "Modernizing educational institutions with student admission funnels, custom LMS, and campus web portals.",
    breadcrumbTitle: "Education",
    headlinePrefix: "DIGITAL SOLUTIONS FOR",
    headlineFirst: "EDU",
    headlineSecond: "CATION",
    heroBg: "from-cyan-50 via-slate-50 to-blue-50/60",
    heroImage: "/education institute.png",
    icon: GraduationCap,
    stats: [
      { value: "10+", label: "Projects Delivered", subtext: "Schools, colleges & coaching academy portals" },
      { value: "1,200+", label: "Student Inquiries", subtext: "Generated through targeted digital funnels" },
      { value: "99%", label: "Platform & Portal Uptime", subtext: "Seamless admission & student engagement" },
      { value: "4.9/5", label: "Client Satisfaction Rating", subtext: "Proven admission growth for academic brands" },
    ],
    challengesSubtitle: "Academic recruitment is evolving rapidly. We help institutions increase student admissions, enhance campus brand trust, and engage tech-savvy parents.",
    challenges: [
      {
        title: "Low Admission Search Reach",
        description: "Improve search rankings for course programs and open house dates.",
        icon: Eye,
        iconBg: "bg-orange-100/70",
        iconColor: "text-orange-600"
      },
      {
        title: "Unqualified Applicant Leads",
        description: "Attract serious students and committed parents to your application funnel.",
        icon: Users,
        iconBg: "bg-sky-100/70",
        iconColor: "text-sky-600"
      },
      {
        title: "High Local Competition",
        description: "Differentiate your curriculum, placements, and campus facilities online.",
        icon: TrendingUp,
        iconBg: "bg-amber-100/70",
        iconColor: "text-amber-600"
      },
      {
        title: "Outdated Campus Website UX",
        description: "Deliver intuitive application forms and responsive course directories.",
        icon: Monitor,
        iconBg: "bg-cyan-100/70",
        iconColor: "text-cyan-600"
      },
      {
        title: "Weak Institutional Brand",
        description: "Build 5-star reputation on Google Maps and student review portals.",
        icon: Megaphone,
        iconBg: "bg-orange-100/70",
        iconColor: "text-orange-600"
      },
      {
        title: "No Admission Funnel Insights",
        description: "Track application drop-off rates and counselor response speed.",
        icon: PieChart,
        iconBg: "bg-sky-100/70",
        iconColor: "text-sky-600"
      }
    ],
    process: [
      {
        step: "01",
        title: "Academic & Admission Audit",
        description: "We evaluate your admission cycle timelines, course offerings, current digital footprint, and counselor workflows."
      },
      {
        step: "02",
        title: "Portal & LMS Design",
        description: "Develop mobile-responsive institutional portals with online application forms, course catalogs, and parent dashboards."
      },
      {
        step: "03",
        title: "Targeted Student Recruitment",
        description: "Launch targeted Google Search, Instagram, and YouTube campaigns targeting prospective students and parents."
      },
      {
        step: "04",
        title: "Counseling Automation & Analytics",
        description: "Implement automated SMS/WhatsApp reminders for open house dates, fee deadlines, and admission interviews."
      }
    ],
    strategies: [
      {
        title: "Omnichannel Admission Lead Generation",
        description: "Capture qualified student applications through interactive course finder quizzes and instant counselor callbacks.",
        tag: "Admissions Boost"
      },
      {
        title: "Local Institutional SEO & Google Reviews",
        description: "Dominate search results when parents search for top schools, coaching institutes, or colleges in your region.",
        tag: "Local Reputation"
      },
      {
        title: "Custom Parent & Student Self-Service Portal",
        description: "Provide 24/7 access to fee payments, report cards, attendance logs, and academic announcements on mobile.",
        tag: "Campus Tech"
      }
    ],
    servicesSubtitle: "From building your digital presence to generating student enquiries, we provide complete digital marketing solutions designed specifically for the education sector.",
    services: [
      {
        title: "Website Development",
        desc: "Modern, responsive and admission-focused websites for schools, colleges and coaching institutes.",
        highlights: ["Admission Portal & Application Form", "Course Catalog & Campus Showcase", "Mobile-Optimized Institutional Design"]
      },
      {
        title: "SEO & Local SEO",
        desc: "Improve search visibility and rank for education-related keywords.",
        highlights: ["Local Map Pack Ranking for Schools", "Course & Program Keyword Indexing", "Google Business Profile Sync"]
      },
      {
        title: "Google & Meta Ads",
        desc: "Run targeted campaigns to reach students and parents actively looking for courses.",
        highlights: ["High-Intent Admission Search Ads", "Meta & Instagram Parent Targeting", "Lead Form & Inquiry Campaigns"]
      },
      {
        title: "Social Media Marketing",
        desc: "Create engaging content, reels and campaigns to build brand awareness.",
        highlights: ["Campus Life & Student Reels", "Institute Achievement Content", "Community & Audience Engagement"]
      },
      {
        title: "Lead Generation",
        desc: "Generate quality enquiries through landing pages and strategic campaigns.",
        highlights: ["High-Converting Admission Funnels", "Automated Counselor Routing", "Verified Student Inquiry Capture"]
      },
      {
        title: "Content Marketing",
        desc: "Create informative content, blogs and videos to showcase your courses.",
        highlights: ["Course Guides & Curriculum Copy", "Student Success Stories", "Educational Video & Blogs"]
      },
      {
        title: "Branding & Creative Design",
        desc: "Build a strong and professional brand identity for your institute.",
        highlights: ["Institute Brand & Logo Design", "Prospectus & Brochure Design", "Digital Identity Guidelines"]
      },
      {
        title: "Analytics & Reporting",
        desc: "Track enquiries, campaign performance and conversions to improve results.",
        highlights: ["Real-Time Admission Dashboards", "Inquiry Conversion Tracking", "Campaign ROI Optimization"]
      }
    ],
    caseStudies: [
      {
        client: "St. Xavier International Academy",
        projectTitle: "Annual Admission Growth Campaign & Portal",
        challenge: "Facing 20% lower student enrollment due to new international schools in the region.",
        solution: "Built a modern admission funnel with virtual campus tours, coupled with targeted Google Search & Instagram ads.",
        result: "Exceeded annual admission quota by 115% within 45 days, generating 2,800+ verified parent inquiries.",
        tech: ["Next.js", "Tailwind CSS", "Razorpay", "Meta Ads"]
      },
      {
        client: "SkillPro Online Institute",
        projectTitle: "Custom LMS & Course Distribution Engine",
        challenge: "Third-party LMS fees were devouring 30% of revenue per enrolled course.",
        solution: "Developed a custom branded LMS platform with integrated video streaming and automated certificate issuance.",
        result: "Saved $45,000 annually in software licensing fees while boosting student course completion rate by 28%.",
        tech: ["React", "Node.js", "AWS CloudFront", "MongoDB"]
      }
    ],
    testimonials: [
      {
        quote: "Jisnu Digital helped us achieve our highest admission intake in 10 years. Their understanding of parent decision-making is unmatched.",
        author: "Dr. Ananya Deshmukh",
        role: "Principal",
        company: "St. Xavier International Academy",
        rating: 5
      },
      {
        quote: "Our custom LMS platform works flawlessly across mobile devices. Our students and faculty love the intuitive design.",
        author: "Sanjay Mehta",
        role: "Founder & Director",
        company: "SkillPro Online Institute",
        rating: 5
      }
    ]
  },
  "hotels-restaurants": {
    slug: "hotels-restaurants",
    title: "Hotels & Restaurants Suite",
    subtitle: "Maximized Direct Bookings, Digital Menus & Guest Loyalty for Hotels & Restaurants",
    description:"Driving direct room bookings, contactless QR code menu ordering, and localized search dominance.",
    breadcrumbTitle: "Hotels & Restaurants",
    headlinePrefix: "DIGITAL SOLUTIONS FOR",
    headlineFirst: "HOTELS & ",
    headlineSecond: "RESTAURANTS",
    heroBg: "from-amber-50 via-orange-50/40 to-slate-50",
    heroImage: "/hotel and restarunts.png",
    icon: Hotel,
    stats: [
      { value: "10+", label: "Projects Delivered", subtext: "Resorts, hotels & dining portals launched" },
      { value: "45%", label: "Direct Booking Increase", subtext: "Saving on third-party OTA commission fees" },
      { value: "2,500+", label: "Direct Guest Bookings & Orders", subtext: "Handled through web & QR channels" },
      { value: "4.9/5", label: "Average Client Rating", subtext: "Boosted via automated guest review flows" },
    ],
    challengesSubtitle: "Hospitality relies on direct guest connections. We help hotels and restaurants eliminate high OTA commissions, boost direct bookings, and dominate local search.",
    challenges: [
      {
        title: "Low Direct Search Visibility",
        description: "Capture travelers searching for resorts, hotels, and fine dining.",
        icon: Eye,
        iconBg: "bg-orange-100/70",
        iconColor: "text-orange-600"
      },
      {
        title: "OTA Commission Dependency",
        description: "Convert third-party OTA visitors into direct commission-free bookings.",
        icon: Users,
        iconBg: "bg-sky-100/70",
        iconColor: "text-sky-600"
      },
      {
        title: "High Local Competition",
        description: "Stand out in local map packs with high-converting food and room ads.",
        icon: TrendingUp,
        iconBg: "bg-amber-100/70",
        iconColor: "text-amber-600"
      },
      {
        title: "Poor Mobile Booking UX",
        description: "Provide instant room reservations and contactless QR menu ordering.",
        icon: Monitor,
        iconBg: "bg-cyan-100/70",
        iconColor: "text-cyan-600"
      },
      {
        title: "Weak Google Review Presence",
        description: "Automate post-checkout WhatsApp review requests to build ratings.",
        icon: Megaphone,
        iconBg: "bg-orange-100/70",
        iconColor: "text-orange-600"
      },
      {
        title: "No Guest Retention Data",
        description: "Track repeat stays, dining preferences, and campaign ROI effortlessly.",
        icon: PieChart,
        iconBg: "bg-sky-100/70",
        iconColor: "text-sky-600"
      }
    ],
    process: [
      {
        step: "01",
        title: "Hospitality & Guest Audit",
        description: "We review your current direct booking percentage, OTA dependency, local search rankings, and dining workflow."
      },
      {
        step: "02",
        title: "Direct Booking & QR Engine Setup",
        description: "Deploy custom hotel booking portals with payment gateway integration and contactless QR ordering for dining tables."
      },
      {
        step: "03",
        title: "Local Search & Instagram Push",
        description: "Optimize Google Business profile for local map packs and run visual food/stay campaigns on Instagram & Meta."
      },
      {
        step: "04",
        title: "Guest Loyalty & Review Automation",
        description: "Automate post-checkout WhatsApp review requests to build 5-star Google ratings and encourage repeat direct stays."
      }
    ],
    strategies: [
      {
        title: "Commission-Free Direct Booking Engine",
        description: "Offer instant booking discounts and perks to guests who book directly through your custom website.",
        tag: "Margin Optimization"
      },
      {
        title: "QR Code Menu & Instant Table Ordering",
        description: "Enable guests to view HD food photos, place orders, and pay directly from their smartphones.",
        tag: "Dining Speed"
      },
      {
        title: "Automated Google Review Booster",
        description: "Trigger polite WhatsApp message flows following guest stays to prompt 5-star reviews on Google Maps.",
        tag: "Local Dominance"
      }
    ],
    services: [
      {
        title: "Hotel Showcase & Direct Booking Portals",
        desc: "Stunning websites featuring room galleries, virtual room tours, real-time availability calendar, and instant payment checkout.",
        highlights: ["Commission-Free Booking Engine", "Real-Time Room Calendar Sync", "Multi-Currency & Regional Payments"]
      },
      {
        title: "Digital Menu & Table Ordering Systems",
        desc: "Fast, contactless QR code menu solutions designed for fine dining, cafes, food courts, and resort room service.",
        highlights: ["HD Food Photo & Video Menu", "Instant Kitchen Print & POS Sync", "UPI & Card Payment Integration"]
      },
      {
        title: "Local Hospitality SEO & Social Marketing",
        desc: "Dominant local search strategies paired with mouth-watering Instagram content that drives foot traffic and room bookings.",
        highlights: ["Google Maps Local Pack 3-Top Ranking", "Instagram Reels & Foodie Campaign", "TripAdvisor & Google Review Automation"]
      }
    ],
    caseStudies: [
      {
        client: "Grand Heritage Resort & Spa",
        projectTitle: "Direct Booking Portal & Local SEO Campaign",
        image: "/hotel and restarunts.png",
        challenge: "Paying over $12,000 monthly in OTA commission fees for weekend bookings.",
        solution: "Built a mobile-first booking portal offering direct guest perks, backed by local Google Map SEO and Meta ads.",
        result: "Shifted 42% of bookings to direct channels within 90 days, saving $65,000 in annual commissions.",
        tech: ["Next.js", "Tailwind CSS", "Stripe API", "Google Local Maps"]
      },
      {
        client: "Spice & Wood Bistro Chain",
        projectTitle: "Contactless QR Ordering & Guest Review Automation",
        image: "/hotel and restarunts.png",
        challenge: "Slow table turn time during weekend lunch rushes due to staff shortages.",
        solution: "Implemented QR code table menus with instant UPI payment and automated post-meal review collection.",
        result: "Increased table turnover rate by 30% and grew Google reviews from 340 to 1,850+ rated 4.9 stars.",
        tech: ["React", "Node.js", "Razorpay", "WhatsApp Business API"]
      }
    ],
    testimonials: [
      {
        quote: "Jisnu Digital saved us tens of thousands of dollars in OTA commissions. Our direct website bookings skyrocketed within 3 months.",
        author: "Karan Singhania",
        role: "General Manager",
        company: "Grand Heritage Resort",
        rating: 5
      },
      {
        quote: "The QR code menu system streamlined our restaurant operations completely. Guests love the instant ordering experience!",
        author: "Chef Rohan D'Souza",
        role: "Owner",
        company: "Spice & Wood Bistro",
        rating: 5
      }
    ]
  }
};

export async function generateStaticParams() {
  return [
    { slug: "real-estate" },
    { slug: "manufacturing" },
    { slug: "education" },
    { slug: "hotels-restaurants" },
  ];
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = industryDataMap[slug];

  if (!data) {
    notFound();
  }

  const IconComponent = data.icon;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-20 selection:bg-cyan-500 selection:text-white">
      {/* 1. Hero Section */}
      <section className={`relative overflow-hidden ${data.heroImage ? 'bg-white' : `bg-gradient-to-b ${data.heroBg}`} py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80`}>
        {data.heroImage && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <Image
              src={data.heroImage}
              alt={data.title}
              fill
              priority
              className="object-cover object-center lg:object-right opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:w-[65%]" />
          </div>
        )}

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl text-left">
            {/* Breadcrumb Trail */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 mb-6">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <span className="text-cyan-600 font-bold">&gt;</span>
              <span>Industry</span>
              <span className="text-cyan-600 font-bold">&gt;</span>
              <span className="text-slate-900 font-bold">{data.breadcrumbTitle || data.title}</span>
            </nav>

            {/* Sub-headline Tagline */}
            <div className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.22em] text-slate-900 mb-2">
              {data.headlinePrefix || "DIGITAL SOLUTIONS FOR"}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-none">
              <span className="text-slate-900">{data.headlineFirst}</span>
              <span className="text-cyan-600">{data.headlineSecond}</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-8 max-w-xl">
              {data.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-cyan-600/25 transition-all flex items-center gap-2 text-sm sm:text-base group"
              >
                Grow Your Business <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="bg-white hover:bg-slate-50 text-slate-900 font-bold px-7 py-4 rounded-full border-2 border-slate-900 transition-all flex items-center gap-2.5 text-sm sm:text-base shadow-sm"
              >
                <div className="w-6 h-6 rounded-full border border-slate-900 flex items-center justify-center text-[10px] pl-0.5">
                  ▶
                </div>
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Measurable Results / Key Metrics */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {data.stats.map((stat, i) => (
            <div key={i} className="p-4 border-b sm:border-b-0 sm:border-r last:border-0 border-slate-100">
              <div className="text-3xl sm:text-4xl font-black text-cyan-600 mb-1 tracking-tight">{stat.value}</div>
              <div className="text-sm font-bold text-slate-900 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Business Challenges Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-slate-200/80">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-600 mb-3">
              <span className="w-5 h-[2px] bg-cyan-600 inline-block"></span>
              CHALLENGES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              <div>{data.breadcrumbTitle || "Real Estate"} Marketing</div>
              <div className="text-cyan-600">Challenges We Solve</div>
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl leading-relaxed text-left">
            {data.challengesSubtitle || "The real estate market is highly competitive. We help you overcome digital marketing challenges, reach the right audience, generate quality enquiries and build a stronger online presence."}
          </p>
        </div>

        {/* 6 Cards Grid (3 cols x 2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.challenges.map((item, idx) => {
            const ChallengeIcon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 text-left group"
              >
                <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center ${item.iconBg}`}>
                  <ChallengeIcon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 group-hover:text-cyan-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Services & Solutions (Our Services) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-slate-200/80">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-600 mb-3">
              <span className="w-5 h-[2px] bg-cyan-600 inline-block"></span>
              OUR SERVICES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              <div>How We Help <span className="text-cyan-600">{data.slug === "education" ? "Education Institutes" : (data.breadcrumbTitle || "Real Estate")}</span></div>
              <div>{data.slug === "education" ? "Grow" : "Businesses Grow"}</div>
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl leading-relaxed text-left">
            {data.servicesSubtitle || "From attracting potential buyers to turning enquiries into opportunities, we provide complete digital solutions designed specifically for your industry."}
          </p>
        </div>

        {/* 8 Cards Grid (4 cols x 2 rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.services.map((srv, idx) => {
            // Pick corresponding icon for each service index if not explicitly set
            const defaultIcons = [
              { icon: Monitor, color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-100" },
              { icon: Search, color: "text-sky-600", bg: "bg-sky-50 border-sky-100" },
              { icon: Megaphone, color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-100" },
              { icon: Share2, color: "text-sky-600", bg: "bg-sky-50 border-sky-100" },
              { icon: Target, color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-100" },
              { icon: Eye, color: "text-sky-600", bg: "bg-sky-50 border-sky-100" },
              { icon: PhoneCall, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
              { icon: TrendingUp, color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-100" },
            ];
            const iconConfig = defaultIcons[idx % defaultIcons.length];
            const ServiceIcon = srv.icon || iconConfig.icon;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group text-left"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${srv.iconBg || iconConfig.bg}`}>
                    <ServiceIcon className={`w-6 h-6 ${srv.iconColor || iconConfig.color}`} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 leading-snug group-hover:text-cyan-600 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal mb-6">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <div className="w-8 h-8 rounded-full border border-cyan-600/40 text-cyan-600 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process Flow Section: From Property Discovery to Conversion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-200/80 bg-gradient-to-b from-slate-50/50 via-white to-sky-50/30 rounded-3xl my-8 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-600 mb-3">
              <span className="w-5 h-[2px] bg-cyan-600 inline-block"></span>
              OUR PROCESS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              From Property Discovery <br />
              to <span className="text-cyan-600">Conversion</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium mt-3">
              A complete digital growth journey designed for real estate businesses.
            </p>
          </div>

          {/* Decorative handwriting style element */}
          <div className="hidden lg:flex items-center gap-3 relative pr-8">
            <div className="text-right">
              <span className="font-serif italic text-lg sm:text-xl text-sky-800 font-semibold leading-tight block">
                Turning<br />Properties into<br />Opportunities
              </span>
            </div>
            <svg className="w-12 h-12 text-sky-500/70 transform -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        {/* 6 Step Horizontal Process Flow */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
          {[
            {
              step: "01",
              title: "Get Found",
              subtitle: "SEO & Local SEO",
              icon: Search,
              iconColor: "text-sky-500",
              bgColor: "bg-sky-50",
              borderColor: "border-sky-100",
            },
            {
              step: "02",
              title: "Get Noticed",
              subtitle: "Social Media +\nCreative Content",
              icon: Megaphone,
              iconColor: "text-cyan-600",
              bgColor: "bg-cyan-50",
              borderColor: "border-cyan-100",
            },
            {
              step: "03",
              title: "Get Interest",
              subtitle: "Google & Meta Ads",
              icon: Users,
              iconColor: "text-blue-600",
              bgColor: "bg-blue-50",
              borderColor: "border-blue-100",
            },
            {
              step: "04",
              title: "Get Enquiries",
              subtitle: "Landing Pages +\nLead Generation",
              icon: FileText,
              iconColor: "text-cyan-600",
              bgColor: "bg-cyan-50",
              borderColor: "border-cyan-100",
            },
            {
              step: "05",
              title: "Build Trust",
              subtitle: "Remarketing +\nWhatsApp + Content",
              icon: MessageCircle,
              iconColor: "text-emerald-500",
              bgColor: "bg-emerald-50",
              borderColor: "border-emerald-100",
            },
            {
              step: "06",
              title: "Drive Conversions",
              subtitle: "Analytics +\nOptimization",
              icon: TrendingUp,
              iconColor: "text-cyan-600",
              bgColor: "bg-cyan-50",
              borderColor: "border-cyan-100",
            },
          ].map((item, index, arr) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center relative group">
                {/* Connecting arrow for larger screens */}
                {index < arr.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[65%] w-[70%] z-0">
                    <ArrowRight className="w-5 h-5 text-slate-300 mx-auto" />
                  </div>
                )}

                {/* Circle Icon Container */}
                <div className={`w-20 h-20 rounded-full ${item.bgColor} ${item.borderColor} border-2 flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300 z-10 relative bg-white`}>
                  <IconComponent className={`w-9 h-9 ${item.iconColor}`} />
                </div>

                {/* Step Number & Title */}
                <div className="text-xs font-bold text-cyan-600 mb-0.5">{item.step}</div>
                <h3 className="text-base font-black text-slate-900 mb-2">{item.title}</h3>
                
                {/* Subtitle / Services */}
                <p className="text-xs text-slate-500 leading-relaxed font-medium whitespace-pre-line">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Why Choose Jisnu Digital Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-200/80">
        <div className="bg-gradient-to-br from-slate-50 via-sky-50/40 to-cyan-50/60 rounded-3xl p-8 sm:p-12 md:p-14 border border-slate-200/80 shadow-sm relative overflow-hidden">
          {/* Subtle Light Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl text-left">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-600 mb-3">
              <span className="w-5 h-[2px] bg-cyan-600 inline-block"></span>
              WHY CHOOSE US
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              Why Choose Jisnu Digital for <span className="text-cyan-600">{data.breadcrumbTitle || "Real Estate"}</span>?
            </h2>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-3xl">
              Jisnu Digital provides result-driven {data.breadcrumbTitle?.toLowerCase() || "real estate"} digital marketing services designed to increase online visibility, generate qualified property leads, and grow your {data.breadcrumbTitle?.toLowerCase() || "real estate"} brand. From {data.breadcrumbTitle?.toLowerCase() || "real estate"} SEO and website development to Google Ads, Meta Ads, social media marketing, and lead generation, we create customized strategies that connect your properties with the right audience and turn digital attention into genuine enquiries.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-cyan-600/20 transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                <PhoneCall className="w-4 h-4" /> Get Started Today
              </Link>
              <Link
                href="/services"
                className="bg-white hover:bg-slate-100 text-slate-800 font-semibold px-7 py-4 rounded-full border border-slate-300 shadow-sm transition-all text-sm sm:text-base"
              >
                Explore All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
