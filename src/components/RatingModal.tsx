import React, { useState, useEffect } from 'react';
import { HiStar, HiX } from 'react-icons/hi';
import api from '../utils/api';
import './RatingModal.css';

interface RatingModalProps {
  courseId: number;
  courseTitle: string;
  onClose: () => void;
  onRatingSubmitted?: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ courseId, courseTitle, onClose, onRatingSubmitted }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUserRating();
  }, [courseId]);

  const fetchUserRating = async () => {
    try {
      const response = await api.get(`/ratings/user/${courseId}`);
      if (response.data.userRating) {
        setRating(response.data.userRating);
        setUserRating(response.data.userRating);
      }
    } catch (err) {
      console.error('Failed to fetch user rating:', err);
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    try {
      setLoading(true);
      await api.post('/ratings', {
        courseId,
        rating,
      });
      setUserRating(rating);
      if (onRatingSubmitted) {
        onRatingSubmitted();
      }
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      console.error('Failed to submit rating:', err);
      alert('Failed to submit rating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rating-modal-overlay" onClick={onClose}>
      <div className="rating-modal" onClick={(e) => e.stopPropagation()}>
        <button className="rating-modal-close" onClick={onClose}>
          <HiX />
        </button>
        <h3>Rate this Course</h3>
        <p className="rating-course-title">{courseTitle}</p>
        
        <div className="rating-stars-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`rating-star ${star <= (hoveredRating || rating) ? 'active' : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              <HiStar />
            </button>
          ))}
        </div>

        {rating > 0 && (
          <p className="rating-text">
            {rating === 1 && 'Poor'}
            {rating === 2 && 'Fair'}
            {rating === 3 && 'Good'}
            {rating === 4 && 'Very Good'}
            {rating === 5 && 'Excellent'}
          </p>
        )}

        {userRating && (
          <p className="rating-update-note">You previously rated this course {userRating} star{userRating > 1 ? 's' : ''}</p>
        )}

        <div className="rating-modal-actions">
          <button className="btn-rating-cancel" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn-rating-submit" 
            onClick={handleSubmit}
            disabled={loading || rating === 0}
          >
            {loading ? 'Submitting...' : userRating ? 'Update Rating' : 'Submit Rating'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
