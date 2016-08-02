var prompt = require('prompt-sync')();
var colors = require('colors');
var fs = require('fs');
var leaders = getLeader();

var bankroll = 100;

var score = 0;

var player = prompt('name : ');

function getLeader(){
  var text = fs.readFileSync('./leaderboard.txt', 'utf8');
  return text.split('\n');
}

function printLeader(leaders){
  console.log('###########     LEADER BOARD     ########'.bgCyan.red);
  leaders.forEach(function(leader){
    console.log(leader);
    var s = getscore(leader);
    // if (s) console.log( s );
  });
}

function getscore(player){
  if(score = player.match(/#(\d+)/))
    return parseInt(score[1]);
  return null;
}

function saveHistory(leaders){
  var stream = fs.createWriteStream("./leaderboard.txt");
  stream.once('open', function(fd) {
    stream.write(leaders.join('\n'));
    stream.end();
  });
}

function updateHistory(player, score, leaders){

  for(var j = 0; j < 5; j++){
    if(leaders[j] == null){
      leaders.push(player+'#'+score);
      return;
    }

    if(getscore(leaders[j]) < score){
      leaders.splice(j, 0, player+'#'+score);
      return;
    }
  }

}

while (bankroll > 0){
  var money = prompt("Your bankroll " + bankroll + " Bet money : ".red);
  var guess = prompt("1-10 - guess?");
  var rand_n = Math.floor(Math.random() * 10) + 1;
  console.log(rand_n);

  if(guess == rand_n){
    bankroll += money;
    score++;
    console.log("correct!".bgGreen);
  } else if (guess == rand_n + 1 || guess == rand_n - 1)
    console.log("almost!".white.bgYellow)
  else {
    bankroll -= money;
    console.log("wrong!".white.bgRed);
  }

}
// leaders.push("payer1#10");
updateHistory(player, score, leaders);
saveHistory(leaders);
printLeader(leaders);


  




