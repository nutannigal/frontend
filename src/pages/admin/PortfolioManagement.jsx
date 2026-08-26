import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';

const emptyForm = {
  title: '',
  category: 'Residential',
  image: '',
  description: '',
};

const isVideoUrl = (url) => /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(url || '');

const MediaPreview = ({ url, title, className }) => {
  if (!url) return null;

  return isVideoUrl(url) ? (
    <video src={url} title={title} controls className={className} />
  ) : (
    <img src={url} alt={title} className={className} />
  );
};

const PortfolioManagement = () => {
  const { admin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
      return;
    }

    if (admin) {
      fetchProjects();
    }
  }, [admin, authLoading, navigate]);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/portfolio');
      setProjects(res.data?.data || []);
    } catch (error) {
      console.error('Failed to load portfolio:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingId) {
        await API.put(`/portfolio/${editingId}`, form);
      } else {
        await API.post('/portfolio', form);
      }
      resetForm();
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to save portfolio item');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      category: project.category,
      image: project.image,
      description: project.description || '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this portfolio item?')) return;

    try {
      await API.delete(`/portfolio/${id}`);
      fetchProjects();
      if (editingId === id) resetForm();
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to delete portfolio item');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="pt-20 bg-[#FCF9F7] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#C6A15B] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-[#FCF9F7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1410]">Portfolio Management</h1>
            <p className="text-gray-500">Add, edit and manage portfolio projects</p>
          </div>
         
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold text-[#1a1410] mb-5">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Project title"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
              />
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Office">Office</option>
                <option value="Luxury">Luxury</option>
              </select>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image or video URL"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
              />
              {form.image && (
                <MediaPreview
                  url={form.image}
                  title="Project media preview"
                  className="w-full h-40 rounded-xl object-cover border border-gray-200"
                />
              )}
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Project description"
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none resize-none"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#C6A15B] text-white py-3 rounded-xl hover:bg-[#b08d4a] transition disabled:opacity-70"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Project' : 'Save Project'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold text-[#1a1410] mb-5">Portfolio Items</h2>
            {projects.length === 0 ? (
              <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
                No portfolio items yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((project) => (
                  <div key={project._id} className="border border-gray-200 rounded-2xl overflow-hidden bg-[#FCF9F7]">
                    <MediaPreview url={project.image} title={project.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs uppercase tracking-wide text-[#C6A15B] font-semibold">{project.category}</p>
                        <span className="text-xs text-gray-500">{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ''}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#1a1410] mt-2">{project.title}</h3>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-3">{project.description || 'No description provided.'}</p>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleEdit(project)}
                          className="flex-1 bg-[#F7EEDC] text-[#1a1410] py-2 rounded-xl hover:bg-[#F0E1BA] transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl hover:bg-red-100 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManagement;
