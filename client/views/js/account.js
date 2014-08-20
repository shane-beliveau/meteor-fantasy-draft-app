Template.account.events({

    'click #logout' : function (event, template) {

        if( Meteor.user() ) {

            Meteor.logout(function(){
                Router.go('/');  
            });
        }
        
    }

});