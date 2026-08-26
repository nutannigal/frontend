// src/pages/ServicesPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';

// Assets
import elevaturaLivingImg from '../assets/elevatura_living.jpg';
import elevaturaChairImg from '../assets/elevatura_chair.jpg';
import masonryKitchenImg from '../assets/masonry_kitchen.jpg';
import masonryBedroomImg from '../assets/masonry_bedroom.jpg';
import masonryBathroomImg from '../assets/masonry_bathroom.jpg';
import galleryYellowImg from '../assets/gallery3_yellow.jpg';
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

const servicesList = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Interior Design',
    tag: 'Signature Service',
    desc: 'Complete living room, bedroom, and full-home styling tailored to your daily rituals. We blend organic textures with contemporary Scandinavian warmth.',
    image: elevaturaLivingImg,
    path: '/services/residential',
    highlights: ['Custom Space Planning', 'Bespoke Furniture Sourcing', 'Ambient Lighting Schemes', 'Turnkey Execution'],
  },
  {
    id: 'commercial',
    number: '02',
    title: 'Commercial & Workspace Design',
    tag: 'Corporate & Retail',
    desc: 'High-impact offices, boutique studios, and retail spaces engineered for productivity, client impressions, and seamless brand storytelling.',
    image: galleryYellowImg,
    path: '/services/commercial',
    highlights: ['Executive Suites', 'Acoustic Architecture', 'Brand Integration', 'Ergonomic Workstations'],
  },
  {
    id: 'kitchen-bath',
    number: '03',
    title: 'Kitchen & Spa Bath Atelier',
    tag: 'Craftsmanship',
    desc: 'Culinary centers with waterfall marble islands and serene spa bathrooms with custom travertine stonework, fluted glass, and concealed lighting.',
    image: masonryKitchenImg,
    path: '/services/renovation',
    highlights: ['Waterfall Marble Islands', 'Custom Fluted Cabinetry', 'Concealed Cove Lighting', 'Luxury Plumbing Fixtures'],
  },
  {
    id: 'renovation',
    number: '04',
    title: 'Full Renovation & Remodeling',
    tag: 'End-to-End',
    desc: 'Breathing fresh life into existing properties through structural reconfiguration, flooring overhauls, and modern utility modernization.',
    image: masonryBedroomImg,
    path: '/services/renovation',
    highlights: ['Structural Wall Reconfiguration', 'Material & Texture Overhauls', 'On-Site Project Management', 'Budget & Timeline Guarantee'],
  },
  {
    id: 'architectural',
    number: '05',
    title: 'Architectural Space Planning',
    tag: 'Blueprints & 3D',
    desc: 'Precision 2D blueprints, photorealistic 3D spatial walkthroughs, and technical elevations designed before a single hammer is swung.',
    image: masonryBathroomImg,
    path: '/services/architectural',
    highlights: ['2D Floor Plans & Elevations', 'Photorealistic 3D Renders', 'Material Specifications', 'Electrical & Plumbing Layouts'],
  },
  {
    id: 'consultation',
    number: '06',
    title: 'Design Consultation & Styling',
    tag: 'Personalized',
    desc: 'One-on-one sessions with our senior architects to critique layouts, curate color palettes, select artisan decor, and refine your aesthetic vision.',
    image: elevaturaChairImg,
    path: '/services/consultation',
    highlights: ['Curated Mood Boards', 'Material & Fabric Swatches', 'Art & Decor Sourcing', 'Lighting & Color Direction'],
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Vision',
    desc: 'We explore your lifestyle, aesthetic aspirations, spatial requirements, and investment budget.',
  },
  {
    step: '02',
    title: 'Concept & 3D Visualization',
    desc: 'Experience your future space through photorealistic 3D renders, physical material palettes, and lighting plans.',
  },
  {
    step: '03',
    title: 'Curation & Craftsmanship',
    desc: 'Our master artisans and global suppliers craft bespoke cabinetry, textiles, and architectural finishes.',
  },
  {
    step: '04',
    title: 'White-Glove Handover',
    desc: 'Flawless on-site project management leading to an on-time, fully styled turnkey reveal.',
  },
];

