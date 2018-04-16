export function addLoadEvent(func) {
  const oldonload = window.onload;
  if (typeof window.onload !== 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    };
  }
}

console.log('aaa');

export function insertAfter(newElement, targetElement) {
  const parent = targetElement.parentNode;
  if (parent.lastChild === targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

export function addClass(element, value) {
  if (!element.className) {
    element.className = value;
  } else {
    let newClassName = element.className;
    newClassName += ' ';
    newClassName += value;
    element.className = newClassName;
  }
}

export function highlightPage() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('navigation')) return false;
  const nav = document.getElementById('navigation');
  const links = nav.getElementsByTagName('a');
  for (let i = 0; i < links.length; i += 1) {
    const linkurl = links[i].getAttribute('href');
    const currenturl = window.location.href;
    if (currenturl.indexOf(linkurl) !== -1) {
      const linktext = links[i].lastChild.nodeValue.toLowerCase();
      document.body.setAttribute('id', linktext);
    }
  }
}

addLoadEvent(highlightPage);
