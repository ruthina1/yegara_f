import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook } from 'react-icons/fa';
import { HiSearch, HiBell, HiX } from 'react-icons/hi';
import api from '../utils/api';
import './Header.css';
import { Course } from '../types';

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: 'New course "Advanced React Patterns" is now available!', time: '2 hours ago', read: false },
    { id: 2, message: 'Your progress in "Node.js Backend Development" has been updated', time: '1 day ago', read: false },
    { id: 3, message: 'Welcome to Yegara LMS! Start exploring courses.', time: '3 days ago', read: true },
  ]);
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      searchCourses();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const searchCourses = async () => {
    try {
      const response = await api.get<Course[]>('/courses');
      const filtered = response.data.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 5));
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <FaBook className="logo-icon" />
          <span className="logo-text">Yegara LMS</span>
        </Link>

        <nav className="nav">
          {user ? (
            <>
              <Link to="/courses" className="nav-link">Courses</Link>
              <div className="header-actions">
                <div className="search-container" ref={searchRef}>
                  <button 
                    className="icon-btn" 
                    title="Search"
                    onClick={() => setShowSearch(!showSearch)}
                  >
                    <HiSearch />
                  </button>
                  {showSearch && (
                    <div className="search-dropdown">
                      <div className="search-header">
                        <input
                          type="text"
                          placeholder="Search courses..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="search-input"
                          autoFocus
                        />
                        <button 
                          className="search-close-btn"
                          onClick={() => {
                            setShowSearch(false);
                            setSearchQuery('');
                          }}
                        >
                          <HiX />
                        </button>
                      </div>
                      <div className="search-results">
                        {searchResults.length > 0 ? (
                          searchResults.map((course) => (
                            <Link
                              key={course.id}
                              to={`/courses/${course.id}`}
                              className="search-result-item"
                              onClick={() => {
                                setShowSearch(false);
                                setSearchQuery('');
                              }}
                            >
                              <div className="search-result-image">
                                <img 
                                  src={course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&auto=format'} 
                                  alt={course.title}
                                  onError={(e: any) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&auto=format';
                                  }}
                                />
                              </div>
                              <div className="search-result-content">
                                <h4>{course.title}</h4>
                                <p>{course.description?.substring(0, 60)}...</p>
                              </div>
                            </Link>
                          ))
                        ) : searchQuery.trim().length > 0 ? (
                          <div className="search-no-results">No courses found</div>
                        ) : (
                          <div className="search-placeholder">Start typing to search courses...</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="notification-container" ref={notificationRef}>
                  <button 
                    className="icon-btn notification-btn" 
                    title="Notifications"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <HiBell />
                    {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                  </button>
                  {showNotifications && (
                    <div className="notification-dropdown">
                      <div className="notification-header">
                        <h3>Notifications</h3>
                        {unreadCount > 0 && (
                          <button 
                            className="mark-all-read-btn"
                            onClick={() => {
                              setNotifications(notifications.map(n => ({ ...n, read: true })));
                            }}
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="notification-list">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`notification-item ${!notification.read ? 'unread' : ''}`}
                              onClick={() => {
                                setNotifications(notifications.map(n =>
                                  n.id === notification.id ? { ...n, read: true } : n
                                ));
                              }}
                            >
                              <p>{notification.message}</p>
                              <span className="notification-time">{notification.time}</span>
                            </div>
                          ))
                        ) : (
                          <div className="notification-empty">No notifications</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="user-menu">
                <Link to="/profile" className="user-name">{user.name}</Link>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn-primary-small">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
