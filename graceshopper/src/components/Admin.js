import { useState, useEffect } from "react";


const Admin = () => {
  const [users, setUsers] = useState([]);

 const getAllUsers = () => {
  fetch("https://peaceful-spire-60083.herokuapp.com/api/users")
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
  })
  .catch(console.error);


 }
  return <div>This is only for admin. GET OUT!!!!</div>;
};

export default Admin;
