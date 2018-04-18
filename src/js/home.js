import { insertAfter, addLoadEvent } from './global';
import slideshowPath from '../images/slideshow.gif';
import framePath from '../images/frame.gif';
// import moveElement from './move-element';
// console.log(slideshowPath)

export function prepareSlideshow() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('intro')) return false;
  const intro = document.getElementById('intro');
  const slideshow = document.createElement('div');
  slideshow.setAttribute('id', 'slideshow');
  const frame = document.createElement('img');
  frame.setAttribute('src', framePath);
  // A way to access images and their path in JavaScript is like this
  // Here we created wsd_home.template_url in WordPress and are using it here
  // frame.setAttribute('src', `${wsd_global.template_url}/dist/images/${framePath}`); // eslint-disable-line no-undef
  frame.setAttribute('alt', '');
  frame.setAttribute('id', 'frame');
  slideshow.appendChild(frame);
  const preview = document.createElement('img');
  preview.setAttribute('src', slideshowPath);
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
