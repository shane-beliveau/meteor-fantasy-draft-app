Template.teams.rendered = function() {

    // Constants
    var $teams      = '.teams .list .item';

    // Navigation active controls
    $(document).off('click', $teams);
    $(document).on('click', $teams, function(e) {

        e.stopPropagation(); e.preventDefault();
        
        var $this = $(this),
            $info = $this.find('.info');

        if( $this.not(':animated') )
            $info.slideToggle();

    });

}

// ############################################################################