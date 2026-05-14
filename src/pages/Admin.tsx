import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { FiEdit3, FiFileText, FiSettings, FiHelpCircle, FiTrash2, FiSend, FiImage, FiGrid, FiBookOpen, FiSearch, FiX, FiPlus, FiFilm, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './Admin.css';
import { Course, Chapter } from '../types';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
  imageUrls?: string[];
}

const Admin: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'manage' | 'courses'>('manage');

  // ── News State ──
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // ── Courses State ──
  const [courses, setCourses] = useState<Course[]>([]);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseThumbnail, setCourseThumbnail] = useState<string | null>(null);
  const [courseChapters, setCourseChapters] = useState<Chapter[]>([]);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const [courseSortBy, setCourseSortBy] = useState('recent');
  const [courseFilterCategory, setCourseFilterCategory] = useState('All');
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);

  // ── Common UI State ──
  const [message, setMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string | number, title: string, type: 'news' | 'course' } | null>(null);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchNews = async () => {
    try {
      const response = await api.get('/news');
      setNews(response.data);
    } catch (err) {
      console.error('Failed to fetch news:', err);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchCourses();
  }, []);

  // Protect Admin route manually just in case
  if (!user || user.email !== 'admin@yegara.com') {
    return <Navigate to="/login" replace />;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'news' | 'course') => {
    const files = Array.from(e.target.files || []);
    const MAX_SIZE = 25 * 1024 * 1024; // 25MB

    let hasError = false;
    files.forEach((file) => {
      if (file.size > MAX_SIZE) {
        setMessage(`File "${file.name}" is too large. Max size is 25MB.`);
        hasError = true;
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'news') {
          setImages(prev => [...prev, reader.result as string]);
        } else {
          setCourseThumbnail(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    });

    if (hasError) {
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !content) {
      setMessage('Please fill in all required fields.');
      return;
    }

    try {
      if (editingId) {
        // Update existing item
        await api.put(`/news/${editingId}`, {
          title,
          content,
          date,
          imageUrls: images,
        });
        setMessage('News updated successfully!');
      } else {
        // Create new item
        await api.post('/news', {
          title,
          content,
          date,
          imageUrls: images,
        });
        setMessage('News posted successfully!');
      }

      // Refresh news list from server
      await fetchNews();

      // Reset Form and Close Modal
      setTitle('');
      setDate(new Date().toISOString().split('T')[0]);
      setContent('');
      setImages([]);
      setEditingId(null);

      setTimeout(() => {
        setMessage('');
        setIsModalOpen(false);
      }, 1500);
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Failed to save news.');
    }
  };

  const handleEdit = (item: NewsItem) => {
    setTitle(item.title);
    setDate(item.date);
    setContent(item.content);
    setImages(item.imageUrls || (item.imageUrl ? [item.imageUrl] : []));
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setImages([]);
    setDate(new Date().toISOString().split('T')[0]);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: NewsItem | Course, type: 'news' | 'course') => {
    setItemToDelete({ id: item.id, title: item.title, type });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      if (itemToDelete.type === 'news') {
        await api.delete(`/news/${itemToDelete.id}`);
        await fetchNews();
      } else {
        await api.delete(`/courses/${itemToDelete.id}`);
        await fetchCourses();
      }
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const getSortedNews = () => {
    let result = [...news];

    // 1. Filter by Search Query (Real-time)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
      );
    }

    // 2. Sort
    if (sortBy === 'recent') {
      result.sort((a, b) => {
        const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateDiff !== 0) return dateDiff;
        return parseInt(b.id) - parseInt(a.id);
      });
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => {
        const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime();
        if (dateDiff !== 0) return dateDiff;
        return parseInt(a.id) - parseInt(b.id);
      });
    } else if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
  };

  const getSortedCourses = () => {
    let result = [...courses];

    // 1. Filter by Category
    if (courseFilterCategory !== 'All') {
      result = result.filter(item =>
        item.category?.toLowerCase() === courseFilterCategory.toLowerCase()
      );
    }

    // 2. Filter by Search Query
    if (courseSearchQuery.trim()) {
      const query = courseSearchQuery.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
      );
    }

    // 3. Sort
    if (courseSortBy === 'recent') {
      result.sort((a, b) => (b.id as number) - (a.id as number));
    } else if (courseSortBy === 'oldest') {
      result.sort((a, b) => (a.id as number) - (b.id as number));
    } else if (courseSortBy === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleClearCourseSearch = () => {
    setCourseSearchQuery('');
  };

  // ── Course Handlers ──
  const addChapter = () => {
    const newChapter: Chapter = {
      chapter_name: '',
      content_text: '',
      content_images: [],
      video_url: '',
      order_index: courseChapters.length,
    };
    setCourseChapters(prev => [...prev, newChapter]);
    setExpandedChapter(courseChapters.length);
  };

  const removeChapter = (index: number) => {
    setCourseChapters(prev => prev.filter((_, i) => i !== index));
    setExpandedChapter(null);
  };

  const updateChapter = (index: number, field: keyof Chapter, value: any) => {
    setCourseChapters(prev => prev.map((ch, i) => i === index ? { ...ch, [field]: value } : ch));
  };

  const handleChapterImageUpload = (e: React.ChangeEvent<HTMLInputElement>, chapterIndex: number) => {
    const files = Array.from(e.target.files || []);
    const MAX_SIZE = 25 * 1024 * 1024;
    files.forEach(file => {
      if (file.size > MAX_SIZE) {
        setMessage(`File "${file.name}" exceeds 25MB limit.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseChapters(prev => prev.map((ch, i) => {
          if (i === chapterIndex) {
            return { ...ch, content_images: [...(ch.content_images || []), reader.result as string] };
          }
          return ch;
        }));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removeChapterImage = (chapterIndex: number, imageIndex: number) => {
    setCourseChapters(prev => prev.map((ch, i) => {
      if (i === chapterIndex) {
        return { ...ch, content_images: (ch.content_images || []).filter((_, idx) => idx !== imageIndex) };
      }
      return ch;
    }));
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle) { setMessage('Course title is required.'); return; }
    if (!courseCategory) { setMessage('Course category is required.'); return; }

    // Validate chapters
    for (let i = 0; i < courseChapters.length; i++) {
      if (!courseChapters[i].chapter_name) { setMessage(`Chapter ${i + 1} needs a name.`); return; }
      if (!courseChapters[i].content_text) { setMessage(`Chapter ${i + 1} needs content text.`); return; }
    }

    try {
      const payload = {
        title: courseTitle,
        category: courseCategory,
        description: courseDescription,
        thumbnail_url: courseThumbnail,
        chapters: courseChapters,
      };

      if (editingCourseId) {
        await api.put(`/courses/${editingCourseId}`, payload);
        setMessage('Course updated successfully!');
      } else {
        await api.post('/courses', payload);
        setMessage('Course created successfully!');
      }

      await fetchCourses();
      resetCourseForm();

      setTimeout(() => {
        setMessage('');
        setIsCourseModalOpen(false);
      }, 1500);
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Failed to save course.');
    }
  };

  const resetCourseForm = () => {
    setCourseTitle('');
    setCourseCategory('');
    setCourseDescription('');
    setCourseThumbnail(null);
    setCourseChapters([]);
    setExpandedChapter(null);
    setEditingCourseId(null);
  };

  const handleCourseEdit = async (course: Course) => {
    setCourseTitle(course.title);
    setCourseCategory(course.category || '');
    setCourseDescription(course.description || '');
    setCourseThumbnail(course.thumbnail_url || null);
    setEditingCourseId(course.id);

    // Fetch full course with chapters
    try {
      const res = await api.get(`/courses/${course.id}`);
      setCourseChapters(res.data.chapters || []);
    } catch {
      setCourseChapters([]);
    }

    setExpandedChapter(null);
    setIsCourseModalOpen(true);
  };

  const openAddCourseModal = () => {
    resetCourseForm();
    setIsCourseModalOpen(true);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  }

  const confirmLogout = () => {
    logout();
    navigate('/login');
  }


  return (
    <div className={`admin-layout-fayda ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`admin-sidebar-fayda ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <div className="logo-icon">Y</div>
            <h2>Yegara Trading</h2>
          </div>

          <div className="sidebar-section">
            <span className="section-label">ADMIN PANEL</span>
            <nav className="sidebar-nav">
              <button
                className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
              >
                <FiGrid className="nav-icon" /> Overview
              </button>
              <button
                className={`nav-item ${activeTab === 'manage' ? 'active' : ''}`}
                onClick={() => { setActiveTab('manage'); setIsSidebarOpen(false); }}
              >
                <FiFileText className="nav-icon" /> Manage News
              </button>
              <button
                className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
                onClick={() => { setActiveTab('courses'); setIsSidebarOpen(false); }}
              >
                <FiBookOpen className="nav-icon" /> Manage Courses
              </button>
            </nav>
          </div>
        </div>

        <div className="sidebar-bottom">
          <button className="nav-item">
            <FiSettings className="nav-icon" /> Settings
          </button>
          <button className="nav-item">
            <FiHelpCircle className="nav-icon" /> Help & Support
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="admin-main-fayda">
        <header className="admin-top-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>
              <FiGrid />
            </button>
            <div className="header-breadcrumbs">
              <span>Admin</span>
              <span className="breadcrumb-divider">/</span>
              <span className="current-context">
                {activeTab === 'overview' ? 'Dashboard Overview' : 
                 activeTab === 'manage' ? 'News Management' : 'Course Management'}
              </span>
            </div>
          </div>
          <div className="header-actions">
            <button className="sign-out-btn" onClick={handleLogout}>
              SIGN OUT
            </button>
          </div>
        </header>

        <section className="admin-content-fayda">
          {activeTab === 'overview' && (
            <div className="view-container">
              <h1 className="view-title">Dashboard Overview</h1>
              <div className="stats-grid-simple">
                <div className="simple-stat-box">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="stat-label">TOTAL NEWS</span>
                    <FiFileText style={{ color: '#94a3b8', fontSize: '1.2rem' }} />
                  </div>
                  <span className="stat-value">{news.length}</span>
                </div>
                <div className="simple-stat-box">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="stat-label">TOTAL COURSES</span>
                    <FiBookOpen style={{ color: '#94a3b8', fontSize: '1.2rem' }} />
                  </div>
                  <span className="stat-value">{courses.length}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="view-container">
              <div className="manage-header-row">
                <h1 className="view-title" style={{ marginBottom: 0 }}>Manage News</h1>
                <div className="manage-actions-left">
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input
                      type="text"
                      className="manage-select-f"
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ width: '150px' }}
                    />
                    <button
                      className="manage-select-f"
                      onClick={handleClearSearch}
                      style={{
                        background: searchQuery ? '#fef2f2' : '#f1f5f9',
                        color: searchQuery ? '#ef4444' : '#475569',
                        border: '1px solid #e2e8f0',
                        cursor: searchQuery ? 'pointer' : 'default'
                      }}
                    >
                      {searchQuery ? 'Clear' : 'Search'}
                    </button>
                  </div>
                  <select
                    className="manage-select-f"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recent">Sort: Recent</option>
                    <option value="oldest">Sort: Oldest</option>
                    <option value="alphabetical">Sort: Alphabet (A-Z)</option>
                  </select>
                  <button className="btn-add-news" onClick={openAddModal}>
                    ADD NEWS
                  </button>
                </div>
              </div>

              <div className="manage-list-fayda">
                {news.length === 0 ? (
                  <div className="empty-state">No news articles found.</div>
                ) : (
                  getSortedNews().map((item: NewsItem) => (
                    <div key={item.id} className="manage-card-fayda">
                      <div className="m-card-header">
                        <h2>{item.title}</h2>
                        <div className="m-card-actions">
                          <button className="m-btn-edit" onClick={() => handleEdit(item)}><FiEdit3 /> Edit</button>
                          <button className="m-btn-delete" onClick={() => handleDeleteClick(item, 'news')}>
                            Delete
                          </button>
                        </div>
                      </div>

                      {item.imageUrl && (
                        <div className="m-card-image">
                          <img src={item.imageUrl} alt={item.title || "News article thumbnail"} />
                        </div>
                      )}

                      <div className="m-card-body">
                        <p className="m-excerpt">{item.content}</p>
                        <span className="m-date">Posted on {new Date(item.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="view-container">
              <div className="manage-header-row">
                <h1 className="view-title" style={{ marginBottom: 0 }}>Manage Courses</h1>
                <div className="manage-actions-left">
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input
                      type="text"
                      className="manage-select-f"
                      placeholder="Search courses..."
                      value={courseSearchQuery}
                      onChange={(e) => setCourseSearchQuery(e.target.value)}
                      style={{ width: '150px' }}
                    />
                    <button
                      className="manage-select-f"
                      onClick={handleClearCourseSearch}
                      style={{
                        background: courseSearchQuery ? '#fef2f2' : '#f1f5f9',
                        color: courseSearchQuery ? '#ef4444' : '#475569',
                        border: '1px solid #e2e8f0',
                        cursor: courseSearchQuery ? 'pointer' : 'default'
                      }}
                    >
                      {courseSearchQuery ? 'Clear' : 'Search'}
                    </button>
                  </div>
                  <select
                    className="manage-select-f"
                    value={courseFilterCategory}
                    onChange={(e) => setCourseFilterCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    <option value="Business">Business</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Personal Development">Personal Development</option>
                    <option value="Other">Other</option>
                  </select>
                  <select
                    className="manage-select-f"
                    value={courseSortBy}
                    onChange={(e) => setCourseSortBy(e.target.value)}
                  >
                    <option value="recent">Sort: Recent</option>
                    <option value="oldest">Sort: Oldest</option>
                    <option value="alphabetical">Sort: Alphabet (A-Z)</option>
                  </select>
                  <button className="btn-add-news" onClick={openAddCourseModal}>
                    ADD COURSE
                  </button>
                </div>
              </div>

              <div className="manage-list-fayda">
                {courses.length === 0 ? (
                  <div className="empty-state">No courses found.</div>
                ) : (
                  getSortedCourses().map((item: Course) => (
                    <div key={item.id} className="manage-card-fayda">
                      <div className="m-card-header">
                        <h2>{item.title}</h2>
                        <div className="m-card-actions">
                          <button className="m-btn-edit" onClick={() => handleCourseEdit(item)}><FiEdit3 /> Edit</button>
                          <button className="m-btn-delete" onClick={() => handleDeleteClick(item, 'course')}>
                            Delete
                          </button>
                        </div>
                      </div>

                      {item.thumbnail_url && (
                        <div className="m-card-image">
                          <img src={item.thumbnail_url} alt={item.title} />
                        </div>
                      )}

                      <div className="m-card-body">
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                          {item.category && <span className="m-category-tag">{item.category}</span>}
                          <span className="m-category-tag" style={{ background: '#eef2ff', color: '#3b82f6', borderColor: '#c7d2fe' }}>📚 {(item as any).chapterCount || 0} chapters</span>
                          <span className="m-category-tag" style={{ background: '#fffbeb', color: '#d97706', borderColor: '#fde68a' }}>⭐ {item.averageRating || 0} ({item.totalRatings || 0})</span>
                        </div>
                        <p className="m-excerpt">{item.description}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ── NEWS MODAL FORM ── */}
          {isModalOpen && (
            <div className="modal-overlay-fayda" onClick={() => setIsModalOpen(false)}>
              <div className="modal-content-fayda" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header-fayda">
                  <h2>{editingId ? 'Edit News Post' : 'Publish News'}</h2>
                  <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}><FiX /></button>
                </div>
                <div className="modal-body-fayda">
                  {message && (
                    <div className={`form-alert ${message.includes('success') ? 'success' : 'error'}`}>
                      {message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="fayda-form">
                    <div className="f-group">
                      <label>TITLE *</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="News headline..."
                        required
                      />
                    </div>

                    <div className="f-group">
                      <label>IMAGES</label>
                      <div className="fayda-upload-zone">
                        {images.length > 0 && (
                          <div className="upload-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', width: '100%', marginBottom: '20px' }}>
                            {images.map((imgSrc, idx) => (
                              <div key={idx} style={{ position: 'relative', width: '100%', height: '100px' }}>
                                <img src={imgSrc} alt={`Preview ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                <button type="button" onClick={() => handleRemoveImage(idx)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>X</button>
                              </div>
                            ))}
                          </div>
                        )}

                        <label className="upload-trigger">
                          <input type="file" accept="image/*" multiple onChange={(e) => handleImageChange(e, 'news')} hidden />
                          <FiImage className="upload-icon-f" />
                          <span className="upload-text">Click to upload images</span>
                          <span className="upload-sub">Select one or multiple images</span>
                        </label>
                      </div>
                    </div>

                    <div className="f-group">
                      <label>CONTENT *</label>
                      <textarea
                        rows={8}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your news article..."
                        required
                      />
                    </div>

                    <div className="f-actions-center">
                      <button type="submit" className="f-submit-btn">
                        <FiSend /> {editingId ? 'Update News' : 'Publish News'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ── COURSE MODAL FORM ── */}
          {isCourseModalOpen && (
            <div className="modal-overlay-fayda" onClick={() => setIsCourseModalOpen(false)}>
              <div className="modal-content-fayda" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header-fayda">
                  <h2>{editingCourseId ? 'Edit Course' : 'Create Course'}</h2>
                  <button className="modal-close-btn" onClick={() => setIsCourseModalOpen(false)}><FiX /></button>
                </div>
                <div className="modal-body-fayda">
                  {message && (
                    <div className={`form-alert ${message.includes('success') ? 'success' : 'error'}`}>
                      {message}
                    </div>
                  )}

                  <form onSubmit={handleCourseSubmit} className="fayda-form">
                    <div className="f-group">
                      <label>COURSE TITLE *</label>
                      <input
                        type="text"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder="e.g. Advanced Leadership Mastery"
                        required
                      />
                    </div>

                    <div className="f-group">
                      <label>COURSE DESCRIPTION</label>
                      <textarea
                        rows={2}
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        placeholder="Brief overview of the course..."
                      />
                    </div>

                    <div className="form-row-f">
                      <div className="f-group half-f">
                        <label>CATEGORY *</label>
                        <select
                          className="manage-select-f"
                          value={courseCategory}
                          onChange={(e) => setCourseCategory(e.target.value)}
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="Business">Business</option>
                          <option value="Technology">Technology</option>
                          <option value="Finance">Finance</option>
                          <option value="Leadership">Leadership</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Personal Development">Personal Development</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="f-group half-f">
                        <label>COVER IMAGE</label>
                        <div className="fayda-upload-zone-compact">
                          {courseThumbnail ? (
                            <div className="thumbnail-preview-f">
                              <img src={courseThumbnail} alt="Cover" />
                              <button type="button" className="btn-clear-thumb" onClick={() => setCourseThumbnail(null)}>×</button>
                            </div>
                          ) : (
                            <label className="upload-trigger-compact">
                              <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'course')} hidden />
                              <FiImage />
                              <span>Upload Cover</span>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ── CHAPTERS SECTION ── */}
                    <div className="chapters-section">
                      <div className="chapters-header">
                        <h3>📚 Chapters ({courseChapters.length})</h3>
                        <button type="button" className="btn-add-chapter" onClick={addChapter}>
                          <FiPlus /> Add Chapter
                        </button>
                      </div>

                      {courseChapters.length === 0 && (
                        <div className="empty-chapters-placeholder">
                          No chapters yet. Click "Add Chapter" to start building your course content.
                        </div>
                      )}

                      {courseChapters.map((ch, idx) => (
                        <div key={idx} className={`chapter-panel ${expandedChapter === idx ? 'expanded' : ''}`}>
                          <div className="chapter-panel-header" onClick={() => setExpandedChapter(expandedChapter === idx ? null : idx)}>
                            <div className="chapter-info">
                              <span className="chapter-number">{idx + 1}</span>
                              <span className="chapter-title-text">{ch.chapter_name || `Chapter ${idx + 1}`}</span>
                            </div>
                            <div className="chapter-controls">
                              <button type="button" className="btn-remove-chapter" onClick={(e) => { e.stopPropagation(); removeChapter(idx); }}>Remove</button>
                              {expandedChapter === idx ? <FiChevronUp /> : <FiChevronDown />}
                            </div>
                          </div>

                          {expandedChapter === idx && (
                            <div className="chapter-content-body">
                              <div className="f-group">
                                <label>CHAPTER NAME *</label>
                                <input
                                  type="text"
                                  value={ch.chapter_name}
                                  onChange={(e) => updateChapter(idx, 'chapter_name', e.target.value)}
                                  placeholder="e.g. Introduction to Leadership"
                                />
                              </div>

                              <div className="f-group">
                                <label>CONTENT TEXT *</label>
                                <textarea
                                  rows={5}
                                  value={ch.content_text}
                                  onChange={(e) => updateChapter(idx, 'content_text', e.target.value)}
                                  placeholder="Write chapter content here..."
                                />
                              </div>

                              <div className="f-group">
                                <label>IMAGES (OPTIONAL)</label>
                                <div className="chapter-image-grid">
                                  {(ch.content_images || []).map((img, imgIdx) => (
                                    <div key={imgIdx} className="chapter-img-item">
                                      <img src={img} alt="" />
                                      <button type="button" className="btn-del-img" onClick={() => removeChapterImage(idx, imgIdx)}>×</button>
                                    </div>
                                  ))}
                                  <label className="chapter-upload-btn">
                                    <input type="file" accept="image/*" multiple onChange={(e) => handleChapterImageUpload(e, idx)} hidden />
                                    <FiPlus />
                                  </label>
                                </div>
                              </div>

                              <div className="f-group">
                                <label>VIDEO URL (OPTIONAL)</label>
                                <div style={{ position: 'relative' }}>
                                  <FiFilm style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                  <input
                                    type="text"
                                    value={ch.video_url || ''}
                                    onChange={(e) => updateChapter(idx, 'video_url', e.target.value)}
                                    placeholder="YouTube or Video Link..."
                                    style={{ paddingLeft: '38px' }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="f-actions-center">
                      <button type="submit" className="f-submit-btn">
                        <FiSend /> {editingCourseId ? 'Update Course' : 'Create Course'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ── DELETE CONFIRMATION MODAL ── */}
          {isDeleteModalOpen && (
            <div className="modal-overlay-fayda" onClick={() => setIsDeleteModalOpen(false)}>
              <div className="modal-content-fayda" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header-fayda">
                  <h2>Confirm Delete</h2>
                  <button className="modal-close-btn" onClick={() => setIsDeleteModalOpen(false)}><FiX /></button>
                </div>
                <div className="modal-body-fayda" style={{ textAlign: 'center' }}>
                  <p style={{ color: '#475569', marginBottom: '24px', lineHeight: '1.5' }}>
                    Are you sure you want to delete the {itemToDelete?.type} <strong>"{itemToDelete?.title}"</strong>? This action cannot be undone.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button
                      className="m-btn-edit"
                      style={{ padding: '10px 24px', fontSize: '0.9rem' }}
                      onClick={() => setIsDeleteModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="f-submit-btn"
                      style={{ background: '#ef4444', boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)', padding: '10px 24px', fontSize: '0.9rem' }}
                      onClick={confirmDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      {/* ── LOGOUT CONFIRMATION MODAL ── */}
      {isLogoutModalOpen && (
        <div className="modal-overlay-fayda">
          <div className="modal-content-fayda" style={{ maxWidth: '400px' }}>
            <div className="modal-header-fayda">
              <h2>Confirm Sign Out</h2>
              <button className="modal-close-btn" onClick={() => setIsLogoutModalOpen(false)}><FiX /></button>
            </div>
            <div className="modal-body-fayda">
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', textAlign: 'center', marginBottom: '24px' }}>
                Are you sure you want to sign out? Any unsaved changes will be lost.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => setIsLogoutModalOpen(false)}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmLogout}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: '#ef4444', color: 'white', fontWeight: 700, cursor: 'pointer' }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
