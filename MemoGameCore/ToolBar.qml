/**Copyright (C) 2011 by Leonidas S. Barbosa - kirotawa@gmail.com

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


//This file represent the toolbar and the bottons New and Quit

import QtQuick 1.0

Item {
	id: toolbar
	
	signal clicked
	 
	BorderImage { source: "images/toolbar.png"; width: parent.width; height: parent.height + 14; y: -7 ;}

	Text {
		id: new_ 
		anchors.left: parent.left; anchors.leftMargin: 10 
		anchors.verticalCenter: parent.verticalCenter
		
		text: "New"
		color: "white"
		font.pixelSize: 20
	        
			
		MouseArea {
			anchors.fill: parent
			hoverEnabled: true
			onClicked:  {
					newGame()		
				 	toolbar.clicked()
			}
			onEntered: new_.color = "gray" 
			onExited: new_.color = "white"
		}
	}
	Text {
		id: quit_
		anchors.left: new_.right; anchors.leftMargin:15 
		anchors.verticalCenter: parent.verticalCenter
		text: "Quit"
		color: "white"
		font.pixelSize: 20
		
		MouseArea {
			anchors.fill: parent
			hoverEnabled: true
			onClicked:Qt.quit(); 
			onEntered: quit_.color = "gray"
			onExited: quit_.color = "white"
		}
	}
}
