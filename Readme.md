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

## Authorization (OAuth2)

Typo went through a lot of (bad practice) auth variants, so there might be remains of that found in the code.  
The current auth flow is completely independent of that, but might support a few old endpoints for backwards compatibility.  

### User identification
The core of authenticating with typo is a discord login. Each typo account is associated with a discord account.  
To identify a user, the Discord oauth2 flow is performed. The resulting authorization code is used in the backend to receive a discord access token and using that, receive the discord ID of the acting user.  
Using the discord ID, the backend can fetch the associated typo user and proceed with the typo auth flow.

### Typo authorization overview
Typo implements a minimal version of OAuth2, which only supports Authorization Code flow.  
Any user can create up to 5 unverified OAuth2 clients which have fixed parameters:
- expiry
- redirect uri
- scope

To create more clients or to display an approved badge on the login UI, users can request manual verification from the dev.

Although being limited to fixed client parameters and the authorization code flow, Typo is fully OAuth2 compliant and uses JWT as access tokens.

### OAuth2 Authorization Code flow
The typo frontend exposes two pages to perform the flow:

#### /oauth2/authorize
This page is the entry for the auth code flow.  
To start the flow, the client has to redirect to this page and provide following query parameters:
- client_id: ID of the client, has to be created via the API first
- response_type: Can only be "code", since typo does not implement other OAuth2 flows
- state: Optional state parameter

This page will first redirect to the discord oauth2 flow as described above, and then proceed with the actual OAuth flow on the /oauth2/submit page.

#### /oauth2/submit
This page posts the received discord auth code along with the typo oauth client id to the typo API, to receive a typo auth code along with user details and information to the token that is about to be created.  
The user is prompted to accept the information about the created token, which will next complete the auth code flow by redirecting back to the client's redirect_uri along with following query parameters:
- code: the created OAuth2 Authorization Code which can be used to obtain the Access Token
- state: the state data passed before when starting the flow

### OAuth2 Token Creation
Once it has received the authorization code, the client can once retrieve an access token that matches the client's scopes.  
This is done using an endpoint in the typo API:

#### /oauth2/token
This endpoint receives following url encoded data:
- grant_type: "authorization_code", which is the only supported flow
- code: the authorization code received in the previous steps
- redirect_uri: the uri that had been used when creating the auth code
- client_id: the client id that the auth code had been issued for

### Backend implementation
During auth code creation, the API fetches the discord user. 
It then forwards the client id and user login to the internal domain logic API, Valmar.  
There, an auth code is stored along with an expiry, and returned to the API, which passes it to the user.  
Auth codes are c# ULIDs.

When the API receives the auth code, it sends it along with redirect uri and client id to Valmar.  
Valmar verifies the parameters and generates a JWT based on scopes and expiry associated with the client, which is passed to the API and again returned to the user.

