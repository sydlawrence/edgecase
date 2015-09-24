#test.py

import sys



argument = 'hell'

for arg in sys.argv:
  if arg != __file__:
    argument = arg

print argument
