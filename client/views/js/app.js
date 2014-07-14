Template.app.rendered = function() {

    // Constants
    var $player      = '.players .list .item';

    // Navigation active controls
    $(document).on('click', $player, function() {

        var $this = $(this),
            $info = $this.find('.info');

        $info.slideToggle();

    });

}

// ############################################################################

Template.app.helpers({
    // Nothing yet.
});