import React from "react";
import Filter from "../components/Filter";
import NoteCardContainer from "../components/NoteCardContainer";

const HomePage = ({ notes, loading, handleFilterText }) => {
  return (
    <>
      
      
        <div className="d-flex flex-column">
          <Filter handleFilterText={handleFilterText} />
          {notes.length < 1 ? (
        <h4 style={{ textAlign: "center", marginTop: "10px" }}>
          There is no note found with the search phrase above
        </h4>
      ) :(false)}
                <NoteCardContainer notes={notes} loading={loading} />
        </div>
    </>
  );
};

export default HomePage;
