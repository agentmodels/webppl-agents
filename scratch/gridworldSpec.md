## Gridworld spec

Desirable features:
- one function for both stochastic and not.
- need some way of specifying terminal states (independent of specifying something as a named feature).
- need clear way of adding labels and to visual display


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

var options = {
    gridFeatures: gridFeatures,
    noReverse: false,
    transitionNoiseProbability:0,
    totalTime: 5,
    startingLocation: [0,0]
    }

var gridWorld = makeGridWorld(options);
var agent = makeMDPAgent({alpha:100, utility:utility}, gridWorld.world);
var actions = simulateMDP(gridWorld.startState, gridWorld.world, agent, 'actions');


```
