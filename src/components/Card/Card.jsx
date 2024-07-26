import React, { useEffect, useState } from "react";
import "./Card.css";
import axios from "axios";
import Stat from "../Stat/Stat";

export default function Card({ data }) {
  const [cardData, setCardData] = useState({});
  useEffect(() => {
    axios
      .get(data?.url)
      .then((res) => {
        setCardData(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="Card">
      <img src={cardData?.sprites?.front_default} alt="pokemon..." />
      <div className="pokemon-name">{cardData?.name}</div>

      <div className="height-width-container">
        <div>
          Height: <span>{cardData?.height}</span>
        </div>
        <div>
          Weight: <span>{cardData?.weight}</span>
        </div>
      </div>

      <div className="pokemon-experience">
        Experience: <span>{cardData?.base_experience}</span>
      </div>
      <div className="head">Stats: </div>
      <div className="pokemon-stats">
        {cardData?.stats?.map((d, index) => (
          <Stat key={index} strength={d?.base_stat} name={d?.stat?.name} />
        ))}
      </div>
      <div className="pokemon-order">{cardData?.order}</div>
    </div>
  );
}
