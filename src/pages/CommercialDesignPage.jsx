import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaArrowRight } from 'react-icons/fa';

const CommercialDesignPage = () => {
  return (
    <div className="pt-20 bg-[#FCF9F7] min-h-screen">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-[#C6A15B] font-semibold tracking-widest text-sm uppercase">Commercial</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1410] mt-2">Workplaces That Inspire Productivity</h1>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4">We design functional commercial interiors that express your brand and improve the experience of every visitor.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80" alt="Commercial design" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#C6A15B]/10 flex items-center justify-center"><FaBuilding className="text-[#C6A15B] text-2xl" /></div>
              <div>
                <h3 className="text-2xl font-bold text-[#1a1410]">Commercial Interiors</h3>
                <p className="text-gray-600">Brand-first design with efficient circulation and premium detailing.</p>
              </div>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li>• Office spaces designed for productivity and comfort</li>
              <li>• Retail and hospitality concepts that attract attention</li>
              <li>• Spatial planning that supports team flow and customer experience</li>
              <li>• Premium finishes and cohesive brand styling</li>
            </ul>
            <button className="bg-[#C6A15B] text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-[#b08d4a] transition">Discuss Your Project <FaArrowRight /></button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommercialDesignPage;
