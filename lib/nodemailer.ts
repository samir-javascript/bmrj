import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    port: 587,
    service: "gmail",
    auth: {
        user: "soufianehmamou92@gmail.com",
        pass: "hmzivlerbulgzsyu"
    },
    secure: false,
    host: "smtp.gmail.com"
})

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: 'soufianehmamou92@gmail.com',
    to: email,
    subject: "Verify your email address",
    html: `
      <h1>Verify your Email</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
    `,
  };

  await transporter.sendMail(mailOptions);
}
export async function sendSetPasswordVerificationCode(email:string,plainToken:string) {
  const mailOptions = {
    from: 'soufianehmamou92@gmail.com',
    to: email,
    subject: "Your Password Reset Code.",
    html: `
      <h1>Your Password Reset Code</h1>
      <p>Click the link below to verify your email address:</p>
      <p>Your code is <strong>${plainToken}</strong>. It will expire in 15 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
interface ConfirmationOrderProps {
   orderId:string;
   email:string;
   shippingAddress: {
     postalCode:string;
     address:string;
     city:string;
    
   }
   order: {

   }
}
export async function sendOrderConfirmationEmail({orderId,shippingAddress,order,email}:ConfirmationOrderProps) {
  const mailOptions = {
    from: 'soufianehmamou92@gmail.com',
    to: email,
    subject: "Your Password Reset Code.",
    html: `
      <h1>Your Password Reset Code</h1>
      <p>Click the link below to verify your email address:</p>
      <p>something goes here</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}