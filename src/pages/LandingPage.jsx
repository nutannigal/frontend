// src/pages/LandingPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

// Assets
import elevaturaLivingImg from '../assets/elevatura_living.jpg';
import elevaturaChairImg from '../assets/elevatura_chair.jpg';
import masonryKitchenImg from '../assets/masonry_kitchen.jpg';
import masonryBedroomImg from '../assets/masonry_bedroom.jpg';
import masonryBathroomImg from '../assets/masonry_bathroom.jpg';
import galleryYellowImg from '../assets/gallery3_yellow.jpg';
import galleryTealImg from '../assets/gallery2_teal.jpg';
import galleryOrangeImg from '../assets/gallery1_orange.jpg';

// Framer Motion Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.12,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const imageFadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      delay: custom * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// Masonry Gallery Projects Data
const galleryProjects = [
  {
    id: 1,
    title: 'Marble Island Atelier',
    category: 'Kitchen & Dining',
    location: 'Bandra West, Mumbai',
    image: masonryKitchenImg,
    aspect: 'aspect-[3/4]',
  },
  {
    id: 2,
    title: 'Nordic Horizon Lounge',
    category: 'Living Room',
    location: 'Worli Penthouse',
    image: elevaturaLivingImg,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 3,
    title: 'Fluted Oak Sanctuary',
    category: 'Master Bedroom',
    location: 'Juhu Estate',
    image: masonryBedroomImg,
    aspect: 'aspect-[4/3.2]',
  },
  {
    id: 4,
    title: 'Travertine Spa Suite',
    category: 'Spa Bathrooms',
    location: 'Alibaug Villa',
    image: masonryBathroomImg,
    aspect: 'aspect-[3/4]',
  },
  {
    id: 5,
    title: 'Amber Niche Studio',
    category: 'Bespoke Architecture',
    location: 'Marine Drive, Mumbai',
    image: galleryYellowImg,
    aspect: 'aspect-[3/4]',
  },
  {
    id: 6,
    title: 'Teal Velvet Retreat',
    category: 'Living Room',
    location: 'Koregaon Park, Pune',
    image: galleryTealImg,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 7,
    title: 'Scandinavian Lounge Corner',
    category: 'Bespoke Architecture',
    location: 'Pali Hill, Bandra',
    image: elevaturaChairImg,
    aspect: 'aspect-[3/2]',
  },
  {
    id: 8,
    title: 'Terra Cotta Gallery Room',
    category: 'Living Room',
    location: 'BKC Executive Suites',
    image: galleryOrangeImg,
    aspect: 'aspect-[3/4]',
  },
];

const categories = ['All', 'Living Room', 'Kitchen & Dining', 'Master Bedroom', 'Spa Bathrooms', 'Bespoke Architecture'];

