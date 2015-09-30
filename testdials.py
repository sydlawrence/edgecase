#!/usr/bin/env python

import smbus
import time

bus = smbus.SMBus(1)
light_addr = 0x0C

print "pulsing lights"
bus.write_byte(light_addr, 1)

time.sleep(5)

bus.write_byte(light_addr, 0)
time.sleep(1)
print "done"

