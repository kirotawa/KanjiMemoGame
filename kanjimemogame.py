#!/usr/bin/python

import sys
from PySide2.QtWidgets import QApplication
from PySide2.QtCore import *
from PySide2.QtGui import *
from PySide2.QtQuick import QQuickView

app = QApplication(sys.argv)
view = QQuickView()
url = QUrl('MemoGame.qml')
view.setSource(url)
QObject.connect(view.engine(), SIGNAL('quit()'), app, SLOT('quit()'))
view.show()

app.exec_()
