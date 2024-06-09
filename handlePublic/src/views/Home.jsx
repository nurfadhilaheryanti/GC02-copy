import Card from "../components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import gearLoad from "../components/assets/Ellipsis@1x-1.0s-200px-200px.svg";

export default function Home({ url }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  async function fetchMenu() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/cuisines/pub?search=${search}&filter=${filter}&sort=${sort}&page=${page}`
      );
      // console.log(data);

      setProducts(data.data);
      setTotalPages(data.totalPage);
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
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchMenu();
  }, [search, filter, sort, page]);

  async function fetchCategory() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/category/pub`);
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
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <>
    <div id="PAGE-HOME" className="p-3">
      {loading ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={gearLoad} />
        </div>
      ) : (
        <>
          {/* search */}
          <div className="relative mt-4 md:mt-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
            <form
              action=""
              method="get"
              className="flex justify-center items-center"
            >
              <input
                type="search"
                name="search"
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>

          {/* sort and filter */}
          <div className="my-4 flex justify-center">
            <div className="mr-4 flex items-center">
              <label className="mr-2">Sort by:</label>
              <select
                onChange={(e) => setSort(e.target.value)}
                defaultValue={sort}
                className="border rounded-lg py-2 px-4"
              >
                <option value="">Oldest</option>
                <option value="-">Newest</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="mr-2">Category:</label>
              <select
                onChange={(el) => setFilter(el.target.value)}
                defaultValue={filter}
                className="border rounded-lg py-2 px-4"
              >
                <option key={categories.length} value="">
                  All
                </option>
                {categories.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* card */}
          <main className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => {
                return (
                  <div key={product.id} className="max-w-sm mx-auto">
                    <Card product={product} />
                  </div>
                );
              })}
            </div>
          </main>
          {/* Pagination */}
          <div className="flex justify-center my-4">
            {(() => {
              const buttons = [];
              for (let i = 0; i < totalPages; i++) {
                const pageNumber = i + 1;
                buttons.push(
                  <button
                    key={pageNumber}
                    className={`mx-2 px-3 py-1 rounded-lg ${
                      page === pageNumber
                        ? "bg-lime-700 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              }
              return buttons;
            })()}
          </div>
        </>
      )}
    </div>
  </>
  );
}
