import styles from "./Signin.module.css";
import FormWrapper from "../../ui/components/FormWrapper";
import Form from "../../ui/components/Form";
import Input from "../../ui/components/Input";
import Button from "../../ui/components/Button";
import Heading from "../../ui/components/Heading";
import Hr from "../../ui/components/Hr";

function Signin() {
  return (
    <FormWrapper>
      <Form>
        <Heading title="Sign In" />
        <Hr />
        <Input type="text" id="email" placeholder="Email" />
        <Input type="text" id="password" placeholder="Password" />
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
