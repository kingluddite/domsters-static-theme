<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><?php wp_title( '|', true, 'right' ); ?></title>
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div class="wrapper">
<div class="top">
 <header class="hero">
     <img src="<?php bloginfo('template_directory'); ?>/dist/logo.gif" alt="Jay Skript and the Domsters" />
</header>
<div class="cta cta1">
  <p class="price">$1.99</p>
  <p>DOM books</p>
</div>
<div class="cta cta2">
  <p class="price">$3.99</p>
  <p>DOM tutorials</p>
</div>
</div>
<!-- /.top -->
   <?php
   $defaults = array(
     'theme_location'  => 'main-menu',
     'container'       => 'nav',
     'container_id'    => 'navigation',
     'container_class'    => 'flex-nav',
     'echo'            => true,
     'fallback_cb'     => 'wp_page_menu',
     'items_wrap'      => my_nav_wrap(),
     'depth'           => 0,
   );
   wp_nav_menu( $defaults );
  ?>
    <section class="features">
      <div class="features__item">
      <span class="features__icon">🌮</span>
      <h3>DOM</h3>
      <p class="features__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, assumenda.</p>
    </div>
    <div class="features__item">
      <span class="features__icon">🍺</span>
      <h3>Scripting</h3>
      <p class="features__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, assumenda.</p>
    </div>
    <div class="features__item">
      <span class="features__icon">🍷</span>
      <h3>ID</h3>
      <p class="features__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, assumenda.</p>
    </div>
    <div class="features__item">
      <span class="features__icon">🎵</span>
      <h3>Class</h3>
      <p class="features__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, assumenda.</p>
    </div>
  </section>
  <div class="main-content">

