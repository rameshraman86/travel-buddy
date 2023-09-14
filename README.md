### Travel Buddy
Use Travel Buddy to create memorable trips with your friends or family without the hassle of coordinating over multiple apps.

## Main features
- Browse and add places from the map onto your lists.
- Don't know where to start? Ask our assistant for suggestions.
- Chat with your friends about the trip.

1. Create your trip
['create a trip']()

2. Add places to your trip
[]()
3. Ask assistant for suggestions
[]()
4. Chat with your friends
[]()

## Stack
- Frontend: React, Tailwind CSS
- Backend: Express, Node, PostgreSQL, Socket.io
- APIs: Google's Maps and Places API, Open AI API 

## Setup
You need two terminal windows/tabs for this (or some other plan for running two Node processes).

In one terminal, cd into ```frontend```. Run 
- ```npm config set legacy-peer-deps true``` 
- ```npm install``` 
- ```npm run dev```\
and go to localhost:5173 in your browser.

In the other terminal, cd into ```backend```. Run 
- ```npm install```
- ```npm run local```\
and go to localhost:8080 in your browser.