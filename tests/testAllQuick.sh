#! /bin/bash 

webppl tests/agents.wppl --require webppl-dp --require webppl-timeit --require .


webppl tests/makeGridworld.wppl --require webppl-dp --require webppl-timeit --require .
webppl tests/beliefGridworld.wppl --require webppl-dp --require webppl-timeit --require .
webppl tests/restaurantChoiceHyperbolic.wppl --require webppl-dp --require webppl-timeit --require .

webppl tests/bandits.wppl --require webppl-dp --require webppl-timeit --require .
webppl tests/boundVOI.wppl --require webppl-dp --require webppl-timeit --require .
webppl tests/procrastinationMDP.wppl --require webppl-dp --require webppl-timeit --require .
webppl tests/beliefVarious.wppl --require webppl-dp --require webppl-timeit --require .
