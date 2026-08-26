import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';

const defaultContent = {
  companyName: 'Tupe Brothers',
  tagline: 'Crafting beautiful, functional spaces that inspire and delight.',
  footer: {
    companyName: 'Tupe Brothers',
    tagline: 'Crafting beautiful, functional spaces that inspire and delight.',
    contact: {
      phone: '+91 98765 43210',
      email: 'info@tupebrothers.in',
      address: 'Mumbai, India',
    },
    hours: ['Mon - Fri: 9:00 AM - 8:00 PM', 'Saturday: 10:00 AM - 6:00 PM', 'Sunday: Closed'],
    copyright: '© 2026 Tupe Brothers. All rights reserved.',
  },
};

const SettingsPage = () => {
  const { admin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState(defaultContent);
  const [stats, setStats] = useState({ unreadMessages: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
      return;
    }

    if (admin) {
      fetchSettings();
    }
  }, [admin, authLoading, navigate]);

  const fetchSettings = async () => {
    try {
      const [landingRes, statsRes] = await Promise.all([
        API.get('/landing/content'),
        API.get('/admin/stats'),
      ]);

      const landingData = landingRes.data?.data || defaultContent;
      setContent({
        companyName: landingData.footer?.companyName || landingData.companyName || 'Tupe Brothers',
        tagline: landingData.footer?.tagline || landingData.tagline || defaultContent.tagline,
        footer: {
          ...defaultContent.footer,
          ...(landingData.footer || {}),
          contact: {
            ...defaultContent.footer.contact,
            ...((landingData.footer && landingData.footer.contact) || {}),
          },
        },
      });

      setStats({
        unreadMessages: statsRes.data?.data?.unreadMessages || 0,
      });
    } catch (error) {
      console.error('Failed to load settings:', error);
      setContent(defaultContent);
      setStats({ unreadMessages: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...defaultContent,
        companyName: content.companyName,
        tagline: content.tagline,
        footer: {
          ...content.footer,
          companyName: content.companyName,
          tagline: content.tagline,
        },
      };

      await API.put('/landing/content', payload);
      alert('Settings saved successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="pt-20 bg-[#FCF9F7] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#C6A15B] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-[#FCF9F7] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1410]">Settings</h1>
            <p className="text-gray-500">Brand and admin configuration</p>
          </div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <p className="text-gray-500 text-sm">Unread Messages</p>
            <h3 className="text-3xl font-bold text-[#1a1410] mt-2">{stats.unreadMessages}</h3>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-5">
            <p className="text-gray-500 text-sm">Brand Name</p>
            <h3 className="text-xl font-bold text-[#1a1410] mt-2">{content.companyName}</h3>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-5">
            <p className="text-gray-500 text-sm">Support Email</p>
            <h3 className="text-xl font-bold text-[#1a1410] mt-2">{content.footer.contact.email}</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={content.companyName}
              onChange={(e) => setContent((prev) => ({ ...prev, companyName: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
            <textarea
              rows="3"
              value={content.tagline}
              onChange={(e) => setContent((prev) => ({ ...prev, tagline: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                value={content.footer.contact.phone}
                onChange={(e) => setContent((prev) => ({ ...prev, footer: { ...prev.footer, contact: { ...prev.footer.contact, phone: e.target.value } } }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={content.footer.contact.email}
                onChange={(e) => setContent((prev) => ({ ...prev, footer: { ...prev.footer, contact: { ...prev.footer.contact, email: e.target.value } } }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={content.footer.contact.address}
              onChange={(e) => setContent((prev) => ({ ...prev, footer: { ...prev.footer, contact: { ...prev.footer.contact, address: e.target.value } } }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Footer Copyright</label>
            <input
              type="text"
              value={content.footer.copyright}
              onChange={(e) => setContent((prev) => ({ ...prev, footer: { ...prev.footer, copyright: e.target.value } }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
            />
          </div>

          <div className="flex justify-end pt-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#C6A15B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b08d4a] disabled:opacity-70 transition"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
