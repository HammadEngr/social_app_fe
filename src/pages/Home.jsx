import { Modal } from "antd";
import { useState } from "react";
import Button from "../ui/components/Button";
import CreatePost from "../components/CreatePost/CreatePost";

function Home() {
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
    <div>
      <Button type="button" title="Show Modal" onClick={showModal} size="md" />
      <Modal title="Create post" open={isModalOpen} onCancel={handleCancel}>
        <CreatePost />
      </Modal>
    </div>
  );
}

export default Home;
