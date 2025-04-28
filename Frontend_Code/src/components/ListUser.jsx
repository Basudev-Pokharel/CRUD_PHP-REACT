import axios from "axios";
import "./ListUser.css";
import { useEffect, useState } from "react";

function ListUser() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get("http://localhost:8005/api/").then(function (response) {
      setUsers(response.data);
    });
  }
  function deleteUser(id, e) {
    axios
      .delete(`http://localhost:8005/api/`, { data: { id: id } })
      .then((res) => {
        console.log("Going to delete this one", res.data);
      })
      .catch((error) => {
        console.error("Hmmmm Error", error);
      });
  }

  function updateUser(user) {
    setEditUser(user);
    console.log("Update reqquest here");
  }
  function saveUser(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:8005/api/`, editUser) // ✅ Send updated user data
      .then(function (response) {
        setEditUser(null); // ✅ Close the form
        // getUsers(); // ✅ Refresh users list
      })
      .catch((error) => {
        console.error("Error updating user", error);
      });
  }
  return (
    <div className="container-box">
      <h1>Displaying data from Database</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Edit</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <tr key={key}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>
                <button
                  onClick={() => {
                    updateUser(user);
                  }}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  onClick={(e) => {
                    deleteUser(user.id, e);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editUser && (
        <div className="CreateUser">
          <h2>Update User</h2>
          <form onSubmit={saveUser}>
            <label>Name:</label>
            <input
              type="text"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
            />
            <br />
            <label>Email:</label>
            <input
              type="email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />
            <br />
            <label>Mobile:</label>
            <input
              type="text"
              value={editUser.mobile}
              onChange={(e) =>
                setEditUser({ ...editUser, mobile: e.target.value })
              }
            />
            <br />
            <button type="submit">Update</button>
            <button type="cancel">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ListUser;
