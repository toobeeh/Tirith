# Tirith

[![part of Typo ecosystem](https://img.shields.io/badge/Typo%20ecosystem-Tirith-blue?style=flat&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACV0lEQVR4nO3dPUrDYByA8UQ8g15AI+gsOOnmrufoIBT0DAUFB+/R3bFTobOCwQvoJSouNcObhHyZ9n2eHwiirW3Th79J2iaJJEmSJEmSJIC06iGu1+vgz9M0Df9CY6t8PkP2fMrYDADOAOAMAM4A4OrWGl3bj0Pp8+wEgDMAuP2uD//w7I6+DEf19fbc6eadAHAGAGcAcAYAZwBwnbcCTrIj+jL8Fx/55yA34wSAMwA4A4AzADgDgDMAOAOAMwC4zjuCzi+uN9+fZgeNrvuefw+69FfL10H/fgycAHAGAGcAcAYAZwBwnbcCioZeq2+quIVS5NbBHycAnAHARffRsOksr71Ml38Bi/mk9XVH5EfDFGYAcHVbAWWjw08NbyePEaRmDADOAOAMAM4A4Fq9FjCd5cG1zaeHrPeleXnzsvl+MZ802vooe4fSatn9ftUILp/iYxlCm51UTgA4A4Dr9eXgsv3wtJdfhx71fXICwBkAXGUAv+cLCH0pHk4AOAOAMwA4A4AzALhedwRpXBVneSu9X04AOAOAMwA4A4AzADgDgDMAOAOAMwA4A4AzADgDgDMAOAOAMwA4A4AzALio3xG0bUcu3UZOADgDgDMAOAOAMwC4qLcCRjxG0M5wAsAZAJwBwBkAnAHAGQCcAcAZAJwBwBkAnAHA+Y4gOCcAnAHAGQCcAcAZAFyrrYDH++NGl7+6ZZ0yZpc4AeAMAC66HUFDnLwyZk4AOAOAKz+QfMXx58dScdz7se5o8A7t0HJzAtAZAJwBwBkAnAFIkiRJkiRJUtySJPkBweNXgRaWkYQAAAAASUVORK5CYII=)](https://github.com/topics/skribbl-typo)

Tirith is an fullstack application which aims to provide a web-interface to access and manage skribbltypo related data.  
It is split into a NEST backend which serves as API for the frontend and the skribbltypo extension, and an Angular frontend which replaces the legacy skribbltypo website.  
The website features an introduction to the extension, various tools and helpers for Palantir, an user dashboard and a restricted additional admin dashboard.

## API

The API uses rich swagger annotations to generate a meaningful openapi spec and the frontend api client from that.  
There is also a [swagger interface](https://api.typo.rip/docs) available for the public api.
Authentication is done by providing a BEARER token in the headers; each user has an individual token for use across typo and can be obtained on the /login page on the website.  
The api uses the toobeeh/Valmar service, which is an internal component of the typo ecosystem, for database access and domain logic.  
To implement new features, Valmar will need to support them first as well.  
The Tirith api adds a "public interface" on top of Valmar, taking care of authentication, rate-limiting and caching if needed.

## Frontend

The frontend angular application is split into modules:

- _public_ for static/information/tool content
- _auth_ which features the authentication page to login with Discord
- _admin_ containing the admin dashboard.
- _user_ - the user dashboard, primary for server management

Additionally, there is the API service module, which is auto-generated via openapi tools based on the backend openapi specs.

The frontend is live on the [www subdomain](https://www.typo.rip) and probably also accessible via redirect from the typo TLD https://typo.rip
