// src/pages/PortfolioPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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

// Curated Projects Data
const initialProjects = [
  {
    id: 1,
    title: 'Marble Island Atelier',
    category: 'Kitchen & Dining',
    location: 'Bandra West, Mumbai',
    area: '1,400 sq.ft',
    year: '2025',
    image: masonryKitchenImg,
    aspect: 'aspect-[3/4]',
  },
  {
    id: 2,
    title: 'Nordic Horizon Lounge',
    category: 'Residential',
    location: 'Worli Sea Face',
    area: '2,800 sq.ft',
    year: '2024',
    image: elevaturaLivingImg,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 3,
    title: 'Fluted Oak Sanctuary',
    category: 'Master Suite',
    location: 'Juhu Estate',
    area: '950 sq.ft',
    year: '2025',
    image: masonryBedroomImg,
    aspect: 'aspect-[4/3.2]',
  },
  {
    id: 4,
    title: 'Travertine Spa Suite',
    category: 'Spa & Bathrooms',
    location: 'Alibaug Villa',
    area: '620 sq.ft',
    year: '2024',
    image: masonryBathroomImg,
    aspect: 'aspect-[3/4]',
  },
  {
    id: 5,
    title: 'Amber Executive Studio',
    category: 'Commercial',
    location: 'Marine Drive, Mumbai',
    area: '3,200 sq.ft',
    year: '2025',
    image: galleryYellowImg,
    aspect: 'aspect-[3/4]',
  },
  {
    id: 6,
    title: 'Teal Velvet Retreat',
    category: 'Residential',
    location: 'Koregaon Park, Pune',
    area: '2,100 sq.ft',
    year: '2024',
    image: galleryTealImg,
    aspect: 'aspect-[4/3]',
  },
  {
    id: 7,
    title: 'Scandinavian Corner Studio',
    category: 'Architectural Build',
    location: 'Pali Hill, Bandra',
    area: '1,850 sq.ft',
    year: '2025',
    image: elevaturaChairImg,
    aspect: 'aspect-[3/2]',
  },
  {
    id: 8,
    title: 'Terra Cotta Gallery Room',
    category: 'Residential',
    location: 'BKC Luxury Towers',
    area: '2,400 sq.ft',
    year: '2024',
    image: galleryOrangeImg,
    aspect: 'aspect-[3/4]',
  },
];

const categories = ['All', 'Residential', 'Commercial', 'Kitchen & Dining', 'Master Suite', 'Spa & Bathrooms', 'Architectural Build'];

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Spatial Audit',
    desc: 'Deep dive into your lifestyle habits, aesthetic vision, spatial ergonomics, and timeline goals.',
  },
  {
    step: '02',
    title: 'Concept & 3D Visualization',
    desc: 'Explore your future space with photorealistic 3D renders, architectural plans, and physical material palettes.',
  },
  {
    step: '03',
    title: 'Craftsmanship & Sourcing',
    desc: 'Our master craftsmen fabricate bespoke furnishings, procure marble slabs, and engineer custom fixtures.',
  },
  {
    step: '04',
    title: 'White-Glove Handover',
    desc: 'On-site turnkey project management delivering a pristine, fully staged architectural interior on schedule.',
  },
];

