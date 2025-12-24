"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react"
import { useParams } from "next/navigation"

const blogData: Record<string, any> = {
  "future-web-design": {
    title: "The Future of Web Design in 2025",
    author: "Sarah Chen",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    category: "Design Trends",
    image: "/brand-identity-design.jpg",
    content: `
      <h2>Introduction</h2>
      <p>Web design is evolving faster than ever. The intersection of artificial intelligence, accessibility requirements, and user expectations is pushing designers to think differently about how we create digital experiences.</p>

      <h2>Key Trends Shaping 2025</h2>
      <h3>1. AI-Powered Design Tools</h3>
      <p>Generative AI is revolutionizing the design process. Tools that can instantly create layouts, color schemes, and even entire website concepts are becoming standard. However, the human touch and strategic thinking remain invaluable.</p>

      <h3>2. Inclusive Design as Standard</h3>
      <p>Web accessibility is no longer optional. WCAG compliance and inclusive design principles are becoming baseline expectations. Designers must consider users with different abilities from the start.</p>

      <h3>3. Sustainability in Digital</h3>
      <p>Green design is gaining importance. Optimizing for energy efficiency, reducing file sizes, and considering the environmental impact of digital products is becoming part of responsible design practice.</p>

      <h3>4. Hyper-Personalization</h3>
      <p>Users expect personalized experiences. Advanced analytics and AI enable designers to create interfaces that adapt to individual user behaviors and preferences in real-time.</p>

      <h2>The Role of Designers</h2>
      <p>As tools become more powerful, the designer's role shifts. Rather than executing tedious tasks, designers focus on strategy, user research, and making crucial decisions about what to build and why. The best designs in 2025 will be those that balance technological capability with human-centered thinking.</p>

      <h2>Conclusion</h2>
      <p>The future of web design is exciting and full of possibilities. By embracing new tools while maintaining focus on user needs and ethical practices, we can create digital experiences that are not only beautiful but truly impactful.</p>
    `,
    suggestedPosts: ["digital-marketing-roi", "user-experience-psychology"],
  },
  "digital-marketing-roi": {
    title: "Maximizing Your Digital Marketing ROI",
    author: "Alex Kumar",
    date: "Dec 10, 2024",
    readTime: "10 min read",
    category: "Marketing",
    image: "/analytics-dashboard-interface.jpg",
    content: `
      <h2>Understanding Marketing ROI</h2>
      <p>Return on Investment (ROI) is the ultimate metric for marketing success. It measures the profit generated from marketing activities relative to the investment made. In today's data-driven world, tracking and optimizing ROI is essential.</p>

      <h2>Key Strategies for Better ROI</h2>
      <h3>1. Data-Driven Decision Making</h3>
      <p>Use analytics to understand which channels and campaigns deliver the best results. Focus your budget on high-performing strategies and continuously test and optimize.</p>

      <h3>2. Audience Segmentation</h3>
      <p>Not all customers are the same. Segment your audience and tailor messaging for different groups. Personalized campaigns consistently outperform generic ones.</p>

      <h3>3. Omnichannel Approach</h3>
      <p>Meet customers where they are. Integrate your marketing across email, social media, content, and paid ads for a cohesive customer experience.</p>

      <h2>Measurement Framework</h2>
      <p>Establish clear KPIs for each campaign. Track conversion rates, customer acquisition costs, and lifetime value. Use attribution modeling to understand the customer journey and allocate credit appropriately.</p>

      <h2>Conclusion</h2>
      <p>Maximizing ROI requires a combination of strategic thinking, data analysis, and continuous optimization. Start measuring, then iterating based on what works.</p>
    `,
    suggestedPosts: ["brand-storytelling", "ai-in-business"],
  },
  "scalable-web-apps": {
    title: "Building Scalable Web Applications",
    author: "Emma Rodriguez",
    date: "Dec 5, 2024",
    readTime: "12 min read",
    category: "Development",
    image: "/modern-ecommerce-platform.jpg",
    content: `
      <h2>Why Scalability Matters</h2>
      <p>Building for scalability means designing systems that can handle growth without breaking. This isn't just about handling more users—it's about maintaining performance, reliability, and user experience as your application grows.</p>

      <h2>Architecture Principles</h2>
      <h3>Microservices Architecture</h3>
      <p>Break your monolithic application into smaller, independent services. This allows teams to scale specific components independently and makes the system more resilient.</p>

      <h3>Database Optimization</h3>
      <p>Choose the right database for your needs. Use caching layers, implement proper indexing, and consider database sharding for horizontal scalability.</p>

      <h3>Load Balancing</h3>
      <p>Distribute traffic across multiple servers. Load balancers ensure no single server becomes a bottleneck and improve redundancy and reliability.</p>

      <h2>Cloud Infrastructure</h2>
      <p>Leverage cloud services for automatic scaling. Services like AWS, Google Cloud, and Azure provide auto-scaling capabilities that adjust resources based on demand.</p>

      <h2>Monitoring and Optimization</h2>
      <p>Continuous monitoring is essential. Track performance metrics, identify bottlenecks, and optimize proactively before issues impact users.</p>

      <h2>Conclusion</h2>
      <p>Scalability should be built in from day one. With the right architecture, tools, and practices, you can create applications that grow with your business.</p>
    `,
    suggestedPosts: ["ai-in-business", "future-web-design"],
  },
  "user-experience-psychology": {
    title: "Psychology of User Experience Design",
    author: "James Wilson",
    date: "Nov 28, 2024",
    readTime: "9 min read",
    category: "Design",
    image: "/mobile-application-design.jpg",
    content: `
      <h2>Understanding User Psychology</h2>
      <p>Great UX design is rooted in understanding how humans think and make decisions. By leveraging psychological principles, designers can create more intuitive and persuasive experiences.</p>

      <h2>Key Psychological Principles</h2>
      <h3>Cognitive Load</h3>
      <p>Users can only process so much information at once. Minimize cognitive load by simplifying interfaces, breaking tasks into steps, and using clear hierarchies.</p>

      <h3>Loss Aversion</h3>
      <p>People feel the pain of losing something more acutely than the pleasure of gaining it. Use this principle in persuasive design—highlight what users will lose if they don't take action.</p>

      <h3>Social Proof</h3>
      <p>Users trust what others trust. Incorporate reviews, testimonials, and user-generated content to build credibility and encourage conversions.</p>

      <h3>Scarcity and Urgency</h3>
      <p>Limited availability and time constraints motivate action. Use these principles carefully and ethically to encourage user engagement.</p>

      <h2>Applying Psychology to Design</h2>
      <p>Every design decision has psychological implications. From color choices to button placement, consider how your design influences user behavior and emotions.</p>

      <h2>Conclusion</h2>
      <p>The most effective UX designs are those that understand and respect user psychology. By applying these principles thoughtfully, you can create experiences that feel natural and persuasive.</p>
    `,
    suggestedPosts: ["future-web-design", "brand-storytelling"],
  },
  "ai-in-business": {
    title: "Implementing AI in Your Business Strategy",
    author: "Sarah Chen",
    date: "Nov 20, 2024",
    readTime: "11 min read",
    category: "Technology",
    image: "/brand-identity-design.jpg",
    content: `
      <h2>AI is No Longer Optional</h2>
      <p>Artificial intelligence has moved from science fiction to business necessity. Companies across industries are leveraging AI to improve operations, enhance customer experiences, and drive innovation.</p>

      <h2>AI Applications in Business</h2>
      <h3>Customer Service Automation</h3>
      <p>AI-powered chatbots and virtual assistants handle routine inquiries, freeing up human agents for complex issues. This improves response times and reduces costs.</p>

      <h3>Predictive Analytics</h3>
      <p>Use machine learning to forecast trends, customer behavior, and market changes. This enables more strategic decision-making and competitive advantage.</p>

      <h3>Workflow Automation</h3>
      <p>Automate repetitive tasks and processes. This not only reduces costs but frees employees to focus on higher-value work.</p>

      <h2>Implementation Challenges</h2>
      <p>While the potential is enormous, implementation requires careful planning. Address data quality, organizational readiness, and ethical considerations from the start.</p>

      <h2>Conclusion</h2>
      <p>AI is transforming business. The question isn't whether to implement AI, but how to do it strategically and responsibly to maximize value.</p>
    `,
    suggestedPosts: ["scalable-web-apps", "digital-marketing-roi"],
  },
  "brand-storytelling": {
    title: "The Art of Brand Storytelling",
    author: "Alex Kumar",
    date: "Nov 15, 2024",
    readTime: "7 min read",
    category: "Branding",
    image: "/analytics-dashboard-interface.jpg",
    content: `
      <h2>Why Stories Matter</h2>
      <p>Humans are wired for stories. We remember stories better than facts, and stories create emotional connections. In branding, a compelling story can be the difference between a forgettable company and a beloved brand.</p>

      <h2>Elements of a Great Brand Story</h2>
      <h3>Origin Story</h3>
      <p>Share how your brand began. What problem were you trying to solve? What inspired you? Authentic origin stories build credibility and connection.</p>

      <h3>Values and Mission</h3>
      <p>Clearly articulate what your brand stands for. What impact do you want to make? How do your values guide your decisions?</p>

      <h3>Customer Journey</h3>
      <p>Position your customers as the heroes of the story. Show how your brand helps them overcome challenges and achieve their goals.</p>

      <h2>Storytelling Across Channels</h2>
      <p>Consistent storytelling across all touchpoints—website, social media, marketing materials—reinforces your brand narrative and builds trust.</p>

      <h2>Conclusion</h2>
      <p>Great brands tell great stories. By crafting and sharing authentic, compelling narratives, you can build deeper connections with your audience and create a more memorable brand.</p>
    `,
    suggestedPosts: ["user-experience-psychology", "digital-marketing-roi"],
  },
}

