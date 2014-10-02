Meteor.methods({

    reset_all: function() {
        NFLPlayers.remove({});
        NFLByes.remove({});
        Draftboard.remove({});
        Teams.remove({});
        Picks.remove({});
        Alerts.remove({});
        Meteor.call('load_all');
    },
            
    find_by_order: function() {

        var draft = Draftboard.findOne({}),
            team  = Teams.findOne({ order: draft.team_pick });

        Meteor.call('determine_next_pick', draft);

        return team;
    },

    determine_next_pick: function(draft) {

        var overall   = draft.overall + 1,
            round     = Math.floor( ((overall - 1) / draft.total_teams) + 1 ),
            pick      = ((overall - 1) % draft.total_teams) + 1,
            team_pick = ( round % 2 ) ? pick : ( round * draft.total_teams ) - overall + 1;

        // Adjust picks for trades made in the league
        if( round == 5 && team_pick == 9)
        {
            team_pick = 3;
        }

        Draftboard.update( draft._id, 
            { $set : {
                round       : round,
                pick        : pick,
                team_pick   : team_pick,
                overall     : overall
            }}, 
            function(error) {
                // Do nothing.
            }
        );

    },

    clear_alerts: function() {
        Alerts.remove({});
    }

});