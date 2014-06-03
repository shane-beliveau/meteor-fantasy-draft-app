$(function(){
    
    // Auto close flash messages
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
