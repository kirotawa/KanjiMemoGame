/**
###########################################################
#							  #
#  Author: kirotawa[put a sign here]gmail[a dot here]com  #
#  version: 0.1 - name: tamago - 2011			  #	
###########################################################

Copyright (C) 2011 by Leonidas S. Barbosa - kirotawa@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

**/

//Main file: Screen and all game is here

import QtQuick 2.4
import "MemoGameCore" 1.0 as MemoGame
import "MemoGameCore/js/script.js" as Logic

Item {
    
	id: screen
	width: 412
   	height: 492
	signal clicked
	
	function newGame() { Logic.newGame() }
	function verify(type, pos) {Logic.verify(type, pos) }
	
	
	Rectangle {
		id: background
		anchors.fill: parent
		
		Image { source: "MemoGameCore/images/background.png"; fillMode: Image.Tile; anchors.fill: parent}
		
		
	}	
	MemoGame.ToolBar {
		id: toolBar;
		anchors.top: parent.top;
		height: 67
		width: 412
		
	}
	MemoGame.Ballon {
		id: balloon_
		anchors.top: toolBar.top;
		height: 348
		width: 90
		opacity: 0
	}
	Rectangle {
		id: gameCanvas
		
		
				
	}	
}
