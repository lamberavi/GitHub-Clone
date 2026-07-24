import React from 'react';
import { Quote } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimation';

export default function CustomerStories() {
  const containerRef = useAnimateOnScroll({ type: 'slide-up' });

  const stories = [
    {
      quote: "GitHub let us shift from scattered manual scripts to a cohesive, automated React dashboard workflow. The visual merge checks accelerated our delivery speed significantly.",
      author: "Sarah Jenkins",
      role: "Engineering Director, Spotify",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
      company: "Spotify"
    },
    {
      quote: "The Monaco integrations let our global security teams inspect files and commit vulnerability hotfixes directly in-browser. Absolute game changer for compliance velocity.",
      author: "Marcus Aurelius",
      role: "Chief Security Officer, Mercedes-Benz",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      company: "Mercedes-Benz"
    }
  ];

  return (
    <section ref={containerRef} className="py-20 bg-transparent transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Loved by Engineering Leads</h2>
          <p className="text-sm text-[#8b949e] leading-relaxed">
            See why leading architects and administrators prefer building collaborative, animated pipelines.
          </p>
        </div>

        {/* Testimonials List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <div 
              key={index}
              className="glass-panel p-8 border border-[#30363d]/65 rounded-2xl shadow-premium relative flex flex-col justify-between hover:border-github-dark-accent/40 transition-colors duration-350 bg-[#161b22]/35"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-[#58a6ff]/10 pointer-events-none" />
              
              <p className="text-sm sm:text-base italic leading-relaxed text-[#e6edf3] relative z-10">
                "{story.quote}"
              </p>

              {/* Author profiles */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[#30363d]/40 relative z-10">
                <img 
                  src={story.avatar} 
                  alt={story.author} 
                  className="w-10 h-10 rounded-full object-cover border border-[#30363d]/50 shadow-sm shrink-0" 
                />
                <div className="min-w-0">
                  <h5 className="text-xs sm:text-sm font-bold truncate text-white">{story.author}</h5>
                  <p className="text-2xs text-[#8b949e] font-medium truncate">{story.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export { CustomerStories };
