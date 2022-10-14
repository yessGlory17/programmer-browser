#!/bin/bash

sudo dpkg --add-architecture i386
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 86B72ED9
sudo add-apt-repository 'deb [arch=amd64] https://mirror.mxe.cc/repos/apt focal main'
sudo apt -qq update
sudo apt install -y --allow-downgrades libpcre2-8-0=10.34-7
sudo apt install -y wine32