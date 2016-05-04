## Gridworld spec

### Custom gridworlds
Make it easy for user to create custom gridworld:


- need some way of specifying terminal states (independent of specifying something as a named feature).

- add labels

- remove references to restaurants. talk about terminals, landmarks, namedLocation. 

### Incremental plan

0. Go through beliefDelay and belief/ examples and simplify them. 

1. Currently, makeGridworld and other stuff in src/ have lots of globals. We could make many of these local. Is this worth doing?

1. Instead of restaurantNameToObsevationTime11, have some special agent models example object. IT's ok to put this in the restaurantChoice example. 

1. Could have makeRestaurantChoiceMDP and makeHike output the startState and
utility function constructor also. 

3. Merge makeGridworldPomdp with mdp script?

4. Make a more detailed plan for having non-terminal features. 





### Redo beliefAgent

** general **
- two simple inference functions for general use (not gridworld or bandits specific)

**makePOMDPAgent**
- better asserts. check that startState is in support of prior
- clean up POMDP utils


**naming**:
- agents/makeMDPAgent, makePOMDPAgent, makePOMDPAgentDelay, makeMDPAgentHyperbolic
- one *simulate* function that dispatches based on agent type?
- individual simulate functions: simulateMDPAgent, simulatePOMDPAgent, etc.
- one makeMDPAgent function and same for POMDP. Could put things in same script. 

- TODO rename makeHyperbolic function


BIG:
- write the chapter explaining the library
- rename REPO
- DO GREEDY AND MYOPIC (ask AS)
- gridworld draw should take pomdps and any kind of trajectory. also need a display for POMDPs!


