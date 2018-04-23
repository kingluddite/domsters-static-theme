import { addLoadEvent, insertAfter } from './global';
import placeholderImg from '../images/placeholder.gif';
import './../images/crowd.jpg';
import './../images/bassist.jpg';
import './../images/concert.jpg';
import './../images/guitarist.jpg';

const themePath = dom_theme_path.template_url; // eslint-disable-line no-undef

export function showPic(whichpic) {
  let text;
  if (!document.getElementById('placeholder')) return true;
  const source = whichpic.getAttribute('href');
  const sourceFile = source.substr(source.lastIndexOf('/') + 1);
  const placeholder = document.getElementById('placeholder');
  placeholder.setAttribute('src', `${themePath}/dist/${sourceFile}`);
  if (!document.getElementById('description')) return false;
  if (whichpic.getAttribute('title')) {
    text = whichpic.getAttribute('title');
  } else {
    text = '';
  }
  const description = document.getElementById('description');
  if (description.firstChild.nodeType === 3) {
    description.firstChild.nodeValue = text;
  }
  return false;
}

export function preparePlaceholder() {
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('imageGallery')) return false;
  const placeholder = document.createElement('img');
  placeholder.setAttribute('id', 'placeholder');
  // Here we created wsd_home.template_url in WordPress and are using it here
  // placeholder.setAttribute('src', wsd_photos.template_url + '/images/placeholder.gif'); // eslint-disable-line no-undef
  // placeholder.setAttribute('src', `${dom_photos.template_url}/images`);
  placeholder.setAttribute('src', placeholderImg);
  placeholder.setAttribute('alt', 'my image gallery');
  const description = document.createElement('p');
  description.setAttribute('id', 'description');
  const desctext = document.createTextNode('Choose an image');
  description.appendChild(desctext);
  const gallery = document.getElementById('imageGallery');
  insertAfter(description, gallery);
  insertAfter(placeholder, description);
}

export function prepareGallery() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('imageGallery')) return false;
  const gallery = document.getElementById('imageGallery');
  const links = gallery.getElementsByTagName('a');
  for (let i = 0; i < links.length; i += 1) {
    links[i].onclick = function() {
      return showPic(this);
    };
  }
}
//
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
