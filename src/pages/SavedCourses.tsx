import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiStar } from 'react-icons/hi';
import { FiBookOpen, FiClock, FiBookmark, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './Courses.css'; // Reuse gallery styles
import { Course } from '../types';

const SavedCourses: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSavedCourses();
  }, []);

  const fetchSavedCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get<Course[]>('/saved');
      setCourses(response.data);
    } catch (err) {
      setError('Failed to load saved courses.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const unsaveCourse = async (e: React.MouseEvent, courseId: number) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.delete(`/saved/${courseId}`);
      setCourses(prev => prev.filter(c => c.id !== courseId));
    } catch (err) {
      console.error('Error removing course:', err);
    }
  };

  if (loading) {
    return (
      <div className="courses-page">
        <div className="loading-container">
          <div className="learning-spinner"></div>
          <p>Finding your saved courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <div className="saved-courses-header-wrap">
        <div className="courses-container-main">
          <Link to="/courses" className="btn-back-link">
            <FiArrowLeft /> Back to Academy
          </Link>
        </div>
      </div>

      <div className="courses-container-main">
        {error && <div className="error-banner">{error}</div>}

        <div className="courses-main-view">
          {courses.length === 0 ? (
            <div className="empty-state-courses">
              <FiBookmark className="empty-ico" />
              <h3>No saved courses yet</h3>
              <p>Explore our catalog and save courses to your library for easy access.</p>
              <Link to="/courses" className="btn-reset" style={{ display: 'inline-block', marginTop: '20px' }}>
                Browse All Courses
              </Link>
            </div>
          ) : (
            <div className="courses-grid">
              {courses.map((course) => {
                const rating = Number(course.averageRating) || 0;
                const chCount = course.chapterCount || 0;
                
                const displayImage = course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&fit=crop';

                return (
                  <Link to={`/courses/${course.id}`} key={course.id} className="course-card-premium">
                    <div className="card-image-section">
                      <img src={displayImage} alt={course.title} loading="lazy" />
                      <div className="card-category-overlay">{course.category || 'Professional'}</div>
                      <button 
                        className="btn-save-course saved"
                        onClick={(e) => unsaveCourse(e, course.id)}
                      >
                        <FiBookmark />
                      </button>
                    </div>
                    
                    <div className="card-content-section">
                      <div className="card-top-meta">
                        <div className="chapters-count">
                          <FiBookOpen /> {chCount} Chapters
                        </div>
                      </div>

                      <h3 className="course-card-title">{course.title}</h3>
                      <p className="course-card-excerpt">{course.description}</p>
                      
                      <div className="card-footer-premium">
                        <div className="interactive-rating-tag">
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
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedCourses;
