export const moveElement = (elementID, finalX, finalY, interval) => {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  const elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = '0';
  }
  if (!elem.style.top) {
    elem.style.top = '0';
  }
  let xPos = parseInt(elem.style.left);
  let yPos = parseInt(elem.style.top);
  let dist = null;
  if (xPos === finalX && yPos === finalY) {
    return true;
  }
  if (xPos < finalX) {
    dist = Math.ceil((finalX - xPos) / 10);
    xPos += dist;
  }
  if (xPos > finalX) {
    dist = Math.ceil((xPos - finalX) / 10);
    xPos -= dist;
  }
  if (yPos < finalY) {
    dist = Math.ceil((finalY - yPos) / 10);
    yPos += dist;
  }
  if (yPos > finalY) {
    dist = Math.ceil((yPos - finalY) / 10);
    yPos -= dist;
  }
  elem.style.left = `${xPos}px`;
  elem.style.top = `${yPos}px`;
  const repeat = `moveElement('${elementID}',${finalX},${finalY},${interval})`;
  elem.movement = setTimeout(repeat, interval);
};
