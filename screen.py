#!/usr/bin/env python

import smbus
import time

bus = smbus.SMBus(1)
screen_addr = 0x04
smoke_addr = 0x08
light_addr = 0x0C

toPrint = ''

for arg in sys.argv:
  if arg != __file__:
    toPrint = arg

print "updating display"
for c in bytearray(toPrint):
        bus.write_byte(screen_addr, c)

print toPrint
