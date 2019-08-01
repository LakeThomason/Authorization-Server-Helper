import axios from "axios";
import ISecretServiceResponse from "./interfaces/ISecretServiceResponse";
import Token from "./Token";
import verifyToken from "./verifyToken";

const TOKEN_GRANT_TYPE = "token";
/**
 * Authorization data members and functions for Client ID / Client Secret
 * authorization flow
 */
export class ClientIDClientSecretAuth {
  public _token: Token;
  private _clientID: string;
  private _clientSecret: string;
  private _authAPI: string;

  /**
   * Intializes a clientID/ClientSecret appending the missing "secret " if not provided.
   * @param authAPI The authorization base url
   * @param clientID An applications public client ID
   * @param clientSecret An applications hidden client secret
   */
  constructor(authAPI: string, clientID: string, clientSecret: string) {
    this._authAPI = authAPI;
    this._clientID = clientID;
    // If "secret " prefix was not applied to clientSecret
    if (clientSecret.split(" ").length === 1) {
      this._clientSecret = `secret ${clientSecret}`;
    } else {
      this._clientSecret = clientSecret;
    }
  }

  /**
   * ClientID / Client Secret Authorization helper function
   * @returns Promise of type ISecretHelperRepsonse or an error if things went wrong
   * @throws Axios error on 4xx-5xx status code response
   */
  public authorize(): Promise<ISecretServiceResponse> {
    return axios
      .get(`${this._authAPI}/oauth/secret`, {
        params: {
          client_id: this._clientID,
          client_secret: this._clientSecret,
          grant_type: TOKEN_GRANT_TYPE
        }
      })
      .then(res => {
        const serviceResponse: ISecretServiceResponse = res.data;
        // Make new token object from response.data
        this._token = new Token(serviceResponse.token, serviceResponse.token_death, serviceResponse.roles);
        return serviceResponse;
      });
  }

  /**
   * Verifies a bearer token is valid and alive
   * @param token Bearer token supplied by the auth_server_ts
   */
  public verifyToken(token: string = this._token._tokenString): Promise<boolean> {
    return verifyToken(token, this._authAPI);
  }
}
