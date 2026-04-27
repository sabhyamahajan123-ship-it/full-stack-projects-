function updateCount() {
  const textArea = document.getElementById("textBox");
  const counter = document.getElementById("count");

  let total = textArea.value.length;

  if (total <= 150) {
    counter.textContent = total;
  } else {
    textArea.value = textArea.value.substring(0,150);
    counter.textContent = 150;
  }
}
