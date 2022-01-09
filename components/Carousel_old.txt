import styles from "../styles/Carousel.module.css";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

function Carousel () {
  const [index, setIndex] = useState(0);
  const images = [
    "/img/yacht.jpeg",
    "/img/auto.jpeg",
    "/img/orologi.jpeg",
    "/img/gioielli.jpeg",
  ];

  const handleArrow = (direction) =>{
      if(direction==="l"){
          setIndex(index !== 0 ? index-1 : 3)
      }
      if(direction==="r"){
          setIndex(index !== 3 ? index+1 : 0)
      }
  }

  useEffect(() => {
    const intervalID = setTimeout(() => {
      setIndex(index !== 3 ? index+1 : 0)
    }, 5000);
    return () => clearInterval(intervalID);
  }, [index]);

  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} style={{ left: 0 }} onClick={()=>handleArrow("l")}>
        <Image src="/img/arrowl.png" alt="" layout="fill" objectFit="contain"/>
      </div>
      <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="" layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>
      <div className={styles.arrowContainer} style={{ right: 0 }} onClick={()=>handleArrow("r")}>
        <Image src="/img/arrowr.png" layout="fill" alt="" objectFit="contain"/>
      </div>
    </div>
  );
};

export default Carousel;
