import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiStar } from 'react-icons/hi';
import { FiBookOpen, FiClock, FiBookmark } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import RatingModal from '../components/RatingModal';
import './Courses.css';
import { Course } from '../types';

const Courses: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [ratingModal, setRatingModal] = useState<{ courseId: number; courseTitle: string } | null>(null);
  const [savedCourses, setSavedCourses] = useState<number[]>([]);

  // Hero Slider State
  const heroImages = [
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&fit=crop',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4f0853?w=1600&fit=crop'
  ];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = ['All Courses', 'Business', 'Technology', 'Finance', 'Leadership', 'Marketing'];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get<Course[]>('/courses');
      setCourses(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load courses. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedCourses = async () => {
    if (!user) return;
    try {
      const response = await api.get<Course[]>('/saved');
      setSavedCourses(response.data.map(c => c.id));
    } catch (err) {
      console.error('Error fetching saved courses:', err);
    }
  };

  useEffect(() => {
    fetchSavedCourses();
  }, [user]);

  const toggleSaveCourse = async (e: React.MouseEvent, courseId: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;

    const isSaved = savedCourses.includes(courseId);
    try {
      if (isSaved) {
        await api.delete(`/saved/${courseId}`);
        setSavedCourses(prev => prev.filter(id => id !== courseId));
      } else {
        await api.post(`/saved/${courseId}`);
        setSavedCourses(prev => [...prev, courseId]);
      }
    } catch (err) {
      console.error('Error toggling save:', err);
    }
  };

  const getSortedCourses = (list: Course[]) => {
    return [...list].sort((a, b) => 
      new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );
  };

  const renderCourseCard = (course: Course) => {
    const rating = Number(course.averageRating) || 0;
    const chCount = course.chapterCount || 0;
    
    const defaultImages = [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4f0853?w=800&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop'
    ];
    const displayImage = course.thumbnail_url || defaultImages[course.id % 3];

    return (
      <Link to={`/courses/${course.id}`} key={course.id} className="course-card-premium">
        <div className="card-image-section">
          <img src={displayImage} alt={course.title} loading="lazy" />
          <div className="card-category-overlay">{course.category || 'Professional'}</div>
          {user && (
            <button 
              className={`btn-save-course ${savedCourses.includes(course.id) ? 'saved' : ''}`}
              onClick={(e) => toggleSaveCourse(e, course.id)}
            >
              <FiBookmark />
            </button>
          )}
        </div>
        
        <div className="card-content-section">
          <div className="card-top-meta">
            <div className="chapters-count">
              <FiBookOpen /> {chCount} Chapters
            </div>
          </div>

          <h3 className="course-card-title">{course.title}</h3>
          <p className="course-card-excerpt">{course.description}</p>

          {course.userProgress !== undefined && course.userProgress > 0 && (
            <div className="card-progress-container">
              <div className="card-progress-bar">
                <div 
                  className="card-progress-fill" 
                  style={{ width: `${Math.round(course.userProgress)}%` }}
                ></div>
              </div>
              <span className="card-progress-text">{Math.round(course.userProgress)}% complete</span>
            </div>
          )}
          
          <div className="card-footer-premium">
            <div className="interactive-rating-tag" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); 
                if (user) setRatingModal({ courseId: course.id, courseTitle: course.title });
              }}>
              <div className="five-stars-wrapper">
                {[1, 2, 3, 4, 5].map((star) => (
                  <HiStar key={star} className={rating >= star ? 'star-active' : 'star-dim'} />
                ))}
              </div>
              <span className="rating-number">{rating > 0 ? rating.toFixed(1) : 'Rate'}</span>
            </div>
            <div className="btn-learn-more">
              Access Course <FiClock />
            </div>
          </div>
        </div>
      </Link>
    );
  };

  if (loading) {
    return (
      <div className="courses-page">
        <div className="loading-container">
          <div className="learning-spinner"></div>
          <p>Curating your learning path...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      {/* ── HERO SECTION ── */}
      <section className="courses-hero">
        <div 
          className="hero-blur-bg"
          style={{ backgroundImage: `url(${heroImages[heroIndex]})` }}
        ></div>
        <div className="courses-content">
          <div className="courses-title-section">
            <span className="subtitle">YEGARA ACADEMY</span>
            <h1>Knowledge for the Next Generation</h1>
            <p>Master the skills that drive the global economy with our expert-led modular courses.</p>
          </div>
        </div>
      </section>

      <div className="courses-container-main">
        {error && <div className="error-banner">{error}</div>}

        {/* ── CATEGORY BAR ── */}
        <div className="category-tabs-container">
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* ── COURSES GRID ── */}
        <div className="courses-main-view">
          {activeCategory === 'All Courses' ? (
            // Grouped View for All Courses
            (() => {
              const sorted = getSortedCourses(courses);
              const started = sorted.filter(c => (c.userProgress || 0) > 0 && (c.userProgress || 0) < 100);
              
              const categoriesInOrder: string[] = [];
              sorted.forEach(c => {
                const cat = c.category || 'Professional';
                if (!categoriesInOrder.includes(cat)) categoriesInOrder.push(cat);
              });

              return (
                <>
                  {started.length > 0 && (
                    <div className="category-section started-section">
                      <div className="section-header">
                        <h2 className="section-title">Continue Learning</h2>
                        <div className="section-line"></div>
                      </div>
                      <div className="courses-grid">
                        {started.map(course => renderCourseCard(course))}
                      </div>
                    </div>
                  )}

                  {categoriesInOrder.map(cat => (
                    <div key={cat} className="category-section">
                      <div className="section-header">
                        <h2 className="section-title">{cat}</h2>
                        <div className="section-line"></div>
                      </div>
                      <div className="courses-grid">
                        {sorted
                          .filter(c => (c.category || 'Professional') === cat)
                          .map(course => renderCourseCard(course))}
                      </div>
                    </div>
                  ))}
                </>
              );
            })()
          ) : (
            // Filtered View for specific category
            <div className="category-section">
              <div className="courses-grid">
                {getSortedCourses(courses.filter(c => c.category === activeCategory)).length === 0 ? (
                  <div className="empty-state-courses">
                    <FiBookOpen className="empty-ico" />
                    <h3>No courses found in this category</h3>
                    <p>Try exploring our other professional learning paths.</p>
                    <button onClick={() => setActiveCategory('All Courses')} className="btn-reset">View All Courses</button>
                  </div>
                ) : (
                  getSortedCourses(courses.filter(c => c.category === activeCategory))
                    .map(course => renderCourseCard(course))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {ratingModal && (
        <RatingModal
          courseId={ratingModal.courseId}
          courseTitle={ratingModal.courseTitle}
          onClose={() => setRatingModal(null)}
          onRatingSubmitted={() => fetchCourses()}
        />
      )}
    </div>
  );
};

export default Courses;
