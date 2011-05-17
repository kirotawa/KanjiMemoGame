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
#QObject.connect(view.engine(), SIGNAL(quit()),app, SLOT(quit()))
view.setSource(url)
QObject.connect(view.engine(), SIGNAL('quit()'),app, SLOT('quit()'))
view.show()

#sys.exit(app.exec_())
app.exec_()
