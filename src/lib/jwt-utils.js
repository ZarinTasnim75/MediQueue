export function setAuthToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_jwt_token', token);
    document.cookie = `auth_token=${token}; path=/; max-age=604800; SameSite=Lax`;
  }
}

export function getAuthToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_jwt_token');
  }
  return null;
}
export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_jwt_token');
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 2025 00:00:01 GMT';
  }
}