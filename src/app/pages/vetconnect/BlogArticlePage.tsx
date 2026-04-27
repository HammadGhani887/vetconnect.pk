import React, { useState } from "react";
import { Link } from "react-router";
import { 
  ChevronRight, Clock, Facebook, Link2, Share2, 
  MessageCircle, Lightbulb, ArrowRight, CornerDownRight,
  Heart, Quote
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export function BlogArticlePage() {
  const [commentText, setCommentText] = useState("");
  
  return (
    <div className="min-h-screen bg-[#FFF9F2] pb-24">
      {/* Container */}
      <div className="pt-20">
        
        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <Link to="/vetconnect/blog" className="hover:text-[#1B4F72] transition-colors">Blog</Link>
            <ChevronRight size={14} />
            <Link to="/vetconnect/blog?category=dog-care" className="hover:text-[#1B4F72] transition-colors">Dog Care</Link>
            <ChevronRight size={14} />
            <span className="text-[#1B4F72] truncate max-w-[200px]">Puppy Vaccinations</span>
          </div>
          
          {/* Category Tag */}
          <div className="mb-6">
            <span className="px-3 py-1.5 bg-[#1B4F72]/10 text-[#1B4F72] text-xs font-bold rounded-full uppercase tracking-wide">
              Dog Care
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#1B4F72] mb-8 leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Complete Guide to Puppy Vaccinations in Pakistan — What Every Owner Must Know
          </h1>
          
          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 mb-10" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div className="flex items-center gap-3">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1715423058726-ddea1ec51b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc3MjcwMjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Dr. Ahmed Khan" 
                className="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-white"
              />
              <div className="text-left">
                <p className="font-bold text-[#1B4F72] text-base">Dr. Ahmed Khan</p>
                <div className="flex items-center gap-2 text-xs">
                  <span>May 10, 2026</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> 8 min read</span>
                </div>
              </div>
            </div>
            
            <div className="h-8 w-px bg-gray-300 hidden sm:block"></div>
            
            <div className="flex items-center gap-3">
              <span className="font-medium mr-1">Share:</span>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1B4F72] hover:bg-[#1B4F72] hover:text-white transition-colors shadow-sm border border-gray-100">
                <Facebook size={16} />
              </button>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors shadow-sm border border-gray-100">
                <MessageCircle size={16} />
              </button>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-500 hover:bg-gray-700 hover:text-white transition-colors shadow-sm border border-gray-100">
                <Link2 size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 relative h-[400px] md:h-[500px]">
             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
             <ImageWithFallback 
                src="https://images.unsplash.com/photo-1621371236495-1520d8dc72a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcHVwcHklMjBjbGluaWN8ZW58MXx8fHwxNzc3MjcyNDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Puppy at the clinic" 
                className="w-full h-full object-cover"
             />
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-[720px] mx-auto px-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <div className="prose prose-lg max-w-none text-[#333] leading-[1.8] text-[18px]">
            <p className="mb-6">
              Bringing a new puppy home is one of the most exciting experiences for any pet parent. However, along with the cuddles and playtime comes the significant responsibility of ensuring they remain healthy and protected from potentially fatal diseases. In Pakistan, where certain viral infections are prevalent, adhering to a strict vaccination schedule is not just a recommendation—it's a necessity.
            </p>
            <p className="mb-8">
              In this comprehensive guide, we'll walk you through everything you need to know about puppy vaccinations, from the core vaccines required to finding a reliable veterinary clinic in your area.
            </p>

            <h2 className="text-3xl font-bold text-[#1B4F72] mt-12 mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Why Vaccination Matters
            </h2>
            <p className="mb-6">
              Puppies are born with a naive immune system. While they receive some temporary immunity from their mother's milk (colostrum) during the first few days of life, this protection gradually wears off by the time they are 6 to 8 weeks old. 
            </p>
            <p className="mb-6">
              Without vaccinations, puppies are highly susceptible to diseases such as Parvovirus, Canine Distemper, and Rabies, which are particularly common in many parts of the country and can be life-threatening.
            </p>

            {/* Blockquote */}
            <div className="my-10 border-l-4 border-[#E67E22] bg-white p-6 md:p-8 rounded-r-xl shadow-sm italic text-xl text-[#1B4F72] relative">
              <Quote className="absolute top-4 left-4 text-[#E67E22]/20 w-12 h-12" />
              <p className="relative z-10 font-medium leading-relaxed">
                "Vaccinating your puppy is the single most effective way to prevent severe infectious diseases. It costs significantly less to prevent these illnesses than to treat them once your dog is infected."
              </p>
            </div>

            <h2 className="text-3xl font-bold text-[#1B4F72] mt-12 mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Recommended Vaccination Schedule
            </h2>
            <p className="mb-6">
              Your veterinarian may tailor this schedule based on your puppy's specific risk factors, but generally, the core vaccination schedule in Pakistan looks like this:
            </p>

            {/* Styled Table */}
            <div className="overflow-x-auto mb-8 rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-[#1B4F72] text-white">
                    <th className="p-4 font-semibold text-sm w-1/4">Puppy's Age</th>
                    <th className="p-4 font-semibold text-sm w-3/4">Recommended Vaccines</th>
                  </tr>
                </thead>
                <tbody className="text-[16px]">
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-[#1B4F72]">6–8 Weeks</td>
                    <td className="p-4 text-gray-700">DHPPi (Distemper, Hepatitis, Parvovirus, Parainfluenza) - 1st Dose</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <td className="p-4 font-medium text-[#1B4F72]">10–12 Weeks</td>
                    <td className="p-4 text-gray-700">DHPPi (2nd Dose) + Leptospirosis (1st Dose)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-[#1B4F72]">14–16 Weeks</td>
                    <td className="p-4 text-gray-700">DHPPi (3rd Dose) + Leptospirosis (2nd Dose) + Rabies (1st Dose)</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="p-4 font-medium text-[#1B4F72]">Annually</td>
                    <td className="p-4 text-gray-700">Booster shots for DHPPi, Leptospirosis, and Rabies</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Info Callout */}
            <div className="my-10 bg-[#EBF5FB] border border-[#AED6F1] p-6 rounded-xl flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-[#3498DB] text-white flex items-center justify-center shadow-sm">
                  <Lightbulb size={20} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-[#1B4F72] text-lg mb-2">Vet Tip: Keep Them Safe Until Fully Vaccinated</h4>
                <p className="text-[#2C3E50] text-base leading-relaxed mb-0">
                  Do not take your puppy to public places like parks, pet stores, or areas where unvaccinated dogs might frequent until they have received their final round of booster shots at 16 weeks. 
                </p>
              </div>
            </div>

            {/* CTA BOX */}
            <div className="my-12 bg-gradient-to-br from-[#1B4F72] to-[#0D2F4F] rounded-2xl p-8 md:p-10 shadow-lg text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E67E22]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
                  Need to vaccinate your puppy?
                </h3>
                <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
                  Find a verified veterinarian near you and schedule an appointment in minutes through VetConnect.
                </p>
                <Link to="/vetconnect/find-vet" className="inline-flex items-center gap-2 bg-[#E67E22] text-white px-8 py-3.5 rounded-full text-base font-bold hover:bg-[#D35400] transition-colors shadow-md group">
                  Book Appointment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-[#1B4F72] mt-12 mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Common Side Effects
            </h2>
            <p className="mb-4">
              Just like humans, puppies can experience mild side effects after receiving a vaccine. These are normal signs that the immune system is responding appropriately. Common side effects include:
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-3 text-gray-700">
              <li>Mild fever and lethargy for 24-48 hours.</li>
              <li>Decreased appetite.</li>
              <li>Slight swelling or tenderness at the injection site.</li>
              <li>Mild sneezing or coughing (if they received an intranasal vaccine).</li>
            </ul>
            <p className="mb-8">
              If your puppy experiences severe vomiting, facial swelling, difficulty breathing, or collapses, seek emergency veterinary care immediately, as this could indicate a rare allergic reaction.
            </p>

            <h2 className="text-3xl font-bold text-[#1B4F72] mt-12 mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Finding a Trusted Vet for Vaccinations
            </h2>
            <p className="mb-8">
              When searching for a vet clinic, look for one that maintains proper cold chain storage for their vaccines. Vaccines are highly sensitive to temperature; if they are not stored correctly, they lose their efficacy entirely. Don't hesitate to ask your vet about how they store their vaccines and which brands they use.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 mb-16 pt-8 border-t border-gray-200">
              <span className="text-sm font-bold text-gray-500 mr-2 py-1">Tags:</span>
              <Link to="#" className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors">Puppy Care</Link>
              <Link to="#" className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors">Vaccinations</Link>
              <Link to="#" className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors">Dog Health</Link>
              <Link to="#" className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors">First Year</Link>
            </div>
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="max-w-[720px] mx-auto px-4 mb-20">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1715423058726-ddea1ec51b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc3MjcwMjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Dr. Ahmed Khan" 
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
            <div className="flex-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <h3 className="text-xl font-bold text-[#1B4F72] mb-1">Dr. Ahmed Khan</h3>
              <p className="text-sm text-[#E67E22] font-semibold mb-4">Veterinary Surgeon at PetCare Hospital, Lahore</p>
              <p className="text-gray-600 mb-4 text-base leading-relaxed">
                With over 10 years of experience in small animal medicine, Dr. Ahmed is passionate about preventive care and educating pet owners in Pakistan about the best health practices for their furry companions.
              </p>
              <Link to="#" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1B4F72] hover:text-[#E67E22] transition-colors">
                View All Articles by Dr. Ahmed <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-white py-16 border-t border-gray-100 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-[#1B4F72]" style={{ fontFamily: "'DM Serif Display', serif" }}>
                You Might Also Like
              </h2>
              <Link to="/vetconnect/blog" className="hidden sm:flex items-center gap-2 text-[#1B4F72] font-bold hover:text-[#E67E22] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                View All <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <Link to="#" className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <div className="h-48 relative overflow-hidden">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1697134065897-d262c9127bd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWQlMjBjYXR8ZW58MXx8fHwxNzc3MjcyNDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                    alt="Sad Cat" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 text-xs font-bold rounded-md text-white shadow-md bg-[#27AE60]">
                      Health
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#1B4F72] mb-3 line-clamp-2 leading-snug group-hover:text-[#E67E22] transition-colors" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    5 Signs Your Cat Needs Immediate Vet Attention
                  </h3>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                       <ImageWithFallback src="https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" alt="Author" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1B4F72]">Dr. Sara Ali</p>
                      <p className="text-[11px] text-gray-400">May 10, 2026</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Card 2 */}
              <Link to="#" className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <div className="h-48 relative overflow-hidden">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1652737617965-023dd34aee48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXJnZSUyMGRvZyUyMGVhdGluZ3xlbnwxfHx8fDE3NzcyNzI0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                    alt="Large Dog Eating" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 text-xs font-bold rounded-md text-white shadow-md bg-[#1B4F72]">
                      Nutrition
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#1B4F72] mb-3 line-clamp-2 leading-snug group-hover:text-[#E67E22] transition-colors" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    Best Nutrition Plan for Large Breed Dogs
                  </h3>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                       <ImageWithFallback src="https://images.unsplash.com/photo-1715423058726-ddea1ec51b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" alt="Author" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1B4F72]">Dr. Usman Tariq</p>
                      <p className="text-[11px] text-gray-400">May 8, 2026</p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Card 3 */}
              <Link to="#" className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <div className="h-48 relative overflow-hidden">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1721593517030-5125a4683500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" 
                    alt="Dog Panting Summer" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 text-xs font-bold rounded-md text-white shadow-md bg-[#E67E22]">
                      Tips
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#1B4F72] mb-3 line-clamp-2 leading-snug group-hover:text-[#E67E22] transition-colors" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    Summer Heat Safety: Protecting Your Pets
                  </h3>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                       <ImageWithFallback src="https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" alt="Author" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1B4F72]">Dr. Hina Riaz</p>
                      <p className="text-[11px] text-gray-400">May 5, 2026</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="max-w-[720px] mx-auto px-4 py-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <h2 className="text-2xl font-bold text-[#1B4F72] mb-8" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Comments (12)
          </h2>
          
          {/* Comment Input */}
          <div className="flex gap-4 mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-[#1B4F72] text-white flex-shrink-0 flex items-center justify-center font-bold text-lg">
              Y
            </div>
            <div className="flex-1">
              <textarea 
                rows={3} 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts or ask a question..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F72]/20 focus:border-[#1B4F72] resize-none transition-all"
              ></textarea>
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-gray-400">Posting publicly as You</p>
                <button 
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-colors shadow-sm ${
                    commentText.trim() 
                      ? "bg-[#1B4F72] text-white hover:bg-[#154360]" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>

          {/* Comment List */}
          <div className="space-y-8">
            {/* Comment 1 */}
            <div className="flex gap-4">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" 
                alt="Ayesha M." 
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="bg-gray-50 p-5 rounded-2xl rounded-tl-none border border-gray-100 mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-[#1B4F72] text-base">Ayesha M.</h4>
                    <span className="text-xs text-gray-400">May 11, 2026</span>
                  </div>
                  <p className="text-gray-600 text-[15px] leading-relaxed">
                    This was so helpful! I just got a golden retriever puppy and was so confused about the schedule. Should I wait two weeks after the last shot before taking him to the park?
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm px-2">
                  <button className="text-gray-500 font-medium hover:text-[#1B4F72] transition-colors flex items-center gap-1">
                    <Heart size={14} /> Like (4)
                  </button>
                  <button className="text-gray-500 font-medium hover:text-[#1B4F72] transition-colors flex items-center gap-1">
                    <CornerDownRight size={14} /> Reply
                  </button>
                </div>
                
                {/* Reply */}
                <div className="flex gap-4 mt-6 ml-6">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1715423058726-ddea1ec51b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" 
                    alt="Dr. Ahmed Khan" 
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-blue-50/50 p-5 rounded-2xl rounded-tl-none border border-blue-100 mb-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[#1B4F72] text-sm">Dr. Ahmed Khan</h4>
                          <span className="px-2 py-0.5 bg-[#1B4F72] text-white text-[10px] font-bold rounded">AUTHOR</span>
                        </div>
                        <span className="text-xs text-gray-400">May 11, 2026</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Hi Ayesha! Congratulations on the new puppy. Yes, it takes about 10-14 days for the final vaccines to become fully effective. It's best to wait two full weeks before going to heavily populated dog parks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment 2 */}
            <div className="flex gap-4 pt-4 border-t border-gray-100">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex-shrink-0 flex items-center justify-center font-bold text-lg">
                F
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 p-5 rounded-2xl rounded-tl-none border border-gray-100 mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-[#1B4F72] text-base">Faisal Raza</h4>
                    <span className="text-xs text-gray-400">May 10, 2026</span>
                  </div>
                  <p className="text-gray-600 text-[15px] leading-relaxed">
                    Great article. I didn't know about the cold chain storage importance. I'll make sure to ask my vet about it on our next visit. Thanks!
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm px-2">
                  <button className="text-gray-500 font-medium hover:text-[#1B4F72] transition-colors flex items-center gap-1">
                    <Heart size={14} /> Like (2)
                  </button>
                  <button className="text-gray-500 font-medium hover:text-[#1B4F72] transition-colors flex items-center gap-1">
                    <CornerDownRight size={14} /> Reply
                  </button>
                </div>
              </div>
            </div>
            
            <div className="text-center pt-8">
              <button className="px-6 py-2.5 bg-white border border-[#1B4F72]/30 text-[#1B4F72] font-bold rounded-full text-sm hover:bg-[#1B4F72]/5 transition-colors">
                Load More Comments
              </button>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}
