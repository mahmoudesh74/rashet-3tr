import arrowLeft from "../../assets/arrowLeft.svg"

export default function latestArticles() {
  return (
    <>
  <div className="latestArticlesHead">
        <div>
          <h2>احدث المقالات</h2>
          <span className="latestArticlesLine"></span>
        </div>

        <div className="latestArticlesButton" style={{ cursor: "pointer" }}>
          <p>عرض الكل</p>
          <div>
            <img src={arrowLeft} alt="arrowLeft" />
          </div>
        </div>
      </div>
      </>
  )
}
