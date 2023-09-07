### Travel Buddy
You need TWO terminal windows/tabs for this (or some other plan for running two Node processes).

In one terminal, cd into ```frontend```. Run 
- ```npm config set legacy-peer-deps true``` 
- ```npm install``` 
- ```npm run dev```\
, and go to localhost:5173 in your browser.

In the other terminal, cd into ```backend```. Run 
- ```npm install```
- ```npm run local```\
, and go to localhost:8080 in your browser.