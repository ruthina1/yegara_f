import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FiLock, 
  FiCheck, 
  FiPlay, 
  FiFileText,
  FiChevronLeft,
  FiClock,
  FiBookOpen,
  FiImage,
  FiFilm,
  FiArrowRight,
  FiMaximize2
} from 'react-icons/fi';
import api from '../utils/api';
import BottomNav from '../components/BottomNav';
import './CourseDetail.css';
import { Course, Chapter, Progress } from '../types';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [courseProgress, setCourseProgress] = useState(0);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await api.get<Course>(`/courses/${id}`);
      setCourse(response.data);
      
      if (response.data.chapters && response.data.chapters.length > 0) {
        setSelectedChapter(response.data.chapters[0]);
        setSelectedChapterIndex(0);
      }
      setError('');
    } catch (err) {
      setError('Failed to load course details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = (chapterId: number) => {
    setProgress(prev => {
      const newProgress = { ...prev, [chapterId]: true };
      // Calculate new percentage
      if (course?.chapters) {
        const completedCount = Object.values(newProgress).filter(Boolean).length;
        setCourseProgress(Math.round((completedCount / course.chapters.length) * 100));
      }
      return newProgress;
    });
  };

  const handleNextChapter = () => {
    if (!course?.chapters) return;
    const nextIndex = selectedChapterIndex + 1;
    if (nextIndex < course.chapters.length) {
      setSelectedChapter(course.chapters[nextIndex]);
      setSelectedChapterIndex(nextIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) return <div className="course-loading"> <div className="spinner"></div> <span>Loading Experience...</span></div>;
  if (error || !course) return <div className="course-error"><h2>{error || 'Course not found'}</h2><Link to="/courses">Back to Courses</Link></div>;

  return (
    <div className="premium-player-page">
      {/* ── CINEMATIC HEADER ── */}
      <header className="player-top-bar">
        <div className="bar-left">
          <Link to="/courses" className="btn-back-circle"><FiChevronLeft /></Link>
          <div className="course-info-mini">
            <span className="mini-cat">{course.category || 'General'}</span>
            <h1 className="mini-title">{course.title}</h1>
          </div>
        </div>
        <div className="bar-right">
          <div className="progress-pill">
            <div className="pill-fill" style={{ width: `${courseProgress}%` }}></div>
            <span className="pill-text">{courseProgress}% Complete</span>
          </div>
        </div>
      </header>

      <div className="player-main-layout">
        {/* ── CONTENT AREA ── */}
        <div className="content-viewport">
          {selectedChapter ? (
            <div className="chapter-article">
              <div className="article-header">
                <span className="chapter-label">MODULE {selectedChapterIndex + 1}</span>
                <h2 className="chapter-main-title">{selectedChapter.chapter_name}</h2>
                <div className="article-meta">
                  <span><FiClock /> 12 min read</span>
                  <span><FiBookOpen /> Professional Training</span>
                </div>
              </div>

              {/* Video Embed if exists */}
              {selectedChapter.video_url && (
                <div className="content-video-wrapper">
                  <iframe 
                    src={selectedChapter.video_url.replace('watch?v=', 'embed/')} 
                    title="Chapter Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <div className="article-body">
                <div className="content-card-premium">
                  <p className="primary-text">{selectedChapter.content_text}</p>
                </div>
                
                {selectedChapter.content_images && selectedChapter.content_images.length > 0 && (
                  <div className="article-gallery">
                    {selectedChapter.content_images.map((img, i) => (
                      <div key={i} className="gallery-item">
                        <img src={img} alt={`Visual aid ${i+1}`} />
                        <button className="btn-expand-img"><FiMaximize2 /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="article-footer">
                <button 
                  className={`btn-complete ${progress[selectedChapter.id!] ? 'completed' : ''}`}
                  onClick={() => markAsCompleted(selectedChapter.id!)}
                >
                  {progress[selectedChapter.id!] ? <><FiCheck /> Completed</> : 'Mark as Finished'}
                </button>
                
                {selectedChapterIndex < (course.chapters?.length || 0) - 1 && (
                  <button className="btn-next-chapter" onClick={handleNextChapter}>
                    Next Module <FiArrowRight />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="no-chapter-selected">
              <div className="empty-course-state">
                <FiPlay className="placeholder-icon-large" />
                <h3>Ready to start your journey?</h3>
                <p>Select the first module from the curriculum to begin.</p>
                {course.chapters && course.chapters.length > 0 && (
                  <button 
                    className="btn-start-course"
                    onClick={() => { setSelectedChapter(course.chapters![0]); setSelectedChapterIndex(0); }}
                  >
                    Start Learning Now
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── SIDEBAR CURRICULUM ── */}
        <aside className="player-sidebar">
          <div className="sidebar-header">
            <h3>Course Content</h3>
            <span>{course.chapters?.length || 0} Modules</span>
          </div>
          <div className="curriculum-list">
            {course.chapters?.map((ch, idx) => (
              <div 
                key={ch.id || idx} 
                className={`sidebar-item ${selectedChapterIndex === idx ? 'active' : ''} ${progress[ch.id!] ? 'done' : ''}`}
                onClick={() => { setSelectedChapter(ch); setSelectedChapterIndex(idx); }}
              >
                <div className="item-status">
                  {progress[ch.id!] ? <FiCheck className="ico-done" /> : <span className="item-num">{idx + 1}</span>}
                </div>
                <div className="item-details">
                  <span className="item-title">{ch.chapter_name}</span>
                  <div className="item-meta">
                    {ch.video_url && <span><FiFilm /> Video</span>}
                    {ch.content_images && ch.content_images.length > 0 && <span><FiImage /> {ch.content_images.length} Images</span>}
                  </div>
                </div>
                {selectedChapterIndex === idx && <div className="active-indicator"></div>}
              </div>
            ))}
          </div>
        </aside>
      </div>

      <BottomNav />
    </div>
  );
};

export default CourseDetail;
