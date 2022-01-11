//import Image from "next/image";
import { Card } from "react-bootstrap";
import styles from "../styles/InfoCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

function InfoCard({icon, title, id, path}) {
  console.log(icon);
  const router = useRouter();
  return (
    <Card key={id} className={styles.card} onClick={()=>{
      router.push(`/auth/user/${path}`)
    }}>
      <Card.Body className={styles.cardBody}>
      <FontAwesomeIcon
              icon={icon}
              size="10x"
              title="Homepage utente"              
              style={{ marginRight: "3px" }}
            />
      <Card.Text className={styles.cardText}>
        {title}
      </Card.Text>
      </Card.Body>
    </Card>      

  );
}



export default InfoCard;
