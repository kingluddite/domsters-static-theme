// 3rd party libs
// fontawesome 5
// base package
import fontawesome from '@fortawesome/fontawesome';
// Facebook and Twitter icons
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebook';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';
import faInstagram from '@fortawesome/fontawesome-free-brands/faInstagram';
// import faBars from '@fortawesome/fontawesome-free-solid';
import bar from '@fortawesome/fontawesome-free-solid/faBars';
import faWindowClose from '@fortawesome/fontawesome-free-solid/faWindowClose';
// import _ from 'lodash';
// import Fake from 'faker';
// custom sass
import '../scss/app.scss';
// images
import '../images/logo.gif';

// javascript
import '../js/global';
import '../js/home';
import '../js/about';
import '../js/photos';
import '../js/live';
import '../js/contact';

// add the imported icons to the library
fontawesome.library.add(faFacebook, faTwitter, faGithub, faInstagram, bar, faWindowClose);
