import React, { useState } from "react";
import { Search, Clock, ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, ArrowRight, Mail } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Link } from "react-router";

const categories = [
  "All", "Dog Care", "Cat Care", "Nutrition", "Vaccinations", "Grooming", "First Aid", "Livestock", "Exotic Pets", "Vet Tips"
];

const featuredArticle = {
  title: "Complete Guide to Puppy Vaccinations in Pakistan — What Every Owner Must Know",
  category: "Featured • Dog Care",
  excerpt: "Puppy vaccinations are a crucial step in ensuring your new furry friend lives a long, healthy life. Learn about the core vaccines, schedule, and where to get them done.",
  author: "Dr. Ahmed Khan",
  authorAvatar: "https://images.unsplash.com/photo-1554765345-6ad6a5417cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzcyNzAyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  date: "May 12, 2026",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1621371236495-1520d8dc72a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcHVwcHklMjBjbGluaWN8ZW58MXx8fHwxNzc3MjcyNDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

const articles = [
  {
    id: 1,
    title: "5 Signs Your Cat Needs Immediate Vet Attention",
    category: "Health",
    tagColor: "#27AE60",
    excerpt: "Cats are masters at hiding pain. Discover the subtle signs that indicate your feline friend might be dealing with a medical emergency requiring urgent care.",
    author: "Dr. Sara Ali",
    authorAvatar: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzI3MDIwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "May 10, 2026",
    readTime: "5 min read",
    emoji: "🐱",
    image: "https://images.unsplash.com/photo-1697134065897-d262c9127bd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWQlMjBjYXR8ZW58MXx8fHwxNzc3MjcyNDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    title: "Best Nutrition Plan for Large Breed Dogs",
    category: "Nutrition",
    tagColor: "#1B4F72",
    excerpt: "Large breeds like German Shepherds and Labradors have specific dietary needs to support their joints and growth. Here is a balanced meal guide.",
    author: "Dr. Usman Tariq",
    authorAvatar: "https://images.unsplash.com/photo-1554765345-6ad6a5417cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzcyNzAyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "May 8, 2026",
    readTime: "7 min read",
    emoji: "🐕",
    image: "https://images.unsplash.com/photo-1652737617965-023dd34aee48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXJnZSUyMGRvZyUyMGVhdGluZ3xlbnwxfHx8fDE3NzcyNzI0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    title: "Summer Heat Safety: Protecting Your Pets",
    category: "Tips",
    tagColor: "#E67E22",
    excerpt: "As temperatures rise across the country, pets are vulnerable to heatstroke. Learn how to keep them cool, hydrated, and safe indoors.",
    author: "Dr. Hina Riaz",
    authorAvatar: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzI3MDIwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "May 5, 2026",
    readTime: "4 min read",
    emoji: "☀️",
    image: "https://images.unsplash.com/photo-1721593517030-5125a4683500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBwYW50aW5nJTIwc3VtbWVyfGVufDF8fHx8MTc3NzI3MjQyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 4,
    title: "Understanding Livestock Vaccination Schedules",
    category: "Livestock",
    tagColor: "#8E44AD",
    excerpt: "Proper immunization programs are vital for farm animal health and productivity. Here's a comprehensive breakdown of required vaccines.",
    author: "Dr. Ahmed Khan",
    authorAvatar: "https://images.unsplash.com/photo-1554765345-6ad6a5417cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzcyNzAyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "May 1, 2026",
    readTime: "10 min read",
    emoji: "🐄",
    image: "https://images.unsplash.com/photo-1629313472434-cbbfdc2e1a5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3clMjBmYXJtfGVufDF8fHx8MTc3NzI3MjQyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 5,
    title: "How to Choose the Right Vet for Your Pet",
    category: "Guide",
    tagColor: "#1B4F72",
    excerpt: "Finding a reliable and experienced veterinarian can be challenging. Look for these top 5 qualities when searching for your primary pet care provider.",
    author: "Dr. Sara Ali",
    authorAvatar: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzI3MDIwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "April 28, 2026",
    readTime: "6 min read",
    emoji: "🩺",
    image: "https://images.unsplash.com/photo-1644675272883-0c4d582528d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjBjbGluaWN8ZW58MXx8fHwxNzc3MjcyNDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 6,
    title: "Common Skin Problems in Persian Cats",
    category: "Health",
    tagColor: "#27AE60",
    excerpt: "Persian cats are prone to various dermatological issues. From ringworm to flea allergies, understand what to look for and how to treat it.",
    author: "Dr. Hina Riaz",
    authorAvatar: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzI3MDIwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "April 25, 2026",
    readTime: "5 min read",
    emoji: "🐈",
    image: "https://images.unsplash.com/photo-1585137173132-cf49e10ad27d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0fGVufDF8fHx8MTc3NzI3MjQyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const popularArticles = [
  { id: 1, title: "Is My Dog Overweight? Here's How to Tell", reads: "12k reads" },
  { id: 2, title: "Top 10 Poisonous Foods for Cats & Dogs", reads: "9.5k reads" },
  { id: 3, title: "The Ultimate Guide to Litter Box Training", reads: "8.2k reads" },
  { id: 4, title: "Tick & Flea Prevention: What Actually Works", reads: "7.1k reads" },
  { id: 5, title: "Dental Health: Brushing Your Pet's Teeth", reads: "5.4k reads" },
];

const categoryCounts = [
  { name: "Dog Care", count: 42 },
  { name: "Cat Care", count: 38 },
  { name: "Nutrition", count: 24 },
  { name: "Vaccinations", count: 18 },
  { name: "Grooming", count: 15 },
  { name: "Livestock", count: 12 },
];

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-[#FFF9F2] pb-24">
      {/* Hero Banner */}
      <section className="pt-20 pb-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 
            className="text-4xl md:text-5xl font-bold text-[#1B4F72] mb-4"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Pet Health Blog
          </h1>
          <p className="text-[#555] text-lg mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Expert tips, guides, and news for pet owners
          </p>
          <div className="relative max-w-xl mx-auto shadow-sm rounded-full bg-white border border-gray-200 focus-within:ring-2 focus-within:ring-[#1B4F72]/20 focus-within:border-[#1B4F72] transition-all flex items-center p-1">
            <div className="pl-4 pr-3 text-gray-400">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full bg-transparent border-none focus:outline-none py-3 text-[#1B4F72]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            />
            <button className="bg-[#1B4F72] text-white px-6 py-2.5 rounded-full hover:bg-[#154360] transition-colors ml-2 font-medium text-sm">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#1B4F72] text-white shadow-md"
                  : "bg-white text-[#1B4F72] border border-[#1B4F72]/20 hover:border-[#1B4F72] hover:bg-[#1B4F72]/5"
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Left Column: Articles */}
        <div className="lg:col-span-3 flex flex-col">
          
          {/* Featured Article */}
          <Link to="/vetconnect/blog/article" className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row hover:shadow-lg transition-all duration-300 cursor-pointer mb-10">
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <ImageWithFallback 
                src={featuredArticle.image} 
                alt="Featured" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white z-20">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-[#E67E22]/10 text-[#E67E22] text-xs font-bold rounded-md uppercase tracking-wide">
                  {featuredArticle.category}
                </span>
              </div>
              <h2 
                className="text-2xl md:text-3xl font-bold text-[#1B4F72] mb-4 leading-tight group-hover:text-[#E67E22] transition-colors"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {featuredArticle.title}
              </h2>
              <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <ImageWithFallback 
                    src={featuredArticle.authorAvatar} 
                    alt={featuredArticle.author} 
                    className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-100"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#1B4F72]">{featuredArticle.author}</p>
                    <div className="flex items-center text-xs text-gray-500 gap-2 mt-0.5">
                      <span>{featuredArticle.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {featuredArticle.readTime}</span>
                    </div>
                  </div>
                </div>
                <button className="hidden sm:flex items-center gap-2 bg-[#1B4F72] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#154360] transition-colors shadow-md">
                  Read Article <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </Link>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {articles.map((article) => (
              <Link to="/vetconnect/blog/article" key={article.id} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer">
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/20">
                    <span className="text-4xl filter drop-shadow-md">{article.emoji}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-black/10 z-0 mix-blend-overlay"></div>
                  <ImageWithFallback 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span 
                      className="px-3 py-1 text-xs font-bold rounded-md text-white shadow-md"
                      style={{ backgroundColor: article.tagColor }}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 
                    className="text-xl font-bold text-[#1B4F72] mb-3 line-clamp-2 leading-snug group-hover:text-[#E67E22] transition-colors"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <ImageWithFallback 
                      src={article.authorAvatar} 
                      alt={article.author} 
                      className="w-8 h-8 rounded-full object-cover shadow-sm"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-[#1B4F72]">{article.author}</p>
                      <div className="flex items-center text-[11px] text-gray-400 gap-2 mt-0.5">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-auto mb-10 lg:mb-0">
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-[#1B4F72] hover:bg-[#1B4F72]/5 rounded-md transition-colors disabled:opacity-50" disabled>
              <ChevronLeft size={16} /> Previous
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((page) => (
                <button 
                  key={page}
                  className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                    page === 1 ? "bg-[#1B4F72] text-white shadow-sm" : "text-gray-600 hover:bg-[#1B4F72]/5 hover:text-[#1B4F72]"
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-gray-400 px-1">...</span>
              <button className="w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium text-gray-600 hover:bg-[#1B4F72]/5 hover:text-[#1B4F72] transition-colors">
                8
              </button>
            </div>
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-[#1B4F72] hover:bg-[#1B4F72]/5 rounded-md transition-colors">
              Next <ChevronRight size={16} />
            </button>
          </div>
          
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          
          {/* Popular Articles */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-[#1B4F72] mb-5" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Popular Articles
            </h3>
            <div className="flex flex-col gap-4">
              {popularArticles.map((article, index) => (
                <div key={article.id} className="flex gap-4 group cursor-pointer">
                  <div className="text-2xl font-bold text-[#E67E22]/30 group-hover:text-[#E67E22] transition-colors" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    0{index + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1B4F72] group-hover:text-[#E67E22] transition-colors leading-snug mb-1">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-400">{article.reads}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-[#1B4F72] mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Categories
            </h3>
            <div className="flex flex-col gap-2">
              {categoryCounts.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between group cursor-pointer p-2 rounded-lg hover:bg-[#1B4F72]/5 transition-colors">
                  <span className="text-sm text-gray-700 group-hover:text-[#1B4F72] group-hover:font-medium transition-all">
                    {cat.name}
                  </span>
                  <span className="bg-[#FFF9F2] text-[#E67E22] text-xs font-bold px-2 py-1 rounded-md">
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-gradient-to-br from-[#1B4F72] to-[#0D2F4F] rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#E67E22]/20 rounded-full blur-2xl"></div>
            
            <Mail className="text-[#E67E22] mb-4" size={28} />
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Get pet care tips in your inbox
            </h3>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              Join 15,000+ pet parents receiving our weekly vet-approved advice.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-[#E67E22] focus:bg-white/20 transition-all"
              />
              <button 
                type="submit" 
                className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Follow Us */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-[#1B4F72] mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Follow Us
            </h3>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-[#FFF9F2] text-[#1B4F72] flex items-center justify-center hover:bg-[#1B4F72] hover:text-white transition-colors shadow-sm">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#FFF9F2] text-[#1B4F72] flex items-center justify-center hover:bg-[#1B4F72] hover:text-white transition-colors shadow-sm">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#FFF9F2] text-[#1B4F72] flex items-center justify-center hover:bg-[#1B4F72] hover:text-white transition-colors shadow-sm">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}