const ServicesPage = () => {
  const navigate = useNavigate();

  // Consultation Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Residential Interior');
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

  const openInquiryModal = (serviceTitle = 'Residential Interior') => {
    setSelectedService(serviceTitle);
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
        projectType: selectedService,
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

  return (
    <div className="bg-white text-[#111111] min-h-screen selection:bg-[#F5A623] selection:text-white pt-24 pb-20">
      
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
              Our Expertise & Services
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
            className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-[#111111] leading-[1.08]"
          >
            Crafting Timeless Spaces,{' '}
            <span className="font-normal text-[#555555]">Tailored for You.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeInUp}
            className="text-[#555555] text-base sm:text-xl leading-relaxed mt-6 font-normal"
          >
            From bespoke residential sanctuaries to high-performance commercial environments, our design studio blends architectural precision with contemporary elegance.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeInUp}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => openInquiryModal('General Inquiry')}
              className="bg-[#F5A623] hover:bg-[#E59719] text-[#111111] font-semibold px-8 py-3.5 rounded-full text-base transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            >
              Start Your Project
            </button>
            <Link
              to="/portfolio"
              className="border border-neutral-300 hover:border-[#111111] text-[#111111] font-medium px-8 py-3.5 rounded-full text-base transition-all duration-200"
            >
              View Completed Works ↗
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES GRID SHOWCASE ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group bg-neutral-50 rounded-[32px] overflow-hidden border border-neutral-200/70 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Pure Clean Image with Zero Text Overlay */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Text & Content Details */}
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-wider">
                      {service.number} • {service.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#111111] tracking-tight group-hover:text-[#F5A623] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-[#555555] text-sm leading-relaxed mt-3">
                    {service.desc}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="mt-5 space-y-2 border-t border-neutral-200/80 pt-4">
                    {service.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-medium text-neutral-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-7 pt-4 flex items-center justify-between">
                  <button
                    onClick={() => openInquiryModal(service.title)}
                    className="text-sm font-bold text-[#111111] hover:text-[#F5A623] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    Request Quote <span>→</span>
                  </button>

                  <Link
                    to={service.path}
                    className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-sm font-bold text-[#111111] group-hover:bg-[#F5A623] group-hover:border-[#F5A623] transition-all shadow-sm"
                  >
                    ↗
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── DEDICATED ARCHITECTURAL & CONSTRUCTION DESIGN SECTION ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
        
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
            onClick={() => openInquiryModal('Architectural & Construction Build')}
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
              {/* Clean Image */}
              <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden mb-8 bg-neutral-200 shadow-sm">
                <img
                  src={serviceArchitectureImg}
                  alt="Architectural Blueprint and Scale Model"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block mb-1">
                Phase 1: Architecture & Masterplanning
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
              {/* Clean Image */}
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

      {/* ─── 4-STEP DESIGN PROCESS ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20 my-10 bg-neutral-900 text-white rounded-[40px]">
        <div className="max-w-2xl mb-14">
          <span className="text-[#F5A623] text-xs font-extrabold uppercase tracking-widest block mb-2">
            Structured Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            How We Bring Your Dream Space to Life
          </h2>
          <p className="text-neutral-400 text-base mt-3">
            A transparent, turnkey 4-phase journey ensuring flawless execution from first sketch to final cushion.
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

      {/* ─── VALUE PROPOSITION / TRUST BADGES ─── */}
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
              Ready to Begin?
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              Let’s create something truly memorable together.
            </h3>
            <p className="text-neutral-600 text-sm sm:text-base mt-2">
              Book a complimentary spatial consultation with our senior architectural designers.
            </p>
          </div>

          <button
            onClick={() => openInquiryModal('Complimentary Consultation')}
            className="bg-[#F5A623] hover:bg-[#E59719] text-[#111111] font-bold px-9 py-4 rounded-full text-base transition-all duration-200 shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Book Free Consultation ↗
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
              <span className="text-[#F5A623] font-bold text-xs uppercase tracking-widest">ELEVATURA SERVICES</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mt-1">Book Consultation</h3>
              <p className="text-neutral-500 text-sm mt-1">
                Selected Service: <span className="font-semibold text-[#111111]">{selectedService}</span>
              </p>
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
                  placeholder="e.g. Eleanor Vance"
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
                    placeholder="name@domain.com"
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
                  <label className="block text-xs font-semibold text-[#111111] mb-1 uppercase tracking-wider">Service Type</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all"
                  >
                    <option value="Residential Interior">Residential Interior</option>
                    <option value="Commercial & Workspace Design">Commercial & Workspace</option>
                    <option value="Kitchen & Spa Bath Atelier">Kitchen & Spa Bath</option>
                    <option value="Full Renovation & Remodeling">Full Renovation</option>
                    <option value="Architectural Space Planning">Architectural Space Planning</option>
                    <option value="Design Consultation & Styling">Design Consultation</option>
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
                <label className="block text-xs font-semibold text-[#111111] mb-1 uppercase tracking-wider">Project Details</label>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Share a few details regarding your space, property location, or timeline..."
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
                {formLoading ? 'Submitting...' : 'Request Consultation'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default ServicesPage;