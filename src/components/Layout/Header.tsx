import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Menu, X, Sprout, Shield, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
  isAdmin?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, sidebarOpen, isAdmin = true }) => {
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Contact', path: '/contact' },
  ];

  const adminLink = { label: 'Admin', path: '/admin' };

  return (
    <header className="h-16 bg-silage-gray/80 backdrop-blur-md border-b border-dormant-husk/20 flex items-center justify-between px-6 z-30 shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-dormant-husk/20 transition-colors text-bleached-flax"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link to="/" className="flex items-center gap-2 group">
          <Sprout className="text-neon-sprout group-hover:scale-110 transition-transform" size={24} />
          <span className="text-hero font-bold tracking-tight text-bleached-flax">
            AggroGeo<span className="text-neon-sprout">Studio</span>
          </span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="px-4 py-2 rounded-lg text-body text-dormant-husk hover:text-bleached-flax hover:bg-dormant-husk/10 transition-all"
          >
            {link.label}
          </Link>
        ))}
        {isAdmin && (
          <Link
            to={adminLink.path}
            className="px-4 py-2 rounded-lg text-body text-dormant-husk hover:text-bleached-flax hover:bg-dormant-husk/10 transition-all"
          >
            {adminLink.label}
          </Link>
        )}
      </nav>

      <div className="flex items-center gap-3">
        {isAdmin && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neon-sprout/10 border border-neon-sprout/30"
          >
            <Shield size={14} className="text-neon-sprout" />
            <span className="text-xs font-mono text-neon-sprout font-medium">ADMIN</span>
          </motion.div>
        )}

        <button className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg hover:bg-dormant-husk/10 transition-colors">
          <div className="w-8 h-8 rounded-full bg-barley-gold/20 flex items-center justify-center">
            <User size={16} className="text-barley-gold" />
          </div>
          <ChevronDown size={14} className="text-dormant-husk" />
        </button>
      </div>
    </header>
  );
};

export default Header;
