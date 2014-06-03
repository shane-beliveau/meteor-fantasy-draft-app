Meteor.startup(function () {

    Meteor.methods({

        addAccount: function(user) 
        {
            Accounts.config({
                sendVerificationEmail: true,
                loginExpirationInDays: 1
            });

            Accounts.createUser({
                username: user.username,
                email:    user.email,
                password: user.password,
                profile: {
                    firstname: user.firstname,
                    lastname: user.lastname
                }
            });
        }

    });

});