// menu toggle
const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");

function toggleMenu() {
  menu.classList.toggle("show");
}

function viewerTemplate(src, alt) {
  return `
    <img src="${src}" alt="${alt}">
    <button class="close-viewer">X</button>
  `;
}


menuButton.addEventListener("click", toggleMenu);

// resize
function handleResize() {
  if (window.innerWidth > 1000) {
    menu.classList.add("show"); 
  } else {
    menu.classList.remove("show"); 
  }
}

window.addEventListener("resize", handleResize);
window.addEventListener("load", handleResize);

// modal
const gallery = document.querySelector(".gallery");
const modal = document.querySelector("#modal");

if (gallery && modal) {
  gallery.addEventListener("click", (event) => {
    const clickedImg = event.target.closest("img");
    if (!clickedImg) return;

    const alt = clickedImg.alt || "";
    const src = clickedImg.src;
    const base = src.split("-")[0]; // "norris"
    const fullSrc = `${base}-full.jpeg`;

    modal.innerHTML = viewerTemplate(fullSrc, alt);


    modal.showModal();

    modal.querySelector(".close-viewer").addEventListener("click", () => {
      modal.close();
    });
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
}
