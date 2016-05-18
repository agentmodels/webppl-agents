#! /bin/bash 

SCRIPT=$1

WEBPPL_PATH=node_modules/webppl
CURRENT_PATH=$(pwd)
DEPS_PATH=$CURRENT_PATH/webppl-dependencies

if [ ! -d "$WEBPPL_PATH" ]; then 
  npm install webppl@latest 
  cd $WEBPPL_PATH
  npm install
else 
  cd $WEBPPL_PATH
fi

grunt bundle:$DEPS_PATH/webppl-timeit:$DEPS_PATH/webppl-dp:$DEPS_PATH/webppl-viz:$CURRENT_PATH
cp bundle/webppl.js $CURRENT_PATH/runHtml/assets/js/

cd $CURRENT_PATH
sh run.sh $SCRIPT
