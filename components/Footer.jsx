
import styles from "../styles/Footer.module.css";
import api from "../scripts/api";

function Footer(){
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <img className={styles.img} src= {api.toServerImageUrl("/image/product/auto.jpeg")} alt="Immagine Footer"/>
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h1 className={styles.title}>I NOSTRI PUNTI</h1>
          <p className={styles.text}>
            Via Zamboni
            <br /> Bologna, 40127
            <br /> 057-521425526
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Orari di apertura</h1>
          <p className={styles.text}>
            LUNEDI' - VENERDI'
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SABATO - DOMENICA
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
