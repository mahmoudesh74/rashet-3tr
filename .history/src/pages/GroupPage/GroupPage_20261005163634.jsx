import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./GroupPage.css";

import arrowRight from "../../assets/arrow-right-02.svg";

import groupImg1 from "../../assets/groupImg1.png";
import groupImg2 from "../../assets/groupImg2.png";
import groupImg3 from "../../assets/groupImg3.png";
import groupImg4 from "../../assets/groupImg4.png";
import groupImg5 from "../../assets/groupImg5.png";
import groupImg6 from "../../assets/groupImg6.png";

import oval1 from "../../assets/Oval.png";
import oval2 from "../../assets/Oval Copy.png";
import oval3 from "../../assets/Oval Copy 2.png";

import { getCategories } from "../../Redux/categorySlice";

const categoryImages = {
  1: groupImg1,
  2: groupImg2,
  3: groupImg3,
  4: groupImg5,
  5: groupImg4,
  6: groupImg6,
};

export default function GroupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (loading) {
    return <div>جاري تحميل المجموعات...</div>;
  }

  if (error) {
    return <div>حدث خطأ أثناء تحميل المجموعات</div>;
  }

  return (
    <div className="GroupPage">

      <div className="group-page-ovals">
        <img src={oval1} alt="" />
        <img src={oval2} alt="" />
        <img src={oval3} alt="" />
      </div>

      <div className="GroupPageTitle">
        <p>الرئيسية / المجموعات</p>
      </div>

      <div className="GroupPageHeader">
        <h1>المجموعات</h1>

        <p>
          اكتشفي مجموعاتنا المختارة بعناية لتناسب ذوقك ومناسباتك المختلفة
        </p>
      </div>

      <div className="GroupPageContent">

        <div className="gs-track">

          {categories.map((category) => (
            <div
              className="gs-card"
              key={category.id}
              style={{
                backgroundImage: `
                  linear-gradient(
                    270deg,
                    rgba(0,0,0,0.6) 41.35%,
                    rgba(0,0,0,0) 100%
                  ),
                  url(${categoryImages[category.id]})
                `,
              }}
            >

              <h2>{category.name}</h2>

              <p>{category.description}</p>

              <button
                className="GroupPageItemButton"
                onClick={() =>
                  navigate(`/GroupCatalog/${category.id}`)
                }
              >
                <p>تسوق الآن</p>

                <img
                  src={arrowRight}
                  alt="arrowRight"
                />
              </button>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}