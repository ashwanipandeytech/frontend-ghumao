#!/bin/bash
clear
git add .
git commit -m "changes for build done"
git checkout gh-pages
git merge master
ng build --prod --base-href https://ashwanipandeytech.github.io/ghumao/
ngh --dir=dist/ghumao
