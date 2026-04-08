import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiStar, HiClock } from 'react-icons/hi';
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
  const categories = ['All Courses', 'Leadership', 'Design', 'Business'];

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

  const getCategoryFromTitle = (title: string) => {
    if (title.toLowerCase().includes('leadership')) return 'Leadership';
    if (title.toLowerCase().includes('design') || title.toLowerCase().includes('react')) return 'Design';
    if (title.toLowerCase().includes('business') || title.toLowerCase().includes('node')) return 'Business';
    return 'Leadership';
  };

  const filteredCourses = activeCategory === 'All Courses' 
    ? courses 
    : courses.filter(course => getCategoryFromTitle(course.title) === activeCategory);

  if (loading) {
    return (
      <div className="courses-page">
        <div className="loading">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <div className="courses-content">
        <div className="courses-title-section">
          <h1>Our Courses</h1>
          <p>Level up your professional skills.</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

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

        <div className="courses-grid">
          {filteredCourses.length === 0 ? (
            <div className="empty-state">
              <p>No courses available in this category.</p>
            </div>
          ) : (
            filteredCourses.map((course) => {
              const category = getCategoryFromTitle(course.title);
              const isFree = Math.random() > 0.5; // Random for demo
              const price = isFree ? 'Free' : '8,500 ETB';
              const rating = course.averageRating || 0;
              const totalRatings = course.totalRatings || 0;
              const duration = `${Math.floor(Math.random() * 10) + 5}h ${Math.floor(Math.random() * 60)}m`;
              
              // Get course-specific image based on course ID
              const courseImages = [
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format',
                'https://images.unsplash.com/photo-1498050108023-c5249f4f0853?w=400&h=300&fit=crop&auto=format',
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&auto=format',
                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&auto=format',
                'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop&auto=format',
                'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&auto=format'
              ];
              const courseImage = courseImages[course.id % courseImages.length] || courseImages[0];
              const displayImage = course.thumbnail_url || courseImage;

              return (
                <div key={course.id} className="course-card">
                  <div className="course-category-tag">{category.toUpperCase()}</div>
                  <div className="course-image-wrapper">
                    <img 
                      src={displayImage} 
                      alt={course.title}
                      onError={(e: any) => {
                        if (e.target.src !== courseImage) {
                          e.target.src = courseImage;
                        } else {
                          e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format';
                        }
                      }}
                    />
                  </div>
                  <div className="course-info">
                    <h3>{course.title}</h3>
                    <div className="course-price">{price}</div>
                    <div className="course-meta">
                      <span 
                        className="course-rating"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (user) {
                            setRatingModal({
                              courseId: course.id,
                              courseTitle: course.title
                            });
                          } else {
                            alert('Please login to rate courses');
                          }
                        }}
                        style={{ cursor: user ? 'pointer' : 'default' }}
                        title={user ? 'Click to rate this course' : 'Login to rate'}
                      >
                        <HiStar className={`meta-icon ${rating > 0 ? 'rated' : ''}`} />
                        {rating > 0 ? rating.toFixed(1) : 'No ratings'}
                        {totalRatings > 0 && (
                          <span className="rating-count"> ({totalRatings})</span>
                        )}
                      </span>
                      <span className="course-duration">
                        <HiClock className="meta-icon" />
                        {duration}
                      </span>
                    </div>
                    <Link to={`/courses/${course.id}`} className="btn-start-learning">
                      Start Learning
                    </Link>
                  </div>
                </div>
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
          onRatingSubmitted={() => {
            fetchCourses(); // Refresh courses to show updated ratings
          }}
        />
      )}
    </div>
  );
};

export default Courses;
