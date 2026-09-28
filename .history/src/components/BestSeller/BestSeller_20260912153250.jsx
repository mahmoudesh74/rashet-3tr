import "./BestSeller.css"
import arrowRight from "../../assets/arrowRight-b-s.svg"
import arrowLeft from "../../assets/arrowLeft-b-s.svg"
export default function BestSeller() {
  return (
    <div className="BestSeller">
      <div className="BestSellerHeader">
        <h2>
          الاكثر مبيعا
        </h2>
        <div className="pagination">
         <div className="pagination1"> <img src={arrowRight} alt="" /></div>
        <div className="pagination2">  <img src={arrowLeft} alt="" /></div>
        </div>

      </div>
    </div>
  )
}
