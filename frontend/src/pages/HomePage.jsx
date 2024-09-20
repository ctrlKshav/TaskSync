import React from "react";
import Filter from "../components/Filter";
import NoteCardContainer from "../components/NoteCardContainer";

const HomePage = ({ notes, loading, handleFilterText }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <Filter handleFilterText={handleFilterText} />
        </div>

        <div className="col-12">
          {notes.length < 1 && !loading && (
            <h4 className="text-center mt-3">
              There is no note found with the search phrase above
            </h4>
          )}
        </div>

        <div className="col-12">
          <NoteCardContainer notes={notes} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
