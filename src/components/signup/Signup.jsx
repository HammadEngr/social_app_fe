import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../ui/components/Button";
import Form from "../../ui/components/Form";
import FormWrapper from "../../ui/components/FormWrapper";
import Heading from "../../ui/components/Heading";
import Hr from "../../ui/components/Hr";
import Input from "../../ui/components/Input";
import Label from "../../ui/components/Label";
import api_request_fx from "../../utils/api_req";
import styles from "./signup.module.css";

// form validation schema
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  userName: yup.string().required("User name is required"),
  dateOfBirth: yup.date().required("Date of birth is required"),
  email: yup.string().email("Provide a valid email").required(),
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  gender: yup.string().required("Select your gender"),
  TOC: yup
    .boolean()
    .oneOf([true], "You must agree with terms and conditions to signup"),
});

// Signup component
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  /**
   * Form submit handler
   * @param {*} formData
   */
  const onSubmit = async (formData) => {
    const requestObject = {
      method: "POST",
      url: "auth/signup",
      data: {
        ...formData,
      },
    };
    const response = await api_request_fx(requestObject);
    console.log(response);
  };
  return (
    <FormWrapper className={styles.form_wrap}>
      <Heading title="Sign Up" size="lg" />
      <Hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="f-name"
          type="text"
          name="firstName"
          placeholder="First Name"
          register={register}
          error={errors.firstName}
        />
        <Input
          id="l-name"
          type="text"
          name="lastName"
          placeholder="Last Name"
          register={register}
          error={errors.lastName}
        />
        <Input
          id="u-name"
          type="text"
          name="userName"
          placeholder="User Name"
          register={register}
          error={errors.userName}
        />
        <Input
          id="dob"
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          register={register}
          error={errors.dateOfBirth}
        />
        <Input
          id="email"
          type="text"
          name="email"
          placeholder="Email Address"
          register={register}
          error={errors.email}
        />
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          register={register}
          error={errors.password}
        />
        <Input
          id="c-password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          register={register}
          error={errors.confirmPassword}
        />
        <div className={styles.gender_cl}>
          <div className={styles.gender_cl_type}>
            <Label htmlFor="male">Male</Label>
            <Input
              id="male"
              type="radio"
              name="gender"
              value="male"
              register={register}
              error={errors.gender}
            />
          </div>
          <div className={styles.gender_cl_type}>
            <Label htmlFor="female">Female</Label>
            <Input
              type="radio"
              id="female"
              name="gender"
              value="female"
              register={register}
              error={errors.gender}
            />
          </div>
        </div>
        <div className={styles.terms_cl}>
          <Input
            id="terms"
            type="checkbox"
            // value={true}
            name="TOC"
            register={register}
            error={errors.TOC}
          />
          <Label htmlFor="terms">I agree with terms and conditions</Label>
        </div>
        <Button title="Sign Up" size="md" type="submit" />
      </Form>
    </FormWrapper>
  );
}

export default Signup;
