#! /bin/bash 


webppl tests/makeGridworld.wppl --require webppl-dp --require webppl-timeit --require .
webppl tests/beliefGridworld.wppl --require webppl-dp --require webppl-timeit --require .
webppl tests/hyperbolic.wppl --require webppl-dp --require webppl-timeit --require .
