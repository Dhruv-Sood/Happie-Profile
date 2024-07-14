# Happie-Profile

Happie Profile is a platform that allows developers to create dynamic, data-driven personal portfolios. Showcase your journey and connect with the tech community!

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [License](#license)

## Features

- Create a personal portfolio with dynamic content.
- Integrates with Firestore for data management.
- User-friendly interface built with React and Tailwind.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/Happie-Profile.git
   cd Happie-Profile
   ```

2. **Install dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) installed. Then, run:

   ```bash
   npm install
   ```

3. **Set up Firestore Database:**

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project or use an existing one.
   - Navigate to Firestore Database and create a new database.
   - Set up your collection and documents according to your project needs.

4. **Setup Environment Variables:**

   Create a `.env` file in the root of your project directory and add the following variables:

   ```plaintext
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   ```

   Replace the placeholder values with your actual Firebase project credentials.

## Usage

To start the development server, run:

```bash
npm run dev
```

Navigate to `http://localhost:5173` in your browser to view the application.

## License

This project is licensed under the MIT License
