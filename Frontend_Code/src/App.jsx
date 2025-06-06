import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ListUser from "./components/ListUser";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <nav className="link-box">
            <ul>
              <li>
                <Link to="/">List Users</Link>
              </li>
              <li>
                <Link to="user/create">Create Users</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route index element={<ListUser />} />
            <Route path="user/create" element={<CreateUser />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
