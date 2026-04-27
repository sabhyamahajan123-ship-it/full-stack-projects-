function showItems(type) {
  const products = document.querySelectorAll(".item");

  products.forEach(p => {
    if (type === "all" || p.classList.contains(type)) {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
}
