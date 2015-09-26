
from Adafruit_MCP230xx import Adafruit_MCP230XX
import RPi.GPIO as GPIO

mcp = Adafruit_MCP230XX(busnum = 1, address = 0x20, num_gpios = 16)
for i in range(0, 16):
	mcp.config(i, Adafruit_MCP230XX.OUTPUT)

for i in range(0, 16):
	mcp.output(i, 0)  

GPIO.setmode(GPIO.BCM)

pins = [[26, 0, 8], [19, 1, 9], [13, 2, 10], [21, 3, 11], [20, 4, 12], [16, 5, 13]]
for pin in pins:
	GPIO.setup(pin[0], GPIO.IN, pull_up_down=GPIO.PUD_UP)

try:
	while True:
		for pin in pins:
			if GPIO.input(pin[0]):
				mcp.output(pin[1], 0)
				mcp.output(pin[2], 1)
			else:
				mcp.output(pin[1], 1)
				mcp.output(pin[2], 0)

except KeyboardInterrupt:
	GPIO.cleanup()

