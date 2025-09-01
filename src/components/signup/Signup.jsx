import Button from "../../ui/components/Button";
import Form from "../../ui/components/Form";
import FormWrapper from "../../ui/components/FormWrapper";
import Heading from "../../ui/components/Heading";
import Hr from "../../ui/components/Hr";
import Input from "../../ui/components/Input";
import Label from "../../ui/components/Label";
import styles from "./signup.module.css";

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
          required={true}
          onChange={() => {}}
        />
        <Input
          type="text"
          id="l-name"
          placeholder="Last Name"
          required={true}
        />
        <Input
          type="text"
          id="u-name"
          placeholder="User Name"
          required={true}
        />
        <Input
          type="date"
          id="dob"
          placeholder="Date of Birth"
          required={true}
        />
        <Input
          type="text"
          id="email"
          placeholder="Email Address"
          required={true}
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          required={true}
        />
        <Input
          type="password"
          id="c-password"
          placeholder="Confirm Password"
          required={true}
        />
        <div className={styles.gender_cl}>
          <div className={styles.gender_cl_type}>
            <Label htmlFor="male">Male</Label>
            <Input type="radio" id="male" name="gender" required={true} />
          </div>
          <div className={styles.gender_cl_type}>
            <Label htmlFor="female">Female</Label>
            <Input type="radio" id="female" name="gender" required={true} />
          </div>
        </div>
        <div className={styles.terms_cl}>
          <Input
            id="terms"
            type="checkbox"
            value={false}
            name="terms and conditions"
            required={true}
          />
          <Label htmlFor="terms">I agree with terms and conditions</Label>
        </div>
        <Button title="Sign Up" size="md" type="submit" />
      </Form>
    </FormWrapper>
  );
}

export default Signup;
