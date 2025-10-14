import { useRef } from "react";
import styles from "../styles/ProfileHeader.module.css";
import Button from "../../ui/components/Button";

function ProfileHeader() {
  const detailsRef = useRef();
  const coverRef = useRef();

  const showDetails = () => {
    detailsRef.current.classList.add(`${styles.detail_show}`);
    coverRef.current.classList.add(`${styles.cover_expand}`);
  };
  const hideDetail = () => {
    detailsRef.current.classList.remove(`${styles.detail_show}`);
    coverRef.current.classList.remove(`${styles.cover_expand}`);
  };
  return (
    <div className={styles.selfview_header}>
      <div className={styles.sv_cover_div} ref={coverRef}>
        <div className={styles.sv_cover}>
          <Button size="sm" className={styles.sv_cover_btn}>
            Edit cover
          </Button>
          <div className={styles.sv_pp}></div>
        </div>
      </div>
      <div
        className={styles.right_box}
        ref={detailsRef}
        onMouseOver={showDetails}
        onMouseLeave={hideDetail}
      >
        <div className={styles.decor}>
          <div className={styles.decor_bar}></div>
        </div>
        <div className={styles.sv_info_box}>
          <div className={styles.sv_info}>
            <div className={styles.name_prof}>
              <p className={styles.sv_name}>Hammad Ahmed</p>
              <p className={styles.sv_prof}>Profession</p>
            </div>
            <div className={styles.bio}>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
                nam, modi nihil optio architecto ipsam corporis, eos qui aperiam
                in sequi odio adipisci soluta a porro ducimus veritatis possimus
                quas!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
