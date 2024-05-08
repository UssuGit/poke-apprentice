# Poke Apprentice React Application
This repository contains my solution to a Coding Challenge. Below, I outline the tasks completed and the decisions made during development.

## Challenge Tasks Completed
Web Page Input: Implemented a web page where users can enter a Pokémon name.
Pokémon Query: Upon submission (Enter or "Search" button), the application queries the PokéAPI to retrieve details of the specified Pokémon, including its name, number, and sprite. If no match is found, an error message is displayed.
Navigation Buttons: Added "Previous" and "Next" buttons to navigate between Pokémon based on their ID numbers.
Text-based Search: Implemented a text-based search feature where users can input a Pokémon name or partial name to find suggestions of matching Pokémon, then can click on it to perform the query.
Automated Tests: Included one automated test for the "Next" and "Previous" buttons. (The automation for the text-based search is commented because the App test couldn't see the suggestion container).
Bonus: Hidded my favorite Pokémon on the site. Can you find it?

## Development Decisions
Since this was my first experience with React and I didn't have any development tools installed, I utilized Visual Studio Code and ran 'npx create-react-app my-app' to start with a prototype of a React application and build on top of it.
Tech Stack: I chose React for building the frontend as it was the only technology in the stack that I had heard of.
Styling: I used a minimal amount of CSS for styling the components to maintain simplicity, although it was particularly necessary for the suggestion box.
State Management: I utilized React's built-in state management for handling user input, Pokémon data, and navigation.
Testing: For testing, I opted for Jest and React Testing Library due to their simplicity and effectiveness in testing React components.
Caching: Not implemented.

## Setup Instructions
To run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using npm install. (If you are having problems use npm install --force)
4. Start the development server with npm start.
5. Access the application in your browser at http://localhost:3000 (It will open automatically).

## Final Note
You can check the website here: https://shimmering-jalebi-d34547.netlify.app/

This is my first contact with React! Your feedback is highly appreciated! If you have any questions, suggestions, or improvements, feel free to reach out to me. Thank you for reviewing my solution!

Contact Information: ussumane.soare@tecnico.ulisboa.pt
