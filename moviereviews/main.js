import { movies } from './movies.js';

function ratingTemplate(rating) {
  let html = `<div class="stars" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 1; i <= 5; i++) {
    html += i <= Math.floor(rating)
      ? `<span aria-hidden="true">⭐</span>`
      : `<span aria-hidden="true">☆</span>`;
  }
  html += `</div>`;
  return html;
}

function tagsTemplate(tags) {
  return `<div class="tags">` + tags.map(tag => `<span class="tag">${tag}</span>`).join(' ') + `</div>`;
}

function movieCardTemplate(movie) {
  return `
    <section class="movie-card">
      <div class="movie-preview">
        <img src="${movie.image}" alt="${movie.title} Poster" class="movie-thumb">
        <div class="movie-info">
          ${tagsTemplate(movie.tags)}
          <p class="featured-label">${movie.title}</p>
          ${ratingTemplate(movie.rating)}
          <p class="review-text">“${movie.description}” <span class="reviewer">– ${movie.author}</span></p>
        </div>
      </div>
    </section>
  `;
}

function renderMovies(movieList) {
  const container = document.getElementById('reviews');
  if (!container) return;
  container.innerHTML = movieList.map(movieCardTemplate).join('');
}

function getAllTags() {
  const tagSet = new Set();
  movies.forEach(movie => movie.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

function renderTagFilters() {
  const tagOptions = document.getElementById('tag-options');
  if (!tagOptions) return;

  const tags = getAllTags();
  tagOptions.innerHTML = tags.map(tag =>
    `<label><input type="checkbox" value="${tag}" class="tag-checkbox"> ${tag}</label>`
  ).join('<br>');
}

function getSelectedTags() {
  return Array.from(document.querySelectorAll('.tag-checkbox:checked')).map(cb => cb.value);
}

function filterMoviesByTags(movieList) {
  const selected = getSelectedTags();
  if (selected.length === 0) return movieList;
  return movieList.filter(m => m.tags.some(t => selected.includes(t)));
}

function sortMovies(type) {
  let sorted = [...movies];
  if (type === 'rating-high') sorted.sort((a, b) => b.rating - a.rating);
  if (type === 'rating-low') sorted.sort((a, b) => a.rating - b.rating);
  const filtered = filterMoviesByTags(sorted);
  renderMovies(filtered);
}

function renderFeaturedMovie() {
  const featuredContainer = document.getElementById('featured-movie');
  if (!featuredContainer) return;
  const dune = movies.find(m => m.title === "Dune Part II");
  if (dune) {
    featuredContainer.innerHTML = movieCardTemplate(dune);
  }
}

function init() {
  renderFeaturedMovie();
  renderTagFilters();
  renderMovies(movies);

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => sortMovies(sortSelect.value));
  }

  const tagBox = document.getElementById('tag-options');
  if (tagBox) {
    tagBox.addEventListener('change', () => sortMovies(sortSelect?.value ?? ''));
  }

  const clearBtn = document.getElementById('clear-tags');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      document.querySelectorAll('.tag-checkbox').forEach(cb => cb.checked = false);
      sortMovies(sortSelect?.value ?? '');
    });
  }
}

init();
