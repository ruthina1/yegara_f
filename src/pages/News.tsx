import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../utils/api';
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
    const fetchNews = async () => {
      try {
        const response = await api.get('/news');
        setNews(response.data);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        // Fallback mock data if server is down
        setNews([
          {
            id: '1',
            title: 'Welcome to Yegara LMS',
            date: new Date().toISOString().split('T')[0],
            content: 'We are excited to announce the launch of our new Learning Management System portal. Check our courses and start learning today.'
          }
        ]);
      }
    };
    fetchNews();
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
      <div className="article-page">
        <div className="news-container">
          <Link to="/news" className="back-to-news">
            <FiArrowLeft /> Back to News
          </Link>
          
          <div className="article-main">
            {displayImages.length > 0 && (
              <div className="article-header-media">
                <img src={displayImages[0]} alt={article.title} />
              </div>
            )}
            
            <div className="article-body-content">
              <div className="blog-meta">
                <span className="blog-category">Corporate</span>
                <span className="blog-date">
                  {new Date(article.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              
              <h1 className="article-title">{article.title}</h1>
              
              <div className="article-full-text">
                {article.content}
              </div>

              {displayImages.length > 1 && (
                <div className="article-gallery">
                  <h3>Gallery</h3>
                  <div className="gallery-grid">
                    {displayImages.slice(1).map((imgUrl: string, idx: number) => (
                      <div key={idx} className="gallery-item">
                        <img src={imgUrl} alt={`Gallery ${idx}`} />
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
      
      {/* ── Resources & Insights Section ── */}
      <section className="news-resources-section py-24 bg-[#f8f9fc]" aria-labelledby="resources-heading">
        <div className="news-container">
          <div className="section-header text-center mb-16">
            <span className="news-tag" style={{ color: '#F47920' }}>KNOWLEDGE HUB</span>
            <h2 id="resources-heading" className="text-4xl font-serif font-black mt-4" style={{ color: '#1B3A5C' }}>Resources & <span style={{ color: '#F47920' }}>Insights.</span></h2>
            <p className="max-w-2xl mx-auto mt-6 text-gray-600">Explore our latest thinking on business development, impact investment, and social innovation in Africa.</p>
          </div>

          <div className="resources-grid grid grid-cols-1 md:grid-cols-2 gap-12">
            <article className="resource-card bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <span className="text-[11px] font-black tracking-widest text-[#F47920] uppercase mb-4 block">Strategic Insight</span>
              <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-[#F47920] transition-colors">Business Development in Ethiopia: Navigating the 2024 Landscape</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">As Ethiopia continues its economic liberalization, new opportunities arise for MSMEs and foreign investors alike. We analyze the core growth sectors and structural reforms driving the market.</p>
              <Link to="/contact" className="text-[13px] font-bold flex items-center gap-2 text-[#1B3A5C]">
                Request Full Brief <FiArrowLeft style={{ transform: 'rotate(180deg)' }} />
              </Link>
            </article>

            <article className="resource-card bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <span className="text-[11px] font-black tracking-widest text-[#F47920] uppercase mb-4 block">Impact Investment</span>
              <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-[#F47920] transition-colors">Impact Investment in Africa: Beyond the Bottom Line</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">Sustainable growth requires capital that understands social value. Discover how Yegara is bridging the gap between international institutional capital and local community potential.</p>
              <Link to="/contact" className="text-[13px] font-bold flex items-center gap-2 text-[#1B3A5C]">
                Join the Network <FiArrowLeft style={{ transform: 'rotate(180deg)' }} />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
