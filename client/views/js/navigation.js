Template.navigation.rendered = function() {

    // Constants
    var $nav_a    = $('#navigation .ui.menu > a'),
        $sub_menu = $('#navigation .sub.menu'),
        $main     = $('.main.container');

    // Navigation active controls
    $nav_a.off('click');
    $nav_a.on('click', function(e) {

        e.stopPropagation();

        var $this = $(this),
            _view = $this.data('mainview') || false;

        $this.addClass('active');
        $this.siblings().removeClass('active');

    });

}

// ############################################################################

Template.navigation.events({
    'click #reset' : function() {
        if( confirm('Are you sure you want to reset the draft?') )
        {
            Meteor.call('reset_all');
        }
    } 
});
