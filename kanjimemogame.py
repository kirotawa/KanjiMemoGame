#!/usr/bin/python
#-*- coding: utf-8 -*-

import sys
from PySide.QtCore import *
from PySide.QtGui import *
from PySide.QtDeclarative import QDeclarativeView
from PySide.QtDeclarative import QDeclarativeEngine

app = QApplication(sys.argv)
view = QDeclarativeView()
url = QUrl('MemoGame.qml')
view.setSource(url)
QObject.connect(view.engine(), SIGNAL('quit()'),app, SLOT('quit()'))
view.show()


app.exec_()
