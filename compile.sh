#! /bin/bash 

SCRIPT=$1

WEBPPL_PATH=node_modules/webppl
CURRENT_PATH=$(pwd)

if [ ! -d "$WEBPPL_PATH" ]; then 
  npm install webppl@latest 
  cd $WEBPPL_PATH
  npm install
else 
  cd $WEBPPL_PATH
fi

grunt compile:$CURRENT_PATH 
cp compiled/webppl.js $CURRENT_PATH/runHtml/assets/js/

cd $CURRENT_PATH

#make an html file with the code from your script included
sed "/@codehere@/{
      s/@codehere@//g
      r $SCRIPT
}" runHtml/run.html > runHtml/$SCRIPT.html

python -mwebbrowser file://$CURRENT_PATH/runHtml/$SCRIPT.html
