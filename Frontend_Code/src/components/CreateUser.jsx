import React, { useState } from "react";
import axios from "axios";
import "./ListUser.css";

import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.post("http://localhost:8005/api/", inputs);
    navigate("/");
  };
  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return (
    <div className="CreateUser">
      <h1>CreateUser</h1>
      <form action="" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" id="" onChange={handleChange} />
        <br />
        <label>Email:</label>
        <input type="email" name="email" id="" onChange={handleChange} />
        <br />
        <label>Mobile:</label>
        <input type="text" name="mobile" id="" onChange={handleChange} />
        <br />
        <button>Save</button>
      </form>
    </div>
  );
};

export default CreateUser;
