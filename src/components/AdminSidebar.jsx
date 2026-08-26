import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaChartLine,
  FaCog,
  FaEnvelope,
  FaHome,
  FaImages,
  FaProjectDiagram,
} from 'react-icons/fa';

const links = [
  { label: 'Overview', to: '/admin/dashboard', icon: FaHome },
  { label: 'Portfolio', to: '/admin/portfolio', icon: FaProjectDiagram },
  { label: 'Journal', to: '/admin/blog', icon: FaImages },
  { label: 'Enquiries', to: '/admin/enquiries', icon: FaEnvelope },
  { label: 'Front UI', to: '/admin/front-ui', icon: FaChartLine },
];

const linkClass = ({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition ${
  isActive
    ? 'bg-[#C6A15B] text-[#2B1E16]'
    : 'text-white/65 hover:bg-white/10 hover:text-white'
}`;

const AdminSidebar = () => (
  <>
    <aside className="fixed top-16 bottom-0 left-0 z-40 hidden w-64 bg-[#2B1E16] p-5 text-white lg:flex lg:flex-col">
      <div className="px-3 pt-2 pb-10">
        <p className="text-[#C6A15B] text-xs uppercase tracking-[0.25em]">Atelier</p>
        <p className="text-xl font-semibold mt-2">Admin studio</p>
      </div>
      <nav className="space-y-2">
        {links.map(({ label, to, icon: Icon }) => (
          <NavLink key={to} to={to} className={linkClass}>
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>
      <NavLink to="/admin/settings" className={`${linkClass({ isActive: false })} mt-auto`}>
        <FaCog />
        Settings
      </NavLink>
    </aside>
    <nav className="mt-16 flex h-14 items-center gap-2 overflow-x-auto bg-[#2B1E16] px-4 text-white lg:hidden">
      {links.map(({ label, to, icon: Icon }) => (
        <NavLink key={to} to={to} className={linkClass}>
          <Icon />
          {label}
        </NavLink>
      ))}
      <NavLink to="/admin/settings" className={linkClass}>
        <FaCog />
        Settings
      </NavLink>
    </nav>
  </>
);

export default AdminSidebar;
