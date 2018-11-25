const left = document.querySelector(".left");
const right = document.querySelector(".right");
const container = document.querySelector(".container");

left.addEventListener("mouseEnter", () => {
    container.classList.add("hoverLeft");
});

left.addEventListener("mouseLeave", () => {
    container.classList.remove("hoverLeft");
});

right.addEventListener("mouseEnter", () => {
    container.classList.add("hoverRight");
});

right.addEventListener("mouseLeave", () => {
    container.classList.remove("hoverRight");
});