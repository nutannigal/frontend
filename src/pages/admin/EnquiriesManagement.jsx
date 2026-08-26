import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import { FaEnvelope, FaCheck, FaClock, FaArrowLeft, FaInbox, FaUserCheck } from 'react-icons/fa';

const EnquiriesManagement = () => {
  const { admin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
      return;
    }

    if (admin) {
      fetchEnquiries();
    }
  }, [admin, authLoading, navigate]);

  const fetchEnquiries = async () => {
    try {
      const res = await API.get('/enquiry/all');
      setEnquiries(res.data?.data || []);
    } catch (error) {
      console.error('Failed to load enquiries:', error);
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/enquiry/${id}`, { status });
      fetchEnquiries();
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to update status');
    }
  };

  const sendEmail = async (enquiry) => {
    const message = prompt(`Send email to ${enquiry.name} (${enquiry.email}):\n\nType your message below:`);
    if (!message) return;

    try {
      await API.post('/admin/send-email', {
        enquiryId: enquiry._id,
        subject: 'Response to your enquiry',
        message,
      });
      alert('✅ Email sent successfully!');
      fetchEnquiries();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send email');
    }
  };

  const pendingCount = enquiries.filter((enquiry) => (enquiry.status || 'Pending') === 'Pending').length;
  const contactedCount = enquiries.filter((enquiry) => enquiry.status === 'Contacted').length;

  if (authLoading || loading) {
    return (
      <div className="pt-20 bg-[#FCF9F7] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#C6A15B] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-[#FCF9F7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1410]">Enquiries</h1>
            <p className="text-gray-500">Manage customer enquiries and responses</p>
          </div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 bg-white border border-[#C6A15B] text-[#1a1410] px-4 py-2 rounded-full hover:bg-[#F8F1E6] transition"
          >
            <FaArrowLeft /> Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-[#eee3d3] rounded-2xl p-5 flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Total enquiries</p><p className="text-3xl font-bold text-[#2B1E16] mt-1">{enquiries.length}</p></div>
            <span className="w-11 h-11 rounded-xl bg-[#F7EEDC] text-[#C6A15B] flex items-center justify-center"><FaInbox /></span>
          </div>
          <div className="bg-white border border-[#eee3d3] rounded-2xl p-5 flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Awaiting response</p><p className="text-3xl font-bold text-[#2B1E16] mt-1">{pendingCount}</p></div>
            <span className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center"><FaClock /></span>
          </div>
          <div className="bg-white border border-[#eee3d3] rounded-2xl p-5 flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Contacted</p><p className="text-3xl font-bold text-[#2B1E16] mt-1">{contactedCount}</p></div>
            <span className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center"><FaUserCheck /></span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#eee3d3] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-[#2B1E16] text-white">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      No enquiries found.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="border-b border-[#f0ebe4] hover:bg-[#FCF9F7] align-top transition">
                      <td className="p-4 font-medium">{enquiry.name}</td>
                      <td className="p-4">{enquiry.email}</td>
                      <td className="p-4">{enquiry.phone}</td>
                      <td className="p-4 max-w-md text-sm text-gray-600"><p className="line-clamp-3">{enquiry.message}</p></td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          enquiry.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : enquiry.status === 'Contacted'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                        }`}>
                          {enquiry.status || 'Pending'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => updateStatus(enquiry._id, 'Contacted')}
                            disabled={enquiry.status === 'Contacted'}
                            className="inline-flex items-center gap-2 bg-[#C6A15B] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#b08d4a] transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FaCheck /> Mark as Contacted
                          </button>
                          <button
                            onClick={() => updateStatus(enquiry._id, 'Pending')}
                            className="inline-flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
                          >
                            <FaClock /> Pending
                          </button>
                          <button
                            onClick={() => sendEmail(enquiry)}
                            className="inline-flex items-center gap-2 bg-[#F7EEDC] text-[#1a1410] px-3 py-2 rounded-lg text-sm hover:bg-[#F0E1BA] transition"
                          >
                            <FaEnvelope /> Email
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiriesManagement;
