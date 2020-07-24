import React from "react";
import ImageFilterType from "./ImageFilterType";

const ImageSearchEngine = ({ imageFilters, handleFilter }) => {

  const filterOrder = {
    site_id: 5,
    image_type: 4,
    image_type_sub: 3,
    plot: 2,
    site_visit_id: 1
  }

  return (
    <div>
      {Object.keys(imageFilters).sort((a, b) => {
      
        return filterOrder[a] < filterOrder[b] ? 1 : -1
      } ).map((key, indexer) => (
        <ImageFilterType
          imageFilter={imageFilters[key]}
          header={key}
          key={key}
          handleFilter={(i) => handleFilter(i)}
        />
      ))}
    </div>
  );
};

export default ImageSearchEngine;
