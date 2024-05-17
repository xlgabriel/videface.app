# videface.app 
The following repository contains the code used to create the [VideFace web page](https://videface.app/)

## Features
- Modern and clean design
- Fully responsive
- Smooth animations
- Clean code

## Requirements
Before you start, you need to have the following installed on your computer:
- [Node JS](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/) (Included when installing Node.js)

## Built with
- Vite.js - Framework
- NPM - Dependency Manager
- Github - Project versioner

## Installation
1. This repository must be cloned:
```bash
   git clone https://github.com/xlgabriel/videface.app.git
```
2. Navigate to the project directory:
```bash
   cd videface.app
```
3. Dependencies must be installed:
```bash
   npm install
```

## Repository usage

### Run the application in development mode
To run the application in development mode, run the following command:
```bash
   npm run dev
```
The application will be available at [http://localhost:5173/](http://localhost:5173/)

### package.json Scripts
>- **"dev"**: Start the development server using Vite, allowing you to see the real-time changes in the browser while working on the project.
>- **"build"**: Builds the application for production, generating optimized files in an output folder
>- **"lint"**: Run ESLint on all JavaScript and JSX files in the project to find and report style problems and code errors. 
>- **"preview"**: Start a local server to preview the built application (the output of vite build) as if it were in production.

## Project structure

```plaintext
videface.app/
├── public/
├── src/
│   ├── assets/
|   |   ├── benefits/
│   │   ├── collaboration/
│   │   ├── hero/
│   │   ├── notification/
│   │   ├── pricing/
│   │   ├── roadmap/
│   │   ├── services/
│   │   ├── socials/
│   │   ├── svg/
│   │   └── ...
|   ├── components/
|   |   ├── design/
|   |   ├── pages/
|   |   ├── pricing/
|   |   ├── Products/
│   │   └── ...
│   ├── constants/
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Contribution
### New functionalities
A branch will be created for each functionality that the web application must fulfill, this branch must come out of the 'develop' branch and have the name composed by "feat/" and the defined functionality, for example: "feat/addNewProduct", everything will be handled in the English language.

### Bug fixes
A branch will be made for each bug to be fixed, this must have the name composed by "bugfix/" and the bug to fix, for example: "bugfix/imageNotLoading", everything will be handled in the English language.


### Messages in commits
Each message should consist of the type of action and the description of the task performed, e.g. "feature: add new product in catalog". The types of actions to be handled will be the following:

>- **feature**: When the commit is focused on realizing a feature.
>- **bugfix**: When the commit is focused on correcting a feature.
>- **refactor**: When the aim is to improve the quality of the code (order, performance, or readability).
>- **docs**: When documentation is changed in the code or the readme.
>- **chore**: Other changes than functionality or bug fixes, for example, when updating dependencies or other project configurations.

## Attribution
This project uses code from [brainwave](https://github.com/adrianhajdin/brainwave) by [Adrian Hajdin](https://github.com/adrianhajdin).

## Authors✒️ 
- **Gabriel Jeannot Viaña - CTO and Full-Stack Developer** -   <a title=Code>💻</a> <a title=Design>🎨</a> <a title=Documentation>📑</a>
- **Camilo Osorio - Front-end Developer** - <a title=Code>💻</a> <a title=Design>🎨</a> <a title=Documentation>📑</a>
- **Valentina Loaiza Mejia - Front-end Developer** -   <a title=Code>💻</a> <a title=Design>🎨</a> <a title=Documentation>📑</a>
- **Andrea Saavedra Viveros - UX/UI & Content Creator** -   <a title=Code>💻</a> <a title=Design>🎨</a> <a title=Documentation>📑</a>
