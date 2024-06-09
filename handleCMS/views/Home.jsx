import axios from "axios";
import Toastify from 'toastify-js'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gearLoad from "../components/assets/Ellipsis@1x-1.0s-200px-200px.svg";

export default function Home({ url }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleCategory(){
    navigate(`/categories`)
  }
  function handlePatch(id){
    navigate(`/patch/${id}`)
  }

  function handleDetail(id){
    navigate(`/detail/${id}`)
  }

  function handleEdit(id){
    navigate(`/editCuisine/${id}`)
  }

  function handleAddCuisine(){
    navigate(`/addCuisine`)
  }

  function handleAddUser(){
    navigate(`/addUser`)
  }

  async function handleDelete(id) {
    try {
        await axios.delete(`${url}/cuisines/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
        Toastify({
            text: "Success delete",
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
                fontWeight: "bold"
            }
        }).showToast();

        fetchMenu()
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
                fontWeight: "bold"
            }
        }).showToast();
    }
}

  async function fetchMenu() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/cuisines`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      console.log(data);

      setProducts(data.cuisine);
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
            fontWeight: "bold"
        }
    }).showToast();
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <>
      <div id="PAGE-HOME" className="p-3">
        {loading ? (
          <div className="mt-32 flex justify-center items-center">
            <img src={gearLoad} alt="Loading..." />
          </div>
        ) : (
          <main className="grid grid-cols-2 gap-5 px-10 my-8 bg-white">
            <div className="relative overflow-x-auto col-span-2">
              <button onClick={() => handleAddCuisine()} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 mb-5">
                Add Cuisine
              </button>
              <button onClick={() => handleAddUser()} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ml-5">
                Add User
              </button>
              <button onClick={() => handleCategory()} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ml-5">
                Category List
              </button>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Customize
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {product.name}
                      </th>
                      <td className="px-6 py-4">
                        <div onClick={() => handlePatch()} className="relative w-20 h-20">
                          <img
                            src={product.imgUrl}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-full"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5l7 7-7 7M5 5v14"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{product.createdAt}</td>
                      <td className="px-6 py-4">{product.User.email}</td>
                      <td className="w-24">
                        <div class="flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
                          <button onClick={() => handleDetail(product.id)} className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                            Detail
                          </button>

                          <button onClick={() => handleEdit(product.id)} className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                            Edit
                          </button>

                          <button onClick={() => handleDelete(product.id)} className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        )}
      </div>
    </>
  );
}
