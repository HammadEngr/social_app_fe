import Skeleton from "../components/Skeleton";
import styles from "../styles/SignupSkeleton.module.css";

function SignupSkeleton() {
  return (
    <div className={styles.sk_box}>
      <Skeleton className={styles.sk_head} />
      <hr className={styles.sk_hr} />
      <div className={styles.sk_box_in}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
      <div className={styles.radio_box}>
        <Skeleton />
        <Skeleton />
      </div>
      <Skeleton className={styles.sk_btn} />
    </div>
  );
}

export default SignupSkeleton;
