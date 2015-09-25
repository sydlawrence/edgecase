#!/usr/bin/env python

import smbus
import time

bus = smbus.SMBus(1)
screen_addr = 0x04

toPrint = ''

for arg in sys.argv:
  if arg != __file__:
    toPrint = arg

print "updating display"
for c in bytearray(toPrint):
        bus.write_byte(screen_addr, c)

print toPrint