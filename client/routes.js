
// Default templates
Router.configure({
  layoutTemplate: '_global',
  loadingTemplate: '_loading'
});

// Routes
Router.map(function() {

    this.route('app', {
        path  : '/:position?',
        waitOn: function() {
            return [
                Meteor.subscribe('nflplayers'),
                Meteor.subscribe('nflbyes'),
                Meteor.subscribe('draftboard')
            ];
        },
        data: function() {

            var position = this.params.position || 'qb',
                byes     = NFLByes.find().fetch();

            return { 
                nflplayers : function() { return NFLPlayers.find( 
                        { 
                            position: position.toUpperCase(),
                            fantasyPoints: { $gt: 0 }
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
                draftboard : function() { return Draftboard.findOne() }
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

});

