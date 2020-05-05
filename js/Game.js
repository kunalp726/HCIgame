var TopDownGame = TopDownGame || {};

//title screen
var question = 0;
var totalTime = 0;
var seconds = 0;
var minutes = 0;
var benefits = 0;
var doorCleared = 0;
var wronganswers = 0;
var highscore = localStorage.getItem('highscore') || 0;
var gameOver = false;
var timeInterval = null;
var questionArray = [
  {
    ques: 'What does the “https://” at the beginning of a URL denote, as opposed to "http://"?',
    options: [
      'That the site has special high definition',
      'That information entered into the site is encrypted',
      'That the site is the newest version available',
      'That the site is not accessible to certain computers'],
    type: 'mcq',
    answer: 'That information entered into the site is encrypted'
  },
  {
    ques: 'You have search functionality on a website. Complete this SQL injection attack to delete all tables. Select * from where name=',
    type: 'task',
    answer: '1=1;drop table'
  },
  {
    ques: 'What does the “https://” at the beginning of a URL denote, as opposed to "http://"?',
    options: [
      'That the site has special high definition',
      'That information entered into the site is encrypted',
      'That the site is the newest version available',
      'That the site is not accessible to certain computers'],
    type: 'mcq',
    answer: 'That information entered into the site is encrypted'
  },
  {
    ques: 'What does the “https://” at the beginning of a URL denote, as opposed to "http://"?',
    options: [
      'That the site has special high definition',
      'That information entered into the site is encrypted',
      'That the site is the newest version available',
      'That the site is not accessible to certain computers'],
    type: 'mcq',
    answer: 'That information entered into the site is encrypted'
  },
  {
    ques: 'What does the “https://” at the beginning of a URL denote, as opposed to "http://"?',
    options: [
      'That the site has special high definition',
      'That information entered into the site is encrypted',
      'That the site is the newest version available',
      'That the site is not accessible to certain computers'],
    type: 'mcq',
    answer: 'That information entered into the site is encrypted'
  },
  {
    ques: 'What does the “https://” at the beginning of a URL denote, as opposed to "http://"?',
    options: [
      'That the site has special high definition',
      'That information entered into the site is encrypted',
      'That the site is the newest version available',
      'That the site is not accessible to certain computers'],
    type: 'mcq',
    answer: 'That information entered into the site is encrypted'
  },
  {
    ques: 'What does the “https://” at the beginning of a URL denote, as opposed to "http://"?',
    options: [
      'That the site has special high definition',
      'That information entered into the site is encrypted',
      'That the site is the newest version available',
      'That the site is not accessible to certain computers'],
    type: 'mcq',
    answer: 'That information entered into the site is encrypted'
  },
  {
    ques: 'What does the “https://” at the beginning of a URL denote, as opposed to "http://"?',
    options: [
      'That the site has special high definition',
      'That information entered into the site is encrypted',
      'That the site is the newest version available',
      'That the site is not accessible to certain computers'],
    type: 'mcq',
    answer: 'That information entered into the site is encrypted'
  },
  {
    ques: 'What does the “https://” at the beginning of a URL denote, as opposed to "http://"?',
    options: [
      'That the site has special high definition',
      'That information entered into the site is encrypted',
      'That the site is the newest version available',
      'That the site is not accessible to certain computers'],
    type: 'mcq',
    answer: 'That information entered into the site is encrypted'
  },
  {
    ques: 'What does the “https://” at the beginning of a URL denote, as opposed to "http://"?',
    options: [
      'That the site has special high definition',
      'That information entered into the site is encrypted',
      'That the site is the newest version available',
      'That the site is not accessible to certain computers'],
    type: 'mcq',
    answer: 'That information entered into the site is encrypted'
  },
];
var currentAnswer = "";
var health = 100;
TopDownGame.Game = function () { };
this.doorObj = null;
this.updateBackup = null;
this.modalOpen = true;


function reset() {
  $("#gameOverModal .newGame").on('click', function () {
    location.reload();
  });
}
function gameComplete(state) {
  clearInterval(timeInterval);
  const modal = $("#gameOverModal");
  if (state == "win") {
    modal.find('.modal-title').text("Yay! You have Escaped !");
    let score = 2000 - totalTime - benefits - (wronganswers * 50);
    if (score > highscore) {
      localStorage.setItem('highscore', score);
      modal.find('.special-message').text("Congratulations! You have set a new high score!");
    }
    modal.find('.high-score').text(`Current High score: ${highscore}`);
    modal.find('.your-score').text(`Your score: ${score}`);
    modal.find(".completion-time").text(`Completion time: ${minutes} minutes ${seconds} seconds \n`);

  } else {
    modal.find('.modal-title').text("Game Over! You couldn't escape!");
    modal.find('.high-score').text(`Current High score: ${highscore}`);
    modal.find('.your-score').text(`Your score: ${0}`);
  }
  modal.css('display', 'block');
  modal.addClass('in');
  $("#questionModal").removeClass('in');
  $("#questionModal").css('display', 'none');

}
function hideModal() {
  $('#questionModal .answer').on('click', function () {
    //display message on correct/wrong answer


    if (currentAnswer == questionArray[question].answer) {
      doorCleared++;
      $('#questionModal .message-display').text("Correct Answer! Door Opened");
      $('#questionModal .message-display').addClass("correct");
      setTimeout(function () {
        $('#questionModal .message-display').text("");
        question++;
        window.doorObj.destroy();
        window.modalOpen = false;
        $("#questionModal").css('display', 'none');
        $("#questionModal").removeClass('in');
        $(".input-box").css("display", "none");
        $(".input-box").val("");
        $(".select-options").css("display", "none");
        $(".select-options").empty();
        $('#questionModal .message-display').removeClass("correct");
        $('#questionModal .message-display').removeClass("wrong");

        if (doorCleared == 5) {
          gameComplete("win");
        }
      }, 1000)

    } else {
      health -= 34;
      let additional = health > 0 ? 'Please try again!' : '';
      $('#questionModal .message-display').text("Wrong Answer! " + additional);
      $('#questionModal .message-display').addClass("wrong");
      wronganswers++;
      if (health <= 0) {
        health=0;
        gameOver = true;
        setTimeout(function () {
          $("#questionModal").removeClass('in');
          $("#questionModal").css('display', 'none');
          $('#questionModal .message-display').removeClass("correct");
          $('#questionModal .message-display').removeClass("wrong");
          gameComplete("lose");

        }, 1000);
      } else {
        setTimeout(function () {
          question++;
          $('#questionModal .message-display').text("");
          $(".input-box").css("display", "none");
          $(".input-box").val("");
          $(".select-options").css("display", "none");
          $(".select-options").empty();
          $('#questionModal .message-display').removeClass("correct");
          $('#questionModal .message-display').removeClass("wrong");
          fillQuestion($("#questionModal"));
        }, 1000)
      }
    }



    //display message for one second and close out the modal

  });
}

