import { StatusCodes } from "http-status-codes";

class ClientError extends Error{
    constructor(error) {
        super();
        this.name = 'ClientError';
        this.message = error.message;
        this.statusCode = error.statusCode ? error.statusCode : StatusCodes.BAD_REQUEST;
        this.explaination = error.explaination;
    }
}
export default ClientError;