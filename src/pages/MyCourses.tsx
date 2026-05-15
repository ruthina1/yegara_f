import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiBookOpen } from 'react-icons/fi';
import { HiStar } from 'react-icons/hi';
import api from '../utils/api';
import { Course } from '../types';
import './Courses.css';

const MyCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await api.get('/courses');
        // Filter for courses with progress > 0
        const started = response.data.filter((c: Course) => (c.userProgress || 0) > 0);
        setCourses(started);
      } catch (err) {
        console.error('Error fetching my courses:', err);
        setError('Failed to load your learning progress.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="courses-page">
        <div className="loading-container">
          <div className="learning-spinner"></div>
          <p>Loading your learning journey...</p>
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
          <div className="category-section">
            <div className="section-header">
              <h2 className="section-title">My Learning Progress</h2>
              <div className="section-line"></div>
            </div>

            {courses.length === 0 ? (
              <div className="empty-state-courses">
                <FiClock className="empty-ico" />
                <h3>No courses started yet</h3>
                <p>Pick a course from the academy and start your journey today.</p>
                <Link to="/courses" className="btn-reset" style={{ display: 'inline-block', marginTop: '20px' }}>
                  Browse Academy
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
                        <img src={displayImage} alt={course.title} />
                        <div className="card-category-overlay">{course.category || 'Professional'}</div>
                      </div>
                      
                      <div className="card-content-section">
                        <div className="card-top-meta">
                          <div className="chapters-count">
                            <FiBookOpen /> {chCount} Chapters
                          </div>
                        </div>

                        <h3 className="course-card-title">{course.title}</h3>
                        
                        <div className="card-progress-container">
                          <div className="card-progress-bar">
                            <div 
                              className="card-progress-fill" 
                              style={{ width: `${Math.round(course.userProgress || 0)}%` }}
                            ></div>
                          </div>
                          <span className="card-progress-text">{Math.round(course.userProgress || 0)}% complete</span>
                        </div>

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
                            Continue <FiClock />
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
    </div>
  );
};

export default MyCourses;
