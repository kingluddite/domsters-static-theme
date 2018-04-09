import { insertAfter, addLoadEvent } from './global';
// import slideshowPath from '../images/slideshow.gif';
// import framePath from '../images/frame.gif';

// console.log(slideshowPath)

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

export function prepareSlideshow() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('intro')) return false;
  const intro = document.getElementById('intro');
  const slideshow = document.createElement('div');
  slideshow.setAttribute('id', 'slideshow');
  const frame = document.createElement('img');
  frame.setAttribute('src', '../src/images/frame.gif');
  // Here we created wsd_home.template_url in WordPress and are using it here
  // frame.setAttribute('src', `${wsd_global.template_url}/dist/images/${framePath}`); // eslint-disable-line no-undef
  frame.setAttribute('alt', '');
  frame.setAttribute('id', 'frame');
  slideshow.appendChild(frame);
  const preview = document.createElement('img');
  slideshow.setAttribute('src', '../src/images/slideshow.gif');
  // preview.setAttribute('src', `${wsd_global.template_url}/dist/images/${slideshowPath}`); // eslint-disable-line no-undef
  // preview.setAttribute('src', '../images/slideshow.gif');
  // preview.setAttribute('src', slideshowPath);
  preview.setAttribute('alt', 'a glimpse of what awaits you');
  preview.setAttribute('id', 'preview');
  slideshow.appendChild(preview);
  insertAfter(slideshow, intro);
  const links = document.getElementsByTagName('a');

  for (let i = 0; i < links.length; i += 1) {
    links[i].onmouseover = function() {
      const destination = this.getAttribute('href');
      if (destination.indexOf('/') !== -1) {
        // console.log(moveElement());
        // moveElement('preview', 0, 0, 5);
      }
      if (destination.indexOf('about') !== -1) {
        // if (moveElement()) {
        // moveElement('preview', -150, 0, 5);
        // } else {
        //   console.log(this);
        // }
      }
      if (destination.indexOf('photos') !== -1) {
        // moveElement('preview', -300, 0, 5);
      }
      if (destination.indexOf('live') !== -1) {
        // moveElement('preview', -450, 0, 5);
      }
      if (destination.indexOf('contact') !== -1) {
        // moveElement('preview', -600, 0, 5);
      }
    };
  }
}

addLoadEvent(prepareSlideshow);
