import React from "react";
import "./Stat.css";

export default function Stat({ name, strength }) {
  return (
    <li className="Stat">
      <span>{name}: </span>
      <span>{strength}</span>
    </li>
  );
}
