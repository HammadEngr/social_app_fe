import styles from "./SelfView.module.css";
import Button from "../../../ui/components/Button";
import Container from "../../../ui/components/Container";
import { useRef } from "react";
import ProfileHeader from "../../../sharedComponents/components/ProfileHeader";

function SelfView() {
  return (
    <Container>
      <ProfileHeader />
      <div className={styles.sv_body_wrap}>
        <div className={styles.sv_create_post}></div>
      </div>
    </Container>
  );
}

export default SelfView;
