// Utility file for unsplash image handling
// In production, this would use the actual unsplash_tool
export const unsplash_tool = {
  getImageUrl: (query: string) => {
    return `https://source.unsplash.com/400x300/?${query.replace(/ /g, ',')}`;
  }
};
