# WordPress With Webpack and BrowserSync

## Purpose of this site
* Just wanted to create simple step-by-step instructions to get started with a bare-bones WordPress theme and use modern development tools to improve workflows
* For this example I am using an old DOM book by Jeremy Keith. It is a book that I used to learn about the DOM and Jeremy did a great job at helping me understand how the DOM worked and how I could manipulate it
* He build a [website to accompany the book](https://domscripting.com/domsters/index.html) and by the time you were finished reading you would have build the site and understand the JavaScript/DOM used to make it. A great book and a great teaching methodology
* The book is a bit outdated (looks like the Copyright of the site is 2005) but here's a [link for more info](https://domscripting.com/)

## Goal
* Turn the [domsters simple website](https://domscripting.com/domsters/index.html) into a WordPress theme
* Here is a [Github repo I made](https://github.com/kingluddite/domsters-static) that contains the site

## Notes of Mention
* The best modern way of getting [Webpack](https://webpack.js.org/) and everything modern to workwith a WordPress theme is [Sage](https://github.com/roots/sage)
    - I started with this site but got lost in translation and couldn't figure out how it worked
    - I built this site to take a simpler approach and would that I could digest more easily. But for advanced users, **Sage** is a better option for you
* The WordPress theme I create is a super simple theme. The goal is to get you to understand the basics of how a theme works but after you do understand how they work, you will be better served to use a starter boilerplate theme like [Underscores](http://underscores.me/)
* If you are serious about WordPress you probably want to use [VVV](https://github.com/Varying-Vagrant-Vagrants/VVV) with [WordMove](https://github.com/welaika/wordmove) or [Trellis/Bedrock/Sage](https://roots.io/)
* For Database migrations the best tools I've found are [WordMove](https://github.com/welaika/wordmove) or [Desktop Server](https://serverpress.com/)
* For build tools there is also [Grunt](https://gruntjs.com/) and [Gulp](https://gulpjs.com/). In my personal option, Gulp was the most easy to understand but Webpack seems to be the most power and where I believe the industry is headed so that is why I am using it here
* Webpack has a [DevServer](https://webpack.js.org/configuration/dev-server/) with Hot Module Replacement which gives you the advantage of almost instantaneous code change updates. So if you change the background color to red, the color will change instantly once you hit save. It makes for quicker and more enjoyable theme development
* BrowserSync is great for showing your theme in other devices so you can easily make them responsive
* Getting BrowserSync and Webpack to play nice together in WordPress is not easy and I have looked online for solutions but have yet to find the perfect one. This repo is a work in progress and I'm hoping I'll get PR with ways to get BrowserSync and Webpack to play nice together. I'm open to suggestions and really just flying by the seat of my pants here

## Time to get started
### My Dotfiles
* [link to my dotfiles](https://github.com/kingluddite/dotfiles)
* You have a computer for 5 years and in that time you got your machine to the state you love and are comfortable with
* But then your computer crashes and all is gone. Sure you have a backup but how can you quickly get the new computer you buy to be exactly like you had the old one?
* There are multiple answers to that question but one I recommend is `dotfiles`

#### What are dotfiles?
* You buy a new Mac and want to make it look like your old machine. Normally, that could take up to 3 hours (or more)
* Imagine you could do this in less than 5 minutes. That's what dotfiles can do for you

#### What are in my dotfiles?
* [link to my dotfiles](https://github.com/kingluddite/dotfiles)
* I use [homebrew](https://brew.sh/), [iTerm2](https://www.iterm2.com/), [hub](https://github.com/github/hub), [spectacle](https://www.spectacleapp.com/), [zsh/oh-my-zsh](http://ohmyz.sh/), [Composer](https://getcomposer.org/) I need to point my zshrc to my MAMP settings, VIM, [Sublime Text](https://www.sublimetext.com/) (soon might add [VS Code](https://code.visualstudio.com/) as it's currently the best text-editor besides the real best... [Vim](https://www.vim.org/))
* I set up a nice looking theme to make my terminal look awesome
* I set up a bunch of plugins and aliases to make working with things like Git, so much easier
* My dotfiles set all that up if you follow the **step-by-step instructions**

## MAMP
* [Link to MAMP](https://www.mamp.info/en/)
* We are working with PHP so we need a server. I use a Mac so MAMP is a good way to get PHP, MySQL Apache and phpMyAdmin (GUI interface for MySQL) [set up quickly in your machine](https://www.youtube.com/watch?v=I6sTPp779mA)

### Create WordPress project folder
`$ mkdir ~/Sites/local.domsters.com`

* Yes we can have multiple `.` characters in our folder name

### WP-CLI to make creating our site easier
* Using the browser to create WordPress sites take too long
* [WP-CLI](https://wp-cli.org/) is way easier

#### Navigate to project folder
* `$ cd ~/Sites/local.domsters.com`

#### Download latest copy of WordPress
* `$ wp core download`

#### Create an empty Database
* Use phpMyAdmin and name it `domsters_wp`
    - Obviously in a production environment you'd want to name the DB more securely
* [video tutorial](https://github.com/kingluddite/dotfiles)
* **note** He shows you how to create a user with full privileges which you can most certainly do just remember to remember by writing down info in a safe place
* MAMP has a default `root` user with `root` password that we'll use in this example but at the end of the day, whenever you have a database you need to remember important info for each environment:
    - database name
    - database user
    - database pwd
    - database server (usually `localhost`)

#### Create your `wp-config.php`
* This will be the place that store the info you need to connect to the database inside `wp-config.php`
    - database name
    - database user
    - database pwd
    - database server (usually `localhost`)

```
$ wp core config --dbuser=root --dbpass=root --dbname=domsters_wp
```

* Check and see that you now have a `wp-config.php` file
* Open it and see that is has store (not encrypted which means you need to make sure this file doesn't get in the wrong hands) your database connection info inside it

### Add debugger
* Working locally you need to know when errors occur
* Add this line into `wp-config.php`

`~/Sites/local.domsters.com/wp-config.php`

```php
// MORE CODE
$table_prefix = 'wp_';


// Set to false when in Production
define( 'WP_DEBUG', true );

/* That's all, stop editing! Happy blogging. */
// MORE CODE
```

* Now you won't get the `White Screen of Death` and you will get errors and line numbers to quickly track them down and fix them

### Create the DB, super user so that you can log into the WordPress dashboard using `http://local.domsters.com/wp-admin` 

```
$ wp core install --url=http://local.domsters.com --title=Domsters --admin_user=root --admin_password=password --admin_email=myemail@gmail.com
```

### Now you can log into WordPress
* And type `admin` and `password` and you'll have full access to the WordPress Dashboard
* But until we create our host, this will not work

### Let's create our Host
* **note** For this host I will assume you want to set up `local.domsters.com`
    - Just follow the same directions and substitute your local domain for my local domain
* **note** I am assuming that you altered the default MAMP config and moved the server root to `~/Sites`
* **note** I am also assuming you are not using the MAMP default port of `:8888` and using the standard port of `:8080` (_this saves you from having to add the port in the URL_)
* I recommend not using `localhost` and instead trick your computer into thinking it is a domain like `local.domsters.com`
    - I like this because it makes life easier if you use a password vault like [LastPass](https://lastpass.com)
    - Also it lets you quickly see if you are working the local or in production environment
* This means instead of visiting `http://localhost/domsters` you will visit `http://local.domsters.com`

### Can you ping http://local.domsters.com?
* **note** The following assumes you are using a site named `local.domsters.com`
    - Obviously change the host name to what your host name will be
* We are going to tell our computer to fake it is a website
* This means when you visit a website it won't go to that website on the Internet but just fake visit that site on your local computer
* We will ping the site and see that our computer doesn't know about that host:

`$ ping local.domsters.com` 

### Virtual Hosts on MAMP
* Tell your apache server on MAMP to start using virtual hosts
* Let our computer know about our fake host
* Open this file

`$ code /Applications/MAMP/conf/apache/httpd.conf`

* Once opened you’ll probably find these lines:

```
# MORE CODE HERE
# Virtual hosts
#Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf
# MORE CODE HERE
```

* So simply **uncomment** the Include (remove the `#`) like this:

```
# Virtual hosts
Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf
```

### Adding a virtual host in MAMP for Mac
* We made our Server root `~/Sites`
* We created our site inside `/Sites/local.domsters.com`
* Open this file:

`$ code /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf`

* Make it look like below 

```
NameVirtualHost *:80

<VirtualHost *:80>
    DocumentRoot "/Users/USERNAMEHERE/Sites/local.domsters.com/"
    ServerName local.domsters.com
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot "/Users/USERNAMEHERE/Sites/"
    ServerName localhost
</VirtualHost>
```

* Our `DocumentRoot` is the name of our folder inside `Sites`
* Our `ServerName` is the fake website we are creating
* The last Virtual host will point to the Sites folder (that is where we told MAMP our server root is located)
    - Browsing to localhost will show you all sites inside the Sites folder

### host file
* Open your host file by pasting the following in your terminal:

`$ sudo code /etc/hosts`

* Enter your computer password

## Adding VirtualHost reading material
*[docs](http://eppz.eu/blog/virtual-host-for-mamp-on-osx/)
* [docs](https://stackoverflow.com/questions/35251032/how-to-create-virtual-hosts-in-mamp)

### You will see something like below**
*   Just make one up, it will only be locally known to your computer
*   Be sure to match the IP address with the one before “localhost”
*   Saving this file will prompt you for your password
*   Add `local.domsters.com` like below:

```
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting. Do not change this entry.
##
127.0.0.1 localhost
127.0.0.1 local.domsters.com
255.255.255.255 broadcasthost
::1 localhost
```

* For Every domain name you added inside your host file you will need to add a `<VirtualHost>` block
* This block contains your project location and a **ServerName**
* Set the **ServerName** exactly the same as the domain you added inside your host file and point the **DocumentRoot** to the root of your project

### Restart MySql and Apache (Use MAMP console)
* (for non-WordPress sites) Be sure have a project or `index.html` file inside your project folder
* By browsing to the domain that you configured your project will show

## Ping again
* This time you should see something like this:

![ping recognized](https://i.imgur.com/yiPeOXT.png)

* If you do see this or something similar it means the server/host is recognized and browsing to `http://local.domsters.com` will show you your WordPress site (assuming you set it up properly)

`$ ping local.domsters.com`

### Now log into WordPress Dashboard
* Visit `http://local.domsters.com/wp-admin`
* Log in with user: `admin` an pwd: `password`
* You'll see the WordPress Dashboard

## Make sure to refresh Permalinks
* Use Dashboard to get to Permalinks and make sure the `post` radio button is selected and click the `save` button
    - Will update the .htaccess file
    - Make sure you links are SEO friendly

### Congrats - WordPress is now installed

## Backup WordPress
* As you create your theme you may want to backup your changes
* I suggest creating a git repo inside your theme
* Use `.gitignore` to make sure you don't add stuff to the repo that you don't need in version control
* You need to backup your database
    - Use wp-cli to do this

```
$ wp db export
```

* That will generate a `.sql` file that is your database

## Then backup all files and zip
* All the images you upload will be stored inside `/wp-content/uploads`
* You should use Composer to store your plugins
* Inside wp-content create a `temp` folder and move the `.sql` file inside the `temp` folder and also place a copy of `uploads` inside `temp` as well
* Now you will gzip them both with:

`$ tar -vczf domsters.gz .`

* Now you have your theme backed up on github, your plugins backed up with composer and your database and all images uploaded inside the `.gz` file
* I would not store the `wp-config.php` inside the free version of Github as you don't want people to access our database (but if it is just a local site, you really don't need to worry about security)

## To restore your site
* Pull down your theme repo inside the `wp-content/themes` folder
* Extract `domsters.gz` and replace the existing `wp-content/uploads` with what the `uploads` inside the `.gz` file
* Use **wp-cli** to create the core download of WordPress as well as generate the `wp-config.php` file (see instructions listed above)
* Import the `.sql` file inside phpMyAdmin
    - You will need to create the `domsters_wp` database first and then import the `.sql` file
* Now your site should be restored
* **note** If you are dealing with serialized data you will need to use a more powerful migration solution like `WordMove` or `Desktop Server`

## Download my theme `domsters-static-theme`
* **note** Might be a good idea to create an alias to your theme folder as you'll be accessing it often
* Make sure you are inside `wp-content/themes/`

`$ git clone https://github.com/kingluddite/domsters-static-theme`

## Install dependencies
* First change into the cloned theme

`$ cd domsters-static-theme`

`$ yarn install`

* You can use `yarn` or `npm`
    - npm comes with Node (installed with dotfiles)
    - yarn can be installed with homebrew (both installed with dotfiles)

## What this theme offers
* Very basic WordPress theme
* Will add Browser prefixes automatically
* Is ready for you to start using Sass
* Babel to transpile your modern JavaScript into browser friendly JavaScript
* ESlint to check your javascript errors
* Will minify and concatenate your JavaScript and Sass files
* Uses fontawesome 5
* Uses flexbox CSS (example)
* Uses Grids CSS (example)
* Optimizes images
* Normalize.css
* Prettier to make sure your JavaScript is formatted nicely
* Has browsersync working for fast development
* `JS` and `SCSS` **sourcemaps** so you can easily find where the `js` or `scss` is in your code to update it

## Start MySQL and Apache
* Use the MAMP console to start MySQL and Apache
    - They should both have green lights
    - You will need to enter your password

## Start your theme app
`$ yarn run production`

* Now you can edit your CSS, JavaScript and PHP and it will update without a page refresh
* There is one annoying issue and that is [FOUC](https://github.com/erikras/react-redux-universal-hot-example/issues/153)
    - It does get on my nerves but this will improve was I can figure out how to get browser sync and webpack to play nice together. (stay tuned for updates!)

## Deployment
* Just make sure you **ftp** the **theme** folder, the **uploads** folder and migrate the database to your production server
* Your *password* for accessing the WordPress Dashboard should be secure safe as well as the `username` and `password` for the WordPress database
    - You can also SSH it, use Desktop Server or WordMove
* Make sure your `wp-config.php` is configured with your production connection info for MySQL
* No debugger needed for production

## The future
* The site needs a better design
* The HTML should be improved
* BEM should be used in the style naming convention
