// src/pages/GalleryPage.jsx
import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchGallery();
  }, [category]);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const url = category === 'all' ? '/gallery' : `/gallery/category/${category}`;
      const res = await API.get(url);
      setImages(res.data.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
    setLoading(false);
  };

  // Unique categories
  const categories = ['all', ...new Set(images.map(img => img.category))];

  if (loading) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-24 px-6 md:px-16 bg-[#FCF9F7] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#2B1E16] mb-4">Our Gallery</h1>
        <p className="text-gray-500 mb-6">Explore our interior design projects</p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${category === cat ? 'bg-[#C6A15B] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <div key={img._id} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group">
              <img src={img.imageUrl} alt={img.title} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" />
              <div className="p-4 bg-white">
                <h3 className="font-bold text-[#2B1E16]">{img.title}</h3>
                <p className="text-sm text-[#C6A15B]">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;