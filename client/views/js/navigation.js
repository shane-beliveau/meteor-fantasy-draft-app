Template.navigation.rendered = function() {

    // Constants
    var $nav_a    = $('#navigation .ui.menu > a'),
        $sub_menu = $('#navigation .sub.menu'),
        $main     = $('.main.container');

    // Navigation active controls
    $nav_a.on('click', function() {

        var $this = $(this),
            _view = $this.data('mainview') || false;


        $this.addClass('active');
        $this.siblings().removeClass('active');

        if ( _view == 'players') 
        {
            $sub_menu.slideDown(200);
            $main.css('padding-top', 124);
        }
        else if ( _view && _view !== 'players' )
        {
            $sub_menu.slideUp(200);
            $main.css('padding-top', 81);
        }

    });

}

// ############################################################################

Template.navigation.events = function() {

    return {

    }
    
}