import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Box, Button, Divider, IconButton, Modal, Typography} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';
import './UserProfileModal.css';
import {authAPI} from "../../services/authApi.js";

const UserProfileModal = ({open, onClose, user, userImage, onImageUpdate}) => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(userImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setImage(userImage);
  }, [userImage]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('file', file);

      const response = authAPI.uploadUserImage(token, file);

      const data = await response;
      setImage(data.url);
      onImageUpdate(data.url);
    } catch (err) {
      setError(err.message);
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('access_token');
      await authAPI.deleteUserImage(token);
      setImage(null);
      onImageUpdate(null);
    } catch (err) {
      setError(err.message);
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="profile-modal">
      <Box className="profile-modal-content">
        <Box className="profile-modal-header">
          <Typography variant="h6">Профиль</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon/>
          </IconButton>
        </Box>

        <Divider/>

        <Box className="profile-info">
          <Box className="avatar-container">
            <Avatar
              src={image}
              className="profile-avatar"
              sx={{width: 120, height: 120}}
            >
              {!image && user?.name?.charAt(0)}
            </Avatar>
          </Box>

          <Typography variant="h6" className="user-name">
            {user?.name} {user?.last_name}
          </Typography>

          <Typography variant="body2" className="user-email">
            {user?.email}
          </Typography>
        </Box>

        <Divider/>

        <Box className="profile-actions">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{display: 'none'}}
          />

          <Button
            variant="outlined"
            onClick={() => fileInputRef.current.click()}
            disabled={loading}
            fullWidth
            className="upload-button"
          >
            {loading ? 'Uploading...' : 'Загрузить новое фото'}
          </Button>

          {image && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteImage}
              disabled={loading}
              fullWidth
              className="delete-button"
            >
              {loading ? 'Deleting...' : 'Удалить фото'}
            </Button>
          )}
        </Box>

        {error && (
          <Typography color="error" className="error-message">
            {error}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default UserProfileModal;