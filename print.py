#!/usr/bin/env python

import time
import serial

port = serial.Serial(port='/dev/ttyAMA0', baudrate=19200, parity=serial.PARITY_NONE, stopbits=serial.STOPBITS_ONE, bytesize=serial.EIGHTBITS, timeout=1)

port.open()
port.flushOutput()

port.write('hi there! hi there! hi there! hi there! hi there! hi there! hi there! hi there! \n');

port.write('\n\n\n\n');

port.close();
