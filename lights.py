#!/usr/bin/env python

import smbus
import time
import sys

bus = smbus.SMBus(1)
light_addr = 0x0C

power = 0

for arg in sys.argv:
  if arg != __file__:
    power = arg

bus.write_byte(light_addr, power)


print "done"
