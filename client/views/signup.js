// ############################################################################

Template.signup.rendered = function() {

    var signup_submit = function (event, template) {
        
        var 
            user    = {
                username    : template.find('input[name="username"]').value,
                email       : template.find('input[name="email"]').value,
                firstname   : template.find('input[name="first-name"]').value,
                lastname    : template.find('input[name="last-name"]').value,
                password    : template.find('input[name="password"]').value
            }
        ;

        Meteor.call('addAccount', user, function(error, result) {
            console.log(error);
            console.log(result);
        });

    }

    $('.ui.form').form({

        firstName: {
            identifier: 'first-name',
            rules: [{
                type: 'empty',
                prompt: 'Please enter your first name'
            }]
        },
        lastName: {
            identifier: 'last-name',
            rules: [{
                type: 'empty',
                prompt: 'Please enter your last name'
            }]
        },
        emailAddress: {
            identifier: 'email',
            rules: [{
                type: 'email',
                prompt: 'Please enter a valid email address'
            }]
        },
        username: {
            identifier: 'username',
            rules: [{
                type: 'empty',
                prompt: 'Please enter a username'
            }]
        },
        password: {
            identifier: 'password',
            rules: [{
                type: 'empty',
                prompt: 'Please enter a password'
            }, {
                type: 'length[6]',
                prompt: 'Your password must be at least 6 characters'
            }]
        }
    },
    { 
        onSuccess: signup_submit
    });
};

// ############################################################################

Template.signup.events({

});