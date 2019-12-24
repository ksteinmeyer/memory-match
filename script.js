//event listeners for deciding size of board
document.getElementById('button12').addEventListener('click', createBoard);
document.getElementById('button24').addEventListener('click', createBoard);
document.getElementById('button36').addEventListener('click', createBoard);

//tracking variables being declared + color array
var numItems;
var score = 0;
var moves = 0;
var clicked = 0;
var colorMap = new Map();
var colorChoices =
['firebrick', 'lightcoral', 'orange', 'mediumslateblue','yellow', 'lightskyblue',
'greenyellow', 'seagreen', 'darkblue', 'mediumspringgreen', 'aqua', 'dodgerblue', 
 'violet', 'darkorchid', 'pink', 'rosybrown', 'silver', 'moccasin'
];

//creating a board lets you start a game
function createBoard(event) {
  initColors(); //fresh color map
  removeOldElements(); //fresh board

  numItems = event.target.id.replace("button", '');
  //assigning a color value to each block
  for (var i = 0; i < numItems; i++) {
    var index = Math.trunc(Math.random() * (numItems / 2));
    //does not allow a color value to be assigned to more than 2 blocks
    while (colorMap.get(colorChoices[index]) > 2) {
      index = Math.trunc(Math.random() * (numItems / 2));
    }
    colorMap.set(colorChoices[index], colorMap.get(colorChoices[index]) + 1);

    //start tracking score and moves
    document.getElementById("score").innerHTML = score;
    document.getElementById("moves").innerHTML = moves;
    //creating new element (box for matching)
    var box = document.createElement('article');
    if (numItems < 24) {
      box.classList.add('matchingBox12');
    } else if (numItems < 36) {
      box.classList.add('matchingBox24');
    } else {
      box.classList.add('matchingBox36');
    }
    box.setAttribute("id", "box" + i);
    box.setAttribute('style', 'background-color: black;');
    box.setAttribute('data-myColor', colorChoices[index]);
    box.setAttribute('data-matched', 'false');

    document.getElementById('content').appendChild(box);
    box.addEventListener('click', changeColor);
  }
}

//initalizing the values of the map to 0, allows a new board to be created
function initColors() {
  for (var i = 0; i < colorChoices.length; i++) {
    colorMap.set(colorChoices[i], '0');
  }
}

//removes any remaining elements from previous boards
function removeOldElements() {
  score = 0;
  moves = 0;
  const parent = document.getElementById("content");
  while (parent.firstChild) {
    console.log("removing");
    parent.removeChild(parent.firstChild);
  }
}

//changes block to its internal color value if clicked on
function changeColor(event) {
  document.getElementById(event.target.id).style.backgroundColor = document.getElementById(event.target.id).getAttribute('data-myColor');
  clicked += 1;
  if (clicked == 2) {
    moves += 1;
    document.getElementById("moves").innerHTML = moves;
    setTimeout(isMatch, 500);
  }
}


//checks to see if two blocks are a match
function isMatch() {
  clicked = 0;
  var comparing = []
  for (var i = 0; i < numItems; i++) {
    if (document.getElementById('box' + i).style.backgroundColor !== 'black' && document.getElementById('box' + i).getAttribute('data-matched') == 'false') {
      console.log("color is: " + document.getElementById('box' + i).style.backgroundColor);
      var first = 0;
      if (comparing[0] != null) {
        first = 1;
      }
      comparing[first] = document.getElementById('box' + i).id;
    }
  }
  //if boxes are not a match change them back to black
  if (document.getElementById(comparing[0]).getAttribute('data-myColor') != document.getElementById(comparing[1]).getAttribute('data-myColor')) {
    document.getElementById(comparing[0]).setAttribute('style', 'background-color: black');
    document.getElementById(comparing[1]).setAttribute('style', 'background-color: black');
  } else {
    //if they are a match, leave them as colored
    //set their matched attribute to true, and increase the score
    score += 1;
    console.log(score);
    document.getElementById("score").innerHTML = score;
    document.getElementById(comparing[0]).setAttribute('data-matched', 'true');
    document.getElementById(comparing[1]).setAttribute('data-matched', 'true');
    if (score === numItems / 2) {
      var win = document.createElement('article');
      var text = document.createTextNode('You Win!');
      win.appendChild(text);
    }
  }

}
