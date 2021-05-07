export const isImageValid = (images) => {
  if (images.length === 0) return false;
  return images.every((img) => img.images.length !== 0);
};
