import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Button from "../../ui/components/Button";
import Form from "../../ui/components/Form";
import FormWrapper from "../../ui/components/FormWrapper";
import Heading from "../../ui/components/Heading";
import Hr from "../../ui/components/Hr";
import Input from "../../ui/components/Input";
import callApi from "../../utils/callApi";
import styles from "./Signin.module.css";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Provide a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

function Signin() {
  const [responseError, setResponseError] = useState(null);
  const navigate = useNavigate();
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
      const { data } = await callApi(requestOptions);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate(`/user/self/${data.user.id}`);

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
        <Button size="md" type="submit">
          Proceed
        </Button>
      </Form>
      <div className={styles.b_links}>
        <Link to="/recover">Forgot Password</Link>
        <Link to="/signup">Create new account</Link>
      </div>
    </FormWrapper>
  );
}

export default Signin;
