import React from "react";
import ToyCard from "./ToyCard";

// Receives the `toys` array and handlers from App and maps to ToyCard
function ToyContainer({ toys = [], onDelete, onLike }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} onDelete={onDelete} onLike={onLike} />
      ))}
    </div>
  );
}

export default ToyContainer;
