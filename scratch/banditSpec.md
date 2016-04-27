## Bandit Spec

### TODOs
1. Remove deterministicBandit and any references to it
2. After making unified script for bandits, redo webppl-gridworld/tests, JSON and use of bandits in webbook

### Spec for Bandits constructor

There is one main constructor: `makeBanditWorld`. This function takes the number of arms (`numberArms`), the mapping from arms to ERPs on rewards (`armToRewards`) and the number of trials (`numberTrials`). It outputs an object `{world: {transition:, observe:, manifestStateToActions}, start: {manifestState:, latentState:}}`. Since we output both a world and startState, we could call this `makeBanditWorldAndStart` but that's a bit awkward. 

The constructor builds the `world` object, which has `transition`, `observe` and `manifestStateToAction` methods. These depend on `numberArms` but not on `armToRewards`. It also constructs the startState (`start`). This depends on both `armToRewards` and on `numberTrials`. Previously, we had a constructor for making the world and we let the user make the startState on their own. This means the user has to deal with implementation details like the "manifestState" property for states. It also means there is not an immediate check that the latent state for the startState is well formed (i.e. it matches the number of arms).

Finally, there is an optinal boolean argument for whether rewards are numerical (as in standard bandits) or are strings (as in our "IRL Bandits" example). This defaults to numerical bandits. If the rewards are numerical, we also output the utility function (which is 0 at 'start' and otherwise is the identity on the reward).

The current Bandit constructors (`stochasticBandits` and `irlBandits`) assume stochastic or deterministic mappings from arms to rewards respectively. But ideally the `armToRewards` arguments is always a mapping from arms to ERPs. In the deterministic case they are deltaERPs. (We could have another optional argument to check that all ERPs are deltas). This means we can have ERPs over prizes as well as numerical rewards.

Here is the code. I've also include a helper function to build the agent's utility function. 

```javascript

var makeBanditWorld = function( numberArms, armToRewards, numberTrials, numericalRewards){

// alternatively, args could be "( numberArms, armToRewards, numberTrials, options )"
// where *options* are {numericalRewards: true, deterministicArms:false}

// assert: number of keys in armToRewards is numberArms.
// assert: armToReward values are ERPs
// assert: numericalRewards is optional with default value false. if true, then
// check that values of armToRewards are numbers. otherwise they should be strings. 

  var world = _makeBanditWorld(numberArms);
          // = {transition: ..., observe:, manifestStateToActions: }

  var start = buildState({loc:'start', timeLeft:numberTrials,terminateAfterAction:false}, armToRewards)

  return {world: world, start: start, armToRewards, numericalRewards}
}

var makeBanditUtility( world, prizeToUtility){
  // if world.numericalRewards, utility function is 0 at 'start' and the same as reward otherwise.
  // assert that *prizeToUtility* has key from support of values in armToRewards
  // *start* has zero utility.
}
```

### Implementation issues
To use `fastUpdate`, we modify the current function in `beliefAgent.wppl` so that it updates the manifestState based on the observation. Currently, `fastUpdate` assumes the transitions of the manifestState are deterministic. (We should be able to deal with both the stochastic and determinstic cases by updating the manifestState directly from the observation. So there is no increase in the length of the code). 


### Breaking the task into incremental steps
Various tests in webppl-gridworld and agentmodels codeboxes use bandits. To make an incremental transition to having a single bandits script in src/, you can define the `makeBanditWorld` function and use this to define `makeIRLBanditWorld` and so on.
