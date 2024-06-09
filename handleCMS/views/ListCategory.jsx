import axios from "axios";
import Toastify from 'toastify-js'
import { useEffect, useState } from "react";
import gearLoad from "../components/assets/Ellipsis@1x-1.0s-200px-200px.svg";

export default function Home({ url }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  async function fetchCategories() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/categories`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      console.log(data);

      setProducts(data.category);
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
    fetchCategories();
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
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{product.name}</td>
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
