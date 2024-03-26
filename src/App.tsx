import React, { useRef } from "react";
import "./App.css";

const App = () => {
  const imgRef: any = useRef(null);
  const fileRef: any = useRef(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = fileRef.current.files[0];
    const reader: any = new FileReader();
    reader.onload = () => {
      fetch("api/Upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(btoa(reader.result)),
      });
    };
    reader.readAsBinaryString(file);
  };

  const handleChange = () => {
    const file = fileRef.current.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      imgRef.current.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <hr />
      <input
        type="file"
        accept="image/*;capture=camera"
        onChange={handleChange}
        ref={fileRef}
      />
      <hr />
      <img ref={imgRef} width={200} />
      <input type="submit" />
    </form>
  );
};

export default App;
