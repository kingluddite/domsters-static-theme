export function addLoadEvent(func) {
  // console.log('yo');
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
export function insertAfter(newElement, targetElement) {
  const parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

// export function insertAfter(newNode, referenceNode) {
//   referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
// }

// export function insertAfter(newElement, targetElement) {
//   const parent = targetElement.parentNode;
//   if (parent.lastChild === targetElement) {
//     parent.appendChild(newElement);
//   } else {
//     parent.insertBefore(newElement, targetElement.nextSibling);
//   }
// }

// export function addClass(element, value) {
//   if (!element.className) {
//     element.className = value;
//   } else {
//     let newClassName = element.className;
//     newClassName += ' ';
//     newClassName += value;
//     element.className = newClassName;
//   }
// }

function urlHasVars() {
  if (window.location.pathname == '/') {
    // This is the home page
    return true;
  }
  return false;
}

function highlightPage() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('navigation')) return false;
  const nav = document.getElementById('navigation');
  const links = nav.getElementsByTagName('a');
  const currenturl = window.location.href;
  const isHomePage = urlHasVars();
  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove('here');
    const linkurl = links[i].getAttribute('href');
    if (currenturl.indexOf(linkurl) != -1 && isHomePage) {
      links[i].className = 'here';
      const linktext = links[i].lastChild.nodeValue.toLowerCase();
      document.body.setAttribute('id', linktext);
    } else if (currenturl.indexOf(linkurl) != -1 && isHomePage === false) {
      links[i].className = 'here';
      if (links[0].classList.contains('here')) {
        links[0].classList.remove('here');
      }
      const linktext = links[i].lastChild.nodeValue.toLowerCase();
      document.body.setAttribute('id', linktext);
    } else {
    }
  }
}

addLoadEvent(highlightPage);
