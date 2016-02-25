

## List of small todos to make code more readable and consistent


###1. BeliefAgent and Hyperbolic
- Call *simulate* function something more specific, e.g. *simulateHyperbolic*. 

- 'statesOrActions' argument to *simulate* function is now called ‘outputVariables’. See example in `beliefDelayAgent` of the possible string values.
https://github.com/agentmodels/webppl-gridworld/blob/master/src/beliefDelayAgent.wppl#L157

- rename `digest` to something more descriptive. maybe `postTerminal` or `terminal`. the property of state that is decremented should have some indication of this: e.g. `postTerminalTimeleft`. 

### Hyperbolic
- Merge `likelyPath` with `getExpectedUtility`. Given `likelyPath` a more description name (`MAPActionPath` or something). 


### BeliefAgent
- remove runBandit from src/beliefAgent.wppl (unless it needs to be there for some reason)

- cutoffCondition -> terminateCondition (as in beliefDelayAgent)

### Ideas
- extension: consider agent doing approximate inference for updateBelief. then infer what kind of approximate inference agent is performing. 
(good project for cocosci / cocolab)

- allow observations as part of trajectory (so you are doing inference for the agent, conditional on the observations that were in fact observed to take place). 

### Future changes (don't change for now)

- _agent -> _act

- observeStateActionPairs (and make the pairs objects)
