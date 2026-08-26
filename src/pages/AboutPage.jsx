// src/pages/AboutPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Assets
import elevaturaLivingImg from '../assets/elevatura_living.jpg';
import elevaturaChairImg from '../assets/elevatura_chair.jpg';
import serviceArchitectureImg from '../assets/service_architecture.jpg';
import serviceConstructionImg from '../assets/service_construction.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const teamMembers = [
  { name: 'Sarah Jenkins', role: 'Principal Architect & Founder', specialty: 'Spatial Geometry & Luxury Living', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
  { name: 'Marcus Sterling', role: 'Head of Civil Engineering', specialty: 'Structural Framing & Turnkey Build', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80' },
  { name: 'Elena Rostova', role: 'Lead Interior Stylist', specialty: 'Scandinavian Textiles & Lighting', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80' },
  { name: 'Aarav Mehta', role: 'Chief Project Superintendent', specialty: 'BIM Integration & On-Site Quality', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80' },
];

const values = [
  {
    icon: '✨',
    title: 'Architectural Rigor',
    desc: 'Every millimetre is planned with mathematical clarity, structural durability, and ergonomic flow.',
  },
  {
    icon: '🌿',
    title: 'Biophilic Harmony',
    desc: 'Connecting interior sanctuaries with natural light, organic materials, and sustainable energy efficiency.',
  },
  {
    icon: '🏛️',
    title: 'Turnkey Accountability',
    desc: 'From initial sketch and municipal permissions to foundation pouring and white-glove staging.',
  },
  {
    icon: '⏱️',
    title: 'Precision Timeline',
    desc: 'Milestone-backed delivery commitments ensuring your home is handed over smoothly and on schedule.',
  },
];

const AboutPage = () => {
  return (
    <div className="bg-white text-[#111111] min-h-screen selection:bg-[#F5A623] selection:text-white pt-24 pb-20 overflow-x-hidden">
      
      {/* ─── HERO HEADER ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-16">
        <div className="max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeInUp}
            className="flex items-center gap-2.5 mb-4"
          >
            <span className="w-3 h-3 rounded-full bg-[#F5A623]" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F5A623]">
              About ELEVATURA
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
            className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-[#111111] leading-[1.08]"
          >
            Designing Spaces That <span className="font-normal text-[#555555]">Endure & Inspire.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeInUp}
            className="text-[#555555] text-base sm:text-xl leading-relaxed mt-6 font-normal"
          >
            Founded in 2002, ELEVATURA is an award-winning architectural and interior design studio. We bring together master architects, civil engineers, and artisan craftsmen to create bespoke living sanctuaries.
          </motion.p>
        </div>
      </section>

      {/* ─── ASYMMETRIC BENTO STORY SECTION ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-[28px] overflow-hidden aspect-[4/5] bg-neutral-100 shadow-md">
              <img src={elevaturaLivingImg} alt="Interior Design" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4">
              <div className="rounded-[28px] overflow-hidden aspect-square bg-neutral-100 shadow-md">
                <img src={elevaturaChairImg} alt="Scandinavian Styling" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-[28px] overflow-hidden aspect-[4/3] bg-neutral-100 shadow-md">
                <img src={serviceArchitectureImg} alt="Architectural Blueprints" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right Column: Philosophy */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block">
              Our Studio Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
              A harmonious blend of architectural precision and tactile luxury.
            </h2>
            <p className="text-neutral-600 text-base leading-relaxed">
              We believe a home is more than an aesthetic arrangement; it is a living ecosystem that shapes your daily well-being. Our holistic methodology bridges the gap between raw structural construction and the refined poetry of bespoke interior design.
            </p>
            <p className="text-neutral-600 text-base leading-relaxed">
              With over 20 years of continuous practice across Mumbai, Pune, and Alibaug, our studio delivers turnkey certainty—managing every sketch, permit, foundation pour, and fabric swatch under one accountable roof.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/portfolio"
                className="bg-[#111111] hover:bg-neutral-800 text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all shadow-sm active:scale-95"
              >
                Explore Portfolios ↗
              </Link>
              <Link
                to="/contact"
                className="border border-neutral-300 hover:border-[#111111] text-[#111111] font-medium px-7 py-3.5 rounded-full text-sm transition-all"
              >
                Contact Studio
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="mb-12">
          <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block mb-2">
            Guiding Principles
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            The Pillars Behind Our Work
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-8 rounded-[32px] bg-[#FAF8F5] border border-neutral-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-4 block">{v.icon}</span>
              <h3 className="text-xl font-bold text-[#111111] mb-2">{v.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── LEADERSHIP TEAM ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="mb-12">
          <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block mb-2">
            Leadership & Craft
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            Meet the Principal Designers & Engineers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group bg-neutral-50 rounded-[28px] overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-[4/4.5] overflow-hidden bg-neutral-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-[#111111]">{member.name}</h4>
                <p className="text-[#F5A623] text-xs font-bold uppercase tracking-wider mt-0.5">{member.role}</p>
                <p className="text-neutral-500 text-xs mt-2 leading-relaxed">{member.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── METRICS BANNER ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-y border-neutral-200 py-12">
          <div>
            <span className="text-4xl sm:text-5xl font-black text-[#111111] block">20+</span>
            <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider mt-1 block">Years Experience</span>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-[#F5A623] block">500+</span>
            <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider mt-1 block">Spaces Transformed</span>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-[#111111] block">99.4%</span>
            <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider mt-1 block">Client Satisfaction</span>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-[#F5A623] block">100%</span>
            <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider mt-1 block">Turnkey Delivery</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;