/**
 * Class that represents a token from the authorization database
 */
export default class Token {
  public readonly _tokenString: string;
  public readonly _tokenDeath: number;
  public _roles: string[] = [];

  /**
   * @param tokenString The actual token that is stored in the DB
   * @param tokenDeath The ms time of when the token will no longer work
   * @param role The array of roles that this token has
   */
  constructor(tokenString: string, tokenDeath: number, roles: string[]) {
    this._tokenString = tokenString;
    this._tokenDeath = tokenDeath;
    this._roles = roles;
  }

  /**
   * Does a soft check to see if the token is still alive
   */
  public checkTokenLife(): boolean {
    return new Date().getTime() < this._tokenDeath;
  }
}
