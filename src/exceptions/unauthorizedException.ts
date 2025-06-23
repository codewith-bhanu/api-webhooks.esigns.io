import { DEF_401, NAME_401 } from "../constants/app-messages";
import BaseException from "./baseException";

class UnauthorizedException extends BaseException {
  constructor(message: string) {
    super(401, message || DEF_401, NAME_401, true);
  }
}

export default UnauthorizedException;
