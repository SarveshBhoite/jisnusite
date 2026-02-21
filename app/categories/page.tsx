import Link from "next/link";

const companyCategories = [
  { name: "E-commerce", icon: "🛍️", color: "from-blue-400 to-blue-600" },
  { name: "Hotels", icon: "🏨", color: "from-orange-400 to-orange-600" },
  { name: "Energy", icon: "⚡", color: "from-yellow-400 to-yellow-600" },
  { name: "Education", icon: "🎓", color: "from-indigo-400 to-indigo-600" },
  { name: "Manufacturing", icon: "🏭", color: "from-slate-500 to-slate-700" },
  { name: "Technology", icon: "💻", color: "from-cyan-400 to-cyan-600" },
  { name: "Health & Wellness", icon: "🏥", color: "from-emerald-400 to-emerald-600" },
  { name: "Professional Services", icon: "💼", color: "from-purple-400 to-purple-600" },
  { name: "Real Estate", icon: "🏠", color: "from-rose-400 to-rose-600" },
  { name: "Decoration", icon: "✨", color: "from-amber-400 to-amber-600" },
  { name: "Restaurants", icon: "🍴", color: "from-red-400 to-red-600" },
  { name: "Beauty Spa", icon: "💆‍♀️", color: "from-pink-400 to-pink-600" },
  { name: "Home Decor", icon: "🛋️", color: "from-orange-300 to-orange-500" },
  { name: "Wedding Planning", icon: "💍", color: "from-fuchsia-400 to-fuchsia-600" },
  { name: "Rent & Hire", icon: "🚜", color: "from-yellow-500 to-yellow-700" },
  { name: "Hospitals", icon: "🚑", color: "from-red-500 to-red-700" },
  { name: "Contractors", icon: "👷", color: "from-amber-600 to-amber-800" },
  { name: "Pet Shops", icon: "🐾", color: "from-brown-400 to-brown-600" },
  { name: "PG/Hostels", icon: "🏢", color: "from-violet-400 to-violet-600" },
  { name: "Estate Agent", icon: "🏘️", color: "from-emerald-500 to-emerald-700" },
  { name: "Dentists", icon: "🦷", color: "from-sky-300 to-sky-500" },
  { name: "Gym", icon: "🏋️‍♂️", color: "from-zinc-600 to-zinc-800" },
  { name: "Loans", icon: "💰", color: "from-green-500 to-green-700" },
  { name: "Event Organiser", icon: "🎉", color: "from-indigo-500 to-indigo-700" },
];

export default function AllCategories() {
  return (
    <main className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 border-b border-slate-100 pb-6">
            <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight">
            All Categories
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Browse our complete list of business industries</p>
        </div>
        
        {/* Responsive Grid: Matches your reference image style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-4">
          {companyCategories.map((cat: any, index: number) => (
            <Link 
              href={`/companies?query=${encodeURIComponent(cat.name)}`} 
              key={index}
              className="flex items-center gap-4 p-2 hover:bg-slate-50 rounded-xl transition-all group border border-transparent hover:border-slate-100"
            >
              {/* Icon Container */}
              <div className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              
              {/* Category Name */}
              <span className="text-sm font-bold text-slate-700 group-hover:text-cyan-700 transition-colors uppercase tracking-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}