import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Youtube, Linkedin } from 'lucide-react';
import FooterBackground from './FooterBackground';
import FooterLinks from './FooterLinks';
import FooterGlow from './FooterGlow';
import FooterAnimation from './FooterAnimation';

export default function Footer() {
  return (
    <footer className="relative border-t border-[#30363D]/45 py-24 mt-20 bg-transparent overflow-hidden">
      <FooterBackground />
      <FooterGlow />
      
      <FooterAnimation>
        <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
          
          {/* Main Links grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-start">
            
            {/* Brand Info Column */}
            <div className="col-span-2 space-y-6">
              <Link to="/" className="flex items-center gap-2.5 font-black text-[27px] tracking-tight hover:opacity-90 text-white select-none">
                <Github className="w-9 h-9 text-white shrink-0" />
                <span>GitHub</span>
              </Link>
              <p className="text-[14px] text-[#8b949e] font-semibold leading-[1.65] max-w-sm">
                The world's leading developer platform. Helping millions of engineers collaborate, automate actions, and secure production source code.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="text-[#8b949e] hover:text-github-dark-accent transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-[#8b949e] hover:text-github-dark-accent transition-colors">
                  <Youtube size={18} />
                </a>
                <a href="#" className="text-[#8b949e] hover:text-github-dark-accent transition-colors">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Links columns */}
            <FooterLinks />
          </div>

          {/* Footer Bottom copyright section */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-[#30363D]/40 pt-8 gap-4 text-[14px] font-bold text-[#8b949e]">
            <p>© {new Date().getFullYear()} GitHub, Inc. Built for portfolio showcase.</p>
            <div className="flex gap-6 text-[13px] font-bold">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>

        </div>
      </FooterAnimation>
    </footer>
  );
}
export { Footer };
