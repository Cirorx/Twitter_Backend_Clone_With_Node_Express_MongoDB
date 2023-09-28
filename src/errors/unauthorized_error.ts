import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "./custom_api_error";

export class UnauthorizedError extends CustomApiError {
    constructor(message: string = "Invalid Credentials") {
        super(message, StatusCodes.UNAUTHORIZED);
        // ensure instanceof
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

