// Uploads a product photo.
const UPLOAD_URL = 'http://localhost:7198/upload';

export function uploadImage(file) {
  const form = new FormData();
  form.append('file', file);
  // C5: the upload host is not reachable and the promise is never handled.
  return fetch(UPLOAD_URL, { method: 'POST', body: form });
}