function setUpStartModal() {
  $("#startModal .start-game").on('click', function () {
    window.modalOpen = false;
    $("#startModal").css({ 'display': 'block', 'z-index': '-1' });
    $("#startModal").removeClass('in');
    setupTimerHealth();
  });
}
function setupTimerHealth() {
  timeInterval = setInterval(function () {
    totalTime += 1;
    seconds = Math.floor(totalTime / 10) % 60;
    minutes = Math.floor(Math.floor(totalTime / 10) / 60)
    $(".timer").text(`Time : ${minutes}:${seconds}:${totalTime % 10} \n`);
    $(".health").text(`Health left: ${health} % \n`);
    $(".high-score").text(`Current High: ${highscore} \n`);
  }, 100);
}
function setupInputEvent() {
  $(".answer-input").change(function () {
    currentAnswer = this.value;
    console.log(currentAnswer)
  });

}

function radioChanged() {
  let x = $("input[name='answer']:checked")[0].value;
  currentAnswer = x.split("-").join(" ");
  console.log(currentAnswer);
}
function fillQuestion(modal) {
  modal.find(".question").text(` ${questionArray[question].ques}`);
  let quesType = questionArray[question].type;
  if (quesType === "mcq") {
    const options = questionArray[question].options.map((opt, index) => {
      return (`<div><input type="radio" onchange="radioChanged()" name="answer" value=${opt.replace(/\s/g, '-')}>${opt}</option><div>`)
    });
    $(".select-options").append(...options);
    $(".select-options").css("display", "block");
  } else {
    $(".input-box").css("display", "block");
  }
}
function displayQuestion(player, door) {
  if (!gameOver) {
    var modal = $("#questionModal");
    if (!modal.hasClass('in')) {
      modal.css('display', 'block');
      modal.addClass('in');
      fillQuestion(modal);
      window.doorObj = door;
      window.modalOpen = true;
    }
  }
}

$(document).ready(function () {
  hideModal();
  setupInputEvent();
  setUpStartModal();
  reset();
});



TopDownGame.Game.prototype = {
  create: function () {
    this.map = this.game.add.tilemap('level2');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    this.createItems();
    this.createDoors();

    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.game.physics.arcade.enable(this.player);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

  },
  createItems: function () {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;
    var item;
    result = this.findObjectsByType('item', this.map, 'objectsLayer');
    result.forEach(function (element) {
      this.createFromTiledObject(element, this.items);
    }, this);
  },
  createDoors: function () {
    //create doors
    this.doors = this.game.add.group();
    this.doors.enableBody = true;
    result = this.findObjectsByType('door', this.map, 'objectsLayer');

    result.forEach(function (element) {
      this.createFromTiledObject(element, this.doors);
    }, this);
  },

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function (type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function (element) {
      element.properties.forEach((prop) => {
        if (prop.value === type) {
          element.y -= map.tileHeight;
          result.push(element);
        }
      });
      // if(element.properties.type === type) {
      //   //Phaser uses top left, Tiled bottom left so we have to adjust
      //   //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
      //   //so they might not be placed in the exact position as in Tiled

      // }      
    });
    return result;
  },
  //create a sprite from an object
  createFromTiledObject: function (element, group) {
    let spriteName = "";
    element.properties.forEach((prop) => {
      if (prop.name == "sprite") {
        spriteName = prop.value
      }
    })
    var sprite = group.create(element.x, element.y, spriteName);

    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function (key) {
      sprite[key] = element.properties[key];
    });
  },
  update: function () {
    //collision
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
    this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

    //player movement

    this.player.body.velocity.x = 0;

    if (!window.modalOpen) {
      if (this.cursors.up.isDown) {
        if (this.player.body.velocity.y == 0)
          this.player.body.velocity.y -= 50;
      }
      else if (this.cursors.down.isDown) {
        if (this.player.body.velocity.y == 0)
          this.player.body.velocity.y += 50;
      }
      else {
        this.player.body.velocity.y = 0;
      }
      if (this.cursors.left.isDown) {
        this.player.body.velocity.x -= 50;
      }
      else if (this.cursors.right.isDown) {
        this.player.body.velocity.x += 50;
      }
    } else {
      this.player.body.velocity.y = 0;

    }
  },
  collect: function (player, collectable) {
    console.log('yummy!');
    //remove sprite
    benefits += 100;
    if (health < 100) {
      health += 33;
    }
    collectable.destroy();
  },
  enterDoor: function (player, door) {
    displayQuestion(player, door);
  },

};