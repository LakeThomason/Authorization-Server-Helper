/**
 * Response from auth_server_ts /secret endpoint. Client ID / Client Secret Auth flow
 * This response is modified into ISecretHelperResponse.ts and sent back to caller
 */
export default interface ISecretServiceResponse {
  _id: string;
  client_id: string;
  roles: string[];
  token: string;
  token_birth: number;
  token_death: number;
}
