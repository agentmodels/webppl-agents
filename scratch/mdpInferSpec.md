
# Plan for Chapters "Reasoning about agents"

## Goals for Part 1 of Chapter: Reasoning about MDP agents

Explain inference for different kinds of parameters:

1.	Inference of utility functions, with cost of a single action inferred by discounting like behavior.

2.	Inference of noise parameter alpha from agent being inefficient.

3.	Inference of transition noise (from agent taking long route in hiking). Discuss inference from actions vs. states. If you only have states, you need to learn transition noise from implicit things like taking the long route.


Explain various issues in inference:

1.	Inference from single action vs. single trajectory vs. multiple trajectories

2.	Unidentifiability: graphs showing the posterior on utilities in a case where things aren’t identified.

3.	Maybe discuss different inference methods --- but probably we defer this till later chapter. 


## Concrete plan

### General pointers

Most examples will be in the Donut gridworld, which is the examples described in the AAAI paper (Learning from Ignorant, Inconsistent Agents). The constructor function for this world is in gridworld.wppl. The function is:
`makeDonutInfer(smallVersion = true, … )` 

A number of examples of running the `mdpSimulate` agent from `gridworld.wppl` on the Donut world are in testMDPgenerative.wppl at:
https://github.com/agentmodels/webppl-gridworld/blob/master/testMDPgenerative.wppl#L34

Examples of simple inference functions that are efficient (in terms of runtime compared to generative model) are in `mdpInferExamples.wppl`. There is code here for efficient inference conditioning on a single trajectory. Code will need to be modified a little to do multiple trajectories from the same `startState` (and modified more for different startStates). The script is here:
https://github.com/agentmodels/webppl-gridworld/blob/master/mdpInferExamples.wppl

The inference will be over the utilities of all restaurants (with the two Donut Stores fixed to have identical utility), over `utilityTable.timeCost` and over `alpha`. 

Each example will illustrate the observed trajectory using `GridWorld.draw`. You should also use `viz.print` or `print` to display the posterior (or at least the posterior on some of the variables).

### Guidelines for implementation
The chapter will be similar to chapter 5 in form. Your task is to code up the examples below, picking appropriate parameters so that things run fairly quickly. It's probably best to use `mdpSimulate` in `gridworld.wppl` for the generative model. There are a number of examples of using `mdpSimulate` in `testMDPgenerative` and `mdpInferExamples`. I can explain any parts that are unclear and we can discuss changes you might want to make to facilitate inference (or you can develop them independently on a new branch).

You'll want to write some general functions for doing inference. These will be shared by multiple code boxes. Then write a function for each separate example below (each example will span 1-3 code boxes). You might want to write a single script first and test it at the command line. You can also edit chapter 6 and start building code boxes with gridworld and graphs.



### Example 1: Restaurant utilities from single action
Agent starts at [2,1]. If they go left, we infer they like donut, otherwise they like noodle or veg. (Assume low noise and relatively low `timeCost`).

Use `Enumerate` on an initially small space of utility functions. Expanding this space won't help because we can't identify much from this one action. (Could illustrate the identification issues with an example). 

### Example 2: Restaurant utilities from trajectory
Agent moves right/east towards noodle (but doesn't go all the way in the observed sequence); so now we know he prefers Noodle. Runtime should be almost same as example 1 (since agent's *perceivedTotalTime* is the same and *actualTotalTime* is 1).

### Example 3: Discounting style behavior
If we allow `timeCost` to vary (while always < 0), then the agent moving towards `donutSouth` can be explained by high `timeCost` (even if `noodle` and `veg` are better). Show two-dimensional posterior over utility of the donut places and `timeCos`t. 

### Example 4: Explaining anomalous behavior with noise
Agent goes to `donutNorth`. Show inference of high softmax noise.
Show multiple trajectories where agent goes first to donutSouth and then to noodle. Together these imply high softmax noise (and that donutSouth and noodle are relatively preferred). 

