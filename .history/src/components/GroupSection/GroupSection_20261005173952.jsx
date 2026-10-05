import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import arrowLeft from "../../assets/arrowLeft.svg";
import arrowRight from "../../assets/arrow-right-02.svg";


import { getCategories } from "../../Redux/categorySlice";

import "./GroupSection.css";

const AUTOPLAY_DELAY = 3000;



export default function GroupSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    categories,
    loading,
    error,
  } = useSelector((state) => state.categories);

  const [current, setCurrent] = useState(0);



  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);



  const groups = categories.map((category) => ({
    id: category.id,
    image:
      category.image ,
    title: category.name_ar,
    desc:
      category.description_ar ||
      "اكتشف مجموعتنا المميزة من العطور",
  }));

  const total = groups.length;



  const currentIndex =
    total > 0 ? current % total : 0;



  const getOffset = (index) => {
    if (!total) return 0;

    let diff = index - currentIndex;

    if (diff > total / 2) {
      diff -= total;
    }

    if (diff < -total / 2) {
      diff += total;
    }

    return diff;
  };



  useEffect(() => {
    if (total <= 1) return;

    const interval = setInterval(() => {
      setCurrent(
        (prev) => (prev - 1 + total) % total
      );
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [total]);



  if (loading) {
    return (
      <div id="groups" className="GroupSection">
        <div className="GroupSectionHeader">
          <div className="GroupSectionTitle">
            <h2>تسوق حسب المجموعة</h2>
            <p>جاري تحميل المجموعات...</p>
          </div>
        </div>
      </div>
    );
  }

 

  if (error) {
    return (
      <div id="groups" className="GroupSection">
        <div className="GroupSectionHeader">
          <div className="GroupSectionTitle">
            <h2>تسوق حسب المجموعة</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="groups" className="GroupSection">

    

      <div className="GroupSectionHeader">

        <div className="GroupSectionTitle">
          <h2>تسوق حسب المجموعة</h2>

          <p>
            وفر أكثر مع مجموعات تناسب جميع الأذواق
          </p>
        </div>

        <div
          className="GroupSectionButton"
          style={{ cursor: "pointer" }}
        >
          <Link
            to="/GroupPage"
            style={{ color: "#905B30" }}
          >
            عرض الكل
          </Link>

          <div>
            <img
              src={arrowLeft}
              alt="arrowLeft"
            />
          </div>
        </div>

      </div>



      {groups.length > 0 ? (
        <div className="GroupSectionContent">

          <div className="gs-track">

            {groups.map((group, index) => {

              const offset = getOffset(index);

              const isCenter = offset === 0;

              const isVisible =
                Math.abs(offset) <= 1;

              return (
                <div
                  key={group.id}
                  className={`gs-slide ${
                    isCenter
                      ? "gs-slide-center"
                      : ""
                  }`}
                  style={{
                    transform: `translateX(-50%) translateX(${offset * 480}px)`,

                    opacity: isVisible
                      ? 1
                      : 0.75,

                    zIndex: isCenter
                      ? 3
                      : 1,

                    pointerEvents: isVisible
                      ? "auto"
                      : "none",
                  }}
                >

                  <div
                    className="gs-card"
                    style={{
                      backgroundImage: `
                        linear-gradient(
                          270deg,
                          rgba(0,0,0,0.6) 41.35%,
                          rgba(0,0,0,0) 100%
                        ),
                        url(${group.image})
                      `,
                    }}
                  >

                    <h2>
                      {group.title}
                    </h2>

                    <p>
                      {group.desc}
                    </p>

                    <button
                      type="button"
                      className="GroupSectionItemButton"
                      onClick={() =>
                        navigate(
                          `/GroupCatalog/${group.id}`
                        )
                      }
                    >
                      <p>تسوق الآن</p>

                      <img
                        src={arrowRight}
                        alt="arrowRight"
                      />
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      ) : (
        <div className="GroupSectionContent">
          <p>لا توجد مجموعات متاحة حالياً</p>
        </div>
      )}

    </div>
  );
}