

export default function latestArticles() {
  return (
    <>
  <div className="perfumeSectionHead">
        <div>
          <h2>احدث المقالات</h2>
          <span className="PerfumeHeaderLine"></span>
        </div>

        <div className="PerfumeSectionButton" style={{ cursor: "pointer" }}>
          <p>عرض الكل</p>
          <div>
            <img src={arrowLeft} alt="arrowLeft" />
          </div>
        </div>
      </div>
      </>
  )
}
