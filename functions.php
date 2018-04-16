<?php
/*=============================
=            Widgets           =
=============================*/
function create_widget( $name, $id, $description ) {
    register_sidebar(array(
      'name' => __( $name ),
      'id'   => $id,
      'description' => __( $description ),
      'before_widget' => '<div class="widget">',
      'after_widget' => '</div>',
      'before_title' => '<h2>',
      'after_title' => '</h2>'
    ));
}

// create_widget( 'Front Page Left', 'front-left', 'Displays on the left of the hompage');
// create_widget( 'Front Page Center', 'front-center', 'Displays on the center of the hompage');
// create_widget( 'Front Page Right', 'front-right', 'Displays on the right of the hompage');
// // sidebar
// create_widget( 'Page Sidebar', 'page', 'Displays on side of pages with sidebar');

/*=============================
=            Google Fonts            =
=============================*/
function tutsplus_add_google_fonts() {
  wp_register_style( 'googleFonts', 'http://fonts.googleapis.com/css?family=Open+Sans:400,300' );
  wp_enqueue_style( 'googleFonts' );
}

add_action( 'wp_enqueue_scripts', 'tutsplus_add_google_fonts' );

/*=============================
=            Menus            =
=============================*/
add_theme_support( 'menus' );

function domsters_static_register_menu() {
  register_nav_menu('main-menu', __( 'Main Menu') );
}

add_action('init', 'domsters_static_register_menu');

/*=============================
=            CSS           =
=============================*/
function theme_styles() {
    wp_enqueue_style( 'custom_css', get_template_directory_uri() . '/dist/css/app.css');
}

add_action( 'wp_enqueue_scripts', 'theme_styles' );

/*=============================
=            JavaScript           =
=============================*/
function theme_js() {
  $wsd_theme_path = array( 'template_url' => get_bloginfo('template_url') );
  wp_enqueue_script( 'global_js', get_template_directory_uri() . '/dist/js/app.js', '', '', true );
      // wp_enqueue_script( 'home_js', get_template_directory_uri() . '/src/js/home.js', '', '', true );
  wp_localize_script( 'global_js', 'wsd_global', $wsd_theme_path );
  // wp_enqueue_script( 'global_js', get_template_directory_uri() . '/src/js/global.js', '', '', true );
  //   // page 4 (home) and 14 (photos) need to point to the theme URL because their
  //   // scripts contain paths to images
  //   if ( is_page( '4') || is_page( '14') ) {
      // $wsd_theme_path = array( 'template_url' => get_bloginfo('template_url') );
  //   }
  //   // only use home.js if we are on the home page
    // if ( is_page( '4' ) ) {
      // wp_enqueue_script( 'home_js', get_template_directory_uri() . '/src/js/home.js', '', '', true );
      // wp_localize_script( 'home_js', 'wsd_home', $wsd_theme_path );
    // }
  //   // only use photos.js if we are on the photos page
  //   if ( is_page( '14' ) ) {
  //     wp_enqueue_script( 'photos_js', get_template_directory_uri() . '/src/js/photos.js', '', '', true );
  //     wp_localize_script( 'photos_js', 'wsd_photos', $wsd_theme_path );
  //   }
  //   // only use about.js if we are on the about page
  //   if ( is_page( '7' ) ) {
  //     wp_enqueue_script( 'about_js', get_template_directory_uri() . '/src/js/about.js', '', '', true );
  //   }
  //   // only use live.js if we are on the live page
  //   if ( is_page( '20' ) ) {
  //     wp_enqueue_script( 'live_js', get_template_directory_uri() . '/src/js/live.js', '', '', true );
  //   }

  //   // only use contact.js if we are on the contact page
  //   if ( is_page( '20' ) ) {
  //     wp_enqueue_script( 'contact_js', get_template_directory_uri() . '/src/js/contact.js', '', '', true );
  //   }
}
add_action( 'wp_enqueue_scripts', 'theme_js' );

