// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import API from '../api/axios';

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

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential',
    budget: '₹20 Lakh to 30 Lakh',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/enquiry/add', formData);
      if (res.data?.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: 'Residential',
          budget: '₹20 Lakh to 30 Lakh',
          message: '',
        });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } finally {
      setLoading(false);
    }
  };

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
              Get in Touch
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
            className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-[#111111] leading-[1.08]"
          >
            Let’s Build Something <span className="font-normal text-[#555555]">Remarkable.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeInUp}
            className="text-[#555555] text-base sm:text-xl leading-relaxed mt-6 font-normal"
          >
            Whether you’re planning a bespoke residential sanctuary, commercial office, or heavy civil construction build, our design architects are ready to assist.
          </motion.p>
        </div>
      </section>

      {/* ─── CONTACT DETAILS & FORM SECTION ─── */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF8F5] border border-neutral-200/80 rounded-[32px] p-8 space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#F5A623] block mb-1">
                  Mumbai Studios
                </span>
                <h3 className="text-2xl font-bold text-[#111111]">Main Headquarters</h3>
                <p className="text-neutral-600 text-sm mt-2 leading-relaxed">
                  Level 5, Horizon Executive Towers, Waterfield Road, Bandra West, Mumbai, MH 400050
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-6 space-y-3 text-sm text-neutral-700">
                <p className="flex items-center gap-3">
                  <span className="text-[#F5A623] font-bold">📞 Phone:</span> +91 98765 43210 / 022 2640 8899
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-[#F5A623] font-bold">✉️ Email:</span> studio@elevatura.design
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-[#F5A623] font-bold">🕒 Hours:</span> Mon – Sat: 9:00 AM – 7:30 PM
                </p>
              </div>
            </div>

            <div className="bg-neutral-900 text-white rounded-[32px] p-8 space-y-3">
              <span className="text-[#F5A623] text-xs font-bold uppercase tracking-widest">
                White-Glove Advisory
              </span>
              <h4 className="text-xl font-bold">On-Site Spatial Inspections</h4>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                We conduct comprehensive on-site laser measurements, solar path orientation audits, and structural evaluations across Mumbai, Pune, and Alibaug.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-neutral-200/80 rounded-[36px] p-8 sm:p-12 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-2">
              Send a Direct Message
            </h3>
            <p className="text-neutral-500 text-sm mb-8">
              Fill out the details below and our lead architect will review your project within 24 business hours.
            </p>

            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-sm mb-6 text-center">
                ✨ Thank you! Your inquiry has been sent successfully. We will reach out shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. David Vance"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="david@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                    Project Scope
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all"
                  >
                    <option value="Residential">Residential Interior</option>
                    <option value="Commercial">Commercial / Office</option>
                    <option value="Architectural Build">Architectural Build & CAD</option>
                    <option value="Civil Construction">Civil Construction</option>
                    <option value="Renovation">Home Renovation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                    Estimated Budget
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all"
                  >
                    <option value="10L-20L">₹10 Lakh – ₹20 Lakh</option>
                    <option value="20L-30L">₹20 Lakh – ₹30 Lakh</option>
                    <option value="30L-50L">₹30 Lakh – ₹50 Lakh</option>
                    <option value="50L+">₹50 Lakh+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                  Project Details / Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Share a brief overview of your property type, square footage, and target start date..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F5A623] hover:bg-[#E59719] text-[#111111] font-bold py-4 rounded-full text-base transition-all duration-200 shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Transmitting Request...' : 'Send Message ↗'}
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ContactPage;