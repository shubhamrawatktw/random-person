import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [title, setTitle] = useState("name");
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("random user");

  const getUser = async () => {
    setLoading(true)
    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;
    const { name, email, phone } = results[0];

    const {
      picture: { large },
    } = results[0];
    const {
      location: { street },
    } = results[0];
    const {
      login: { password },
    } = results[0];
    const {
      dob: { age },
    } = results[0];
    const { first, last } = name;
    // console.log(first, last, email, large, phone, age, street, password);
    const newPerson = {
      name: `${first} ${last}`,
      email,
      image: large,
      phone,
      age,
      password,
      street: `${street.number} ${street.name}`,
    };
    setPerson(newPerson);
    setLoading(false);
  };

  const handleValue = (e)=>{
    if (e.target.classList.contains("icon")) {
     const newTitle = e.target.dataset.label;
     setTitle(newTitle)
     setValue(person[newTitle])
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img src={(person && person.image) || {defaultImage}} alt="random-image" />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" data-label="name" onMouseOver={handleValue}>
              <FaUser />
            </button>
            <button className="icon" data-label="email" onMouseOver={handleValue}>
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age">
              <FaCalendarTimes />
            </button>
            <button className="icon" data-label="street" onMouseOver={handleValue}>
              <FaMap />
            </button>
            <button className="icon" data-label="phone" onMouseOver={handleValue}>
              <FaPhone />
            </button>
            <button className="icon" data-label="password" onMouseOver={handleValue}>
              <FaLock />
            </button>
          </div>
          <button className="btn" onClick={getUser}>
            {loading ? "Loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
