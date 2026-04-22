import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import './News.css';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
  imageUrls?: string[];
}

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const heroImages = news.filter(item => item.imageUrl).map(item => item.imageUrl as string);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    const saved = localStorage.getItem('yegara_news');
    if (saved) {
      setNews(JSON.parse(saved));
    } else {
      // Mock some initial data if empty
      setNews([
        {
          id: '1',
          title: 'Welcome to Yegara LMS',
          date: new Date().toISOString().split('T')[0],
          content: 'We are excited to announce the launch of our new Learning Management System portal. Check our courses and start learning today.'
        }
      ]);
    }
  }, []);

  // Single Article View
  if (id) {
    const article = news.find(n => n.id === id);
    if (news.length > 0 && !article) {
      // Data loaded but article not found
      navigate('/news', { replace: true });
      return null;
    }
    if (!article) return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Loading...</div>;

    const displayImages = article.imageUrls || (article.imageUrl ? [article.imageUrl] : []);

    return (
      <div className="article-page" style={{ paddingTop: '100px', minHeight: '100vh', background: '#FAFAFA', paddingBottom: '100px' }}>
        <div className="news-container">
          <Link to="/news" className="back-to-news" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748B', fontWeight: 700, marginBottom: '30px', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.85rem' }}>
            <FiArrowLeft /> Back to News
          </Link>
          
          <div className="article-main" style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
            {displayImages.length > 0 && (
              <div className="article-header-media" style={{ width: '100%', height: '500px', background: '#f1f5f9' }}>
                <img src={displayImages[0]} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            
            <div className="article-body-content" style={{ padding: '60px 80px' }}>
              <div className="blog-meta" style={{ marginBottom: '24px' }}>
                <span className="blog-category">Corporate</span>
                <span className="blog-date">
                  {new Date(article.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', fontWeight: 800, color: 'var(--ytsc-blue)', marginBottom: '40px', lineHeight: 1.15 }}>{article.title}</h1>
              
              <div className="article-full-text" style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#475569', whiteSpace: 'pre-wrap' }}>
                {article.content}
              </div>

              {displayImages.length > 1 && (
                <div className="article-gallery" style={{ marginTop: '60px' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--ytsc-blue)', marginBottom: '20px', fontWeight: 700 }}>Gallery</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                    {displayImages.slice(1).map((imgUrl: string, idx: number) => (
                      <div key={idx} style={{ height: '150px', borderRadius: '12px', overflow: 'hidden' }}>
                        <img src={imgUrl} alt={`Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-page">
      <div className="news-hero relative overflow-hidden flex items-center justify-center">
        {heroImages.length > 0 && (
          <AnimatePresence initial={false}>
            <motion.div 
              key={currentHeroSlide}
              className="absolute inset-0 z-0" 
              style={{
                backgroundImage: `url(${heroImages[currentHeroSlide]})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
              initial={{ opacity: 0, x: '100%', scale: 1.1 }}
              animate={{ opacity: 1, x: 0, scale: 1.05 }}
              exit={{ opacity: 0, x: '-100%', scale: 1.1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>
        )}
        {/* Dark overlay for text clarity */}
        <div className="absolute inset-0 z-10" style={{ backgroundColor: 'rgba(6, 13, 24, 0.75)' }} />

        <div className="news-container text-center relative z-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="news-tag text-white/70"
          >
            LATEST UPDATES
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white"
          >
            News & <span className="text-orange" style={{ color: '#F47920' }}>Announcements.</span>
          </motion.h1>
        </div>
      </div>

      <div className="news-feed-container">
        <div className="blog-grid">
          {news.length === 0 ? (
            <div className="no-news-found">
              <h2>No updates yet.</h2>
              <p>Follow us for more updates soon.</p>
            </div>
          ) : (
            news.map((item, index) => (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="blog-card"
              >
                <div className="blog-card-media">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} />
                  ) : (
                    <div className="blog-media-placeholder">
                       <span>News Update</span>
                    </div>
                  )}
                </div>

                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span className="blog-category">Corporate</span>
                    <span className="blog-date">
                      {new Date(item.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="blog-title">{item.title}</h2>
                  <div className="blog-excerpt">
                    {item.content}
                  </div>
                  <Link to={`/news/${item.id}`} className="blog-read-more" style={{ textDecoration: 'none' }}>
                    Read Article <FiArrowLeft style={{ transform: 'rotate(180deg)' }} />
                  </Link>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
