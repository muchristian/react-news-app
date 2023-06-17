import { Moment } from "moment";

export interface signup {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface login {
  email: string;
  password: string;
}
