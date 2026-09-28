import "./BestSeller.css"
import arrowRight from "../../assets/arrow-right-02.svg"
import arrowLeft from "../../assets/arrowLeft.svg"
export default function BestSeller() {
  return (
    <div className="BestSeller">
      <div className="BestSellerHeader">
        <h2>
          الاكثر مبيعا
        </h2>
        <div className="pagination">
          <img src={arrowRight} alt="" />
          <img src={arrowLeft} alt="" />
        </div>

      </div>
    </div>
  )
}
