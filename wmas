#!/usr/bin/env python

import smbus
import time

bus = smbus.SMBus(1)
screen_addr = 0x04
smoke_addr = 0x08
light_addr = 0x0C

print "updating display"
for c in bytearray("wemakeawesomesh.it"):
        bus.write_byte(screen_addr, c)

print "popping smoke"
bus.write_byte(smoke_addr, 10)

print "pulsing lights"
for b in range(128, -1, -1):
        bus.write_byte(light_addr, b)
        time.sleep(0.01)
for b in range(0, 129):
        bus.write_byte(light_addr, b)
        time.sleep(0.01)

print "done"
