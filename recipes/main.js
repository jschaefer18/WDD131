import { recipes } from "./recipes.mjs";

const recipesContainer = document.querySelector("#recipes");

// Generate a random number from 0 to num - 1
function random(num) {
  return Math.floor(Math.random() * num);
}

// Get a random recipe from a list
function getRandomListEntry(list) {
  const index = random(list.length);
  return list[index];
}

// Generate star rating HTML
function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 1; i <= 5; i++) {
    html += i <= rating
      ? `<span aria-hidden="true" class="icon-star">⭐</span>`
      : `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
  }
  html += `</span>`;
  return html;
}

// Generate tag list HTML
function tagsTemplate(tags) {
  return tags.map(tag => `<span class="tag">${tag}</span>`).join(" ");
}

// Recipe card HTML
function recipeTemplate(recipe) {
  return `
  <section class="recipe-card">
    <img src="${recipe.image}" alt="${recipe.name}" />
    <div class="info">
      <div class="tags">${tagsTemplate(recipe.tags)}</div>
      <h2><a href="#">${recipe.name}</a></h2>
      ${ratingTemplate(recipe.rating)}
      <p class="description">${recipe.description}</p>
    </div>
  </section>`;
}

// Render a list of recipes
function renderRecipes(recipeList) {
  recipesContainer.innerHTML = recipeList.map(recipe => recipeTemplate(recipe)).join("");
}


function init() {
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);
}


function filterRecipes(query) {
  const filtered = recipes.filter(recipe => {
    const nameMatch = recipe.name.toLowerCase().includes(query);
    const descriptionMatch = recipe.description.toLowerCase().includes(query);
    const tagMatch = recipe.tags.find(tag => tag.toLowerCase().includes(query));
    const ingredientMatch = recipe.recipeIngredient.find(ing => ing.toLowerCase().includes(query));
    return nameMatch || descriptionMatch || tagMatch || ingredientMatch;
  });

  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(e) {
  e.preventDefault();
  const input = document.querySelector("#search").value.trim().toLowerCase();
  const results = filterRecipes(input);
  renderRecipes(results);
}

// Attach search listener
document.querySelector(".search-bar").addEventListener("submit", searchHandler);

// Init on load
init();
