/** Copyright (C) 2011 by Leonidas S. Barbosa - kirotawa@gmail.com

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


//This file represent the card of game and your flip

import QtQuick 1.0

Flipable {
	id: container

	signal clicked
	property string text
	property bool flipped: false
	property int angle: 0
	property int type
	property int timeFlap: 150
	property int gridposition
	property string source_front
	property string source_back

	front: Image { id: front; source: container.source_front;  anchors.centerIn: parent}
	back: Image {
			id: back
			source: container.source_back
			anchors.centerIn: parent

			Text {
                		id: kanji
                		color: "black"
               	 		anchors.centerIn: back; font.bold: true
                		text:container.text; styleColor: "black"
                		font.pixelSize: 20

        		}

		}

	MouseArea {

		id: mouseRegion
		anchors.fill: parent
		onClicked: {

			container.flipped = true
			verify(container.type, container.gridposition)
			container.clicked()
		}
	}


	transform: Rotation {
		id: rotation
		origin.x: container.width/2
		origin.y: container.height/2
		axis.x: 0; axis.y: 1; axis.z: 0
		angle: 0
	}

	states: [
		State {
			name: "Pressed"
			when: container.flipped
			PropertyChanges { target: rotation; angle: 180}
		}
	]
	transitions: Transition {
		NumberAnimation { target: rotation; property: "angle"; duration: container.timeFlap }
	}

}
