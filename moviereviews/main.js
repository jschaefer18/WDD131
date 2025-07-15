import movies from './movies.js';

const reviewsContainer = document.querySelector('#reviews');

// Create tag badges
function tagsTemplate(tags) {
  return tags.map(tag => `<span class="tag">${tag}</span>`).join(" ");
}

// Star rating
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

// Template for each movie card
function movieCardTemplate(movie) {
  return `
    <section class="movie-card">
      <div class="movie-preview">
        <img src="${movie.image}" alt="${movie.title}" class="movie-thumb">
        <div class="movie-info">
          <p class="featured-label">${movie.title}</p>
          ${ratingTemplate(movie.rating)}
          <p class="description">${movie.description} <span class="reviewer">– ${movie.author}</span></p>
        </div>
      </div>
    </section>
  `;
}

// Render movies to the page
function renderMovies(movieList) {
  const html = movieList.map(movie => movieCardTemplate(movie)).join('');
  reviewsContainer.innerHTML = html;
}

// Run on page load
renderMovies(movies);
