#!/bin/bash
sudo /home/pi/app/screen.py "Updating my brain"
cd /home/pi/app && git pull && npm install
sudo /home/pi/app/screen.py "Putting on my clothes"
/usr/local/bin/node /home/pi/app/app.js

