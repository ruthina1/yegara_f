import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiCalendar, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import './Profile.css';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // In a real app, you'd have an API endpoint to update user profile
      // For now, we'll just update local storage
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      // Reload page to reflect changes
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="loading">Please log in to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account information and preferences</p>
        </div>

        <div className="profile-content">
          <div className="profile-avatar-section">
            <div className="avatar-wrapper">
              <div className="avatar-circle">
                <FiUser className="avatar-icon" />
              </div>
            </div>
            <h2>{user.name}</h2>
            <p className="user-email">{user.email}</p>
          </div>

          <div className="profile-form-section">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="form-section">
              <div className="form-header">
                <h3>Personal Information</h3>
                {!isEditing ? (
                  <button 
                    className="btn-edit"
                    onClick={() => setIsEditing(true)}
                  >
                    <FiEdit2 /> Edit
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button 
                      className="btn-save"
                      onClick={handleSave}
                      disabled={loading}
                    >
                      <FiSave /> {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button 
                      className="btn-cancel"
                      onClick={handleCancel}
                    >
                      <FiX /> Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="form-fields">
                <div className="form-field">
                  <label>
                    <FiUser className="field-icon" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="field-value">{user.name}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    <FiMail className="field-icon" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="field-value">{user.email}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    <FiCalendar className="field-icon" />
                    Member Since
                  </label>
                  <div className="field-value">
                    {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-header">
                <h3>Account Statistics</h3>
              </div>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">0</div>
                  <div className="stat-label">Courses Enrolled</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">0</div>
                  <div className="stat-label">Courses Completed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">0%</div>
                  <div className="stat-label">Overall Progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
