#!/bin/bash

cd /home/pi/app && git pull && npm install
/usr/local/bin/node /home/pi/app/app.js
