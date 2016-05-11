#! /bin/bash 

TEST_LOCATION=${1-tests/regTests}
CURRENT_PATH=$(pwd)
REQUIRES="--require webppl-timeit --require webppl-dp --require $CURRENT_PATH"

TEST_FILES=$(find $TEST_LOCATION -name "*.wppl" -type f )

for testfile in $TEST_FILES 
do
  webppl $testfile $REQUIRES || { echo "$testfile failed" ; exit 1; }
done
echo "tests passed"
