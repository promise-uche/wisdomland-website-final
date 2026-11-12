// AUTOMATIC GALLERY: drop any .jpg/.jpeg/.png/.webp file into  src/assets/gallery/
// and it appears on the Home preview and the Student Life gallery after the next build. No code changes needed.
// Optional: name files like "sports__inter-house-race.jpg" -> category "Sports", caption "Inter house race".
const files = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, query: '?url', import: 'default' });

const pretty = (s) => s.replace(/[-_]+/g, ' ').replace(/^\w/, (c) => c.toUpperCase()).trim();

const real = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => {
    const base = path.split('/').pop().replace(/\.[^.]+$/, '');
    const [cat, cap] = base.includes('__') ? base.split('__') : ['', base];
    return { src, category: cat ? pretty(cat) : 'Campus life', caption: pretty(cap), placeholder: false };
  });

const CATS = ['Sports', 'Arts', 'Technology', 'Science', 'Leadership', 'Debate', 'Campus life', 'Sports', 'Arts', 'Technology', 'Science', 'Leadership'];

// Always show at least 9 tiles; empty slots are labelled placeholders.
export const gallery = [...real, ...Array.from({ length: Math.max(0, 9 - real.length) }, (_, i) => ({
  src: null, category: CATS[i + real.length] || 'Campus life', caption: `Gallery photo ${real.length + i + 1}`, placeholder: true,
}))];
