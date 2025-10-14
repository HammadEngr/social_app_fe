import React from "react";
import styles from "./Welcome.module.css";
import Button from "../../ui/components/Button";
import Signin from "../signin/Signin";
import { Languages, SprayCan } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Tooltip } from "antd";

function Welcome() {
  const { toggleTheme } = useTheme();
  return (
    <div className={styles.welcome_wrap}>
      <div className={styles.inner_box}>
        <div className={styles.top_}>
          <p className={styles.fleek_}>Fleek</p>
          <p className={styles.fellas_}>
            Where the fellas hang, memories are made
          </p>
          <div className={styles.btn_}>
            <Button size="md">
              <Tooltip title="switch language" className={styles.tooltip_}>
                <Languages strokeWidth={1} />
              </Tooltip>
            </Button>
            <Button size="md" onClick={toggleTheme}>
              <Tooltip title="switch color mode">
                <SprayCan strokeWidth={1} />
              </Tooltip>
            </Button>
          </div>
        </div>
        <div className={styles.bottom_}>
          <div className={styles.imgs_}>
            <div className={styles.imgs_box}>
              <div>
                <div className={styles.wimgs_1}>
                  <img src="./welcome/w1.jpg" alt="w1-img" />
                </div>
                <div className={styles.wimgs_2}>
                  <img src="./welcome/w2.jpg" alt="w1-img" />
                </div>
                <div className={styles.wimgs_3}>
                  <img src="./welcome/w3.jpg" alt="w1-img" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.signin_}>
            <Signin />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
