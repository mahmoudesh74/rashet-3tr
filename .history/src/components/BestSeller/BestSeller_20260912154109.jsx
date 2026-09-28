import "./BestSeller.css"
import arrowRight from "../../assets/arrowRight-b-s.svg"
import arrowLeft from "../../assets/arrowLeft-b-s.svg"
export default function BestSeller() {
  return (
    <div className="BestSeller">
      <div className="BestSellerHeader">
       <div className="BestSellerTitle">
         <h2>
          الاكثر مبيعا
        </h2>
        <span className="BestSellerLine"></span>
       </div>
        <div className="pagination">
         <div className="pagination1"> <img src={arrowRight} alt="" /></div>
        <div className="pagination2">  <img src={arrowLeft} alt="" /></div>
        </div>

      </div>
    </div>
  )
}
