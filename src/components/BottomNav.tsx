import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HiHome, 
  HiAcademicCap, 
  HiSearch, 
  HiBookmark, 
  HiUser 
} from 'react-icons/hi';
import './BottomNav.css';
import { IconType } from 'react-icons';

interface NavItem {
  path: string;
  icon: IconType;
  label: string;
  active?: boolean;
}

const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: '/courses', icon: HiHome, label: 'Home' },
    { path: '/courses', icon: HiAcademicCap, label: 'Learn', active: true },
    { path: '/courses', icon: HiSearch, label: 'Explore' },
    { path: '/courses', icon: HiBookmark, label: 'Saved' },
    { path: '/profile', icon: HiUser, label: 'Profile' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item, index) => {
        const IconComponent = item.icon;
        const isActive = item.active || location.pathname.startsWith(item.path);
        return (
          <Link
            key={index}
            to={item.path}
            className={`nav-item ${isActive ? 'active' : ''}`}
          >
            <IconComponent className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
