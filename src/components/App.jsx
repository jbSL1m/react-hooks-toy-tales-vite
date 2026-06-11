import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);

  // State to store the toy collection fetched from the server
  const [toys, setToys] = useState([]);

  // Toggle whether the ToyForm is shown
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Add a new toy on the server then append to local state
  function addToy(toyData) {
    return fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...toyData, likes: 0 }),
    })
      .then((r) => r.json())
      .then((newToy) => setToys((prev) => [...prev, newToy]));
  }

  // Delete a toy on the server and remove it from local state
  function deleteToy(id) {
    return fetch(`http://localhost:3001/toys/${id}`, { method: "DELETE" }).then(() =>
      setToys((prev) => prev.filter((t) => t.id !== id))
    );
  }

  // Patch a toy's likes on the server and update local state with the response
  function likeToy(id, newLikes) {
    return fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: newLikes }),
    })
      .then((r) => r.json())
      .then((updated) => setToys((prev) => prev.map((t) => (t.id === updated.id ? updated : t))));
  }

  // Fetch toys on mount
  useEffect(() => {
    fetch("http://localhost:3001/toys").then((r) => r.json()).then((data) => setToys(data));
  }, []);

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDelete={deleteToy} onLike={likeToy} />
    </>
  );
}

export default App;
