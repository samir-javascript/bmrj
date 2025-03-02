export interface SignUpParams  {
  name: string;
  lastName:string;
  email: string;
  phoneNumber:string;
  gender: "male" | "female";
  password: string;
}