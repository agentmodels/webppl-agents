# webppl-agents

This package provides constructors for MDP and POMDP agents, for gridworld and bandit environments, and a function for visualizing gridworlds:

- Environments:
  - [`makeGridWorldMDP`](https://github.com/agentmodels/webppl-agents/blob/master/src/environments/makeGridWorldMDP.wppl)
  - [`makeGridWorldPOMDP`](https://github.com/agentmodels/webppl-agents/blob/master/src/environments/makeGridWorldPOMDP.wppl)
  - [`makeBanditPOMDP`](https://github.com/agentmodels/webppl-agents/blob/master/src/environments/makeBanditPOMDP.wppl)
- Agents:
  - [`makeMDPAgent`](https://github.com/agentmodels/webppl-agents/blob/master/src/agents/makeMDPAgent.wppl) + [`simulateMDP`](https://github.com/agentmodels/webppl-agents/blob/master/src/simulation/simulateMDP.wppl)
  - [`makePOMDPAgent`](https://github.com/agentmodels/webppl-agents/blob/master/src/agents/makePOMDPAgent.wppl) + [`simulatePOMDP`](https://github.com/agentmodels/webppl-agents/blob/master/src/simulation/simulatePOMDP.wppl)
- Visualization:
  - [`GridWorld.draw`](https://github.com/agentmodels/webppl-agents/blob/master/src/visualization/gridworld.js) (also available as `viz.gridworld` if [webppl-viz](https://github.com/probmods/webppl-viz) is used)

## Installation

To globally install `webppl-agents`, run:

    mkdir -p ~/.webppl
    npm install --prefix ~/.webppl webppl-agents

This may print warnings (`npm WARN ENOENT`...) which can be ignored.

To upgrade to the latest version, run:

    npm install --prefix ~/.webppl webppl-agents --force

For the agent functions, you will also need to install [webppl-dp](https://github.com/stuhlmueller/webppl-dp).

## Usage

Once installed, you can make the environment and agent functions available to `program.wppl` by running:

    webppl --require webppl-dp --require webppl-agents program.wppl

## Testing

Run the included test using:

    webppl --require webppl-dp --require . tests/tests.wppl

## License

MIT
