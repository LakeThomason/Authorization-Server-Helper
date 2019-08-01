# post_auth_helper

## Description

Authorization server helper package that quickly authorizes with ClientID / Client Secret authorization flow

## Installation

`npm install post_auth_helper`

## Usage

```javascript
import { ClientIDClientSecretAuth } from "post_auth_helper";
// Mock args
const client_id = "My_Client_ID";
const client_secret = "secret 2kj4h2k3j4h2l3kj4hg";
const authAPI = "https://www.myAuthServer.net";

const clientAuth = new ClientIDClientSecretAuth(authAPI, client_id, client_secret);
clientAuth
  .authorize() // ClientID / Client Secret authorization
  .then(response => {
    console.log(response);
    /* 
        {
        _id: '5cdaefdb1d507b000f9bb7f3',
        client_id: 'Test_Item_Service',
        role: 'app',
        token: '9daa07c93013179334319552c188d907ba3c2621e52bcd263371c9ae391e83e9ece28cab29f124c1623570',
        token_birth: 1557852123138,
        token_death: 1560852123138
      }
    */
    return clientAuth.verifyToken(); // verifies the token from the reponse
    // returns clientAuth.verifyToken(someNewToken) // verifies the token from the argument
  })
  .then(isVerified => {
    // Responds with boolean value
    if (isVerified) {
      // do something..
    }
  });
```
