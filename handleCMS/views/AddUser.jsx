import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProductsForm({ url, handleSubmit, nameProp }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  async function handleSubmit(e, email, password, phoneNumber, address) {
    e.preventDefault();
    try {
      const dataAdded = { email, password, phoneNumber, address };

      const { data } = await axios.post(`${url}/add-user`, dataAdded, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      Toastify({
        text: "Success add new user",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e, email, password, phoneNumber, address)}
        className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-base font-semibold mb-2">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={email}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-semibold mb-2">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={password}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-semibold mb-2">Phone Number</label>
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              placeholder="Enter your phone number"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={phoneNumber}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-semibold mb-2">Address</label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Enter your address"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={address}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
