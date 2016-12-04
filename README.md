# webppl-agents

This package provides constructors for MDP and POMDP agents, for grid worlds and bandits, and a function for visualizing bandits:

- Environments:
  - [`makeGridWorldMDP`](https://github.com/agentmodels/webppl-agents/blob/master/src/environments/makeGridWorldMDP.wppl)
  - [`makeBanditPOMDP`](https://github.com/agentmodels/webppl-agents/blob/master/src/environments/makeBanditPOMDP.wppl)
  - [`makeGridWorldPOMDP`](https://github.com/agentmodels/webppl-agents/blob/master/src/environments/makeGridWorldPOMDP.wppl)
- Agents:
  - [`makeMDPAgent`](https://github.com/agentmodels/webppl-agents/blob/master/src/agents/makeMDPAgent.wppl) + [`simulateMDP`](https://github.com/agentmodels/webppl-agents/blob/master/src/simulation/simulateMDP.wppl)
  - [`makePOMDPAgent`](https://github.com/agentmodels/webppl-agents/blob/master/src/agents/makePOMDPAgent.wppl) + [`simulatePOMDP`](https://github.com/agentmodels/webppl-agents/blob/master/src/simulation/simulatePOMDP.wppl)
- Visualization:
  - [`GridWorld.draw`](https://github.com/agentmodels/webppl-agents/blob/master/src/visualization/gridworld.js) (or `viz.gridworld`)

## Installation

To globally install `webppl-agents`, run:

    mkdir -p ~/.webppl
    npm install --prefix ~/.webppl webppl-agents

This may print warnings (`npm WARN ENOENT`...) which can be ignored.

To upgrade to the latest version, run:

    npm install --prefix ~/.webppl webppl-agents --force

## Usage

Once installed, you can make `json.read` and `json.write` available to `program.wppl` by running:

    webppl --require webppl-agents program.wppl

## Testing

Run the included test using:

    webppl --require webppl-dp --require . tests/tests.wppl

## License

MIT
