import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import Toastify from 'toastify-js'
import gearLoad from "../components/assets/Ellipsis@1x-1.0s-200px-200px.svg";


export default function Detail({ url }) {
    const [product, setProduct] = useState("")
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    async function fetchProduct() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${url}/cuisines/pub/${id}`);
            setProduct(data.cuisine);
        } catch (error) {
          console.log(error);
            Toastify({
                text: error.response.data.message,
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#EF4C54",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            }).showToast();
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [])

    return (
        <>
            {loading ? (
                <>
                    <div className="mt-32 flex justify-center items-center">
                        <img src={gearLoad} />
                    </div>
                </>
            ) : (
                <>
                 <section class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-10 mx-auto">
        <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Detail</h1>

        <div class="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <img class="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={product.imgUrl}alt=""/>

            <div class="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">

                <a href="#" class="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white">
                    {product.name}
                </a>

                <p class="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                    {product.description}
                </p>

                <p href="#" class="inline-block mt-2 black hover:text-blue-400"> Rp {product.price}</p>

    
            </div>
        </div>
    </div>
</section>

                </>
            )}

        </>
    )
}