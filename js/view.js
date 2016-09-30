/**
 * View file for displaying content
 */


/**
 * Main view object
 *
 */
var view = {};


/**
 * Calls initial View methods
 *
 */
view.init = function() {

  view.createMainMenu();

}


/**
 * Gets blog posts and appends them to the page
 *
 */
view.loadBlogPosts = function() {

  var posts = model.getPosts(),
      postsMarkup = document.createDocumentFragment(),
      titleEl = helpers.getPageTitleEl(),
      contentEl = helpers.getPageContentEl();


  for ( var i = 0, max = posts.length; i < max; i++ ) {
    postsMarkup.appendChild( view.createPostMarkup( posts[i] ) );
  }

  contentEl.appendChild( postsMarkup );
  titleEl.innerHTML = 'Blog Posts';

};


/**
 * Displays a single post or page based on URL
 *
 */
 view.loadSingleContent = function( slug ) {

   var contentObj = model.getContent( slug ),
       titleEl = helpers.getPageTitleEl(),
       contentEl = helpers.getPageContentEl();


   titleEl.innerHTML = contentObj.title;
   contentEl.innerHTML = contentObj.content;

 };
 

/**
* Updates the main title and content for a page or post
*
*/
view.updateTitleAndContent = function( contentObj ) {

  view.updateTitle( contentObj.title );
  view.updateContent( contentObj.content );

};

/**
* Updates the main title for a page or post
* @param {String} title The title for a post or page
*/
view.updateTitle = function( title ) {

  var titleEl = helpers.getPageTitleEl();

  titleEl.innerHTML = title;

};


/**
* Updates the main content for a page or post
* @param {String} content The content for a post or page
*/
view.updateContent = function( content ) {

  var contentEl = helpers.getPageContentEl();

  contentEl.innerHTML = content;

};


/**
 * Clears the page title and content from the page
 *
 */
view.clearContent = function() {
  var titleEl = helpers.getPageTitleEl(),
      contentEl = helpers.getPageContentEl();

  titleEl.innerHTML = '';
  contentEl.innerHTML = '';
};


/**
 * Creates Main Menu Links for Pages
 *
 */
 view.createMainMenu = function() {

   var pages = model.getPages(),
       menuMarkup = document.createDocumentFragment(),
       mainMenuEl = helpers.getMainMenuEl();

   for ( var i = 0, max = pages.length; i < max; i++ ) {
     // Create menu markup
     menuMarkup.appendChild( helpers.createMenuItem( pages[i] ) );
   }

   mainMenuEl.appendChild( menuMarkup );

 };


/**
 * Creates Markup for Blog Posts
 *
 * @param {Object} post Post to create markup for
 * @return {Object} articleEl Final post markup
 */
view.createPostMarkup = function( post ) {

  var articleEl = document.createElement( 'article' ),
      titleEl = document.createElement( 'h3' ),
      titleLink = helpers.createLink( post ),
      contentEl = document.createElement( 'div' );

  titleEl.appendChild( titleLink );
  contentEl.appendChild( document.createTextNode( post.content ) );

  articleEl.appendChild( titleEl );
  articleEl.appendChild( contentEl );

  return articleEl;

};
