"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Check,
  ShoppingCart,
  Loader2,
  Zap,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ServicesFrontend() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const searchParams = useSearchParams(); 
   const categoryFromUrl = searchParams.get("category");

  useEffect(() => {
    // 3. If a category exists in the URL, set it as the active filter
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // 1. Fetch data from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/admin/services");
        const data = await res.json();
        // Filter out hidden services based on your Mongoose status field
        setServices(data.filter((s: any) => s.status === "active"));
      } catch (err) {
        console.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // 2. Generate Unique Categories automatically from the data
  const categories = useMemo(() => {
    const unique = Array.from(new Set(services.map((s: any) => s.category)));
    return ["All", ...unique];
  }, [services]);

  // 3. Filter services based on selection
  const filteredServices = services.filter((service: any) => 
    selectedCategory === "All" ? true : service.category === selectedCategory
  );

  const addToCart = (service: any) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = currentCart.find((item: any) => item._id === service._id);

    if (exists) {
      alert("This service is already in your cart!");
      return;
    }

    const updatedCart = [...currentCart, { ...service, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Dispatch custom event to update navbar cart count
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${service.title} added to cart!`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );

  return (
    <main className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <Link
            href="/"
            className="text-slate-600 text-sm font-bold flex items-center gap-1 hover:text-blue-600 transition"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <section className="mb-12">
          <div className="px-4 text-center">
            <h1 className="font-display text-5xl md:text-7xl font-black mb-4 uppercase italic tracking-tighter text-black">
              Our Services
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Explore our range of professional digital services tailored for your growth.
            </p>
          </div>
        </section>

        {/* --- CATEGORY FILTER BAR --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-black transition-all duration-300 border ${
                selectedCategory === cat
                  ? "bg-primary  text-white "
                  : "bg-white border-primary text-slate-500 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- SERVICES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service: any) => {
            const discountPercentage = Math.round(
              ((service.basePrice - service.discountPrice) / service.basePrice) * 100
            );

            return (
              <div
                key={service._id}
                className="group bg-white rounded-[2.5rem] border border-slate-200 p-8 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 relative flex flex-col"
              >
                {/* DISCOUNT BADGE */}
                {discountPercentage > 0 && (
                  <div className="absolute top-6 right-6 bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg z-10">
                    {discountPercentage}% OFF
                  </div>
                )}

                <div className="mb-2">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:rotate-12 transition-all duration-500">
                    <Zap className="w-6 h-6 text-blue-600 group-hover:text-white" />
                  </div>
                  
                  {/* Category Tag on Card */}
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">
                    {service.category}
                  </p>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-2 h-12 line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* FEATURES / INCLUSIONS */}
                <div className="space-y-3 mb-8 flex-1">
                  <h4 className="text-sm font-bold text-slate-700">
                    What's included:
                  </h4>
                  {service.inclusions?.map((item: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm font-semibold text-slate-600"
                    >
                      <div className="mt-1 w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-green-600 stroke-[4px]" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>

                {/* PRICING & BUTTON */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-3xl font-black text-slate-900">
                      ₹{service.discountPrice}
                    </span>
                    <span className="text-lg text-slate-400 font-bold line-through mb-1">
                      ₹{service.basePrice}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(service)}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                  >
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-bold italic">
              No services found in this category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}