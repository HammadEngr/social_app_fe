import { Modal } from "antd";
import { useState } from "react";
import CreatePost from "../CreatePost/CreatePost";
import styles from "./UserPost.module.css";

function UserPost() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={styles.post_}>
        <img className={styles.post_img}></img>
        <button className={styles.post_btn} onClick={showModal}>
          What's on your mind
        </button>
      </div>
      <Modal
        title="Create Post"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <CreatePost closeModal={closeModal} />
      </Modal>
    </>
  );
}

export default UserPost;
