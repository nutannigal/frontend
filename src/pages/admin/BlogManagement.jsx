import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import { FaPlus, FaTrash, FaEdit, FaArrowLeft } from 'react-icons/fa';

const emptyForm = {
  title: '',
  slug: '',
  category: '',
  description: '',
  content: '',
  featuredImage: '',
};

const BlogManagement = () => {
  const { admin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
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
      fetchPosts();
    }
  }, [admin, authLoading, navigate]);

  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data?.data || []);
    } catch (error) {
      console.error('Failed to load posts:', error);
      setPosts([]);
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
        await API.put(`/posts/${editingId}`, form);
      } else {
        await API.post('/posts', form);
      }
      resetForm();
      fetchPosts();
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to save blog post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (post) => {
    setEditingId(post._id);
    setForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      description: post.description,
      content: post.content,
      featuredImage: post.featuredImage,
    });
  };

  const deletePost = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;

    try {
      await API.delete(`/posts/${id}`);
      if (editingId === id) resetForm();
      fetchPosts();
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to delete blog post');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="pt-20 bg-[#FCF9F7] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#C6A15B] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-[#FCF9F7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1410]">Blog Management</h1>
            <p className="text-gray-500">Create and manage blog posts</p>
          </div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 bg-white border border-[#C6A15B] text-[#1a1410] px-4 py-2 rounded-full hover:bg-[#F8F1E6] transition"
          >
            <FaArrowLeft /> Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold text-[#1a1410] mb-5">{editingId ? 'Edit Post' : 'Add New Post'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
              />
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="Slug"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
              />
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
                placeholder="Short description"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none resize-none"
              />
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows="5"
                placeholder="Full content"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none resize-none"
              />
              <input
                type="url"
                name="featuredImage"
                value={form.featuredImage}
                onChange={handleChange}
                placeholder="Featured image URL"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#C6A15B] text-white py-3 rounded-xl hover:bg-[#b08d4a] transition disabled:opacity-70"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Post' : 'Save Post'}
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
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[#1a1410]">All Posts</h2>
              <button
                onClick={() => resetForm()}
                className="inline-flex items-center gap-2 bg-[#F7EEDC] text-[#1a1410] px-4 py-2 rounded-xl hover:bg-[#F0E1BA] transition"
              >
                <FaPlus /> New
              </button>
            </div>

            {posts.length === 0 ? (
              <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
                No blog posts yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {posts.map((post) => (
                  <div key={post._id} className="border border-gray-200 rounded-2xl overflow-hidden bg-[#FCF9F7]">
                    <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-wide text-[#C6A15B] font-semibold">{post.category}</p>
                      <h3 className="text-lg font-bold text-[#1a1410] mt-2">{post.title}</h3>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-3">{post.description}</p>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleEdit(post)}
                          className="flex-1 bg-[#F7EEDC] text-[#1a1410] py-2 rounded-xl hover:bg-[#F0E1BA] transition"
                        >
                          <span className="inline-flex items-center gap-2 justify-center"><FaEdit /> Edit</span>
                        </button>
                        <button
                          onClick={() => deletePost(post._id)}
                          className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl hover:bg-red-100 transition"
                        >
                          <span className="inline-flex items-center gap-2 justify-center"><FaTrash /> Delete</span>
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

export default BlogManagement;
