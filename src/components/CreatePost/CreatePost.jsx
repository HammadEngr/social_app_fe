import { useState, useRef } from "react";
import styles from "./CreatePost.module.css";
import Form from "../../ui/components/Form";
import Button from "../../ui/components/Button";
import { useUser } from "../../contexts/UserContext";
import { Modal } from "antd";
import callApi from "../../utils/callApi";

function CreatePost({ closeModal }) {
  const [content, setContent] = useState(null);
  const [message, setMessage] = useState(null);
  const { user } = useUser();

  const editableRef = useRef(null);

  const handleInput = (e) => {
    setContent(e.target.innerText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContent("");
    editableRef.current.innerText = null;
  };

  const createPost = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const requestOptions = {
      method: "POST",
      url: "posts/newPost",
      data: { content, authorId: user.id },
      signal,
    };
    const response = await callApi(requestOptions);
    if (response.status) {
      setMessage(response.message);
    }
    closeModal();
  };

  return (
    <>
      <Form className={styles.post_form} onSubmit={handleSubmit}>
        <div className={styles.wrapper}>
          <div
            ref={editableRef}
            className={`${styles.post_content} ${!content ? styles.empty : ""}`}
            role="textbox"
            contentEditable="true"
            onInput={handleInput}
            suppressContentEditableWarning={true}
            autoFocus={true}
          />
          {!content && (
            <span className={styles.placeholder}>Share your thoughts</span>
          )}
        </div>
        <Button
          title="Post"
          type="submit"
          size="sm"
          className={styles.btn}
          onClick={createPost}
        />
      </Form>
      <Modal open={message} onCancel={() => setMessage(null)} footer={null}>
        <p>{message}</p>
      </Modal>
    </>
  );
}

export default CreatePost;
