<?php get_header(); ?>
     <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
               <!-- tbs class for headers -->
                 <h1><?php the_title(); ?></h1>
                 <?php the_date(); ?>
               <!-- WP function that outputs post content -->
               <?php the_content(); ?>

             <?php endwhile; else: ?>
                <!-- we run this else if there is no content -->
                 <h1>Wups!</h1>

               <p>Looks like we have no content for this page?</p>

             <?php endif; ?>
   </div>
<?php get_footer(); ?>
