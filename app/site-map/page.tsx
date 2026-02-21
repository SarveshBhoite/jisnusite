import Link from "next/link";

const sitemapSections = [
  {
    title: "Main",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Companies", href: "/companies" },
      { label: "Categories", href: "/categories" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Logout", href: "/logout" },
      { label: "Cart", href: "/cart" },
      { label: "List Your Company", href: "/companies/list-your-company" },
    ],
  },
];

export default function SiteMapPage() {
  return (
    <section className="bg-slate-50 min-h-screen py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-10">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">Site Map</h1>
            <p className="text-slate-600 mt-2">
              Browse all important pages in one place.
            </p>
            <p className="text-sm text-cyan-700 mt-3">
              XML sitemap:{" "}
              <Link className="underline font-semibold" href="/sitemap.xml">
                /sitemap.xml
              </Link>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {sitemapSections.map((section) => (
              <div key={section.title} className="rounded-xl border border-slate-200 p-5">
                <h2 className="text-lg font-bold text-slate-900 mb-3">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-slate-700 hover:text-cyan-700 font-medium transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
