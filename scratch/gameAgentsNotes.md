# Summary of games

All games herein are two-player games, many of which feature an element of coordination, where players can get a 'cooperation bonus' if they both stick to some plan, but have some penalty if their partner does not. Most are single-shot, but one involves sequential planning.

### Home-club
The first game is called "home-club". Both agents could stay at home or go to the club. Staying at home definitely gets utility 5, and going to the club gives an agent utility 9 if the other one goes as well, and 0 if the other agent stays at home. Note that this game is identical to the stag hunt game, where hunting the stag is equivalent to going to the club, and hunting a rabbit is equivalent to staying home.

## Double-club
The second game is called "double-club". In this game, each agent can go to either Mooseheads or Cube (the names of two clubs in Canberra, Australia). Each player's utility is decomposable into two parts: a 'Cube bonus' of 0.001 if the agent goes to Cube and 0 otherwise (representing the fact that Cube is slightly better), and a 'matching bonus' of 1 if the other player is also at the club and 0 otherwise (representing the fact that the agent would like to club with the other agent).

## Matching pennies
The third game is matching pennies: each player makes their penny show heads or tails, player 0 gets utility 1 if the pennies match and 0 if they do not, and conversely, player 1 gets utility 1 if the pennies do not match and 0 if they do.

## Bach or Stravinsky
The fourth game is Bach or Stravinsky, commonly known as "Battle of the Sexes". The agents have to go to a concert, which they will only enjoy at all if they go together, one prefers Bach, and the other prefers Stravinsky.

## Prisoner's dilemma
The fifth game is a prisoner's dilemma, and the sixth game is a prisoner's dilemma where the agent only remembers it's last move and the opponent's last move (in order to reduce the size of the state space).

## Newcomb's problem
The seventh game is Newcomb's problem: an agent must choose whether to just take a single opaque box (known as "one-boxing") or to also take a transparent box filled with $1 (known as "two-boxing"), under the knowledge that the opaque box was filled with $100 just if it is predicted that the agent will one-box. We make this a game by having player 0 be the one who chooses between boxes, and player 1 decide how much money to put into the opaque box, being rewarded for putting in $100 if the agent one-boxes and $0 if the agent two-boxes.

# Summary of agents

## CDT agent

The CDT agent is mainly defined in order to make the other two agents. It has an explicit model of its opponent, and acts as a causal decision theorist, maximising expected utility under its model of the opponent and the environment. The other two agents are CDT agents with certain models of their opponent.


## Mutual recursion agent

The second agent is a mutual recursion agent, parametrised by a level of recursion. At 0 levels of recursion, the agent randomly chooses actions. For higher levels n > 0, the agent models its opponent as having level n - 1, and acts as a CDT agent. This tends to amplify small differences between options so that the agents can reliably agree on slightly better ones. For instance, in double-club, a level 1 player with alpha = 100 only goes to Cube with probability 0.525, while a level 2 player goes with probability 0.622, and a level 3 player goes with probability 0.980. However, this agent does not manage to coordinate in the home-club game, since for a level 1 player, the expected utility of going to the club is 4.5, while the expected utility of staying at home is 5. Therefore, a level 1 player will reliably stay at home, and so will agents of all higher levels. For similar reasons, the players fail to coordinate in Bach or Stravinsky.

## Threatening agent

The third agent is a threatening agent: it acts as if it could precommit to (or threaten) some policy, and models its opponent as a CDT agent with knowledge of that policy. It then decides which policy would be best to have, given such an opponent. This leads to interesting behavior. For instance, this agent will go to the club in home-club, since if it could precommit to that policy, the other player would go to the club as well, and therefore the players would get the cooperation bonus. In Bach or Stravinsky, this player goes to whichever concert it prefers, reasoning that given a precommitment to do so, the other player would go to that concert.

Somewhat more interesting is the case of the one-shot and repeated prisoner's dilemma. In the one-shot dilemma, this player defects, since for any policy, a CDT opponent will always defect as well. However, it displays more interesting behaviour in the iterated prisoner's dilemma. For the two-round case, it defects on the first round, and on the second round, cooperates with 40% probability if the opponent cooperated before, and defects otherwise. This probability of cooperation is high enough that the CDT agent will cooperate on the first round, but low enough to minimise the chance that the agent is 'played for a sucker'. A similar strategy is employed for the three-round IPD, but with higher probabilities of cooperation (unfortunately, inference in this case is much more difficult due to the larger number of states).

Finally, in Newcomb's problem, this agent one-boxes with slightly above 50% probability. This is because having a probability of one-boxing above 50% means that the predictor's best strategy is to predict one-boxing, and will therefore fill the opaque box with $100. The probability of one-boxing is only slightly above 50% to maximise the chance that the agent gets to take the additional box as well.
