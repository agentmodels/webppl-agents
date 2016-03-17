## Changes and remaining tasks for library

### Changes
- `updateBelief` and `simulate` have constructor functions in beliefAgent.wppl. These constructors are used by both beliefAgent and beliefDelay. There are also a number of helper functions using within `makeBeliefAgent` and `makeBeliefDelayAgent` which are at the top of `makeBeliefAgent.wppl`. Note that `beliefDelayAgent.wppl` depends on `beliefAgent.wppl` as well as on the POMDPUtils.wppl. 

- The `makeAgent` and `simulate` functions take arguments of the same form (but `beliefDelay` requires boundVOI and myopia params etc.). So most tests that only depend on belief (not delays) can be written to work with both functions. You would use `getSimulateFunction('belief')` for the `beliefAgent` simulate function and `getMakeAgentFunction` for the makeAgent function. Note that the function `getPriorBelief` in POMDPutils.wppl is useful for building priors.

- I renamed most of the tests for consistency.

- `beliefDelayIRLBandits.wppl` contains a speed test. You can run only the speed test by choosing the relevant function at the bottom of the script. It's useful to measure scaling. 


### Todo
- Make hyperbolic.wppl as consistent as possible with beliefAgent.wppl. For example, agent -> act, and remove actualTimeLeft from simulate. 

- Finish a set of tests that show inference is working for beliefDelay agent on gridworld. This should include the standard hyperbolic examples (no uncertainty), the standard belief examples (no delays) and then inference over both. This should cover scenarios: (1) straight to veg, (2) to donut north (naive), (3) to veg via long route (sophisticated). There should also be a measure of the runtime of the generative model. One version should run as fast as possible while being non-trivial. Another version should be slower but do more inference. [OE: i believe this is basically done.]

- Smaller tasks: fix the bound-VOI test in tests/beliefDelayIRLBandits.wppl. Verify that boundVOI works correctly in current version of beliefDelay. (Best to ask me as test is not well documented). 

- Document the library functions (esp. those used in webbook). The agent models will be explained in detail in the text. But we need to document the "makeGridWorld" functions and give them informative names.

- fix bug with updateBeliefLatent (should be observation.observation == 'noObservation'). Change name of .observation attribute. Change default of using getFullObservation and getBeliefToAction. these assume POMDPs written in terms of manifestStates. for general library use, beliefAgent should not assume POMDPs in this form. 

