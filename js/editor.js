/**
 * Code for the Editor
 */


/**
 * The main Editor object
 *
 */
var editor = {};

editor.currentContent = '';
editor.unSavedContent = false;

/**
 * Initializes the VanillaPress app
 *
 */

editor.init = function() {

  editor.listenEditorToggle();
  editor.checkEditorHidden();

};


/**
 * Updates local storage for post or page
 *
 */
editor.updateContent = function() {

  event.preventDefault();
  model.updateContent( editor.currentContent );
  editor.unSavedContent = false;
  editor.animateSaveBtn();

};


/**
 * Runs when changes take place to editor title
 *
 */
editor.updateTitle = function() {

  var title = helpers.getEditorTitleEl().value;

  editor.currentContent.title = title;
  editor.unSavedContent = true;
  view.updateTitle( title );

};


/**
 * Runs when changes take place to editor title
 *
 */
editor.updateMainContent = function() {

  var content = helpers.getEditorContentEl().value;

  editor.currentContent.content = content;
  editor.unSavedContent = true;
  view.updateContent( content );

};


/**
 * Dynamically fills the edit form based on the url
 *
 */
editor.loadEditForm = function( contentObj ) {

  var titleForm = helpers.getEditorTitleEl(),
      contentForm = helpers.getEditorContentEl();

  titleForm.value = contentObj.title;
  contentForm.value = contentObj.content;

  if ( 'blog' === contentObj.slug ) {
    contentForm.setAttribute( 'readonly', 'readonly' );
  } else {
    contentForm.removeAttribute( 'readonly' );
  }

  editor.addFormListeners();

};


/**
 * Animates the Update button to mimic saving data
 *
 */
editor.animateSaveBtn = function() {

  var btn = helpers.getEditorUpdateBtnEl(),
      saved = function() {
        setTimeout(function(){
          btn.innerText = 'Update';
        }, 1000);
      };
      saving = function() {
        setTimeout(function(){
          btn.innerText = 'Saved!';
          saved();
        }, 900);
      };

  btn.innerText = 'Saving...';
  saving();

};

/**
 * Adds event listeners for the title and content
 *
 */
 editor.addFormListeners = function() {

   var titleField = helpers.getEditorTitleEl(),
       contentField = helpers.getEditorContentEl(),
       updateBtn = helpers.getEditorUpdateBtnEl(),
       links = helpers.getLinks();

   titleField.addEventListener(
     'input',
     editor.updateTitle,
     false
   );
   contentField.addEventListener(
     'input',
     editor.updateMainContent,
     false
   );
   updateBtn.addEventListener(
     'click',
     editor.updateContent,
     false
   );


   links.forEach( function( link ) {

     link.addEventListener(
       'click',
       editor.protectUnsavedContent,
       false
     );

   });

 };


/**
 * Adds alert if links are clicked with unsaved content
 *
 */
editor.protectUnsavedContent = function() {

  if ( true === editor.unSavedContent ) {

    var confirm = window.confirm( 'You have unsaved content' );

    if ( false === confirm ) {
      event.preventDefault();
    } else {
      editor.unSavedContent = false;
    }

  }

};

/**
 * Listens for the editor toggle button
 *
 */
editor.listenEditorToggle = function() {

  var toggleEl = helpers.getEditorToggleLink();

  toggleEl.addEventListener( 'click', function() {
    editor.toggle();
    event.preventDefault();
  }, false );

};


/**
 * Opens editor if local store has editor visible
 *
 */
editor.checkEditorHidden = function() {

  var isHidden = model.getEditorHidden();

  if( false === isHidden ) {
    editor.toggle();
  }

};

/**
 * Controls the toggle for the editor
 *
 */
editor.toggle = function() {

  var editorEl = helpers.getEditorEl(),
      toggleEl = helpers.getEditorToggleEl(),
      links = helpers.getLinks();

  editor.currentContent = model.getCurrentContent();

  editorEl.classList.toggle( 'hidden' );
  toggleEl.classList.toggle( 'hidden' );

  if( false === toggleEl.classList.contains( 'hidden' ) ) {

    editor.loadEditForm( editor.currentContent );
    model.updateEditorHidden( false );

  } else {

    model.updateEditorHidden( true );

    links.forEach( function( link ) {

      link.removeEventListener(
        'click',
        editor.protectUnsavedContent,
        false
      );

    });

  }

};
