<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
-->
<div align="center"> 
  <a href="https://www.linkedin.com/in/alie-brubaker/">LinkedIn</a>
</div>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AlbertaLynnBrubaker/rainbow-capstone-project">GitHub</a>


<h1 align="center">Rainbow</h1>
<h4 align="center">An LGBTQ+ Social Media Platform</h4>
    <br />
    <br />
    <br /> 
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary style='font-size: 1.6rem;'>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>
  <br />
  <br />


<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Rainbow is the project I completed as a graduation requirement for [Flatiron School](https://flatironschool.com/) intended to demonstrate my understanding of JavaScript and React on the frontend and Ruby on Rails on the backend. 
The frontend uses libraries such as:
* React Router 6 - to set up the client-side routing
* React Infinite Scroll - converted from a class component structure for use with my functional components to allow the user to continuously load content as they scroll down.
* Custom hooks primarily for frontend authentication and authorization

The styling was done with a customized amalgamation of Styled-Components, React-Bootstrap, and vanilla CSS.

The backend was built using a SQLite3 database and uses a handful of useful Rails Gems, such as:
* BCrypt - to create a secure password digest for each user and backend authentication
* Active Storage - to create a set of database tables to store BLOBs and generated urls
* JSON API Serializer - for faster serialization of data to be send from the API to the client


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [React][React-url]
* [💅🏾Styled-Components](https://styled-components.com/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [Infinite Scroll Component](https://www.npmjs.com/package/react-infinite-scroll-component)
* [React Icons](https://react-icons.github.io/react-icons/)

* [Ruby on Rails](https://rubyonrails.org/)
* [Active Storage](https://edgeguides.rubyonrails.org/active_storage_overview.html)
* [BCrypt](https://rubygems.org/gems/bcrypt/) 
* [JSON API Serializer](https://rubygems.org/gems/jsonapi-serializer/)



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

A few dependencies are needed to run the project

### Prerequisites

The package.json file should contain all the packages node needs to run the project. The project uses React-Icons and Styled-Components.


1. Fork and clone the repo
   ```sh
   git clone https://github.com/AlbertaLynnBrubaker/rainbow-capstone-project
   ```
### Frontend Installation

2. Change Directories
    ```sh
    cd client
    ```
3. Install NPM packages 
   ```sh
   npm install
   ```
3. Run the development server
    ```sh
    npm start
    ```

### Backend Installation


2. Install Ruby gems on the backend clone
   ```sh
   bundle install
   ```
3. Run the migrations and seed the database (may take a while...)
    ```sh
    rails db:migrate db:seed
    ```
4. Run the database server
    ```sh
    rails s
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## Contact
Alie Brubaker - [LinkedIn][linkedin-url2] - [GitHub](https://github.com/AlbertaLynnBrubaker)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url2]: https://www.linkedin.com/in/alie-brubaker/
[product-screenshot]: screenshot.png
[file-structure-screenshot]: images/screenshot.png 
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Styled-Components-url]: https://styled-components.com/
