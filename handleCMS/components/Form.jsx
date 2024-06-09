import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";

export default function ProductsForm({ url, handleSubmit, product, nameProp }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setImgUrl(product.imgUrl);
      setCategoryId(product.categoryId);
    }
  }, [product]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setCategories(data.category);
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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) =>
          handleSubmit(e, name, description, price, imgUrl, categoryId)
        }
        className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-base font-semibold mb-2">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Name"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={name}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-semibold mb-2">Description</label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Enter Description"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={description}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-semibold mb-2">Price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Enter Price"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={price}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-semibold mb-2">Image (URL)</label>
            <input
              onChange={(e) => setImgUrl(e.target.value)}
              type="text"
              placeholder="Enter Image URL"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={imgUrl}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-base font-semibold mb-2">Category</label>
            <select
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none mt-4"
            >
              {nameProp}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
