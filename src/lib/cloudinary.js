const CLOUD_NAME = 'jdobykmp';
const UPLOAD_PRESET = 'ml_default';

export async function uploadToCloudinary(file) {
  if (!file) throw new Error('No file provided for upload');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to upload image to Cloudinary');
  }

  const data = await response.json();
  return {
    url: data.secure_url,
    public_id: data.public_id,
    format: data.format,
    bytes: data.bytes,
    width: data.width,
    height: data.height
  };
}