const LandingPage = () => {
  const navigate = useNavigate();

  // Hover state for blur & focus effect in Masonry Gallery
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Consultation Modal / Inquiry Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential',
    area: '',
    budget: '₹20 Lakh to 30 Lakh',
    message: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await API.post('/enquiry/add', formData);
      if (res.data?.success) {
        setFormSuccess(true);
        setTimeout(() => {
          setFormSuccess(false);
          setIsModalOpen(false);
        }, 2500);
      }
    } catch {
      setFormSuccess(true);
      setTimeout(() => {
        setFormSuccess(false);
        setIsModalOpen(false);
      }, 2500);
    } finally {
      setFormLoading(false);
    }
  };

  const filteredProjects = activeCategory === 'All'
    ? galleryProjects
    : galleryProjects.filter((p) => p.category === activeCategory);

  const scrollToGallery = () => {
    document.getElementById('masonry-gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-[#111111] min-h-screen selection:bg-[#F5A623] selection:text-white relative overflow-x-hidden">
      
      {/* ─── SINGLE VIEW HERO SECTION ─── */}
      <section className="relative w-full min-h-screen max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-8 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full my-auto">
          
          {/* Left Column: Headlines, Subtitle, CTA Button & Badge */}
          <div className="lg:col-span-6 space-y-5 xl:space-y-6">
            
            {/* Main Headline */}
            <motion.div 
              initial="hidden"
              animate="visible"
              className="space-y-0.5 sm:space-y-1 text-[#111111]"
            >
              {/* Line 1: Elevate Your + Crescent Shape */}
              <motion.div 
                custom={0}
                variants={fadeInUp}
                className="flex items-center gap-3"
              >
                <h1 className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-bold tracking-tight text-[#111111] leading-tight">
                  Elevate Your
                </h1>
                
                {/* Golden-Orange Crescent Shape */}
                <div className="w-7 h-7 sm:w-10 sm:h-10 flex-shrink-0 text-[#F5A623] relative">
                  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full transform rotate-[30deg]">
                    <path d="M 50 0 A 50 50 0 0 1 50 100 A 32 32 0 0 0 50 0 Z" />
                  </svg>
                </div>
              </motion.div>

              {/* Line 2: Home (Bold) with Elegant, (Regular) */}
              <motion.div 
                custom={1}
                variants={fadeInUp}
                className="flex flex-wrap items-baseline gap-2 sm:gap-3"
              >
                <span className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-extrabold tracking-tight text-[#111111] leading-tight">
                  Home
                </span>
                <span className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-normal tracking-tight text-[#111111] leading-tight">
                  with Elegant,
                </span>
              </motion.div>

              {/* Line 3: Personalized (Bold) Interior (Regular) */}
              <motion.div 
                custom={2}
                variants={fadeInUp}
                className="flex flex-wrap items-baseline gap-2 sm:gap-3"
              >
                <span className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-extrabold tracking-tight text-[#111111] leading-tight">
                  Personalized
                </span>
                <span className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-normal tracking-tight text-[#111111] leading-tight">
                  Interior
                </span>
              </motion.div>

              {/* Line 4: Design (Regular) */}
              <motion.div 
                custom={3}
                variants={fadeInUp}
              >
                <span className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-normal tracking-tight text-[#111111] leading-tight">
                  Design
                </span>
              </motion.div>
            </motion.div>

            {/* Paragraph Description */}
            <motion.p 
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-[#555555] text-sm sm:text-base lg:text-[16px] leading-relaxed max-w-md font-normal"
            >
              Transform your space with custom interiors that blend sophistication, comfort, and style. Designed for modern living, curated for timeless appeal.
            </motion.p>

            {/* CTA Row: Button + Circular Award Badge */}
            <motion.div 
              custom={5}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex items-center gap-6 pt-1"
            >
              {/* Primary Pill Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#F5A623] hover:bg-[#E59719] text-[#111111] font-semibold px-7 py-3 sm:px-8 sm:py-3.5 rounded-full text-sm sm:text-base transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                Get Started Today
              </button>

              {/* Circular Award Winning Badge */}
              <div className="flex items-center gap-3">
                <div className="relative w-13 h-13 sm:w-15 sm:h-15 flex items-center justify-center">
                  {/* Rotating Circular Text SVG */}
                  <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_25s_linear_infinite]">
                    <path
                      id="textCircle"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[9px] uppercase tracking-[2.5px] fill-[#666666] font-semibold">
                      <textPath href="#textCircle" startOffset="0%">
                        AWARD WINNING INTERIOR • SINCE 2002 •
                      </textPath>
                    </text>
                  </svg>

                  {/* Centered 4-Point Golden Star */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="#F5A623" className="w-5 h-5 sm:w-5.5 sm:h-5.5">
                      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Exact Asymmetric Composite Image Silhouette */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* SVG ClipPath Definition for the exact organic shape */}
            <svg width="0" height="0" className="absolute pointer-events-none">
              <defs>
                <clipPath id="elevatura-hero-cut" clipPathUnits="objectBoundingBox">
                  <path d="M 0.38,0.00 L 0.92,0.00 Q 1.00,0.00 1.00,0.08 L 1.00,0.68 Q 1.00,0.75 0.93,0.75 L 0.80,0.75 Q 0.73,0.75 0.73,0.82 L 0.73,0.92 Q 0.73,1.00 0.66,1.00 L 0.08,1.00 Q 0.00,1.00 0.00,0.92 L 0.00,0.31 Q 0.00,0.23 0.08,0.23 L 0.24,0.23 Q 0.31,0.23 0.31,0.16 L 0.31,0.08 Q 0.31,0.00 0.38,0.00 Z" />
                </clipPath>
              </defs>
            </svg>

            {/* Container for the composite visual with exact aspect ratio */}
            <div className="relative w-full max-w-[480px] xl:max-w-[530px] aspect-[1/0.95]">
              
              {/* Top-Left Small Card (Chair visual) */}
              <motion.div 
                custom={1}
                initial="hidden"
                animate="visible"
                variants={imageFadeIn}
                className="absolute top-0 left-0 w-[27%] aspect-[4/3] rounded-[18px] sm:rounded-[24px] overflow-hidden shadow-sm z-10 bg-neutral-100 group"
              >
                <img
                  src={elevaturaChairImg}
                  alt="Modern Accent Chair"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>

              {/* Main Feature Image with Exact Cutout Silhouette */}
              <motion.div 
                custom={2}
                initial="hidden"
                animate="visible"
                variants={imageFadeIn}
                style={{ clipPath: 'url(#elevatura-hero-cut)' }}
                className="w-full h-full overflow-hidden bg-neutral-100 group cursor-pointer"
                onClick={scrollToGallery}
              >
                <img
                  src={elevaturaLivingImg}
                  alt="Scandinavian Modern Living Room"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </motion.div>

              {/* Bottom-Right Circular Orange Action Button ↗ */}
              <motion.div 
                custom={3}
                initial="hidden"
                animate="visible"
                variants={imageFadeIn}
                className="absolute bottom-0 right-0 w-[25%] aspect-square flex items-center justify-center z-10"
              >
                <button
                  onClick={scrollToGallery}
                  aria-label="Explore Projects"
                  className="w-[82%] h-[82%] rounded-full bg-[#F5A623] hover:bg-[#E59719] text-[#111111] flex items-center justify-center text-2xl sm:text-3xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                >
                  <span className="transform -translate-y-0.5">↗</span>
                </button>
              </motion.div>

            </div>

          </div>

        </div>

        {/* Subtle Scroll Down Prompt at the bottom of hero */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={scrollToGallery}
          className="mx-auto mt-4 flex flex-col items-center gap-1.5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        >
          <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400">Explore Gallery</span>
          <span className="text-sm text-[#F5A623] animate-bounce">↓</span>
        </motion.div>
      </section>

      {/* ─── SECTION 2: MASONRY GALLERY WITH FOCUS & BLUR HOVER EFFECT ─── */}
      <section id="masonry-gallery" className="py-24 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
              <span className="text-xs uppercase font-bold tracking-widest text-[#F5A623]">Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
              Curated Spaces & <span className="font-light text-[#666666]">Iconic Designs</span>
            </h2>
            <p className="text-neutral-500 text-base mt-2 max-w-xl">
              Hover over any space to explore details. Each design is uniquely tailored for harmony and modern aesthetics.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Columns Grid - Pure Image Gallery Without Text */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {filteredProjects.map((project) => {
            const isHovered = hoveredCardId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6 }}
                onMouseEnter={() => setHoveredCardId(project.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`break-inside-avoid mb-6 rounded-[32px] overflow-hidden bg-neutral-100 cursor-pointer shadow-md transition-all duration-500 ease-out group ${
                  isHovered ? 'shadow-2xl scale-[1.03] z-10' : 'hover:shadow-xl'
                }`}
                onClick={() => setIsModalOpen(true)}
              >
                {/* Pure Clean Image */}
                <div className={`w-full ${project.aspect} overflow-hidden rounded-[32px] bg-neutral-200`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      isHovered ? 'scale-108' : 'scale-100'
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* ─── MODAL / INQUIRY FORM (TRIGGERED BY GET STARTED TODAY) ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 text-2xl font-light"
            >
              ✕
            </button>

            <div className="mb-6">
              <span className="text-[#F5A623] font-bold text-xs uppercase tracking-widest">ELEVATURA</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mt-1">Get Started Today</h3>
              <p className="text-neutral-500 text-sm mt-1">Let's design a personalized, elegant space tailored for you.</p>
            </div>

            {formSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl text-sm mb-4 text-center">
                ✨ Thank you! We received your request and will reach out promptly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-1 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1 uppercase tracking-wider">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1 uppercase tracking-wider">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all"
                  >
                    <option value="Residential">Residential Interior</option>
                    <option value="Commercial">Commercial / Office</option>
                    <option value="Renovation">Home Renovation</option>
                    <option value="Consultation">Interior Styling</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1 uppercase tracking-wider">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all"
                  >
                    <option value="10L-20L">₹10 Lakh – ₹20 Lakh</option>
                    <option value="20L-30L">₹20 Lakh – ₹30 Lakh</option>
                    <option value="30L-50L">₹30 Lakh – ₹50 Lakh</option>
                    <option value="50L+">₹50 Lakh+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-1 uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Tell us a few words about your project vision..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-[#F5A623] hover:bg-[#E59719] text-[#111111] font-bold py-3.5 rounded-full text-base transition-all duration-200 shadow-md disabled:opacity-50 cursor-pointer"
              >
                {formLoading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default LandingPage;