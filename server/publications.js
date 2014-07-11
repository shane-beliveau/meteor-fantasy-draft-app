// ############################################################################
// @@ NFL Players
// {{ players }}
// ----------------------------------------------------------------------------

// Load all teams if they haven't been already
if( !NFLPlayers.find().count() )
{
    _.each( _NFLPlayers, function( player ) {
        NFLPlayers.insert( player );
    });
}

Meteor.publish('nflplayers', function() {
    return NFLPlayers.find();
});

// ############################################################################
// @@ NFL Teams
// {{ teams }}
// ----------------------------------------------------------------------------

// Load all teams if they haven't been already
if( !NFLTeams.find().count() )
{
    _.each( _NFLTeams, function( team ) {
        NFLTeams.insert( team );
    });
}

Meteor.publish('nflteams', function() {
    return NFLTeams.find();
});

// ############################################################################
// @@ NFL Byes
// {{ byes }}
// ----------------------------------------------------------------------------

// Load all teams if they haven't been already
if( !NFLByes.find().count() )
{
    _.each( _NFLByes, function( bye ) {
        NFLByes.insert( bye );
    });
}

Meteor.publish('nflbyes', function() {
    return NFLByes.find();
});

// ############################################################################
// @@ Load Draftboard
// {{ draftboard }}
// ----------------------------------------------------------------------------

// Load all teams if they haven't been already
//if( !Draftboard.find().count() )
//{
    Draftboard.insert( _Draftboard );
//}

Meteor.publish('draftboard', function() {
    return Draftboard.find();
});

// ############################################################################
// @@ Teams
// {{ teams }}
// ----------------------------------------------------------------------------

// Load all teams if they haven't been already
//if( !Teams.find().count() )
//{
    _.each( _Teams, function( team ) {
        Teams.insert( team );
    });
//}

Meteor.publish('teams', function() {
    return Teams.find();
});

// ############################################################################