import { Modal } from "antd";
import { useState } from "react";
import FormWrapper from "../../ui/components/FormWrapper";
import CreatePost from "../CreatePost/CreatePost";
import styles from "./UserPost.module.css";

function UserPost() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <FormWrapper>
      <div className={styles.post_}>
        <img className={styles.post_img}></img>
        <button className={styles.post_btn} onClick={showModal}>
          What's on your mind
        </button>
      </div>
      <Modal title="Create post" open={isModalOpen} onCancel={handleCancel}>
        <CreatePost />
      </Modal>
    </FormWrapper>
  );
}

export default UserPost;
