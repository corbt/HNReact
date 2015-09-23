#!/usr/bin/env python3

"""
Searches Google's material-design-icons for a certain icon.
Upon finding a match, asks for confirmation for file name.
Then, copies the proper resources to the corresponding drawable folder
of the desired program into the correct folders:
drawable-mdpi, drawable-hdpi, drawable-xhdpi, drawable-xxhpdi, drawable-xxxhdpi

IMPORTANT: Change resDir to the appropriate `/res/` folder path.

USAGE: ./copyicon.py <icon> [<new name>]
"""

import fnmatch, os, shutil, subprocess, sys

# CHANGE THIS PATH TO YOUR RES FOLDER
resDir = os.path.dirname(os.path.realpath(__file__))+'/../android/app/src/main/res'

# Material design icon directory path
iconDir = '/tmp/material-design-icons'

###########################################


# Sanitize the configuration
resDir  = os.path.abspath(os.path.expanduser(resDir))
iconDir = os.path.abspath(os.path.expanduser(iconDir))

# Get the file name from a path name
def getFileName(pathname):
    split = pathname.split('/')
    return split[(len(split) - 1)]

# Require a correct number of arguments
if len(sys.argv) > 3 or len(sys.argv) < 2:
    sys.exit('Usage: ./copyicon <icon> [<new name>]')

# Sanitize inputs
findFile = sys.argv[1].replace(' ', '_') # replaces spaces with underscores
if len(sys.argv) == 3:
    newFileName = sys.argv[2]
    # Add .png extension if missing input
    if '.png' not in newFileName:
        newFileName += '.png'
else:
    newFileName = None

# File matching pattern
find = '*' + findFile + '*.png'

# Check if the material design icons are in the iconDir directory.
if not os.path.isdir(iconDir):
    url = 'https://github.com/google/material-design-icons'
    subprocess.call('git clone ' + url + ' ' + iconDir, shell=True)
    print()


# Check if resource directory exists
if not os.path.isdir(resDir):
    sys.exit('The specified resource folder \''
            + resDir + '\' does not exist.\n'
            + 'Change the \'resDir\' variable in this script.')

# Find files that match the icon and dp size
matches = []
for root, directories, filenames in os.walk(iconDir):
    if 'drawable' in root:
        for filename in fnmatch.filter(filenames, find):
            matches.append(os.path.join(root, filename))

# Alert user if there are no matches
if len(matches) == 0:
    sys.exit('No matches found for \'' + findFile + '\'')

# Sort matches alphabetically
matches.sort()

# Options found within mdpi folder
options = []
i = 0

# Show options
print('Options: ')
for pathname in matches:
    if 'mdpi' in pathname:
        options.append(pathname)
        print('[' + str(i) + ']: ' + getFileName(pathname))
        i += 1

# Get user selection
index = int(input('Selection: '))

# Error with selection index
if index < 0 or index >= len(options):
    sys.exit('Selection must be between 0 and ' + str(len(options) - 1) + '.')

# Get icon file name from full path name
icon = getFileName(options[index])
if newFileName is None:
    newFileName = icon

# Drawable directories path names
mdpi = resDir + '/drawable-mdpi'
hdpi = resDir + '/drawable-hdpi'
xhdpi = resDir + '/drawable-xhdpi'
xxhdpi = resDir + '/drawable-xxhdpi'
xxxhdpi = resDir + '/drawable-xxxhdpi'

# Ensure that the directories exist
if not os.path.isdir(mdpi):
    os.mkdir(mdpi)
if not os.path.isdir(hdpi):
    os.mkdir(hdpi)
if not os.path.isdir(xhdpi):
    os.mkdir(xhdpi)
if not os.path.isdir(xxhdpi):
    os.mkdir(xxhdpi)
if not os.path.isdir(xxxhdpi):
    os.mkdir(xxxhdpi)

# Copy the files into their corresponding directories
for filename in matches:
    if icon in filename:
        if 'xxxhdpi' in filename:
            shutil.copy2(filename, xxxhdpi + '/' + newFileName)
        elif 'xxhdpi' in filename:
            shutil.copy2(filename, xxhdpi + '/' + newFileName)
        elif 'xhdpi' in filename:
            shutil.copy2(filename, xhdpi + '/' + newFileName)
        elif 'hdpi' in filename:
            shutil.copy2(filename, hdpi + '/' + newFileName)
        elif 'mdpi' in filename:
            shutil.copy2(filename, mdpi + '/' + newFileName)

print(icon + ' has been copied successfully as ' + newFileName + '.')
