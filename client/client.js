// ############################################################################
// DOM Manipulation
// ############################################################################

$(function(){
    
    // Close on click flash messages
    $(document).on('click', '.ui.message .close', function() {
        
        $(this).closest('.message').fadeOut();
        
        // Delete the flash messages so they do not persist
        delete Session.keys['flash'];
        
    });

});

// ############################################################################
// Handlebars helpers
// ############################################################################

// @@ Flash message helper
// {{ flash }}
//   > .type = type of message e.g. success, error, warning
//   > .message = custom flash message to display
// ----------------------------------------------------------------------------
Handlebars.registerHelper('flash', function() {

    // Get the flash message from session
    var flash = Session.get('flash');

    // Return the original flash message to the template
    return flash;

});

// @@ Convert to lowercase
// {{ toLowercase @string }}
// ----------------------------------------------------------------------------
Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
});

// @@ Determines if current route is the player list
// {{ isPlayerTemplate }}
// ----------------------------------------------------------------------------
Handlebars.registerHelper('isPlayerTemplate', function() {
    if( ! Router.current() ) return;
    return ! _.contains(['/draftboard','/teams'], Router.current().path );
});

// @@ Determines if current route is the big board list
// {{ isBigBoardTemplate }}
// ----------------------------------------------------------------------------
Handlebars.registerHelper('isBigBoardTemplate', function() {
    if( ! Router.current() ) return;
    return _.contains(['/big-board'], Router.current().path );
});

// @@ Determines if current route is the player list
// {{ subActive }}
// ----------------------------------------------------------------------------
Handlebars.registerHelper('subActive', function(path) {
    if( ! Router.current() ) return;
    return _.contains([path], Router.current().path ) ? 'active' : '';
});

// @@ Determines if it's the first pick of round
// {{ isNewRound }}
// ----------------------------------------------------------------------------
Handlebars.registerHelper('isNewRound', function() {
    return this.pick == 1;
});