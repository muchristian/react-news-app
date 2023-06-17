import React from "react";
import Link from "next/link";
import { Button } from "../../components/Button";
import { Input } from "../../components/Form";
import { Form } from "antd";
import { NextPage } from "next";
import { useSignupMutation } from "../../services/auth";
import { signup } from "../../utils/models";
import { ToastRender } from "../../utils/toast";
import Unauthenticated from "../../layouts/Unauthenticated";

interface formValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const Signup: NextPage = () => {
  const [form] = Form.useForm();
  const initialValues: formValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  const [signup, { data: loginResponse, error: loginError }] =
    useSignupMutation();
  const validationSchema = {
    name: {
      required: true,
      message: "Invalid Name",
    },
    email: {
      required: true,
      message: "Invalid Email",
    },
    password: {
      required: true,
      message: "Invalid Password",
    },
  };

  const onFinishedSignup = async (values: signup) => {
    try {
      const result = await signup(values).unwrap();
      form.resetFields();
      ToastRender(result.message);
    } catch (error: any) {
      const { message } = error.data;
      ToastRender(message, true);
    }
  };

  return (
    <Unauthenticated>
      <div className="bg-sidebar1 p-[64px] border border-active/10 rounded">
        <div className="flex flex-col gap-[48px]">
          <h1 className="font-bold text-2xl text-secondary">NEWS-APP</h1>
          <div className="flex flex-col gap-[16px]">
            <h2 className="font-semibold text-primary text-lg text-normal">
              SignUp
            </h2>
            <p className="text-primary">Fill out this form to signup</p>
          </div>
          <Form
            layout="vertical"
            initialValues={initialValues}
            autoComplete="off"
            form={form}
            onFinish={onFinishedSignup}
            className="flex flex-col gap-[32px]"
          >
            <div className="flex flex-col gap-[16px]">
              <Input
                type="text"
                name="name"
                label="Name"
                placeholder="John Doe"
                rules={[validationSchema.name]}
              />
              <Input
                type="email"
                name="email"
                label="Email address"
                placeholder="johndoe@mail.com"
                rules={[validationSchema.email]}
              />
              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="password"
                rules={[validationSchema.password]}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button classes="button block w-full" type="submit">
                <>Signup</>
              </Button>
              <span>
                Already have an account?{" "}
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </Unauthenticated>
  );
};

export default Signup;
