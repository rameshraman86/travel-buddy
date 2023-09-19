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

## Project Setup Instructions

### Prerequisites:
- Ensure you have Node.js and npm (Node Package Manager) installed on your system.

### Setup Instructions:

1. **Clone the Repository:**
   - Start by cloning the project repository from GitHub. You can do this by running the following command in your terminal:

     ```bash
     git clone <repository_url>
     ```

   Replace `<repository_url>` with the actual URL of your GitHub repository.

2. **Navigate to the Frontend:**
   - In your terminal, navigate to the "frontend" directory of the project using the `cd` command:

     ```bash
     cd frontend
     ```

3. **Frontend Dependencies:**
   - Inside the "frontend" directory, set npm to handle legacy peer dependencies by running:

     ```bash
     npm config set legacy-peer-deps true
     ```

   - Install the required frontend dependencies:

     ```bash
     npm install
     ```

   - Start the development server:

     ```bash
     npm run dev
     ```

   This will launch your frontend application. Open your web browser and go to `http://localhost:5173` to view it.

4. **Navigate to the Backend:**
   - Open a new terminal window/tab, if you haven't already.
   - Navigate to the "backend" directory of the project using the `cd` command:

     ```bash
     cd ../backend
     ```

   Note: If your project structure is different, adjust the path accordingly.

5. **Backend Dependencies:**
   - Install the required backend dependencies:

     ```bash
     npm install
     ```

6. **Start the Backend Server:**
     ```bash
     npm run local
     ```

   Your backend server should now be up and running. You can access it at `http://localhost:8080`.

By following these steps, you will have successfully set up and launched both the frontend and backend of your GitHub project. Make sure to replace `<repository_url>` with the actual URL of your GitHub repository to ensure users can access your project's code.
