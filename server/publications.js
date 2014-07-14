NFLPlayers.remove({});
Top300.remove({});
NFLByes.remove({});
Draftboard.remove({});
Teams.remove({});

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
// @@ Top 300
// {{ top300 }}
// ----------------------------------------------------------------------------

// Load top 300 if they haven't been already
if( !Top300.find().count() )
{
    _.each( _Top300, function( player ) {
        Top300.insert( player );
    });
}

Meteor.publish('top300', function() {
    return Top300.find();
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
if( !Draftboard.find().count() )
{
    Draftboard.insert( _Draftboard );
}

Meteor.publish('draftboard', function() {
    return Draftboard.find();
});

// ############################################################################
// @@ Teams
// {{ teams }}
// ----------------------------------------------------------------------------

// Load all teams if they haven't been already
if( !Teams.find().count() )
{
    _.each( _Teams, function( team ) {
        Teams.insert( team );
    });
}

Meteor.publish('teams', function() {
    return Teams.find();
});

// ############################################################################