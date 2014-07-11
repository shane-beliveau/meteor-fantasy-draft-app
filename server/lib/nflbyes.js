/*
_NFLByes = [{"team":"ARI","byeWeek":"4","displayName":"Arizona Cardinals"},{"team":"CIN","byeWeek":"4","displayName":"Cincinnati Bengals"},{"team":"DEN","byeWeek":"4","displayName":"Denver Broncos"},{"team":"STL","byeWeek":"4","displayName":"St. Louis Rams"},{"team":"SEA","byeWeek":"4","displayName":"Seattle Seahawks"},{"team":"CLE","byeWeek":"4","displayName":"Cleveland Browns"},{"team":"MIA","byeWeek":"5","displayName":"Miami Dolphins"},{"team":"OAK","byeWeek":"5","displayName":"Oakland Raiders"},{"team":"NO","byeWeek":"6","displayName":"New Orleans Saints"},{"team":"KC","byeWeek":"6","displayName":"Kansas City Chiefs"},{"team":"PHI","byeWeek":"7","displayName":"Philadelphia Eagles"},{"team":"TB","byeWeek":"7","displayName":"Tampa Bay Buccaneers"},{"team":"NYG","byeWeek":"8","displayName":"New York Giants"},{"team":"SF","byeWeek":"8","displayName":"San Francisco 49ers"},{"team":"TEN","byeWeek":"9","displayName":"Tennessee Titans"},{"team":"GB","byeWeek":"9","displayName":"Green Bay Packers"},{"team":"DET","byeWeek":"9","displayName":"Detroit Lions"},{"team":"CHI","byeWeek":"9","displayName":"Chicago Bears"},{"team":"BUF","byeWeek":"9","displayName":"Buffalo Bills"},{"team":"ATL","byeWeek":"9","displayName":"Atlanta Falcons"},{"team":"HOU","byeWeek":"10","displayName":"Houston Texans"},{"team":"NE","byeWeek":"10","displayName":"New England Patriots"},{"team":"WAS","byeWeek":"10","displayName":"Washington Redskins"},{"team":"SD","byeWeek":"10","displayName":"San Diego Chargers"},{"team":"MIN","byeWeek":"10","displayName":"Minnesota Vikings"},{"team":"IND","byeWeek":"10","displayName":"Indianapolis Colts"},{"team":"BAL","byeWeek":"11","displayName":"Baltimore Ravens"},{"team":"DAL","byeWeek":"11","displayName":"Dallas Cowboys"},{"team":"JAC","byeWeek":"11","displayName":"Jacksonville Jaguars"},{"team":"NYJ","byeWeek":"11","displayName":"New York Jets"},{"team":"CAR","byeWeek":"12","displayName":"Carolina Panthers"},{"team":"PIT","byeWeek":"12","displayName":"Pittsburgh Steelers"}];
NFLByes  = new Meteor.SmartCollection('nflbyes');

// Load all byes
_.each( _NFLByes, function( bye ) {
    NFLByes.insert( bye );
});

Meteor.publish('nflbyes', function(){
    return NFLByes.find();
});
*/