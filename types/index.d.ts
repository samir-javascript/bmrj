type ActionResponse<T = null> = {
    [x: string]: any;
    success: boolean;
    data?: T,
    error?: {
        message: string;
        details: Record<string , string[]>
    },
    message?:string;
    status?: number
  }
  type SuccessResponse = ActionResponse<T> & {success: true}
  type ErrorResponse = ActionResponse<undefined> & {success: false}
  type APIErrorResponse = NextResponse<ErrorResponse>
  type APIResponse<T = null> = NextResponse<SuccessResponse<T | ErrorResponse>>