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

**makePOMDPAgent**

- if you have no delays, then it goes to beliefAgent, otherwise beliefDelay.
- rename as POMDPAgent, POMDPAgentDelays.
- single simulate function
- general inference function

**naming**:

- agents/makeMDPAgent, makePOMDPAgent, makePOMDPAgentDelay, makeMDPAgentHyperbolic
- one *simulate* function that dispatches based on agent type?
- individual simulate functions: simulateMDPAgent, simulatePOMDPAgent, etc.
- where possible, script should have name of main function

- TODO rename makeHyperbolic function




