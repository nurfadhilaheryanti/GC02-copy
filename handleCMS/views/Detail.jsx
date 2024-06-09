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
            const { data } = await axios.get(`${url}/cuisines/${id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
            });
            setProduct(data.cuisine);
            console.log(data.cuisine);
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
                    <div className="p-20 bg-gray-100 shadow-2xl flex flex-row">
                        <figure className="flex flex-1">
                            <img
                                src={product.imgUrl}
                                alt="product image"
                                className="w-1/2 ml-20 rounded-xl"
                            />
                        </figure>
                        <div className="flex flex-1 flex-col">
                            <b className="mb-5 text-left">{product.name}</b>
                            <p className="text-left">
                                {product.description}
                            </p>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}