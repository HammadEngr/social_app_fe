import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Button from "../../ui/components/Button";
import Form from "../../ui/components/Form";
import FormWrapper from "../../ui/components/FormWrapper";
import Heading from "../../ui/components/Heading";
import Hr from "../../ui/components/Hr";
import Input from "../../ui/components/Input";
import api_request_fx from "../../utils/api_req";
import styles from "./Signin.module.css";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Provide a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be atleast 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  })
  .required();

function Signin() {
  const [responseError, setResponseError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (formData) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const requestOptions = {
        method: "POST",
        url: "auth/signin",
        data: {
          email: formData.email,
          password: formData.password,
        },
        signal,
      };
      const { data } = await api_request_fx(requestOptions);

      if (data.status === "fail") {
        setResponseError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading title="Sign In" />
        <Hr />
        <Input
          id="email"
          type="text"
          name="email"
          required={true}
          placeholder="Email"
          register={register}
          error={errors.email}
        />
        <Input
          id="password"
          type="password"
          name="password"
          required={true}
          placeholder="Password"
          register={register}
          error={errors.password}
        />
        {responseError ? (
          <p className={styles.err_cl}>{responseError}</p>
        ) : null}
        <Button title="Sign In" size="sm" type="submit" />
      </Form>
      <div className={styles.b_links}>
        <Link to="/recover">Forgot Password</Link>
        <Link to="/signup">Create new account</Link>
      </div>
    </FormWrapper>
  );
}

export default Signin;
