
from Adafruit_MCP230xx import Adafruit_MCP230XX

mcp = Adafruit_MCP230XX(busnum = 1, address = 0x20, num_gpios = 16)
mcp.config(0, Adafruit_MCP230XX.OUTPUT)
mcp.output(0, 1)  # Pin 0 High


