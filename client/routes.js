Router.configure({
  layoutTemplate: '_global'
});

Router.map(function() {

    this.route('login', {
        path    : '/'
    });

    this.route('signup');

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

