import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FiLock, 
  FiCheck, 
  FiPlay, 
  FiFileText,
  FiChevronLeft,
  FiChevronRight,
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
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(380);
  const [isResizing, setIsResizing] = useState(false);

  const [chapterTab, setChapterTab] = useState<'read' | 'images' | 'video'>('read');

  useEffect(() => {
    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (selectedChapter) {
      setChapterTab('read');
    }
  }, [selectedChapter]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await api.get<Course>(`/courses/${id}`);
      setCourse(response.data);
      
      if (response.data.chapters && response.data.chapters.length > 0) {
        setSelectedChapter(response.data.chapters[0]);
        setSelectedChapterIndex(0);
      }
      
      // Fetch progress from DB
      try {
        const progressRes = await api.get<Progress[]>(`/progress/${id}`);
        const progressMap: Record<number, boolean> = {};
        progressRes.data.forEach(p => {
          if (p.chapter_id) {
            progressMap[p.chapter_id] = !!p.completed;
          }
        });
        setProgress(progressMap);
        
        if (response.data.chapters) {
          const completedCount = Object.values(progressMap).filter(Boolean).length;
          setCourseProgress(Math.round((completedCount / response.data.chapters.length) * 100));
        }
      } catch (pErr) {
        console.error('Failed to fetch progress:', pErr);
      }

      setError('');
    } catch (err) {
      setError('Failed to load course details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const resizeSidebar = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth > 250 && newWidth < 600) {
        setSidebarWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resizeSidebar);
      window.addEventListener('mouseup', stopResizing);
    } else {
      window.removeEventListener('mousemove', resizeSidebar);
      window.removeEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resizeSidebar);
      window.removeEventListener('mouseup', stopResizing);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResizing]);

  const toggleCompletion = async (chapterId: number) => {
    const isCurrentlyCompleted = !!progress[chapterId];
    
    // Optimistic update
    setProgress(prev => {
      const newProgress = { ...prev, [chapterId]: !isCurrentlyCompleted };
      if (course?.chapters) {
        const completedCount = Object.values(newProgress).filter(Boolean).length;
        setCourseProgress(Math.round((completedCount / course.chapters.length) * 100));
      }
      return newProgress;
    });

    try {
      await api.post('/progress', {
        courseId: id,
        chapterId: chapterId,
        completed: !isCurrentlyCompleted,
        progressPercentage: !isCurrentlyCompleted ? 100 : 0
      });
    } catch (err) {
      console.error('Failed to update progress in DB:', err);
      // Rollback on failure
      setProgress(prev => {
        const newProgress = { ...prev, [chapterId]: isCurrentlyCompleted };
        if (course?.chapters) {
          const completedCount = Object.values(newProgress).filter(Boolean).length;
          setCourseProgress(Math.round((completedCount / course.chapters.length) * 100));
        }
        return newProgress;
      });
    }
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
          <Link to={`/courses/${id}`} className="btn-back-circle"><FiChevronLeft /></Link>
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

      <div className={`player-main-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* ── CONTENT AREA ── */}
        <div className="content-viewport">
          {selectedChapter ? (
            <div className="chapter-article">
              <div className="article-header">
                <span className="chapter-label">MODULE {selectedChapterIndex + 1}</span>
                <h2 className="chapter-main-title">{selectedChapter.chapter_name}</h2>
                
                {/* ── INTERNAL CONTENT TABS ── */}
                <div className="internal-tabs">
                  <button 
                    className={`int-tab ${chapterTab === 'read' ? 'active' : ''}`}
                    onClick={() => setChapterTab('read')}
                  >
                    <FiBookOpen /> Read
                  </button>
                  {selectedChapter.content_images && selectedChapter.content_images.length > 0 && (
                    <button 
                      className={`int-tab ${chapterTab === 'images' ? 'active' : ''}`}
                      onClick={() => setChapterTab('images')}
                    >
                      <FiImage /> Visuals
                    </button>
                  )}
                  {selectedChapter.video_url && (
                    <button 
                      className={`int-tab ${chapterTab === 'video' ? 'active' : ''}`}
                      onClick={() => setChapterTab('video')}
                    >
                      <FiFilm /> Watch
                    </button>
                  )}
                </div>
              </div>

              <div className="article-body">
                {chapterTab === 'read' && (
                  <div className="content-card-premium fade-in">
                    {(() => {
                      if (!selectedChapter.content_text) return null;
                      try {
                        const blocks = JSON.parse(selectedChapter.content_text);
                        if (Array.isArray(blocks)) {
                          return blocks.map((block, idx) => {
                            if (block.type === 'text') {
                              return <p key={idx} className="primary-text" style={{ marginBottom: '24px' }}>{block.value}</p>;
                            }
                            if (block.type === 'image' && block.value) {
                              return (
                                <div key={idx} style={{ marginBottom: '24px', textAlign: 'center' }} onClick={() => setEnlargedImage(block.value)} className="cursor-zoom-in">
                                  <img src={block.value} alt="Content block" style={{ maxWidth: '100%', borderRadius: '12px', cursor: 'zoom-in' }} />
                                </div>
                              );
                            }
                            if (block.type === 'video' && block.value) {
                              return (
                                <div key={idx} className="content-video-wrapper" style={{ marginBottom: '24px' }}>
                                  <iframe 
                                    src={block.value.replace('watch?v=', 'embed/')} 
                                    title="Content Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                  ></iframe>
                                </div>
                              );
                            }
                            return null;
                          });
                        }
                      } catch {
                        return <p className="primary-text">{selectedChapter.content_text}</p>;
                      }
                      return <p className="primary-text">{selectedChapter.content_text}</p>;
                    })()}
                  </div>
                )}
                
                {chapterTab === 'video' && selectedChapter.video_url && (
                  <div className="content-video-wrapper fade-in">
                    <iframe 
                      src={selectedChapter.video_url.replace('watch?v=', 'embed/')} 
                      title="Chapter Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                {chapterTab === 'images' && selectedChapter.content_images && selectedChapter.content_images.length > 0 && (
                  <div className="article-gallery fade-in">
                    {selectedChapter.content_images.map((img, i) => (
                      <div 
                        key={i} 
                        className="gallery-item"
                        onClick={() => setEnlargedImage(img)}
                      >
                        <img src={img} alt={`Visual aid ${i+1}`} />
                        <button 
                          className="btn-expand-img"
                        >
                          <FiMaximize2 />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="article-footer">
                <button 
                  className={`btn-complete ${progress[selectedChapter.id!] ? 'completed' : ''}`}
                  onClick={() => toggleCompletion(selectedChapter.id!)}
                >
                  {progress[selectedChapter.id!] ? 'Undo' : 'Mark as Finished'}
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
        <aside 
          className={`player-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${isResizing ? 'resizing' : ''}`}
          style={{ width: sidebarCollapsed ? 0 : sidebarWidth }}
        >
          <div className="sidebar-resizer" onMouseDown={startResizing} />
          
          <button 
            className="btn-sidebar-toggle" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
          
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

      {/* ── IMAGE ENLARGEMENT MODAL ── */}
      {enlargedImage && (
        <div className="image-modal-overlay" onClick={() => setEnlargedImage(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={enlargedImage} alt="Enlarged visual" />
            <button className="btn-close-modal" onClick={() => setEnlargedImage(null)}>
              <span style={{ fontSize: '2rem', fontWeight: 300 }}>&times;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
