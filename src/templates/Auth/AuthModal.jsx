import React, {useState} from 'react';
import {Avatar, Box, Button, CircularProgress, Link, Modal, TextField, Typography} from '@mui/material';
import './AuthModal.css';
import {authAPI} from "../../services/authApi.js";

const AuthModal = ({open, onClose, onAuthSuccess}) => {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [formData, setFormData] = useState({email: '', password: ''});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = mode === 'signin'
        ? await authAPI.login(formData.email, formData.password)
        : await authAPI.register(formData.email, formData.password);

      onAuthSuccess(data.access_token);
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleClose = () => {
    setFormData({email: '', password: ''});
    setError('');
    onClose();
  };

  const switchMode = () => {
    setMode(prev => prev === 'signin' ? 'signup' : 'signin');
    setError('');
  };

  return (
    <Modal open={open} onClose={handleClose} className="auth-modal">
      <Box className="auth-modal-content">
        <Typography variant="h6" className="auth-modal-title">
          <Avatar
            src="src/assets/random_logo.png"
            className="sign-avatar"
          />
          {mode === 'signin' ? 'Авторизация' : 'Регистрация'}
        </Typography>

        {error && <Typography className="auth-error">{error}</Typography>}

        <form onSubmit={handleSubmit} className="auth-form">
          <TextField
            fullWidth
            label="Логин"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            type="email"
            disabled={loading}
            className="auth-input"
          />
          <TextField
            fullWidth
            label="Пароль"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            disabled={loading}
            className="auth-input"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            className="auth-submit"
          >
            {loading ? <CircularProgress size={24}/> : mode === 'signin' ? 'Авторизация' : 'Регистрация'}
          </Button>
        </form>

        {mode === 'signin' && (
          <Link className="forgot-password">Забыли пароль?</Link>
        )}

        <Typography className="auth-switch-mode">
          {mode === 'signin' ? "Еще не имеете аккаунта?" : "Уже есть аккаунт?"}
          <Link onClick={switchMode} className="auth-mode-link">
            {mode === 'signin' ? 'Регистрация' : 'Авторизация'}
          </Link>
        </Typography>
      </Box>
    </Modal>
  );
};

export default AuthModal;