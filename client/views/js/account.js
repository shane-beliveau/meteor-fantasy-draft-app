Template.account.events({

    'click #logout' : function (event, template) {

        if( Meteor.user() ) {

            Meteor.logout(function(){
                Session.set('flash', {
                    type: 'success',
                    message: 'Logged out successfully.'
                });
                Router.go('/');  
            });
        }
        
    }

});