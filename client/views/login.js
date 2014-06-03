Template.login.events({
    
    'click input#login': function (event, template) 
    {
        event.preventDefault();

        var 
            username = template.find('input[name="username"]').value,
            password = template.find('input[name="password"]').value
        ;
        
        if( username != '' && password != '')
        {
            Meteor.loginWithPassword(username, password, function (error) {
                
                if( error )
                {
                    Session.set('flash', {
                        type: 'error',
                        message: error.reason
                    });
                }
                else
                {
                    Router.go('/account');
                }

            });   
        }
        else
        {
            Session.set('flash', {
                type: 'error',
                message: 'Please enter a username and password to proceed!'
            });
        }

    }

});