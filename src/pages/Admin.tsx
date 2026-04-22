import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiEdit3, FiFileText, FiSettings, FiHelpCircle, FiTrash2, FiSend, FiImage, FiGrid } from 'react-icons/fi';
import './Admin.css';

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
  const [activeTab, setActiveTab] = useState<'overview' | 'post' | 'manage'>('post');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('yegara_news');
    if (saved) {
      setNews(JSON.parse(saved));
    }
  }, []);

  // Protect Admin route manually just in case
  if (!user || user.email !== 'admin@yegara.com') {
    return <Navigate to="/login" replace />;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !content) {
      setMessage('Please fill in all required fields.');
      return;
    }

    let updatedNews: NewsItem[];

    if (editingId) {
      // Update existing item
      updatedNews = news.map(item => 
        item.id === editingId 
          ? { ...item, title, date, content, imageUrls: images.length > 0 ? images : undefined, imageUrl: undefined }
          : item
      );
      setMessage('News updated successfully!');
    } else {
      // Create new item
      const newItem: NewsItem = {
        id: Date.now().toString(),
        title,
        date,
        content,
        imageUrls: images.length > 0 ? images : undefined,
      };
      updatedNews = [newItem, ...news];
      setMessage('News posted successfully!');
    }

    setNews(updatedNews);
    localStorage.setItem('yegara_news', JSON.stringify(updatedNews));

    // Reset Form
    setTitle('');
    setDate(new Date().toISOString().split('T')[0]);
    setContent('');
    setImages([]);
    setEditingId(null);
    
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (item: NewsItem) => {
    setTitle(item.title);
    setDate(item.date);
    setContent(item.content);
    setImages(item.imageUrls || (item.imageUrl ? [item.imageUrl] : []));
    setEditingId(item.id);
    setActiveTab('post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    const updatedNews = news.filter((n: NewsItem) => n.id !== id);
    setNews(updatedNews);
    localStorage.setItem('yegara_news', JSON.stringify(updatedNews));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className="admin-layout-fayda">
      {/* ── SIDEBAR ── */}
      <aside className="admin-sidebar-fayda">
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
                onClick={() => setActiveTab('overview')}
              >
                <FiGrid className="nav-icon" /> Overview
              </button>
              <button 
                className={`nav-item ${activeTab === 'post' ? 'active' : ''}`}
                onClick={() => setActiveTab('post')}
              >
                <FiEdit3 className="nav-icon" /> Post News
              </button>
              <button 
                className={`nav-item ${activeTab === 'manage' ? 'active' : ''}`}
                onClick={() => setActiveTab('manage')}
              >
                <FiFileText className="nav-icon" /> Manage News
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
          <div className="header-breadcrumbs">
            <span>Admin</span>
            <span className="breadcrumb-divider">/</span>
            <span className="current-context">News Management</span>
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
                  <span className="stat-label">TOTAL POSTS</span>
                  <span className="stat-value">{news.length}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'post' && (
            <div className="view-container max-w-4xl">
              <h1 className="view-title">{editingId ? 'Edit News Post' : 'Publish News'}</h1>
              
              <div className="form-card-fayda">
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
                        <input type="file" accept="image/*" multiple onChange={handleImageChange} hidden />
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
          )}

          {activeTab === 'manage' && (
            <div className="view-container">
              <h1 className="view-title">Manage News</h1>
              <div className="manage-list-fayda">
                {news.length === 0 ? (
                  <div className="empty-state">No news articles found.</div>
                ) : (
                  news.map((item: NewsItem) => (
                    <div key={item.id} className="manage-card-fayda">
                      <div className="m-card-header">
                        <h2>{item.title}</h2>
                        <div className="m-card-actions">
                          <button className="m-btn-edit" onClick={() => handleEdit(item)}><FiEdit3 /> Edit</button>
                          <button className="m-btn-delete" onClick={() => handleDelete(item.id)}>
                            <FiTrash2 /> Delete
                          </button>
                        </div>
                      </div>
                      
                      {item.imageUrl && (
                        <div className="m-card-image">
                          <img src={item.imageUrl} alt="" />
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
        </section>
      </main>
    </div>
  );
};

export default Admin;
