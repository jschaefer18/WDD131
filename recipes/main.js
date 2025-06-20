import { recipes } from "./recipes.mjs";

const recipesContainer = document.querySelector("#recipes");

const recipe = recipes[7];

const card = document.createElement("section");
card.classList.add("recipe-card");

card.innerHTML = `
  <img src="${recipe.image}" alt="${recipe.name}" />
  <div class="info">
    <div class="tags">
      ${recipe.tags.map(tag => `<span>${tag}</span>`).join(" ")}
    </div>
    <h2>${recipe.name}</h2>
    <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
      ${"⭐".repeat(recipe.rating)}${"☆".repeat(5 - recipe.rating)}
    </span>
    <p class="description">${recipe.description}</p>
  </div>
`;

recipesContainer.appendChild(card);
