
// Default templates
Router.configure({
  layoutTemplate: '_global',
  loadingTemplate: '_loading'
});

// Routes
Router.map(function() {

    this.route('teams', {
        path: '/teams/:name?',
        waitOn: function() {
            return [
                Meteor.subscribe('teams'),
                Meteor.subscribe('draftboard'),
                Meteor.subscribe('picks')
            ];
        },
        data: function() {
            return {
                teams: function() {
                    return Teams.find({}, { 
                        sort: { order: 1 },
                        transform: function(item) {
                            var players = item.players,
                                qbs  = $.grep(players, function(e){ return e.position == 'QB' }),
                                rbs  = $.grep(players, function(e){ return e.position == 'RB' }),
                                wrs  = $.grep(players, function(e){ return e.position == 'WR' }),
                                tes  = $.grep(players, function(e){ return e.position == 'TE' }),
                                ks   = $.grep(players, function(e){ return e.position == 'K' }),
                                defs = $.grep(players, function(e){ return e.position == 'DEF' }),
                                starters, reserves,
                                sort_lineup = function(lineup) {

                                    var pre = [], post = [];

                                        pre.push( $.grep(lineup, function(e){ return e.position == "QB" }) );
                                        pre.push( $.grep(lineup, function(e){ return e.position == "RB" }) );
                                        pre.push( $.grep(lineup, function(e){ return e.position == "WR" }) );
                                        pre.push( $.grep(lineup, function(e){ return e.position == "TE" }) );
                                        pre.push( $.grep(lineup, function(e){ return e.position == "K" }) );
                                        pre.push( $.grep(lineup, function(e){ return e.position == "DEF" }) );

                                    return post.concat(pre[0],pre[1],pre[2],pre[3],pre[4],pre[5]);
                                };

                            for(i in players)
                            {
                                if( (typeof qbs[0] !== 'undefined' && qbs[0]._id == players[i]._id ) ||
                                    (typeof rbs[0] !== 'undefined' && rbs[0]._id == players[i]._id ) ||
                                    (typeof rbs[1] !== 'undefined' && rbs[1]._id == players[i]._id ) ||
                                    (typeof wrs[0] !== 'undefined' && wrs[0]._id == players[i]._id ) ||
                                    (typeof wrs[1] !== 'undefined' && wrs[1]._id == players[i]._id ) ||
                                    (typeof wrs[2] !== 'undefined' && wrs[2]._id == players[i]._id ) ||
                                    (typeof tes[0] !== 'undefined' && tes[0]._id == players[i]._id ) ||
                                    (typeof ks[0]  !== 'undefined'  && ks[0]._id == players[i]._id ) ||
                                    (typeof defs[0] !== 'undefined' && defs[0]._id == players[i]._id ))
                                {
                                    players[i].starter = true;
                                }
                                else
                                {
                                    players[i].reserve = true;
                                }
                            }

                            starters = $.grep(players, function(e){ return e.starter === true });
                            reserves = $.grep(players, function(e){ return e.reserve === true });

                            item.starters = sort_lineup(starters);
                            item.reserves = sort_lineup(reserves);

                            return item;

                        }
                    });
                },
                summary : function() { 
                    return Draftboard.findOne({}, {
                        transform: function(item) {
                            item.team = Teams.findOne({ order: item.team_pick });
                            return item;
                        }
                    });
                },
                template: 'teams'
            }
        },
        action: function () {
            if(!this.ready()) {
                this.render('_loading');
            } else {
                this.render();
            }
        }
    });

    this.route('draftboard', {
        path: '/draftboard/:round?',
        waitOn: function() {
            return [
                Meteor.subscribe('teams'),
                Meteor.subscribe('draftboard'),
                Meteor.subscribe('nflplayers'),
                Meteor.subscribe('picks')
            ];
        },
        data: function() {

            var teams   = Teams.find().fetch(),
                players = NFLPlayers.find().fetch(),
                picks;

            return {
                picks: function() {

                    return Picks.find({}, { 
                            sort: { 'overall' : 1 },
                            transform: function(item) {
                                
                                item.team = function() {
                                    for(var i in teams) {
                                        if(teams[i]._id == item.team_id)
                                            return teams[i];
                                    }
                                };

                                item.player = function() {
                                    for(var i in players) {
                                        if(players[i]._id == item.player_id)
                                            return players[i];
                                    }
                                };

                                return item;
                            }
                        });
                },
                summary : function() { 
                    return Draftboard.findOne({}, {
                        transform: function(item) {
                            item.team = Teams.findOne({ order: item.team_pick });
                            return item;
                        }
                    });
                },
                template: 'draftboard'
            }
        },
        action: function () {
            if(!this.ready()) {
                this.render('_loading');
            } else {
                this.render();
            }
        }
    });

    this.route('account', {
        path: '/account',
        onBeforeAction: function () {
            if ( !Meteor.user() ) {
                if ( Meteor.loggingIn() ) {
                } else {
                    Router.go('login');
                }
            }
        }
    });
    
    this.route('app', {
        path  : '/:position?',
        waitOn: function() {
            return [
                Meteor.subscribe('nflplayers'),
                Meteor.subscribe('nflbyes'),
                Meteor.subscribe('draftboard'),
                Meteor.subscribe('teams')
            ];
        },
        data: function() {

            var position = this.params.position || 'qb',
                byes     = NFLByes.find().fetch();

            return { 
                nflplayers : function() { 
                    return NFLPlayers.find( 
                        { 
                            position: position.toUpperCase(),
                            fantasyPoints: { $gt: 5 },
                            drafted: null
                        },
                        { 
                            sort: { "fantasyPoints": -1 },
                            transform: function(item) {
                                item.bye = function() {
                                    for(i in byes) {
                                        if(byes[i].team == item.team)
                                            return byes[i].bye;
                                    }
                                }
                                return item;
                            }
                        }
                    ); 
                },
                position: position,
                template: 'app',
                summary : function() { 
                    return Draftboard.findOne({}, {
                        transform: function(item) {
                            item.team = Teams.findOne({ order: item.team_pick });
                            return item;
                        }
                    });
                }
            }
        },
        action: function () {
            if(!this.ready()) {
                this.render('_loading');
            } else {
                this.render();
            }
        }
    });

});

