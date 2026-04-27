const board = document.getElementById("board");
let active = false;
let line;

board.addEventListener("mousedown", e => {
  active = true;
  line = document.createElementNS("http://www.w3.org/2000/svg", "path");
  line.setAttribute("stroke", "red");
  line.setAttribute("fill", "none");
  line.setAttribute("stroke-width", "2");
  line.setAttribute("d", `M ${e.offsetX} ${e.offsetY}`);
  board.appendChild(line);
});

board.addEventListener("mousemove", e => {
  if (!active) return;
  let path = line.getAttribute("d");
  line.setAttribute("d", path + ` L ${e.offsetX} ${e.offsetY}`);
});

board.addEventListener("mouseup", () => active = false);
