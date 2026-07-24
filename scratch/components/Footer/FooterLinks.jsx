import React from 'react';

export default function FooterLinks() {
  const columns = [
    {
      title: 'Product',
      links: ['Features', 'Security', 'Enterprise', 'Customer Stories', 'Pricing', 'Resources']
    },
    {
      title: 'Solutions',
      links: ['For Startups', 'For Teams', 'For Enterprise', 'For Education', 'Partnerships']
    },
    {
      title: 'Support',
      links: ['Docs', 'Help Center', 'Community Forum', 'GitHub Status', 'Contact Support']
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Press', 'Shop', 'Leadership']
    }
  ];

  return (
    <>
      {columns.map((col) => (
        <div key={col.title} className="space-y-4 col-span-1">
          <h4 className="text-[14px] sm:text-[15px] font-black uppercase tracking-[0.5px] text-white">
            {col.title}
          </h4>
          <ul className="space-y-2.5 text-[14px] font-semibold text-[#8b949e] leading-[1.7]">
            {col.links.map((link) => (
              <li key={link}>
                <a 
                  href="#" 
                  className="block w-fit text-[#8b949e] hover:text-white transition-all duration-250 hover:translate-x-1 relative group select-none cursor-pointer"
                >
                  <span>{link}</span>
                  {/* Glowing draw line beneath link item */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-github-dark-accent transition-all duration-250 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
export { FooterLinks };
