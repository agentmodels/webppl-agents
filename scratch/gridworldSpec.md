## Gridworld spec

### Custom gridworlds
Make it easy for user to create custom gridworld:

- single constructor function for both stochastic and not.
- need some way of specifying terminal states (independent of specifying something as a named feature).
- add labels
- remove references to restaurants. talk about terminals, landmarks, namedLocation. 


### Incremental plan

0. Remove examples that fail and have some simple examples of restaurant choice that pass (with mdp and belief agents). 

1. Could have makeRestaurantChoiceMDP and makeHike output the startState and
utility function constructor also. 

3. Merge pomdp with mdp script.

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

