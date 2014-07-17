Template.app.rendered = function() {

    // Constants
    var $player      = '.players .list .item';

    // Navigation active controls
    $(document).off('click', $player);
    $(document).on('click', $player, function(e) {
        
        e.stopPropagation();

        if( ! /^.*draft\sbutton.*$/.test( e.target.className ) )
        {
            e.preventDefault();

            var $this = $(this),
                $info = $this.find('.info');

            if( $this.not(':animated') )
                $info.slideToggle();
        }

    });

}

// ############################################################################

Template.app.events({

        'click .players .list .item a.draft' : function() {

            if( confirm('Are you sure you want to draft ' + this.displayName + '?') )
            {
                // Update the player collection to show the selected player as drafted
                var selected_player = this,
                    pick = Draftboard.findOne();

                // Set the selected player status as drafted
                NFLPlayers.update( selected_player._id, { $set : { drafted: true } });

                // Get the selected player document
                selected_player = NFLPlayers.findOne({ _id: selected_player._id });

                selected_player.drafted = pick;
                
                // Add the player to the appropriate team and determine the next
                // team in the draft order. Also insert overall draft information.
                Meteor.call('find_by_order', {}, function(error, team) {
                    Teams.update( team._id , { $push : { players: selected_player } });
                    Picks.insert({
                        overall     : pick.overall,
                        round       : pick.round,
                        pick        : pick.pick,
                        team_id     : team._id,
                        player_id   : selected_player._id
                    });
                });

            }
        }

    });

// ############################################################################

Template.app.helpers({
    // Nothing yet.
});