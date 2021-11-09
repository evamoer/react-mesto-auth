import React from "react";
import Profile from "./Profile";
import Gallery from "./Gallery";

export default function Main({
  onOpenPopup,
  onImageCard,
  cards,
  onCardLike,
  onCardDelete,
}) {
  return (
    <main className="content section page__content">
      <Profile onOpenPopup={onOpenPopup} />
      <Gallery
        onImageCard={onImageCard}
        cards={cards}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    </main>
  );
}
