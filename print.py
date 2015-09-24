#!/usr/bin/env python

import time
import serial

import sys

toPrint = ''

for arg in sys.argv:
  if arg != __file__:
    toPrint = arg

print toPrint


port = serial.Serial(port='/dev/ttyAMA0', baudrate=19200, parity=serial.PARITY_NONE, stopbits=serial.STOPBITS_ONE, bytesize=serial.EIGHTBITS, timeout=1)

port.open()
port.flushOutput()

port.write(toPrint);

port.write('\n\n\n\n');

port.close();
