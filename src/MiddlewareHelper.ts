import { NextFunction, Request, RequestHandler, Response, Router } from "express";
import { UnauthorizedError } from "ltr_http_errors";
import { ServiceAuthenticator } from "typescript-rest";
import verifyToken from "./verifyToken";

const AUTH_HEADER = "Authorization";

/**
 * Class designed to be used with swagger as a security middleware
 */
export class MiddlewareHelper implements ServiceAuthenticator {
  private _authAPI: string;
  constructor(authAPI: string) {
    this._authAPI = authAPI;
  }

  /**
   * Grabs the array of roles associated with a token
   * @returns string[] of roles that define what this token can do
   */
  public getRoles(req: Request): string[] {
    let roles: string = req.header(AUTH_HEADER).split("X")[1];
    if (roles) {
      return roles.split(",");
    } else {
      return [];
    }
  }

  /**
   * Function to be called while a service is being setup
   * Does nothing in this instance
   * @param router The router
   */
  public initialize(router: Router): void {
    return;
  }

  /**
   * Function called by swagger security middleware
   * @returns Express middleware router
   */
  public getMiddleware(): RequestHandler {
    // Return the thing that will run the security check
    return this.runAuthCheck;
  }

  /**
   * Verifies the token passed in via the req object.
   * This function is returned by the getMiddleWare() function to provide ease of use
   * with swagger services
   * @param req Request object containing the Authorization header
   * @param resp Response object (not used in this function)
   * @param next Function that calls the next endpoint after this operation completes
   */
  private runAuthCheck(req: Request, resp: Response, next: NextFunction): void {
    verifyToken(req.header(AUTH_HEADER), this._authAPI)
      .then(isVerified => {
        if (isVerified) {
          next();
        } else {
          throw new UnauthorizedError("Token could not be verified");
        }
      })
      .catch(() => {
        throw new UnauthorizedError("Token could not be verified");
      });
  }
}
