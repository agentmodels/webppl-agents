## Plan for guide

Goal of the guide is to make it easy for people to use the webppl-gridworld library. It should be self-contained, so that people don't need to go through all of agentmodels.org in order to find the guide useful. 

Contents:

1. Write an MDP (use line example from Section 3.1) and run MDP and hyperbolic agents. MDP has `transition` and `stateToAction`. For these agents, we could have a generic *simulateMDP* function, which takes an MDP (with `transition`), a startState, and an agent and computes the trajectory.

2. Write a POMDP. Could be line-world also: if state 1 says so, you go right, otherwise you go left. POMDP has `transition`, `beliefToAction`, `observation` functions. The startState will contain the latentState that agent is uncertain about. Work with `beliefDelay` agent to show comparison between optimal and boundVOI. Maybe discuss beliefAgent in footnotes. [Simulate should be flexible enough to implement some other kinds of agent. What about RL agents who don't know the transition or reward function?]

3. Gridworld MDP version. Show hiking example. Show how to vary the utilities. Run different agents on it. Show how to create variant gridworlds (need nicer interface for "feature").

4. Show how to create your own agent and run it on gridworld. Random agent. Epsilon-greedy agent instead of softmax. 

5. Bandits. Show how to create bandit problems. Run POMDP agents. Create your own POMDP agent.


