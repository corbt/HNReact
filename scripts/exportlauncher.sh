#!/bin/bash
cd "$(dirname "$0")/../design"

inkscape --file $(pwd)/logo-inkscape.svg --export-png $(pwd)/../android/app/src/main/res/mipmap-mdpi/ic_launcher.png --export-width 48
inkscape --file $(pwd)/logo-inkscape.svg --export-png $(pwd)/../android/app/src/main/res/mipmap-hdpi/ic_launcher.png --export-width 72
inkscape --file $(pwd)/logo-inkscape.svg --export-png $(pwd)/../android/app/src/main/res/mipmap-xhdpi/ic_launcher.png --export-width 96
inkscape --file $(pwd)/logo-inkscape.svg --export-png $(pwd)/../android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png --export-width 144
