const TOKEN_KEY = "access_token";
const EXPIRATION_KEY = "token_expiration";

export const saveToken = (token) => {
  const expiresAt = Date.now() + 60 * 60 * 1000; // Текущий момент + 1 час
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRATION_KEY, expiresAt);
};

// Получаем токен, если он не истек
export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiresAt = localStorage.getItem(EXPIRATION_KEY);

  if (!token || !expiresAt || Date.now() > expiresAt) {
    removeToken();
    return null;
  }

  return token;
};

// Удаляем токен
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRATION_KEY);
};
