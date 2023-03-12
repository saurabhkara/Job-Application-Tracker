
//Custom error handler class
class CustomErrorHandler extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super();
        this.status = status;
        this.message = message;
    }

    static internalError(status = 500, msg = "Internal Error") {
        return new CustomErrorHandler(status, msg);
    }

}

export default CustomErrorHandler;