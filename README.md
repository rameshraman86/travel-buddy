# Travel Buddy

Travel Buddy is a versatile full-stack web application designed to simplify group trip planning. With AI-driven suggestions and collaborative features, it's the ideal tool for coordinating your next adventure with friends and family.

## Features

### Create a New Trip

![Create your trip](https://github.com/rameshraman86/travel-buddy/blob/main/screenshots/create-trip.png?raw=true)

Easily kickstart your travel plans by creating a new trip. Add details, dates, and destinations effortlessly.

**Collaborate with Friends:**
- Generate a unique link for your trip that you can share with fellow travelers. 
- Share this link to enable seamless collaboration and coordination with your travel companions.

### Explore Places and Add Points of Interest

![Add to places](https://github.com/rameshraman86/travel-buddy/blob/main/screenshots/explore-places.png?raw=true)

Browse a wide range of destinations and seamlessly add points of interest to your trip's itinerary. Discover exciting places to visit.

### AI-Powered Suggestions

![Ask for suggestions](https://github.com/rameshraman86/travel-buddy/blob/main/screenshots/assistant-prompt.png?raw=true)

Stuck on where to go or what to do? Simply ask our AI assistant for suggestions, and it will provide you with personalized recommendations.

![Assistant reply](https://github.com/rameshraman86/travel-buddy/blob/main/screenshots/assistant-reply.png?raw=true)

Receive AI-generated suggestions that cater to your preferences, ensuring an unforgettable travel experience.

### Real-Time Chat

![Chat](https://github.com/rameshraman86/travel-buddy/blob/main/screenshots/chat.png?raw=true)

Stay connected with your fellow travelers through real-time chat. Discuss plans, share ideas, and coordinate details effortlessly.

Travel Buddy is your all-in-one solution for planning memorable trips with ease. Start your next adventure today!


## Technology Stack

**Architecture:** MVC (Model-View-Controller)

**Frontend:**
- React
- Tailwind CSS

**Backend:**
- Express
- Node.js
- PostgreSQL
- Socket.io

**API Integrations:**
- Google Maps API
- Google Places API
- OpenAI API

## Project Setup

### Prerequisites:
- Ensure you have Node.js, npm, and PostgreSQL installed on your system.

### Setup Instructions:

1. **Clone the Repository:**
   - Clone the project repository from GitHub:

     ```bash
     git clone <repository_url>
     ```
2. **Setup environment variables**
    - Copy .env.example in backend folder and create a new .env file in the same folder with API keys and database details.

3. **Frontend Setup:**
   - Navigate to the "frontend" directory:

     ```bash
     cd frontend
     ```
   - Set npm to handle legacy peer dependencies:

     ```bash
     npm config set legacy-peer-deps true
     ```
   - Install frontend dependencies and start the development server:

     ```bash
     npm install
     npm run dev
     ```

   Access your frontend application at `http://localhost:5173` in your web browser.

3. **Backend Setup:**
   - In a new terminal window/tab, navigate to the "backend" directory:

     ```bash
     cd ../backend
     ```

   - Install backend dependencies and set up the database schema:

     ```bash
     npm install
     npm run db:reset
     ```

   - Start the backend server:

     ```bash
     npm run local
     ```

   Access your backend server at `http://localhost:8080`.

By following these steps, you'll have successfully set up and launched both the frontend and backend of your GitHub project. Be sure to replace `<repository_url>` with your GitHub repository's actual URL.
