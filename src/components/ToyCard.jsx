import React from "react";

// Displays a single toy and calls parent handlers for like and delete
function ToyCard({ toy, onDelete, onLike }) {
  function handleDelete() {
    // Tell parent to delete this toy by id
    onDelete(toy.id);
  }

  function handleLike() {
    // Increment likes locally and request server update via parent
    const newLikes = toy.likes + 1;
    onLike(toy.id, newLikes);
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
