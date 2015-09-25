#!/usr/bin/env python

import smbus
import time

bus = smbus.SMBus(1)
smoke_addr = 0x08

strength = ''

for arg in sys.argv:
  if arg != __file__:
    strength = arg

print "puffing smoke"
bus.write_byte(smoke_addr, strength)
