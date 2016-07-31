## Features for *draw*

1. Animation of trajectories. [Would be cool to have ability to show repeated samples from Dist as a seris of animations with a paused between]. A related feature is arrows along the static trajectory line to indicate the direction of the path. (indicate start and end state). Make -ve utility different color from terminals. Maybe use texture for terminals (or double borders or something). Maybe a door or something restaurant-like.
[General todo: MDP where you have state to action function.]

2. Bigger numbers for the expUtilities. The current heatmap looks really good but numbers are hard to read. This might require a bigger grid when showing expUtilities. 

3. Ability to add the cell references ( [0, 1, ... , xLim ] under the x-axis and so on) is probably require for letting people play around with GridWorld. It'll also be helpful for us in using the visualization for developing gridworld inference examples. 

4. Optional coloring of terminals (not required -- but might useful). 

5. Heatmap function. V(state,time) which can change and be inconsistent for hyperbolic discounting agent. Heatmap for probability that some object is somewhere in grid (when it could be anyway).

6. How to normalize the utilities. Could have user specify them for the particular graph. Could have some simple heuristics or some function to compute them for a given gridworld (maybe hard to do well). 



