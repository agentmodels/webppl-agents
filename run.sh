#! /bin/bash

SCRIPT=$1
SCRIPT_FILENAME=$(echo "$SCRIPT" | rev | cut -d"/" -f1 | rev)
CURRENT_PATH=$(pwd)


#make an html file with the code from your script included
sed "/@codehere@/{
      s/@codehere@//g
      r $SCRIPT
}" runHtml/run.html > runHtml/$SCRIPT_FILENAME.html

python -mwebbrowser file://$CURRENT_PATH/runHtml/$SCRIPT_FILENAME.html
