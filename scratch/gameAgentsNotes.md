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
Finally, the fifth game is a prisoner's dilemma, and the sixth game is a prisoner's dilemma where the agent only remembers it's last move and the opponent's last move (in order to reduce the size of the state space).

# Summary of agents

## CDT agent

The CDT agent is mainly defined in order to make the other two agents. It has an explicit model of its opponent, and acts as a causal decision theorist, maximising expected utility under its model of the opponent and the environment. The other two agents are CDT agents with certain models of their opponent.


## Mutual recursion agent

The second agent is a mutual recursion agent, parametrised by a level of recursion. At 0 levels of recursion, the agent randomly chooses actions. For higher levels n > 0, the agent models its opponent as having level n - 1, and under this constraint, acts to maximise expected utility. This tends to amplify small differences between options so that the agents can reliably agree on slightly better ones. For instance, in double-club, a level 1 player with alpha = 100 only goes to Cube with probability 0.525, while a level 2 player goes with probability 0.622, and a level 3 player goes with probability 0.980. However, this agent does not manage to coordinate in the home-club game, since for a level 1 player, the expected utility of going to the club is 4.5, while the expected utility of staying at home is 5. Therefore, a level 1 player will reliably stay at home, and so will agents of all higher levels. For similar reasons, the players fail to coordinate in Bach or Stravinsky.
