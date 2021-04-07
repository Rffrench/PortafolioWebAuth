# PortafolioWebAuth

This microservice handles the signup and login functionalities. It stores passwords hashed+salt using bcrypt algorithm and compares the hashes when trying to log into the website. After signup, this service will also email the user. After logging in, the service creates a JWT token that contains the username, roleId, userId, and email of the user. This token will later be stored in a cookie in the frontend.

**Please if you want more info about the project refer to PortafolioWeb**
