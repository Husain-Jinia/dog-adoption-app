# Dog Adoption App

![Screenshot 2024-02-15 003338](https://github.com/Husain-Jinia/dog-adoption-app/assets/75819874/87b6822a-82c5-4cc5-ad70-4be149afc6a7)

## Overview

The Dog Adoption App is a web application built using React and Firebase to facilitate the adoption process for dogs. It leverages Firebase services such as Authentication, Firestore, and Storage to provide a seamless end-to-end experience for users.

## Features

- **User Authentication:** Utilizes Firebase Authentication to allow users to create accounts, sign in, and securely manage their profiles.

- **Dog Listings:** Displays a list of available dogs for adoption, each with detailed information, including images, descriptions, and adoption status.
  
- **Communication with Dog Owners:** Enables potential adopters to communicate with current dog owners. This feature allows users to ask questions, get insights into a dog's behavior, and receive firsthand experiences from those who have already adopted it.

## **Getting Started**

To run the app locally, follow these steps:

1. Clone the repository: `git clone https://github.com/yourusername/your-repo.git`
2. Install dependencies: `npm install`
3. Set up Firebase credentials: Follow the instructions in `firebase.config.js` to configure your Firebase project.
4. Start the development server: `npm start`

Visit [http://localhost:3000](http://localhost:3000) in your browser to start using the application.

## **Firebase Integration**

This app utilizes Firebase for authentication, real-time data synchronization, and hosting. Make sure to set up your Firebase project and update the configuration accordingly.

## Firebase Authentication

1. Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).

2. Navigate to "Authentication" > "Sign-in method" and enable "Email/Password" authentication.

3. Obtain Firebase configuration details from the project settings.

4. Update Firebase configuration in `src/firebase/firebase.js`:

## Firestore Setup

In the Firebase Console, navigate to "Firestore" and create a new Firestore database.

Set up collections and fields as needed for your app.

Update Firebase configuration in src/firebase/firebase.js:

## Firebase Storage Setup

In the Firebase Console, navigate to "Storage" and create a new Storage bucket.

Set up rules and permissions for your storage bucket.

Update Firebase configuration in src/firebase/firebase.js:
