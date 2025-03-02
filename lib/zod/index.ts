import z from "zod"
export const SignUpValidationSchema = z.object({
    gender: z.enum(["male", "female"], {message: "gender Type is not valid!"}),
    name: z.string().min(1, {message: "name field is required!"}),
    lastName: z.string().min(1, {message: "lastName is required!"}),
    phoneNumber: z.string().regex(
        /^[+\d]?(?:[\d-.\s()]*)$/, 
        "Invalid phone number format"
    ),
    email: z.string().email({message: "please provide a valid email address!"}),
    password: z.string().min(8, "Password must be at least 8 characters long").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
})
export const LoginValidationSchema = z.object({
    email: z.string().email({message: "please provide a valid email address!"}),
    password: z.string().min(8, "Password must be at least 8 characters long").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
})