import Button from "../../ui/components/Button";
import Form from "../../ui/components/Form";
import FormWrapper from "../../ui/components/FormWrapper";
import Heading from "../../ui/components/Heading";
import Input from "../../ui/components/Input";
import Label from "../../ui/components/Label";
import styles from "./signup.module.css";
import Hr from "../../ui/components/Hr";

function Signup() {
  return (
    <FormWrapper className={styles.form_wrap}>
      <Heading title="Sign Up" size="lg" />
      <Hr />
      <Form action="">
        <Input
          type="text"
          id="f-name"
          placeholder="First Name"
          onChange={() => {}}
        />
        <Input type="text" id="l-name" placeholder="Last Name" />
        <Input type="text" id="u-name" placeholder="User Name" />
        <Input type="date" id="dob" placeholder="Date of Birth" />
        <Input type="text" id="email" placeholder="Email Address" />
        <Input type="text" id="password" placeholder="Password" />
        <Input type="text" id="c-password" placeholder="Confirm Password" />
        <div className={styles.gender_cl}>
          <div className={styles.gender_cl_type}>
            <Label htmlFor="male">Male</Label>
            <Input type="radio" id="male" name="gender" />
          </div>
          <div className={styles.gender_cl_type}>
            <Label htmlFor="female">Female</Label>
            <Input type="radio" id="female" name="gender" />
          </div>
        </div>
        <div className={styles.terms_cl}>
          <Input
            id="terms"
            type="checkbox"
            value={false}
            name="terms and conditions"
          />
          <Label htmlFor="terms">I agree with terms and conditions</Label>
        </div>
        <Button title="Sign Up" size="md" type="submit" />
      </Form>
    </FormWrapper>
  );
}

export default Signup;
