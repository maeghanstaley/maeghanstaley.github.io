var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -5,
            gameItems: [
                {type: 'sawblade',x:500,y:groundY-150},
                {type: 'sawblade',x:1000,y:groundY-150},
                {type: 'sawblade',x:1300,y:groundY},
                {type: 'Red_Shell_-_Mario_Kart_Wii', x:700, y:groundY-20},
                {type: 'Red_Shell_-_Mario_Kart_Wii', x:1125, y:groundY-100},
                {type: 'Red_Shell_-_Mario_Kart_Wii', x:350, y:groundY-100},
                {type: 'cherry',x:1600,y:300}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);    
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        for (var i =0; i < levelData.gameItems.length; i++){
            if (levelData.gameItems[i].type==='sawblade'){
                createSawBlade(levelData.gameItems[i].x, levelData.gameItems[i].y );
            }else if (levelData.gameItems[i].type==='Red_Shell_-_Mario_Kart_Wii'){
                createTurtle(levelData.gameItems[i].x, levelData.gameItems[i].y );
            }else{
                reward(levelData.gameItems[i].x, levelData.gameItems[i].y );
            }
        }
        function createTurtle(x,y){
            var hitZoneSize = 15;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);    
            var obstacleImage = draw.bitmap('img/Red_Shell_-_Mario_Kart_Wii.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        function createEnemy(x,y) {
        var enemy =  game.createGameItem('enemy',25);
        var redSquare = draw.rect(50,50,'red');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = x;
        enemy.y = groundY-y;
        game.addGameItem(enemy);
        
        enemy.velocityX = -2;
        enemy.rotationalVelocity = 10;
        enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(-10);
        };
        
        enemy.onProjectileCollision = function() {
            console.log('Halle has hit the enemy');
            game.increaseScore(100);
            enemy.fadeOut();
        };
        }
        
        createEnemy(500,50);
        createEnemy(900,50);
        createEnemy(300, 50);
        
        function reward(x,y){
            var reward = game.createGameItem('reward', 90)
            reward.onPlayerCollision = function() {
                console.log('Halle has hit the reward');
                game.increaseScore(1000);
                reward.fadeOut();
            };
            reward.velocityX= -2;
            
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);    
            var obstacleImage = draw.bitmap('img/cherry.png');
            reward.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            reward.onPlayerCollision;
        }
        
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}