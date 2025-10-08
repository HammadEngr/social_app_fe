import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import Button from "../../ui/components/Button";
import Form from "../../ui/components/Form";
import FormWrapper from "../../ui/components/FormWrapper";
import Heading from "../../ui/components/Heading";
import Hr from "../../ui/components/Hr";
import Input from "../../ui/components/Input";
import api_request_fx from "../../utils/api_req";
import styles from "./PasswordRecover.module.css";

const searchUserSchema = yup.object({
  email_pr: yup
    .string()
    .email("Provide a valid email address")
    .required("Email is required"),
});

function PasswordRecover() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(searchUserSchema) });

  const searchUser = async (formData) => {
    try {
      const requestObject = {
        method: "POST",
        url: "auth/forgotPassword",
        data: {
          email: formData.email_pr,
        },
      };
      const response = await api_request_fx(requestObject);
      if (response.status === true && response.message === "User found") {
        setUserFound(true);
        setUserEmail(response.data.email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper>
      <Heading title="Find Your Profile" size="md" />
      <Hr />
      <Form onSubmit={handleSubmit(searchUser)}>
        <Input
          id="email_pr"
          name="email_pr"
          type="text"
          placeholder="Email"
          error={errors.email_pr}
          register={register}
          autoFocus={true}
        />
        <div className={styles.btn_pr}>
          <Button
            size="sm"
            title="Cancel"
            className={styles.btn_cl_pr}
            onClick={() => navigate(-1)}
          />
          <Button size="sm" title="Search" type="submit" />
        </div>
      </Form>
    </FormWrapper>
  );
}

export default PasswordRecover;