export default function BlogPostPage() {
  const params = useParams()
  const postId = params.id as string
  const post = blogData[postId]

  if (!post) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Post Not Found</h1>
          <Link href="/blog">
            <button className="text-primary font-semibold flex items-center gap-2 justify-center hover:translate-x-1 transition-transform">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-primary font-semibold hover:translate-x-1 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>

      {/* Hero Image */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </section>

      {/* Article Content */}
      <article className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Meta Info */}
        <div className="space-y-6 mb-8 pb-8 border-b border-primary/10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-balance mb-4 text-foreground">
              {post.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </div>

        {/* Rich Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-12 [&>h2]:text-3xl [&>h2]:font-display [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-foreground [&>h3]:text-xl [&>h3]:font-display [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-foreground [&>p]:text-lg [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share Section */}
        <div className="py-8 border-t border-primary/10">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-foreground">Share this post:</span>
            <div className="flex gap-3">
              {["Facebook", "Twitter", "LinkedIn"].map((platform) => (
                <button
                  key={platform}
                  className="p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  title={`Share on ${platform}`}
                >
                  <Share2 className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Suggested Posts */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold mb-12">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {post.suggestedPosts.map((postId: string) => {
              const suggestedPost = blogData[postId]
              return (
                <Link key={postId} href={`/blog/${postId}`}>
                  <div className="group h-full rounded-2xl overflow-hidden glass hover:glass border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer hover:-translate-y-2 flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                      <img
                        src={suggestedPost.image || "/placeholder.svg"}
                        alt={suggestedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-grow p-6 flex flex-col">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold w-fit mb-3">
                        {suggestedPost.category}
                      </span>
                      <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {suggestedPost.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto pt-4 border-t border-primary/10">
                        <Calendar className="w-3 h-3" />
                        {suggestedPost.date}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center p-12 rounded-3xl glass border border-primary/20">
          <h2 className="text-4xl font-display font-bold text-balance mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Get the latest articles and insights delivered to your inbox every week.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg border border-primary/30 bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:border-primary transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
