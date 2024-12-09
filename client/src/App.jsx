import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/users").then((res) => {
      setUsers(res.data);
    });
  }, [users]);

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      name: name,
      age: age,
      email: email,
    }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center w-full">
      <div className=" bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
          LOGIN
        </h1>

        <div className="flex flex-wrap justify-between gap-10">
          {/* Form Section */}
          <form className="w-full max-w-md bg-black p-6 rounded-lg shadow-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Create User
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="age"
              >
                Age
              </label>
              <input
                id="age"
                type="number"
                placeholder="Enter your age"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={createUser}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Create User
            </button>
          </form>

          {/* User List Section */}
          <div className="w-full max-w-lg bg-gray-200 p-6 rounded-lg shadow-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Users
            </h2>
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className="bg-black p-4 mb-3 rounded-lg border border-gray-200"
                >
                  <p className="text-gray-100">
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p className="text-gray-100">
                    <strong>Age:</strong> {user.age}
                  </p>
                  <p className="text-gray-100">
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No users available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
