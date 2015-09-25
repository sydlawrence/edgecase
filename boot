#!/bin/bash
sudo /home/pi/app/screen.py "SCANNING FOR UPDATES"
cd /home/pi/app && git pull && npm install
sudo /home/pi/app/screen.py "PUTTING ON CLOTHES"
/usr/local/bin/node /home/pi/app/app.js

