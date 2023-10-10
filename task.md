#### env
* Node.js;
* Redis for data storage;
* Any open source libraries you like in your submission.


We need an authentication API for internal services to create and authenticate users. This API should be RESTful and use JSON. It should be fast and secure, and be able to pass a basic security audit (e.g. password complexity). If there are areas of security that your solution hasn't had time to address they should be annotated for future development.


#### Reqs
* This API should be RESTful and use JSON;
* It should be fast and secure;
* create a new login with a username and password;
* ensuring that usernames are unique;
* authenticate this login at a separate end point;
* basic security audit (e.g. password complexity);
* It should:
  * respond with 200 OK messages for correct requests;
  * 401 for failing authentication requests;
  * do proper error checking, with error responses in a JSON response body.


#### Other
* There is no time limit on this challenge;
* We want a production-level quality that you're proud of;
* Should take 3 - 5 hours of time;
* Return it within a week;
* We encourage you to give us some context about your approach in your readme documentation.
