### Travel Buddy
Use Travel Buddy to create memorable trips with your friends or family without the hassle of coordinating over multiple apps.

## Features

- Create your trip
!['Create your trip'](https://github.com/natashachiu/travel-buddy/blob/main/screenshots/create-trip.png?raw=true)

- Explore and add places from the map onto your lists.
!['Add to places'](https://github.com/natashachiu/travel-buddy/blob/main/screenshots/explore-places.png?raw=true)

- Don't know where to start? Ask our assistant for suggestions.
!['Ask for suggestions'](https://github.com/natashachiu/travel-buddy/blob/main/screenshots/assistant-prompt.png?raw=true)
!['Assistant reply'](https://github.com/natashachiu/travel-buddy/blob/main/screenshots/assistant-reply.png?raw=true)

- Chat with your friends about your trip.
!['Chat'](https://github.com/natashachiu/travel-buddy/blob/main/screenshots/chat.png?raw=true)

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