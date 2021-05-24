import React, { useRef } from "react";

export default function FileUploader({ onFileSelect }) {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    onFileSelect(e.target.files[0]);
  };
  return (
    <input
      id="input-b1"
      name="input-b1"
      type="file"
      className="file"
      onChange={handleFileInput}
      data-browse-on-zone-click="true"
    ></input>
  );
}
