import { DEF_403, NAME_403 } from "../constants/app-messages";
import BaseException from "./baseException";

class ForbiddenException extends BaseException {
  constructor(message?: string) {
    super(403, message || DEF_403, NAME_403, true);
  }
}

export default ForbiddenException;
