import Button from "../../ui/components/Button";
import Form from "../../ui/components/Form";
import FormWrapper from "../../ui/components/FormWrapper";
import Heading from "../../ui/components/Heading";
import Hr from "../../ui/components/Hr";
import Input from "../../ui/components/Input";
import styles from "./Signin.module.css";

function Signin() {
  return (
    <FormWrapper>
      <Form>
        <Heading title="Sign In" />
        <Hr />
        <Input type="text" id="email" placeholder="Email" required={true} />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          required={true}
        />
        <Button title="Sign In" size="sm" type="submit" />
      </Form>
      <div className={styles.b_links}>
        <a>Forgot Password</a>
        <a>Create new account</a>
      </div>
    </FormWrapper>
  );
}

export default Signin;
