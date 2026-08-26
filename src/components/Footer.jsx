// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white py-16 px-6 sm:px-10 lg:px-16 border-t border-neutral-800">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-neutral-800">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-white group">
              <span className="w-3.5 h-3.5 rounded-full bg-[#F5A623] inline-block transition-transform duration-300 group-hover:scale-125" />
              <span className="font-extrabold tracking-wider text-white uppercase text-2xl">
                ELEVATURA
              </span>
            </Link>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-sm">
              Transforming living and commercial environments with bespoke architecture, interior styling, and turnkey civil construction.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#F5A623]">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span className="text-neutral-400 ml-1 font-normal">Award Winning Interior • Since 2002</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest text-[#F5A623]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Expertise */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest text-[#F5A623]">
              Expertise
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><Link to="/services/residential" className="hover:text-white transition-colors">Residential Design</Link></li>
              <li><Link to="/services/commercial" className="hover:text-white transition-colors">Commercial Spaces</Link></li>
              <li><Link to="/services/architectural" className="hover:text-white transition-colors">Architectural CAD</Link></li>
              <li><Link to="/services/renovation" className="hover:text-white transition-colors">Civil Construction</Link></li>
              <li><Link to="/services/consultation" className="hover:text-white transition-colors">Design Advisory</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest text-[#F5A623]">
              Design Studios
            </h4>
            <div className="text-sm text-neutral-400 space-y-2">
              <p>📍 Bandra West & Worli, Mumbai, MH</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ studio@elevatura.design</p>
              <p className="text-xs text-neutral-500 pt-1">Mon – Sat: 9:00 AM – 7:00 PM</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} ELEVATURA Design & Architecture. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;