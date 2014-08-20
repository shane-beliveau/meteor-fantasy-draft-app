// Default templates
Router.configure({
  layoutTemplate: '_global',
  loadingTemplate: '_loading'
});

Router.onData(function() {

    var alerts = Alerts.find().fetch();

    if( alerts.length > 0 ) {

        $('<div/>', {
            class : 'ui small info message pick alert',
            html  : alerts[0].message
        })
            .appendTo('body')
            .not(':animated')
            .animate({
                bottom: '0'
            })
            .delay(4000)
            .animate({
                bottom: '-64px'
            },{
                complete: function() {
                    Meteor.call('clear_alerts');
                    $(this).remove();
                }
            });
    }

});

Router.waitOn(function() {
    return [
        Meteor.subscribe('teams'),
        Meteor.subscribe('draftboard'),
        Meteor.subscribe('picks'),
        Meteor.subscribe('nflplayers'),
        Meteor.subscribe('nflbyes'),
        Meteor.subscribe('alerts')
    ];   
});

// Routes
Router.map(function() {

    this.route('teams', {
        path: '/teams/:name?',
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
                alerts : function() {
                    return Alerts.findOne();
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
                alerts : function() {
                    return Alerts.findOne();
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

    this.route('big-board', {
        path  : '/big-board',
        data: function() {

            var byes = NFLByes.find().fetch();

            return { 
                qb:  function() { return NFLPlayers.find( { fantasyPoints: { $gt: 5 }, position: 'QB' }, { sort: { "fantasyPoints": -1 } }); },
                rb:  function() { return NFLPlayers.find( { fantasyPoints: { $gt: 5 }, position: 'RB' }, { sort: { "fantasyPoints": -1 } }); },
                wr:  function() { return NFLPlayers.find( { fantasyPoints: { $gt: 5 }, position: 'WR' }, { sort: { "fantasyPoints": -1 } }); },
                te:  function() { return NFLPlayers.find( { fantasyPoints: { $gt: 5 }, position: 'TE' }, { sort: { "fantasyPoints": -1 } }); },
                k:   function() { return NFLPlayers.find( { fantasyPoints: { $gt: 5 }, position: 'K' }, { sort: { "fantasyPoints": -1 } }); },
                def: function() { return NFLPlayers.find( { fantasyPoints: { $gt: 5 }, position: 'DEF' }, { sort: { "fantasyPoints": -1 } }); },
                template: 'big-board',
                alerts : function() {
                    return Alerts.findOne();
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

    this.route('big-board-grid', {
        path: '/big-board-grid',
        data: function() {

            var teams   = Teams.find({}, { sort: { 'order' : 1 } }).fetch(),
                players = NFLPlayers.find().fetch(),
                picks;

            return {
                teams: teams,
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
                alerts : function() {
                    return Alerts.findOne();
                },
                template: 'big-board-grid'
            }
        }
    });
    
    this.route('app', {
        path  : '/:position?',
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
                alerts : function() {
                    return Alerts.findOne();
                },
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

