import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FiChevronLeft, 
  FiPlay, 
  FiBookOpen, 
  FiClock, 
  FiAward, 
  FiCheckCircle,
  FiArrowRight,
  FiStar
} from 'react-icons/fi';
import api from '../utils/api';
import { Course } from '../types';
import './CourseOverview.css';

const CourseOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await api.get<Course>(`/courses/${id}`);
      setCourse(response.data);
    } catch (err) {
      setError('Failed to load course overview.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="overview-loading"><div className="spinner"></div></div>;
  if (error || !course) return <div className="overview-error"><h2>{error || 'Course not found'}</h2><Link to="/courses">Back to Academy</Link></div>;

  const defaultImage = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&fit=crop';
  const displayImage = course.thumbnail_url || defaultImage;

  return (
    <div className="course-overview-page">
      {/* ── TOP NAVIGATION ── */}
      <nav className="overview-nav">
        <Link to="/courses" className="btn-back-link">
          <FiChevronLeft /> Back to Courses
        </Link>
      </nav>

      <div className="overview-container">
        <div className="overview-grid">
          {/* ── LEFT COLUMN: INFO ── */}
          <div className="overview-left">
            <span className="overview-category">{course.category || 'Professional Development'}</span>
            <h1 className="overview-title">{course.title}</h1>
            
            <div className="overview-meta-strip">
              <div className="meta-item">
                <div className="five-stars-wrapper">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const rating = course.averageRating ? Number(course.averageRating) : 0;
                    return <FiStar key={star} className={rating >= star ? 'star-active' : 'star-dim'} />;
                  })}
                </div>
                <span className="rating-number">{course.averageRating ? Number(course.averageRating).toFixed(1) : '4.8'}</span>
              </div>
              <div className="meta-item">
                <FiBookOpen />
                <span>{course.chapters?.length || 0} Modules</span>
              </div>
              <div className="meta-item">
                <FiClock />
                <span>Self-paced</span>
              </div>
            </div>

            <div className="overview-description">
              <h3>About this course</h3>
              <p>{course.description || "Master the core principles of this domain with our structured learning path designed for professionals seeking excellence."}</p>
            </div>

            <div className="overview-learning-objectives">
              <h3>What you'll learn</h3>
              <ul className="objectives-list">
                <li><FiCheckCircle /> Comprehensive understanding of core concepts</li>
                <li><FiCheckCircle /> Practical implementation strategies</li>
                <li><FiCheckCircle /> Industry best practices and frameworks</li>
                <li><FiCheckCircle /> Real-world case study analysis</li>
              </ul>
            </div>

            <div className="overview-curriculum">
              <h3>Course Content</h3>
              <div className="mini-curriculum">
                {course.chapters?.map((ch, idx) => (
                  <div key={ch.id || idx} className="mini-chapter">
                    <span className="ch-num">{idx + 1}</span>
                    <span className="ch-name">{ch.chapter_name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: CALL TO ACTION ── */}
          <div className="overview-right">
            <div className="cta-card" onClick={() => navigate(`/courses/${id}/learn`)}>
              <div className="cta-preview">
                <img src={displayImage} alt={course.title} />
                <div className="play-overlay">
                  <FiPlay />
                </div>
              </div>
              
              <div className="cta-content">
                <button className="btn-start-learning">
                  Start Learning Now <FiArrowRight />
                </button>

                <div className="course-perks">
                  <div className="perk"><FiAward /> Professional Certificate</div>
                  <div className="perk"><FiClock /> Lifetime Access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
