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
d

** general **
- two simple inference functions for general use (not gridworld or bandits specific).

**makePOMDPAgent**
- better asserts. check that startState is in support of prior
- could clean up getSimulate a bit. 

BIG:
- write the chapter explaining the library
- rename REPO
- remove deprecated examples and install some working ones (copied from agentmodels)


### Gridworld viz:
The `Draw` function should take POMDP gridworlds. They now have a property `MDPWorld` and so this should be straightforward.

Draw function should take trajectories of any form. The simulate functions always have the `state` as the first element (if the output is state-action pairs). Gridworld states will always have either `state.loc` or `state.manifestState.loc`. So this should also be straightforward. 

POMDPs: it would be nice to display whether a restaurant is open or closed. 

Finally, it'd be good to write the documentation for `draw`, including custom labeling of states and plotting expected values. (I expect this to be quite short). 

##
- I like myopicUpdate/myopicReward better than updateMyopic/rewardMyopic. You're right that the difference is quicker to see in the latter case, but it feels more difficult to parse and doesn't lend itself well to being an adjective ("the myopic-update agent" vs "the update-myopic agent").


