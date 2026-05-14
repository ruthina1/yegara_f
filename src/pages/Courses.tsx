import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiStar } from 'react-icons/hi';
import { FiBookOpen, FiClock } from 'react-icons/fi';
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

  const filteredCourses = activeCategory === 'All Courses' 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

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
        <div className="hero-blur-bg"></div>
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
        <div className="courses-grid">
          {filteredCourses.length === 0 ? (
            <div className="empty-state-courses">
              <FiBookOpen className="empty-ico" />
              <h3>No courses found in this category</h3>
              <p>Try exploring our other professional learning paths.</p>
              <button onClick={() => setActiveCategory('All Courses')} className="btn-reset">View All Courses</button>
            </div>
          ) : (
            filteredCourses.map((course) => {
              const rating = course.averageRating || 0;
              const totalRatings = course.totalRatings || 0;
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
                  </div>
                  
                  <div className="card-content-section">
                    <div className="card-top-meta">
                      <div className="rating-mini" onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation(); // Prevent card click
                          if (user) setRatingModal({ courseId: course.id, courseTitle: course.title });
                        }}>
                        <HiStar className={rating > 0 ? 'star-active' : 'star-dim'} />
                        <span>{rating > 0 ? rating.toFixed(1) : 'New'}</span>
                        {totalRatings > 0 && <span className="rat-count">({totalRatings})</span>}
                      </div>
                      <div className="chapters-count">
                        <FiBookOpen /> {chCount} Chapters
                      </div>
                    </div>

                    <h3 className="course-card-title">{course.title}</h3>
                    <p className="course-card-excerpt">{course.description}</p>
                    
                    <div className="card-footer-premium">
                      <div className="price-tag">PREMIUM</div>
                      <div className="btn-learn-more">
                        Access Course <FiClock />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
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
