//include the dicionary of kanjis
Qt.include("dictionary.js")

// With this I can take any element and reduce my array in order not significant//
Array.prototype.popElement = function(element){

		var aux = this[element];
                if (element + 1 == this.length){
                        this.pop();
                }
                else if (element == 0){
                        this.shift();
                }
                else {
                        this[element] = this.pop();

                }
                return aux;
}

//this make a copy no reference to another array, copy the elements in real//
Array.prototype.copyNoref = function(){

                var copyArray = new Array(this.length);
                for (var i = 0; i < this.length; i++)
                        copyArray[i] = this[i];
                return copyArray;

}

var kanjiDic;
var maxColumn = 5;
var maxRow = 4;
var maxIndex = maxColumn * maxRow;
var component = Qt.createComponent("../Card.qml");
var componentOk = Qt.createComponent("../Ok.qml");
var kanjis = new Array(10);
var refKanjis = new Array(10);
var board = new Array(maxIndex);
var okboard = new Array(maxIndex);
var guide;
var positions =  new Array();
var clicks = 0;
var posclick = null;
var positionClicks;
var hits = 0;

function kanjiSort(){
	//get ten kanjis to show/draw on canvas/board
	for(var i = 0; i < 10; i++)
		kanjis[i] = kanjiDic.popElement(Math.floor(Math.random() * kanjiDic.length));
	refKanjis = kanjis.copyNoref();
}

function newGame(){
	//load or reload all the game needs
	positions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
	kanjiDic = dictionary.copyNoref();
	clicks = 0;
	positionClicks = new Array();
	guide = new Array(maxIndex);
	posclick = null
	kanjiSort();
	balloon_.opacity = 1;
	balloon_.text = "Find the same kanji and discover\n how to read and pronounce it.";
	hits = 0;

	for(var i = 0; i < maxIndex; i++)
	{
		if(okboard[i] != null)
		{
			okboard[i].destroy();
		}
		if(board[i] != null)
		{

			board[i].destroy();
		}
	}
	for (var i = 0 ; i < maxIndex; i++){
		okboard[i] = null;
		board[i] = null;
		okCard(i);
	}
	for (var i = 0 ; i < 10; i++)
	{
		Create(i);
	}
	drawBoard();
}

function drawBoard(){

	var count = 0;
	for(var column  = 0; column< 4; column++)
	{
		for (var row = 0; row < 5; row++)
		{
			okboard[count].x = 40 + (row * (60 + 10));
 	                okboard[count].y = 176 + (column * (68 + 10));

			board[count].x = 40 + (row * (60 + 10));
			board[count].y = 176 + (column * (68 + 10));
			count++;
		}
	}
}

function okCard(index){

	var okCard_;

	if(componentOk.status == Component.Ready){
		okCard_ = componentOk.createObject(gameCanvas);

		if (okCard_ == null){
                        console.log("error creating card");
                        console.log(componentOk.errorString());
                        return false;
		}
		okCard_.width = 60;
		okCard_.height = 68;
		okCard_.opacity = 0;
		okboard[index] = okCard_;

	} else {
                console.log("error loading card component");
                console.log(componentOk.errorString());
                return false;
        }

}
function verify(type, pos){

	clicks++;
	positionClicks.push(pos);

	if (clicks <= 3)
		{
		if (clicks == 2 && positionClicks[0] == positionClicks[1]){
			clicks = 1;
			positionClicks.pop();

		}
		if (clicks == 2 && board[positionClicks[0]].type == board[positionClicks[1]].type && positionClicks[0] != positionClicks[1]){
			 board[positionClicks[0]].opacity = 0;
                         board[positionClicks[1]].opacity = 0;
                         okboard[positionClicks[0]].opacity = 1;
                         okboard[positionClicks[1]].opacity = 1;
			 clicks = 0;
                         positionClicks.shift();
                         positionClicks.shift();
			 balloon_.text = "The kanji "+ guide[pos]["kanji"] +" that you hit reads\n '"+ guide[pos]["romanji"] +"' and means '"+ guide[pos]["meaning"] + "'.";
			hits++;
		}
		if (clicks == 3){

			if(board[positionClicks[0]].type == board[positionClicks[1]].type && (positionClicks[0] != positionClicks[2] && positionClicks[1] != positionClicks[2])) {

				board[positionClicks[0]].opacity = 0;
				board[positionClicks[1]].opacity = 0;
				okboard[positionClicks[0]].opacity = 1;
                                okboard[positionClicks[1]].opacity = 1;

				clicks = 1;
				positionClicks.shift();
				positionClicks.shift();
				balloon_.text = "The kanji "+ guide[pos]["kanji"] +" that you hit reads\n '"+ guide[pos]["romanji"] +"' and means '"+     guide[pos]["meaning"] + "'.";
				hits++;

			} else if(positionClicks[0] == positionClicks[2] || positionClicks[1] == positionClicks[2]) {
				clicks = 2;
				positionClicks.pop();

			} else {
				board[positionClicks[0]].timeFlap =  150;
			        board[positionClicks[1]].timeFlap = 150;

				board[positionClicks[0]].flipped = false;
				board[positionClicks[1]].flipped = false;
				clicks = 1;
				positionClicks.shift();
				positionClicks.shift();
			}


		} else { ; }

	}
	if (hits == 10)
                balloon_.text = "Congratulations!!! =]";


}

function Create(index){

	var ideogram;
	var pos_card;
	var pos_match;

	if(component.status == Component.Ready){
		var card = component.createObject(gameCanvas);
		var card_match = component.createObject(gameCanvas);
		if (card == null || card_match == null){
			console.log("error creating card");
			console.log(component.errorString());
			return false;
		}

		ideogram = kanjis.popElement(Math.floor(Math.random() * kanjis.length));

		card.text = ideogram["kanji"];
		card_match.text = ideogram["kanji"];
		card.type = index;
		card_match.type = index;
		card.width = 60;
		card.height = 68
		card_match.width = 60;
		card_match.height = 68;
		card.source_front  = "images/back.png";
		card.source_back = "images/face.png";
		card_match.source_front = "images/back.png";
		card_match.source_back = "images/face.png";
		pos_card  = positions.popElement(Math.floor(Math.random() * positions.length));
		pos_match = positions.popElement(Math.floor(Math.random() * positions.length));
		card.gridposition = pos_card;
		card_match.gridposition = pos_match;
		guide[pos_card] = ideogram;
		guide[pos_match] = ideogram;
		board[pos_card] = card;
		board[pos_match] = card_match;

	} else {
		console.log("error loading card component");
		console.log(component.errorString());
		return false;
	}
}
