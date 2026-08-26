// src/pages/BlogPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Interior Design Trends for 2025',
    excerpt: 'Discover the latest trends shaping modern interiors – from biophilic design to smart home integration.',
    date: 'Jan 15, 2025',
    author: 'Admin',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'How to Choose the Perfect Color Palette',
    excerpt: 'Learn the art of selecting colors that complement your space and evoke the right mood.',
    date: 'Feb 2, 2025',
    author: 'Admin',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  // Add more posts...
];

const BlogPage = () => {
  return (
    <div className="pt-20 bg-[#FCF9F7] min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#C6A15B] font-semibold tracking-widest text-sm uppercase">Insights</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1410] mt-2">
            Our <span className="text-[#C6A15B]">Blog</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <span className="flex items-center gap-1"><FaCalendarAlt /> {post.date}</span>
                  <span className="flex items-center gap-1"><FaUser /> {post.author}</span>
                </div>
                <h3 className="text-xl font-bold text-[#1a1410] mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
                <a href="#" className="text-[#C6A15B] font-semibold hover:underline mt-4 inline-block">Read More →</a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;