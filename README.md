# webppl-gridworld
Webppl library for generating Gridworld MDPs. JS library for displaying Gridworld. 

#Running script in browser

Running a webppl script in the browser allows use of `GridWorld.draw` for easier debugging of agents. To do so, do we first have to install webppl from source and link it to node. 

This clones webppl into the directory above yours and links it to the global node webppl installation.

```
git clone git@github.com:probmods/webppl.git ../webppl
npm link ../webppl
```

Then we can compile webppl and webppl-gridworld together and run your script.

```
sh compile.sh myscript.webppl
```

To just run your script without compiling we can do. 

```
sh run.sh myscript.webppl
```
