// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaBell,
  FaCog,
  FaEnvelope,
  FaImages,
  FaProjectDiagram,
  FaUsers,
} from 'react-icons/fa';
import API from '../../api/axios';

const AdminDashboard = () => {
  const { admin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    portfolioItems: 0,
    unreadMessages: 0,
    settings: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await API.get('/admin/stats');
        setStats({
          totalEnquiries: res.data?.data?.totalEnquiries || 0,
          portfolioItems: res.data?.data?.portfolioItems || 0,
          unreadMessages: res.data?.data?.unreadMessages || 0,
          settings: res.data?.data?.settings || 1,
        });
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
        setStats({
          totalEnquiries: 0,
          portfolioItems: 0,
          unreadMessages: 0,
          settings: 1,
        });
      } finally {
        setLoading(false);
      }
    };

    if (admin) {
      fetchData();
    }
  }, [admin, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="pt-20 bg-[#FCF9F7] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#C6A15B] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-[#FCF9F7] text-[#2B1E16]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <main>
            <header className="flex items-start justify-between gap-4 mb-8">
              <div>
                <p className="text-[#C6A15B] text-xs uppercase tracking-[0.22em] font-bold">Wednesday, August 19</p>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2">Good morning, {admin?.name || 'Admin'}.</h1>
                <p className="text-[#756d64] mt-2">Here is what is happening across your studio today.</p>
              </div>
              <button type="button" aria-label="Notifications" className="relative shrink-0 w-11 h-11 rounded-full bg-white border border-[#eadfce] flex items-center justify-center text-[#756d64] hover:text-[#C6A15B] transition">
                <FaBell />
                {stats.unreadMessages > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-[#bc5c45] rounded-full" />}
              </button>
            </header>

            <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Total enquiries', value: stats.totalEnquiries, icon: FaUsers, accent: 'bg-[#F7EEDC]' },
                { label: 'Portfolio projects', value: stats.portfolioItems, icon: FaProjectDiagram, accent: 'bg-[#E8EEE7]' },
                { label: 'Unread messages', value: stats.unreadMessages, icon: FaEnvelope, accent: 'bg-[#F3E2DB]' },
                { label: 'Site settings', value: stats.settings, icon: FaCog, accent: 'bg-[#E9E5E1]' },
              ].map(({ label, value, icon: Icon, accent }) => (
                <div key={label} className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eadfce]">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`w-10 h-10 rounded-xl ${accent} flex items-center justify-center text-[#5f554b]`}><Icon /></span>
                    <span className="text-2xl sm:text-3xl font-semibold">{value}</span>
                  </div>
                  <p className="text-[#756d64] text-sm mt-4">{label}</p>
                </div>
              ))}
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6 mt-6">
              <div className="bg-[#2B1E16] rounded-[26px] p-6 sm:p-8 text-white min-h-[270px] flex flex-col justify-between overflow-hidden relative">
                <div className="relative z-10">
                  <p className="text-[#C6A15B] text-xs uppercase tracking-[0.2em] font-bold">Studio pulse</p>
                  <h2 className="text-2xl sm:text-3xl font-semibold mt-4 max-w-md">Turn today’s enquiries into beautiful spaces.</h2>
                  <p className="text-white/65 mt-3 max-w-md text-sm leading-6">Keep your client conversations, projects and content moving from one calm workspace.</p>
                </div>
                <Link to="/admin/enquiries" className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold text-[#C6A15B] mt-8">Open enquiries <FaArrowRight className="text-xs" /></Link>
                <div className="absolute -right-10 -bottom-20 w-64 h-64 rounded-full border-[28px] border-[#C6A15B]/20" />
              </div>

              <div className="bg-white rounded-[26px] p-6 border border-[#eadfce]">
                <div className="flex items-center justify-between mb-5">
                  <div><p className="text-xs uppercase tracking-[0.18em] text-[#C6A15B] font-bold">Workspace</p><h2 className="text-xl font-semibold mt-1">Quick actions</h2></div>
                  <FaArrowRight className="text-[#C6A15B]" />
                </div>
                <div className="space-y-2">
                  {[
                    ['Add a project', '/admin/portfolio', FaProjectDiagram],
                    ['Write a journal post', '/admin/blog', FaImages],
                    ['Review enquiries', '/admin/enquiries', FaEnvelope],
                  ].map(([label, href, Icon]) => (
                    <Link key={label} to={href} className="flex items-center justify-between p-3 rounded-xl bg-[#FCF9F7] hover:bg-[#F8F1E6] transition group">
                      <span className="flex items-center gap-3 text-sm font-medium"><Icon className="text-[#C6A15B]" /> {label}</span>
                      <FaArrowRight className="text-xs text-[#C6A15B] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-6 bg-white rounded-[26px] p-6 border border-[#eadfce]">
              <div className="flex items-center justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.18em] text-[#C6A15B] font-bold">At a glance</p><h2 className="text-xl font-semibold mt-1">Your studio is ready</h2></div><span className="text-xs text-[#756d64]">All systems operational</span></div>
              <div className="h-2 rounded-full bg-[#F1E8DA] mt-6 overflow-hidden"><div className="h-full w-[78%] rounded-full bg-[#C6A15B]" /></div>
              <p className="text-sm text-[#756d64] mt-3">Your website content is {stats.portfolioItems > 0 ? 'active and visible to visitors.' : 'waiting for its first portfolio project.'}</p>
            </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;