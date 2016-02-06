#Inference in MDPs

##Goals for inference chapters

Explain inference for different kinds of parameters:

1.	Inference of utility functions, with cost of a single action inferred by discounting like behavior.

2.	Inference of noise parameter alpha from agent being inefficient.

3.	Inference of transition noise (from agent taking long route in hiking). Discuss inference from actions vs. states. If you only have states, you need to learn transition noise from implicit things like taking the long route.


Explain various issues in inference:

1.	Inference from single action vs. single trajectory vs. multiple trajectories

2.	Unidentifiability: graphs showing the posterior on utilities in a case where things aren’t identified.

3.	Maybe discuss different inference methods --- but probably we defer this till later chapter. 


##Plan for chapter

### General stuff
Most examples are in the Donut gridworld. The constructor function for this world is in gridworld.wppl. The function is:
`makeDonutInfer(smallVersion = true, … )` 

A number of examples of running the `mdpSimulate` agent from gridworld.wppl on the Donut world are in testMDPgenerative.wppl at:
https://github.com/agentmodels/webppl-gridworld/blob/master/testMDPgenerative.wppl#L34

Examples of simple inference functions that are efficient (in terms of runtime compared to generative model) are at. There is code here for efficient inference conditioning on a single trajectory. Code will need to be modified a little to do multiple trajectories from the same startState (and more for different startStates):
https://github.com/agentmodels/webppl-gridworld/blob/master/mdpInferExamples.wppl

The inference will be over the utilities of all restaurants (with the Donut Stores fixed to have identical utility), over the `utilityTable.timeCost` and over `alpha`. 

Each example show illustrate the observed trajectory using `GridWorld.draw`. It should also use `viz.print` or `print` to display the posterior (or at least the posterior on some of the variables). 

### Example 1: Restaurant utilities from single action
Agent starts at [2,1]. If they go left, they like donut, otherwise they like noodle or veg. (Assume low noise and relatively low timeCost).

Use Enumerate on small space of U functions. Expanding this space won't help because we can't identify much from this one action. 

### Example 2: Restaurant utilities from trajectory
Agent takes move right/east towards noodle (but doesn't go all the way in the observed sequence). Now we know he prefers noodle. Runtime should be almost same as example 1 (since agent's *perceivedTotalTime* is the same and *actualTotalTime* is 1).

### Example 3: Discounting style behavior
If we allow timeCost to vary (while always < 0), then initially move towards donut can be explained by high timeCost (even if noodle and veg are better). Show two-dimensional posterior over utility of donut and timeCost. 

### Example 4: Explaining anomalous behavior with noise
Agent goes to donutNorth. Show inference of high softmax noise.
Show multiple trajectories where agent goes first to donutSouth and then to noodle. Together these imply high softmax noise (and that donutSouth and noodle are relatively preferred). 

