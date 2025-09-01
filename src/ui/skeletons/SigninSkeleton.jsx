import React from "react";
import Skeleton from "../components/Skeleton";
import Hr from "../components/Hr";
import styles from "../styles/SigninSkeleton.module.css";

function SigninSkeleton() {
  return (
    <div className={styles.sk_box}>
      <Skeleton className={styles.sk_head} />
      <Hr className={styles.sk_hr} />

      <Skeleton />
      <Skeleton />
      <Skeleton className={styles.sk_btn} />

      <div className={styles.ex_box}>
        <Skeleton className={styles.sk_link} />
        <Skeleton className={styles.sk_link} />
      </div>
    </div>
  );
}

export default SigninSkeleton;
