import React, { useEffect, useState } from "react";
import Loader from "../../assets/gifs/loading.gif";
import style from "./loader2.module.css";
import nodata from "./nodataFound.png";
function ChoiraLoder2() {
  const [noDataFound, setnoDataFound] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setnoDataFound(true);
    }, 5000);
  });

  return (
    <>
      {noDataFound ? (
        <div className={style.parent}>
          <div className={style.child2}>
            <img
              src={nodata}
              style={{ height: "90%", width: "90%" }}
              alt="No Data Found"
            />
          </div>
        </div>
      ) : (
        <div className={style.parent}>
          <div className={style.child}>
            <img src={Loader} alt="choira loading" />
          </div>
        </div>
      )}
    </>
  );
}

export default ChoiraLoder2;
