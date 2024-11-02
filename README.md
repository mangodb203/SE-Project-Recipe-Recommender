# SE-Project-Recipe-Recommender
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7179508.svg)](https://doi.org/10.5281/zenodo.7179508)
![GitHub contributors](https://img.shields.io/github/contributors/devanshi39/SE-Project-Recipe-Recommender)
![License](https://img.shields.io/github/license/Kaksha/SE-Project-Recipe-Recommender)
![Code Size](https://img.shields.io/github/languages/code-size/kaksha/SE-Project-Recipe-Recommender)
![Issues](https://img.shields.io/github/issues/Kaksha/SE-Project-Recipe-Recommender)
![Issues Closed](https://img.shields.io/github/issues-closed/kaksha/SE-Project-Recipe-Recommender)
![JS](https://img.shields.io/badge/Javascript--Green)
![Python](https://img.shields.io/badge/Python--Green)
![HTML](https://img.shields.io/badge/HTML--Green)
![CSS](https://img.shields.io/badge/CSS--Green)
![Repo Size](https://img.shields.io/github/repo-size/Kaksha/SE-Project-Recipe-Recommender)
![GitHub forks](https://img.shields.io/github/forks/devanshi39/SE-Project-Recipe-Recommender?style=social)
![GitHub language count](https://img.shields.io/github/languages/count/devanshi39/SE-Project-Recipe-Recommender)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/devanshi39/SE-Project-Recipe-Recommender)
![Discord](https://img.shields.io/discord/1027412417661120582)
<!-- ![GitHub Workflow Status](https://github.com/devanshi39/SE-Project-Recipe-Recommender/actions/workflows/node-app.yml/badge.svg?branch=main) -->
![Tests](https://github.com/mangodb203/SE-Project-Recipe-Recommender/workflows/Tests/badge.svg)


## What is Recipe Recommendation System?
Recipe Recommendation System helps users to enter their dietary preferences and recommends recipes based on it. The users are then able to add their favourite recipes to their profile and place orders based on it.

This is the Home Page of the website.

![image](https://github.com/mangodb203/SE-Project-Recipe-Recommender/blob/14bae9029eae116abcecb9a15440bee4b92bf60a/docs/Homepage.jpeg)

## Tools and Technology Used
### Tools:
1. Node.js
2. Mongo DB Atlas
3. Python
4. Jupyter Notebook

### Technology:
1. Node.js
2. React.js
3. Mongo DB
4. Python3

## Getting Started (For local setup)
* Clone this repository or download the zip file.
* Run the ```npm install``` command inside the backend folder
* Also run the ```npm install``` command inside the frontend folder
* Create a .env file inside the backend folder and add credentials to the folder
* Now, run ```npm run dev``` inside the backend folder and this will get the database and backend running
* Lastly run ```npm start``` inside the frontend folder and the Website will running on http://localhost:3000/

## Video Demonstration

[Explanation Video ](https://drive.google.com/file/d/1eI1Cg1RrAOP3AVBHexArJqVe3EnGjVJQ/view?usp=sharing)

https://github.com/user-attachments/assets/004aa3b2-0278-4c4d-a05e-303d779fe239

## Directory Structure
    │   .dvcignore
    │   .gitignore
    │   Citation.cff
    │   CODE_OF_CONDUCT.md
    │   Contributing.md
    │   Install.md
    │   LICENSE
    │   package-lock.json
    │   package.json
    │   README.md
    │
    ├───.dvc
    │   │   .gitignore
    │   │   config
    │   │
    │   └───plots
    │           confusion.json
    │           confusion_normalized.json
    │           default.json
    │           linear.json
    │           scatter.json
    │           smooth.json
    │
    ├───.github
    │   └───workflows
    │           node-app.yml
    |           tests.yml
    │
    ├───AI
    │   │   .gitignore
    │   │   data.dvc
    │   │   INSTALL.md
    |   |   app.py
    │   │   requirements.txt
    |   |   test_app.py
    │   │
    │   ├───notebooks
    │   │       recipe_recommendation_system.ipynb
    │   │
    │   └───data
    │           recipe_final.csv
    │
    ├───backend
    │   │   .env.sample
    │   │   .gitignore
    │   │   index.js
    │   │   package-lock.json
    │   │   package.json
    |   |
    |   |───_tests_
    |   |     Food.test.js
    |   |     User.test.js
    |   |     bookmarkRoutes.test.js
    |   |     recommend.test.js
    │   │
    │   ├───controllers
    │   │   │   order.js
    │   │   │   recipe.js
    │   │   │   recommend.js
    │   │   │
    │   │   └───auth
    │   │           index.js
    │   │           middlewares.js
    │   │
    │   ├───models
    |   |       Food.js
    │   │       Order.js
    │   │       Recipe.js
    │   │       Recommendation.js
    │   │       User.js
    │   │
    │   ├───routes
    │   │       auth.js
    |   |       bookmarkRoutes.js
    │   │       order.js
    │   │       recipe.js
    │   │       recommend.js
    │   │
    │   └───utils
    │           transporter.js
    │
    ├───docs
    │       chatchannelproof.md
    │       LinuxKernelBestPractices.png
    │       proj1rubric.md
    │       proj1rubricComments.pdf
    │
    └───frontend
        |   .babelrc
        |   babel.config.js
        │   .prettierignore
        │   .prettierrc.json
        │   package-lock.json
        │   package.json
        |   App.test.js
        |   setupTests.js
        │
        ├───public
        │       index.html
        │
        └───src
            │   App.js
            │   index.css
            │   index.js
            │   reducer.js
            │   setupTests.js
            │   StateProvider.js
            │
            ├───Components
            │   │   AddressForm.js
            |   |   BookmarksPage.js
            │   │   cards.css
            │   │   cards.scss
            │   │   Home.js
            │   │   Navbar.js
            |   |   RecipeCard.js
            │   │   Recipes.js
            │   │   Review.js
            │   │   SearchBar.js
            │   │   ToggleSwitch.css
            │   │
            │   ├───auth
            │   │       Base.js
            │   │       ChangePassword.js
            │   │       ForgotPassword.js
            │   │       index.js
            │   │
            │   └───LandingPage
            │           LandingPage.css
            │           LandingPage.js
            │
            ├───imgs
            │       breakfast.jpg
            │       brownies.jpg
            │       burger.jpg
            │       butterchicken.jpg
            │       chinese.jpg
            │       chopsuey.jpg
            │       cookies.jpg
            │       curry.jpg
            │       MainImage.jpg
            │       Mexican.jpg
            │       mocktail.jpg
            │       pizza.jpg
            │       rice.jpg
            │       salad.jpg
            │       soup.jpg
            │       sushi.jpg
            │       
            └───utils
                    index.js


## Contributors
1. [Jinish Shah](https://github.com/jinish08)
2. [Nirmit Deliwala](https://github.com/NRDeli)
3. [Nisarg Jasani](https://github.com/NisargJasani0602)

To find out how you can contribute to this project, read the [CONTRIBUTING.md](https://github.com/mangodb203/SE-Project-Recipe-Recommender/blob/main/Contributing.md) file

The discord chat channel link is included in the file [CONTRIBUTING.md](https://github.com/mangodb203/SE-Project-Recipe-Recommender/blob/main/Contributing.md)

