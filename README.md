# Ghibli Fan Site
Project is a [Studio Ghibli](http://studioghibli.net) fan site to provide information on the studio's movies, events going on, and where to buy/stream/rent Studio Ghibli movies. The stack is a React front-end with an Express backend that connects to several APIs to pull data from as well as connects to Firebase for additional information and user management.

The purpose for an Express backend was to keep all API calls routed through the server rather than making all of the keys and secrets publicly available in developers tools. The front-end makes an API call to the Express API which then dispatches the corrosponding request to the necessary third party API(s) and Firebase as needed. The returned data is then put into a Redux store for state management.

### APIs Used:
* [Studio Ghibli API](https://ghibliapi.herokuapp.com/)
* [TheMovieDB API](https://developers.themoviedb.org/3/getting-started/introduction)
* [Trakt.tv API](https://trakt.docs.apiary.io/)


# Development Guidelines.
## Branch Management Rules & Naming Convention:
* Master: All developed code features checked in and released
* Deployed: Live Version Online - Updating to trigger automated deployment.
* Release Candidate: Testing Version for QA before Deployment - Updating to trigger automated deployment.
* Development: Active sprint development head of stream - merges into Master
* Feature-#: Branch specific to a given features development
* Bug-#: Branch specific to a given bug fix
