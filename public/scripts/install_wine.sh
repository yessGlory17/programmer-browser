#!/bin/bash

sudo dpkg --add-architecture i386

curl -fsSL  https://dl.winehq.org/wine-builds/Release.key | sudo apt-key add -

sudo apt-add-repository https://dl.winehq.org/wine-builds/ubuntu/

sudo apt-add-repository https://dl.winehq.org/wine-builds/ubuntu/
sudo apt-get update

sudo apt-get install -y --install-recommends winehq-stable
sudo apt-get install -y winetricks
sudo apt-get install -y winbind
sudo apt-get install -y wine