import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../ui/components/Button";
import Form from "../../ui/components/Form";
import FormWrapper from "../../ui/components/FormWrapper";
import Heading from "../../ui/components/Heading";
import Hr from "../../ui/components/Hr";
import Input from "../../ui/components/Input";
import api_request_fx from "../../utils/api_req";
import { useParams, useNavigate } from "react-router";

const schema = yup.object({
  password_rp: yup.string(),
});

function ResetPasswordForm() {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    checkToken();
  }, [isTokenValid]);

  const checkToken = async () => {
    try {
      const requestObject = {
        method: "GET",
        url: `auth/resetPassword/${token}`,
      };
      const response = await api_request_fx(requestObject);

      if (response.status === 200 || response.status === true) {
        setIsTokenValid(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const resetPassword = async (formData) => {
    try {
      const requestObject = {
        method: "POST",
        url: `auth/resetPassword/${token}`,
        data: {
          password: formData.password_rp,
          confirmPassword: formData.confirmPassword_rp,
        },
      };
      const response = await api_request_fx(requestObject);
      if (response.status === true) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isTokenValid ? (
        <FormWrapper>
          <Heading title="Reset Password" />
          <Hr />
          <Form onSubmit={handleSubmit(resetPassword)}>
            <Input
              id="password_rp"
              name="password_rp"
              placeholder="New password"
              autofocus={true}
              register={register}
              error={errors.password_rp}
            />
            <Input
              id="confirmPassword_rp"
              name="confirmPassword_rp"
              placeholder="Confirm new password"
              register={register}
              error={errors.confirmPassword_rp}
            />
            <Button title="Reset" size="sm" type="submit" />
          </Form>
        </FormWrapper>
      ) : null}
    </>
  );
}

export default ResetPasswordForm;
