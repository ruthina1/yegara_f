import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FiLock, 
  FiCheck, 
  FiPlay, 
  FiFileText,
  FiBarChart2 
} from 'react-icons/fi';
import api from '../utils/api';
import BottomNav from '../components/BottomNav';
import './CourseDetail.css';
import { Course, CourseContent, Progress } from '../types';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContent, setSelectedContent] = useState<CourseContent | null>(null);
  const [progress, setProgress] = useState<Record<number, Progress>>({});
  const [activeTab, setActiveTab] = useState('Curriculum');
  const [courseProgress, setCourseProgress] = useState(65);
  const [contentDurations, setContentDurations] = useState<Record<number, string>>({});

  useEffect(() => {
    fetchCourse();
    fetchProgress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await api.get<Course>(`/courses/${id}`);
      setCourse(response.data);
      if (response.data.content && response.data.content.length > 0) {
        setSelectedContent(response.data.content[0]);
        // Set fixed durations based on content ID for consistency
        const durations: Record<number, string> = {};
        response.data.content.forEach((item, index) => {
          if (item.content_type === 'video') {
            // Use content ID to generate consistent duration (10-25 mins)
            durations[item.id] = `${10 + (item.id % 16)} mins`;
          } else {
            // For quizzes, use consistent question count (5-15 questions)
            durations[item.id] = `${5 + (item.id % 11)} questions`;
          }
        });
        setContentDurations(durations);
      }
      setError('');
    } catch (err) {
      setError('Failed to load course. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const response = await api.get<Progress[]>(`/progress/${id}`);
      const progressMap: Record<number, Progress> = {};
      let completedCount = 0;
      response.data.forEach((item) => {
        progressMap[item.content_id] = item;
        if (item.completed) completedCount++;
      });
      setProgress(progressMap);
      
      if (course && course.content) {
        const totalContent = course.content.length;
        setCourseProgress(Math.round((completedCount / totalContent) * 100));
      }
    } catch (err) {
      console.error('Failed to load progress', err);
    }
  };

  const updateProgress = async (contentId: number, completed: boolean, percentage: number) => {
    try {
      await api.post('/progress', {
        courseId: id,
        contentId,
        completed,
        progressPercentage: percentage,
      });
      setProgress((prev) => ({
        ...prev,
        [contentId]: { ...prev[contentId], completed, progress_percentage: percentage } as Progress,
      }));
      fetchProgress();
    } catch (err) {
      console.error('Failed to update progress', err);
    }
  };

  const handleVideoProgress = (e: any) => {
    const video = e.target;
    const percentage = Math.round((video.currentTime / video.duration) * 100);
    if (selectedContent) {
      updateProgress(selectedContent.id, percentage === 100, percentage);
    }
  };

  const handleVideoEnd = () => {
    if (selectedContent) {
      updateProgress(selectedContent.id, true, 100);
    }
  };

  const getContentStatus = (item: CourseContent, index: number) => {
    const itemProgress = progress[item.id];
    const isCompleted = itemProgress?.completed;
    const isActive = selectedContent?.id === item.id;
    const previousCompleted = index > 0 && course ? progress[course.content![index - 1]?.id]?.completed : true;
    const isLocked = !previousCompleted && index > 0;

    return { isCompleted, isActive, isLocked };
  };

  if (loading) {
    return (
      <div className="course-player-page">
        <div className="loading">Loading course...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-player-page">
        <div className="error-banner">{error || 'Course not found'}</div>
        <Link to="/courses" className="back-link">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  const tabs = ['Curriculum', 'Overview', 'Resources', 'Discussion'];

  return (
    <div className="course-player-page">
      <div className="player-header">
        <Link to="/courses" className="back-arrow">←</Link>
        <h2 className="course-title-header">{course.title}</h2>
        <button className="menu-icon">⋯</button>
      </div>

      <div className="video-section">
        {selectedContent ? (
          <div className="video-container">
            {selectedContent.content_type === 'video' ? (
              <video
                controls
                className="video-player"
                onTimeUpdate={handleVideoProgress}
                onEnded={handleVideoEnd}
                src={selectedContent.content_url}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={selectedContent.content_url}
                className="pdf-viewer"
                title={selectedContent.title}
              />
            )}
          </div>
        ) : (
          <div className="video-placeholder">
            <div className="play-button-large">
              <FiPlay />
            </div>
          </div>
        )}
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Course Completion</span>
          <span className="progress-percentage">{courseProgress}% Done</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${courseProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="tabs-section">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Curriculum' && (
        <div className="curriculum-content">
          {course.content && course.content.length > 0 && (
            <>
              <div className="module-header">
                <h3>Module 2: Strategic Execution</h3>
                <span className="lesson-count">4 LESSONS</span>
              </div>

              <div className="lessons-list">
                {course.content.map((item, index) => {
                  const { isCompleted, isActive, isLocked } = getContentStatus(item, index);
                  const duration = contentDurations[item.id] || 
                    (item.content_type === 'video' ? '15 mins' : '10 questions');

                  return (
                    <div
                      key={item.id}
                      data-lesson-id={item.id}
                      className={`lesson-item ${isActive ? 'active' : ''} ${
                        isCompleted ? 'completed' : ''
                      } ${isLocked ? 'locked' : ''}`}
                      onClick={() => !isLocked && setSelectedContent(item)}
                    >
                      <div className="lesson-icon">
                        {isLocked ? (
                          <FiLock className="lock-icon" />
                        ) : isCompleted ? (
                          <div className="check-icon-wrapper">
                            <FiCheck className="check-icon" />
                          </div>
                        ) : isActive ? (
                          <div className="play-icon-wrapper">
                            <FiPlay className="play-icon" />
                          </div>
                        ) : (
                          <span className="lesson-number">{index + 1}.{index + 1}</span>
                        )}
                      </div>
                      <div className="lesson-info">
                        <div className="lesson-title-row">
                          <span className="lesson-title">{item.title}</span>
                          {isActive && (
                            <span className="currently-playing">Currently Playing</span>
                          )}
                        </div>
                        <div className="lesson-meta">
                          <span className="lesson-type">
                            {item.content_type === 'video' ? 'Video' : 'Quiz'} - {duration}
                          </span>
                        </div>
                      </div>
                      <div className="lesson-action-icon">
                        {isLocked ? (
                          <FiFileText />
                        ) : item.content_type === 'video' ? (
                          <FiPlay />
                        ) : (
                          <FiBarChart2 />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'Overview' && (
        <div className="overview-content">
          <p className="overview-text">{course.description || 'Course overview content will appear here.'}</p>
        </div>
      )}

      <div className="coming-up-section">
        <div className="coming-up-card">
          <h4>Module 3: Global Scaling & Market Reach</h4>
          <button 
            className="btn-view-next"
            onClick={() => {
              if (!course || !course.content) return;
              // Find the next unlocked lesson or first incomplete lesson
              const currentIndex = course.content.findIndex(c => c.id === selectedContent?.id);
              const nextIndex = currentIndex + 1;
              
              if (nextIndex < course.content.length) {
                const nextContent = course.content[nextIndex];
                const previousCompleted = nextIndex > 0 ? progress[course.content[nextIndex - 1]?.id]?.completed : true;
                
                if (previousCompleted || nextIndex === 0) {
                  setSelectedContent(nextContent);
                  setActiveTab('Curriculum');
                  // Scroll to the lesson
                  setTimeout(() => {
                    const lessonElement = document.querySelector(`[data-lesson-id="${nextContent.id}"]`);
                    if (lessonElement) {
                      lessonElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }, 100);
                } else {
                  // If next lesson is locked, show message or unlock it
                  alert('Please complete the current lesson first.');
                }
              } else {
                // All lessons completed, go to next course or show completion message
                alert('Congratulations! You have completed all lessons in this module.');
              }
            }}
          >
            View Next Module
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default CourseDetail;
