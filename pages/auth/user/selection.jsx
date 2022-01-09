import InfoCard from "../../../components/InfoCard";
import styles from "../../../styles/Selection.module.css"
import { faUserCircle, faFileInvoice } from "@fortawesome/free-solid-svg-icons";


function Selection(){
    const selection = [
        {
            title: "Ordini",
            icon: faUserCircle,
            path: "orderlist"
        },
        {
            title: "Fatture",
            icon: faFileInvoice,
            path: "bills"
        }
    ]

    const renderCard = () => {
        return selection.map((card,index)=>{
            return(
                <InfoCard key={index} icon={card.icon} title={card.title} id={index} path={card.path}/>
            )
        })
    }

    return(
        <div className={styles.wrapper}>   
        {renderCard()}
        </div>
    )
}

export default Selection;