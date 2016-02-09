#! /bin/bash

SCRIPT=$1
CURRENT_PATH=$(pwd)

#make an html file with the code from your script included
sed "/@codehere@/{
      s/@codehere@//g
      r $SCRIPT
}" runHtml/run.html > runHtml/$SCRIPT.html

python -mwebbrowser file://$CURRENT_PATH/runHtml/$SCRIPT.html
