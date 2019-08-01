import axios from "axios";
import IVerifyReturn from "./interfaces/IVerifyReturn";

export default function verifyToken(token: string, authAPI: string): Promise<boolean> {
  return axios
    .get(`${authAPI}/oauth/verifyToken`, {
      params: { token }
    })
    .then((verifyObj) => {
      const isVerifiedObject: IVerifyReturn = verifyObj.data as IVerifyReturn;
      return isVerifiedObject.isVerified;
    });
}
