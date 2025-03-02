


export class RequestError extends Error {
    statusCode: number;
    errors?: Record<string, string[]>;

    constructor(
       statusCode: number,
       message: string,
       errors?: Record<string, string[]>
    ){
        super(message)
        this.statusCode = statusCode,
        this.errors = errors,
        this.name = "RequestError"
    }
}

export class UnAuthorizedError extends RequestError {
    constructor(message: string =  "unAuthorized") {
        super(401,message)
        this.name = "UnAuthorized Error"
    }
}
export class NotFoundError extends RequestError {
    constructor(resource:string) {
        super(404, `${resource} not found`)
        this.name = "Not Found Error"
    }
}
export class ValidationError extends RequestError {
    constructor(fieldsErrors: Record<string, string[]>) {
        const message = ValidationError.formatFieldErros(fieldsErrors)
        super(400,message,fieldsErrors)
        this.errors = fieldsErrors
        this.name = "ValidationError"
    }
    static formatFieldErros(errros:Record<string,string[]>): string {
        const formattedMessages = Object.entries(errros).map(([field,messages])=> {
            const fieldName = field.charAt(0).toUpperCase() + field.slice(1)
            if(messages[0] === "Required")  {
               return `${fieldName} is Required`
            }else {
               return messages.join(" and ")
            }
        })
        return formattedMessages.join(', ')
   }
}
export class ForbiddenError extends RequestError {
    constructor(message:string =  "Forbidden") {
        super(403,message)
        this.name = "Forbidden Error"
    }
}










