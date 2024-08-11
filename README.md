# Project Overview
This web application was created to manage dart tournaments within the Suwalska Darts League. It allows organizers to fully manage seasons and individual tournaments, while also providing participants and fans with the ability to track statistics and results of both ongoing and past tournaments.

The primary users of this application are tournament organizers, who can manage the entire process of running the tournaments, and participants or fans, who can follow the progress and outcomes of the games.

Note: This application serves as the frontend component of the system and is designed to work in conjunction with a dedicated backend API, which I also developed. The application relies on this API to function correctly, as it sends requests to the API where all the information is stored.

# Technologies Used
This application is built using the following technologies:

- React: A JavaScript library for building user interfaces.
- Redux: A tool for managing the application state.
- React Router Dom: A library for managing routing in React applications.
- Material-UI (MUI): A React UI framework for building responsive web applications.
- Styled-components: A tool for styling React components.
- Font Awesome: A library of vector icons and social logos.

# Features
- Unauthenticated User:
  - View statistics of points and achievements (180, 170+, Quick Finish, High Finish) categorized by seasons and individual tournaments.
  - View the results of the currently ongoing tournament (if any is active).
- Authenticated Admin:
  - Add and remove seasons and tournaments.
  - Add and remove players.
  - Activate a tournament, i.e., start a previously created tournament.
    
# Project Structure
The application is organized into several key components and directories, which can be explored in the repository:
- src/components: Contains React components responsible for rendering various parts of the UI.
- src/helpers: Includes utility functions and configurations used throughout the application.
- src/pages: Main pages of the application, such as the home page, admin panel, etc.
- src/redux: Manages the application state using Redux.
- public: Static assets of the application, such as icons and manifests.
  
# Limitations
Currently, the application does not support viewing the details of a selected season from the admin panel. Future updates will include a detailed summary of all tournaments played within a given season.

# Future Plans
Future enhancements planned for the application include:
- Additional tournament modes, such as team matches and tournaments with group stage and knockout phases.
- The ability to add standalone, non-seasonal tournaments, such as special event tournaments.
