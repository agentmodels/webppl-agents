## Bandit Spec

### TODOs
1. Remove deterministicBandit and any references to it
2. After making unified script for bandits, redo webppl-gridworld/tests, JSON and use of bandits in webbook

### Spec for bandits

There is one main constructor. This function takes the number of arms (`numberArms`), the mapping from arms to ERPs on rewards (`armToRewards`) and the number of trials (`numberTrials`).

It constructs the `world` object, which has `transition`, `observe` and `manifestStateToAction` methods. These depend on `numberArms` but not on `armToRewards`. It also constructs the start state (`start`). This depends on both `armToRewards` and on `numberTrials`. Previously, we had a constructor for making the world and we let the user make the start state on their own. This means the user has to deal with implementation details like the "manifestState" property for states. It also means there is not an immediate check that the latent state for the start state is well formed (i.e. it matches the number of arms).

Finally, there is an optinal boolean argument for whether rewards are numerical (as in standard bandits) or are strings (as in our "IRL Bandits" example). This defaults to numerical bandits. If the rewards are numerical, we also output the utility function (which is 0 at 'start' and otherwise is the identity on the reward).

The current Bandit constructors (`stochasticBandits` and `irlBandits`) assume stochastic or deterministic mappings from arms to rewards respectively. But ideally the `armToRewards` arguments is always a mapping from arms to ERPs. In the deterministic case they are deltaERPs. (We could have another optional argument to check that all ERPs are deltas). This means we can have ERPs over prizes as well as numerical rewards.

One question is how to implement the transition function. Ideally, we would have a transition function that allowed us to do the 'fastUpdate'. Currently, stochastic bandits doesn't make this possible.  stochastic bandits is that given a state-action pair, you sample a reward and then transition to a state with the reward as the location. The `observe` function does not actually play any role.



```javascript
var makeBanditWorld = function( numberArms, armToRewards, numberTrials, numericalRewards){

// assert: number of keys in armToRewards is numberArms.
// assert: armToReward values are ERPs
// assert: numericalRewards is optional with default value false. if true, then
// check that values of armToRewards are numbers. otherwise they should be strings. 

var world = _makeBanditWorld(numberArms);
          // = {transition: ..., observe:, manifestStateToActions: }

var start = buildState({loc:'start', timeLeft:numberTrials,terminateAfterAction:false}, armToReards)

var utility = numericalRewards ?
function(state,action){
  var reward = state.manifestState.loc;
  return reward === 'start' ? 0 : reward;
} : undefined;
  
return {world: world, start: start, utility: utility}
```
