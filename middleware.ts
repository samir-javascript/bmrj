export { auth as middleware } from "@/auth"
// import nodemailer from "nodemailer";

// export const sendEmailVerification = async (email, subject, code) => {
//     const htmlTemplate = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Verify Your Email</title>
//         <style>
//             body {
//                 font-family: Arial, sans-serif;
//                 background-color: #f2f4f8;
//                 margin: 0;
//                 overflow-x: hidden;
//                 padding: 0;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 height: 100vh;
//             }
//             .container {
//                 background-color: #ffffff;
//                 padding: 20px 40px;
//                 border-radius: 8px;
//                 box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//                 text-align: center;
//                 max-width: 400px;
//                 margin: 0 auto;
//                 width: 100%;
//             }
//             .container img {
//                 width: 120px;
//                 margin-bottom: 20px;
//             }
//             .container h1 {
//                 font-size: 24px;
//                 margin-bottom: 10px;
//             }
//             .container p {
//                 font-size: 16px;
//                 color: #555555;
//                 margin-bottom: 20px;
//             }
//             .container .button {
//                 display: inline-block;
//                 background-color: #007bff;
//                 color: #ffffff;
//                 padding: 10px 20px;
//                 text-decoration: none;
//                 border-radius: 4px;
//                 font-size: 16px;
//             }
//             .container .link {
//                 margin-top: 20px;
//                 font-size: 14px;
//                 color: #007bff;
//                 word-break: break-all;
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <img src="https://img.freepik.com/free-vector/computer-with-mail-element-icon-cartoon-vector-isolated-laptop-with-envelope-letter-graphic-object-new-chat-message-desktop-device-monitor-digital-notification-alert-inbox-website_107791-23384.jpg?size=626&ext=jpg&ga=GA1.1.500951518.1716829287&semt=ais_user" alt="Email Icon">
//             <h1>Verify your email address</h1>
//             <p>You've entered <strong>${email}</strong> as the email address for your account.<br>
//             Please verify this email address via the code verification down below.</p>
           
//             <p class="link">your Email verification code is: <br>
//             ${code}</p>
//         </div>
//     </body>
//     </html>
//     `;

//     try {
//         const transporter = nodemailer.createTransport({
//             port: 587,
//             host: 'smtp.gmail.com',
//             secure: false,
//             service: "gmail",
//             auth: {
//                 user: "soufianehmamou92@gmail.com",
//                 pass: "hmzivlerbulgzsyu",
//             },
//         });

//         await transporter.sendMail({
//             from: "soufianehmamou92@gmail.com",
//             to: email,
//             subject: subject,
//             text: `${code}`,
//             html: htmlTemplate
//         });

//         console.log(`Email verification was sent successfully to ${email}`);
//     } catch (error) {
//         console.log(error);
//         console.log('Failed to send email verification');
//     }
// };

// export const sendPasswordResetCode = async(email,subject,code)=> {
//     const htmlTemplate = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Verify Your Email</title>
//         <style>
//             body {
//                 font-family: Arial, sans-serif;
//                 background-color: #f2f4f8;
//                 margin: 0;
//                 overflow-x: hidden;
//                 padding: 0;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 height: 100vh;
//             }
//             .container {
//                 background-color: #ffffff;
//                 padding: 20px 40px;
//                 border-radius: 8px;
//                 box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//                 text-align: center;
//                 max-width: 400px;
//                 margin: 0 auto;
//                 width: 100%;
//             }
//             .container img {
//                 width: 120px;
//                 margin-bottom: 20px;
//             }
//             .container h1 {
//                 font-size: 24px;
//                 margin-bottom: 10px;
//             }
//             .container p {
//                 font-size: 16px;
//                 color: #555555;
//                 margin-bottom: 20px;
//             }
//             .container .button {
//                 display: inline-block;
//                 background-color: #007bff;
//                 color: #ffffff;
//                 padding: 10px 20px;
//                 text-decoration: none;
//                 border-radius: 4px;
//                 font-size: 16px;
//             }
//             .container .link {
//                 margin-top: 20px;
//                 font-size: 14px;
//                 color: #007bff;
//                 word-break: break-all;
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
           
//             <h1>reset your password</h1>
            
           
//             <p class="link">your authentication code is: <br>
//             ${code}</p>
//         </div>
//     </body>
//     </html>
//     `;
//     try {
//         const transporter = nodemailer.createTransport({
//             port: 587,
//             host: 'smtp.gmail.com',
//             secure: false,
//             service: "gmail",
//             auth: {
//                 user: "soufianehmamou92@gmail.com",
//                 pass: "hmzivlerbulgzsyu",
//             },
//         })
//         await transporter.sendMail({
//              from: "soufianehmamou92@gmail.com",
//              to: email,
//              subject,
//              html: htmlTemplate,
//              text: code
//         })
//         console.log(`email reset code was sent seccessfuly to ${email}`)
//     } catch (error) {
//         console.log('Failed to send reset code',error)
//     }
// }