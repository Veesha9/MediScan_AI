================================================================
  MediScan AI — Smart Health Assistant
  ML / Web Development Project
================================================================

PROJECT DESCRIPTION:
  MediScan AI is an AI-powered health assistant web application 
  that allows users to sign up, log in, upload blood reports for 
  analysis, detect wrong files (like X-rays), and get home remedy 
  suggestions based on selected symptoms.

================================================================
  PROJECT FILE STRUCTURE
================================================================

  MediScan_AI/
  │
  ├── index.html              → Main HTML file (entry point)
  │                             Contains all 4 pages:
  │                             Home, Sign Up, Login, Dashboard
  │
  ├── css/
  │   ├── style.css           → Global styles: navbar, buttons,
  │   │                         alerts, loader, toast, animations
  │   │
  │   ├── home.css            → Landing page hero section and
  │   │                         feature cards styling
  │   │
  │   ├── auth.css            → Login and Sign Up form styling
  │   │
  │   └── dashboard.css       → Dashboard layout, report table,
  │                             symptom tags, remedy cards
  │
  └── js/
      ├── navigation.js       → showPage() and showToast()
      │                         functions for page routing
      │
      ├── auth.js             → doSignup(), doLogin(), logout()
      │                         User data saved in localStorage
      │
      ├── bloodreport.js      → handleFile() — detects X-rays,
      │                         validates file type, shows results
      │
      ├── remedies.js         → REMEDY_DB object — database of
      │                         22 symptoms with 3 remedies each
      │
      └── symptoms.js         → buildSymptomGrid(), checkSymptoms(),
                                renderRemedies() functions

================================================================
  FEATURES
================================================================

  1. SIGN UP PAGE
     - Fields: First Name, Last Name, Email, Phone, Age, Gender,
               Password, Confirm Password
     - Full validation with error messages
     - Duplicate email detection
     - Data saved to browser localStorage

  2. LOGIN PAGE
     - Email + Password authentication
     - Invalid credentials error message
     - Session persists on browser refresh

  3. LOGOUT
     - Available from Navbar and Dashboard
     - Clears session and returns to Home page

  4. BLOOD REPORT ANALYZER
     - Upload: PDF, JPG, PNG, CSV, TXT files
     - WRONG FILE DETECTION: If filename contains keywords like
       'xray', 'scan', 'ct', 'mri', etc. → shows red error:
       "Wrong File Detected! This is an X-ray scan..."
     - Shows analysis table with: Haemoglobin, WBC, Platelet,
       Glucose, Cholesterol, SGPT, Creatinine with Normal/Low/High
     - Demo Tab: Try with sample CBC report

  5. SYMPTOM CHECKER & HOME REMEDIES
     - 22 symptoms selectable by clicking
     - AI database with 3 detailed home remedies per symptom
     - Symptoms covered: Fever, Headache, Fatigue, Cough, Cold,
       Sore Throat, Body Pain, Nausea, Vomiting, Diarrhea,
       Constipation, Stomach Pain, Bloating, Dizziness, Chest Pain,
       Shortness of Breath, Back Pain, Joint Pain, Skin Rash,
       Insomnia, Anxiety, Loss of Appetite

  6. BACKGROUND & UI
     - Gradient mesh background with medical pattern
     - Glassmorphism cards with blur effects
     - Smooth animations (fade-up on load)
     - Toast notifications for user feedback
     - Fully responsive for mobile screens

================================================================
  HOW TO RUN
================================================================

  1. Download/copy the entire MediScan_AI folder
  2. Open index.html in any modern web browser
     (Chrome, Firefox, Edge, Safari)
  3. No server required — runs completely offline
  4. No installation or npm required

================================================================
  TECHNOLOGIES USED
================================================================

  - HTML5
  - CSS3 (Custom Properties, Flexbox, Grid, Animations)
  - Vanilla JavaScript (ES6+)
  - localStorage API (for user data persistence)
  - Google Fonts (Outfit + Playfair Display)

================================================================
  STUDENT PROJECT — For Educational Purposes Only
  Remedies are traditional suggestions. Always consult a doctor.
================================================================
