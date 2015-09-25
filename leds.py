
from Adafruit_MCP230xx import Adafruit_MCP230XX
import time

mcp = Adafruit_MCP230XX(busnum = 1, address = 0x20, num_gpios = 16)

for i in range(0, 16):
	mcp.config(i, Adafruit_MCP230XX.OUTPUT)

for i in range(0, 16):
	mcp.output(i, 0)  

while True:
	for i in [0, 1, 2, 8, 9, 10, 3, 4, 5, 11, 12, 13]:
		mcp.output(i, 1)
		time.sleep(0.1)
		mcp.output(i, 0)