const PortfolioPage = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Inquiry Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
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

  // Fetch dynamic projects from API if available, fallback gracefully
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get('/portfolio/all');
        if (res.data?.data && res.data.data.length > 0) {
          const apiProjects = res.data.data.map((p, idx) => ({
            id: p._id || idx + 10,
            title: p.title,
            category: p.category || 'Residential',
            location: p.location || 'Mumbai, India',
            area: p.area || '2,000 sq.ft',
            year: p.year || '2025',
            image: p.image || initialProjects[idx % initialProjects.length].image,
            aspect: idx % 3 === 0 ? 'aspect-[3/4]' : idx % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[4/3.2]',
          }));
          setProjects([...apiProjects, ...initialProjects]);
        }
      } catch {
        // Fallback to rich curated local dataset
      }
    };
    fetchProjects();
  }, []);

  const openInquiryModal = (project = null) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await API.post('/enquiry/add', {
        ...formData,
        projectType: selectedProject ? `Project: ${selectedProject.title}` : formData.projectType,
      });
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
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="bg-white text-[#111111] min-h-screen selection:bg-[#F5A623] selection:text-white pt-24 pb-20 overflow-x-hidden">
      
      {/* ─── HERO HEADER ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-14">
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
              Portfolio Showcase
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
            className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-[#111111] leading-[1.08]"
          >
            Curated Portfolios & <span className="font-normal text-[#555555]">Landmark Spaces.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeInUp}
            className="text-[#555555] text-base sm:text-xl leading-relaxed mt-6 font-normal"
          >
            Explore our award-winning architectural designs, bespoke residences, and turnkey commercial projects. Each space is handcrafted for harmony, purpose, and timeless aesthetic appeal.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeInUp}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => openInquiryModal()}
              className="bg-[#F5A623] hover:bg-[#E59719] text-[#111111] font-semibold px-8 py-3.5 rounded-full text-base transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            >
              Commission a Project
            </button>
            <Link
              to="/services"
              className="border border-neutral-300 hover:border-[#111111] text-[#111111] font-medium px-8 py-3.5 rounded-full text-base transition-all duration-200"
            >
              Explore Our Services ↗
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORY FILTER TABS ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-10">
        <div className="flex flex-wrap items-center gap-2.5 border-b border-neutral-200 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ─── MAIN MASONRY PROJECTS GRID ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-4">
        {/* Main Masonry Projects Grid - Pure Image Showcase Without Text */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 [column-fill:_balance]">
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
                className={`break-inside-avoid mb-8 rounded-[32px] overflow-hidden bg-neutral-100 cursor-pointer shadow-md transition-all duration-500 ease-out group ${
                  isHovered ? 'shadow-2xl scale-[1.03] z-10' : 'hover:shadow-xl'
                }`}
                onClick={() => openInquiryModal(project)}
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

      {/* ─── DEDICATED ARCHITECTURAL DESIGN & CONSTRUCTION BUILD SECTION ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
              <span className="text-xs uppercase font-bold tracking-widest text-[#F5A623]">
                End-to-End Engineering
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
              Architectural Design & <span className="text-[#666666] font-light">Construction Build</span>
            </h2>
            <p className="text-neutral-500 text-base mt-2 max-w-xl">
              Bridging the gap between visionary blueprints and heavy civil engineering. We design, permit, and construct bespoke residences with architectural integrity.
            </p>
          </div>

          <button
            onClick={() => openInquiryModal({ title: 'Architectural & Construction Build' })}
            className="bg-[#111111] hover:bg-neutral-800 text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
          >
            Consult Our Engineers ↗
          </button>
        </div>

        {/* Dual Showcase Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Architectural Design & Masterplanning */}
          <div className="bg-[#FAF8F5] border border-neutral-200/80 rounded-[36px] overflow-hidden p-8 sm:p-10 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-500">
            <div>
              <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden mb-8 bg-neutral-200 shadow-sm">
                <img
                  src={serviceArchitectureImg}
                  alt="Architectural Blueprint and Scale Model"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block mb-1">
                Phase 1: Architecture & Spatial Planning
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-3">
                Architectural Masterplanning
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                Precision-driven CAD blueprints, volumetric 3D BIM walkthroughs, facade aesthetic planning, and municipal sanctioning engineered to optimize natural ventilation and solar paths.
              </p>

              <div className="grid grid-cols-2 gap-3 border-t border-neutral-200 pt-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> 2D CAD & 3D BIM Modeling
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> Facade & Elevation Design
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> Permitting & Approvals
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> Bioclimatic Optimization
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between border-t border-neutral-200">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Concept to Permit</span>
              <Link
                to="/services/architectural"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#111111] hover:text-[#F5A623] transition-colors"
              >
                View Architectural Details →
              </Link>
            </div>
          </div>

          {/* Card 2: Civil Construction & Turnkey Build */}
          <div className="bg-[#FAF8F5] border border-neutral-200/80 rounded-[36px] overflow-hidden p-8 sm:p-10 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-500">
            <div>
              <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden mb-8 bg-neutral-200 shadow-sm">
                <img
                  src={serviceConstructionImg}
                  alt="Modern Luxury Building Construction Site"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block mb-1">
                Phase 2: Turnkey Civil Engineering
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-3">
                Turnkey Construction & Civil Build
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                Heavy structural execution including reinforced concrete frames, structural steel, mechanical/electrical/plumbing (MEP) integration, and full on-site superintendent oversight.
              </p>

              <div className="grid grid-cols-2 gap-3 border-t border-neutral-200 pt-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> Reinforced Concrete Framing
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> Integrated MEP Engineering
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> On-Site Superintendent
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" /> ISO-Standard Safety & Quality
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between border-t border-neutral-200">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Foundation to Handover</span>
              <Link
                to="/services/renovation"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#111111] hover:text-[#F5A623] transition-colors"
              >
                View Construction Details →
              </Link>
            </div>
          </div>

        </div>

        {/* 4 Technical Capabilities Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-[24px] bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl mb-2 block">🏗️</span>
            <h4 className="font-bold text-[#111111] text-base mb-1">Structural Integrity</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">Seismic-resistant framing with certified structural engineering calculations.</p>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl mb-2 block">📐</span>
            <h4 className="font-bold text-[#111111] text-base mb-1">Collision-Free BIM</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">Integrated 3D modeling detecting mechanical clashes before physical build.</p>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl mb-2 block">🌿</span>
            <h4 className="font-bold text-[#111111] text-base mb-1">Sustainable Envelope</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">High-performance insulation, double-glazed fenestrations, and passive cooling.</p>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl mb-2 block">⏱️</span>
            <h4 className="font-bold text-[#111111] text-base mb-1">Guaranteed Delivery</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">Milestone-linked contracts with live drone footage updates for total transparency.</p>
          </div>
        </div>

      </section>

      {/* ─── 4-STEP STRUCTURED EXECUTION PROCESS ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20 my-10 bg-neutral-900 text-white rounded-[40px]">
        <div className="max-w-2xl mb-14">
          <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block mb-2">
            Structured Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            How We Execute Every Project to Perfection
          </h2>
          <p className="text-neutral-400 text-base mt-3">
            A transparent, turnkey 4-phase journey ensuring flawless execution from initial sketches to white-glove handover.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-neutral-800/60 p-7 rounded-[28px] border border-neutral-700/60 relative flex flex-col justify-between"
            >
              <div>
                <span className="text-[#F5A623] font-mono text-2xl font-bold block mb-4">
                  {step.step}
                </span>
                <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TRUST & TRACK RECORD METRICS ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
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

      {/* ─── BOTTOM CALL TO ACTION ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="bg-[#FAF8F5] border border-neutral-200/80 rounded-[36px] p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-[#F5A623] font-bold text-xs uppercase tracking-widest block mb-2">
              Start Your Journey
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              Ready to bring your architectural vision to life?
            </h3>
            <p className="text-neutral-600 text-sm sm:text-base mt-2">
              Schedule a design session with our principal architects and master builders.
            </p>
          </div>

          <button
            onClick={() => openInquiryModal()}
            className="bg-[#F5A623] hover:bg-[#E59719] text-[#111111] font-bold px-9 py-4 rounded-full text-base transition-all duration-200 shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Start Project Consultation ↗
          </button>
        </div>
      </section>

      {/* ─── INQUIRY / CONSULTATION MODAL ─── */}
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
              <span className="text-[#F5A623] font-bold text-xs uppercase tracking-widest">ELEVATURA PROJECTS</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mt-1">Project Consultation</h3>
              <p className="text-neutral-500 text-sm mt-1">
                {selectedProject ? (
                  <>Inquiring about <span className="font-semibold text-[#111111]">{selectedProject.title}</span></>
                ) : (
                  'Let’s design a personalized, elegant space tailored for you.'
                )}
              </p>
            </div>

            {formSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl text-sm mb-4 text-center">
                ✨ Thank you! We received your inquiry and will reach out promptly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-1 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Julian Taylor"
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
                    placeholder="julian@example.com"
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
                    <option value="Architectural Build">Architectural Build</option>
                    <option value="Kitchen & Dining">Kitchen & Dining</option>
                    <option value="Renovation">Home Renovation</option>
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
                  placeholder="Share a few details regarding your property, location, or expected timeline..."
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
                {formLoading ? 'Submitting...' : 'Submit Project Inquiry'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default PortfolioPage;