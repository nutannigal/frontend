// src/pages/BlogDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${slug}`);
        setPost(res.data.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className="pt-32 text-center">Loading...</div>;
  if (!post) return <div className="pt-32 text-center">Post not found</div>;

  return (
    <div className="pt-24 px-6 md:px-16 bg-[#FCF9F7] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="text-[#C6A15B] hover:underline mb-4 inline-block">← Back to Blog</Link>
        <img src={post.featuredImage} alt={post.title} className="w-full h-96 object-cover rounded-2xl shadow-lg mb-6" />
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="bg-[#C6A15B]/10 text-[#C6A15B] px-3 py-1 rounded-full">{post.category}</span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#2B1E16] mb-4">{post.title}</h1>
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
};

export default BlogDetail;