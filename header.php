<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><?php wp_title( '|', true, 'right' ); ?></title>
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
 <div id="header">
     <img src="<?php bloginfo('template_directory'); ?>/dist/images/logo.gif" alt="Jay Skript and the Domsters" />
   </div>
   <?php
   $defaults = array(
     'theme_location'  => 'main-menu',
     'container'       => 'nav',
     'container_id'    => 'navigation',
     'echo'            => true,
     'fallback_cb'     => 'wp_page_menu',
     'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
     'depth'           => 0
   );
   wp_nav_menu( $defaults );
  ?>

