import React from "react";
import ImageMarker from "./ImageMarker";

const ImageMarkerEngine = (props) => {
  // console.log("hello");
  console.log('VALUE', props.value);
  var popup = "";
  var tooltip = "";
  var id = props.location;
  var position = props.value.centre_point;
  // console.log(id);
  // console.log(position);
  for (var this_key in props.value.image_types) {
    // console.log(this_key);
    for (var sub_key in props.value.image_types[this_key]) {
      var site_key = sub_key;
      // console.log(Object.keys(props.value.image_types[this_key]).length);
      if (
        sub_key === "total" &&
        Object.keys(props.value.image_types[this_key]).length === 1
      ) {
        site_key = this_key;
      }
      popup += site_key + "(" + props.value.image_types[this_key][sub_key] + ") \r\n";
      tooltip += props.value.image_types[this_key] + " - " + this_key;
    }
    // console.log(popup + "popup results");
    // console.log("this is the popup for " + this_key);
    // console.log(tooltip + "tooltip results");
  }

  return (
    /*Object.keys(props.value.image_types).map((index) => (
      <ImageMarker
        value={props.value.image_types[index]}
        type={index}
        site={props.value.supersite_node_code}
        position={props.value.centre_point}
        id={props.value.supersite_node_code + index}
        key={props.value.supersite_node_code + index} />
    //)) */
    <ImageMarker
      value={popup}
      type={id}
      site={id}
      position={position}
      id={id}
      key={id}
      label={id}
      onClick={props.onClick}
      
      tooltip={tooltip}
      popup={popup}
      name={props.value.site_id.label}
      images={props.value.image_type.label}
      plot={props.value.plot.label}
      date={props.value.site_visit_id}
    />
  );
};
export default ImageMarkerEngine;
