## Gridworld spec

### Custom gridworlds
Make it easy for user to create custom gridworld:


- need some way of specifying terminal states (independent of specifying something as a named feature).

- add labels

- remove references to restaurants. talk about terminals, landmarks, namedLocation. 

- GENERAL: renamed beliefAgent -> makePOMDPAgent, makePomdpAgentWithDelays. other agents should be named similarly: makeMDPAgent, makeMDPHyperbolicAgent. All should be in agents/ directory. 

### Incremental plan

0. Go through beliefDelay and belief/ examples and simplify them. 

1. Currently, makeGridworld and other stuff in src/ have lots of globals. We could make many of these local. Is this worth doing?

1. Instead of restaurantNameToObsevationTime11, have some special agent models example object. IT's ok to put this in the restaurantChoice example. 

1. Could have makeRestaurantChoiceMDP and makeHike output the startState and
utility function constructor also. 

3. Merge makeGridworldPomdp with mdp script?

4. Make a more detailed plan for having non-terminal features. 



```javascript
var makeGridWorld = function(options){

//  assert: check correctness of options
var defaultOptions = {transitionNoiseProbability: 0,
    startingLocation: [0,0],
    noReverse: false
}


  return {world: world, startState: startState, feature: feature}
};
  

// example
var gridFeatures = [[ '' ,  '' ],
                     [ '' , '#'] ];
// with terminals:
// [ [ '', 'T'],                     

var options = {
    gridFeatures: gridFeatures,
    noReverse: false,
    transitionNoiseProbability:0,
    totalTime: 5,
    startingLocation: [0,0],
    labels: [ {location:[0,1], label:'cafe'} ]
    }


var gridWorld = makeGridWorld(options);
var agent = makeMDPAgent({alpha:100, utility:utility}, gridWorld.world);
var actions = simulateMDP(gridWorld.startState, gridWorld.world, agent, 'actions');


```


### Todos for restaurant and other examples

1. remove restaurant and hiking examples from gridworld.wppl and put them in separate script. this script can go last in the JSON since nothing in src/ depends on it.

2. get rid of makeDonutWorld2. and do other cleanups

3. Maybe put pomdp gridworld in same script as gridworld. 

