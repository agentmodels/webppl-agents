echo "installing dependencies for running in the browser"
DEPS=webppl-dependencies
mkdir $DEPS
git clone https://github.com/probmods/webppl.git            $DEPS/webppl
git clone https://github.com/stuhlmueller/webppl-timeit.git $DEPS/webppl-timeit
git clone https://github.com/stuhlmueller/webppl-dp.git     $DEPS/webppl-dp
git clone https://github.com/probmods/webppl-viz            $DEPS/webppl-viz
npm link $DEPS/webppl-timeit 
npm link $DEPS/webppl-dp 
npm link $DEPS/webppl-viz
npm link $DEPS/webppl 
npm install grunt uglify browserify
npm install -g grunt-cli 
npm install

echo "Installing dependencies for running from the command line"
mkdir ~/.webppl
npm install --prefix ~/.webppl https://github.com/stuhlmueller/webppl-dp
npm install --prefix ~/.webppl https://github.com/stuhlmueller/webppl-timeit
npm install --prefix ~/.webppl https://github.com/probmods/webppl-viz
