Meteor.methods({

    find_by_order: function() {

        var draft = Draft.findOne({}),
            team = Teams.findOne({ order: draft.team_pick });

        Meteor.call('determine_next_pick', draft);

        return team;
    },

    determine_next_pick: function(draft) {

        var overall   = draft.overall + 1,
            round     = Math.floor( ((overall - 1) / draft.total_teams) + 1 ),
            pick      = ((overall - 1) % draft.total_teams) + 1,
            team_pick = ( round % 2 ) ? pick : ( round * draft.total_teams ) - overall + 1;
        
        // Adjust picks for trades made in the league
        if( round === 4 && team_pick === 12)
        {
            Flashes.insert({ message: 'Texas State Fighting Armadillos traded their 2nd round pick to Captain Morgan for M. Lynch. It is Captain Morgan\'s pick.' });
            team_pick = 6;
        }

        if( (round === 5 && team_pick === 8) || (round === 6 && team_pick === 6) )
        {
            
            if( round === 5 && team_pick === 8 )
            {
                Flashes.insert({ message: 'Sugarbush Pitbulls traded their 3rd round pick to Baltimore Smack for R. Griffin III. It is Baltimore Smack\'s pick.' });
            }

            if( round === 6 && team_pick === 6 )
            {
                Flashes.insert({ message: 'Captain Morgan traded their 4th round pick to Baltimore Smack for E. Decker. It is Baltimore Smack\'s pick.' });
            }

            team_pick = 4;
        }

        Draft.update( draft._id, 
            { $set : {
                round       : round,
                pick        : pick,
                team_pick   : team_pick,
                overall     : overall
            }}, 
            function(error) {
                console.log(error);
            }
        );

    }

});