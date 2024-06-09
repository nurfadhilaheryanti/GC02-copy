import Form from "../components/Form";
import axios from 'axios'
import Toastify from 'toastify-js'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";

export default function ProductsForm({ url }) {
    const [product, setProduct] = useState({});
    const navigate = useNavigate()
    const { id } = useParams()

    async function fetchCuisine() {
        try {
            const { data } = await axios.get(`${url}/cuisines/${id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
            })

            setProduct(data.cuisine)
            console.log(data.cuisine);
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

    useEffect(() => {
        fetchCuisine()
    }, [])

    async function handleSubmit(e, name, description, price, imgUrl, categoryId) {
        e.preventDefault()
        try {
            const dataAdded = { name, description, price: +price, imgUrl, categoryId: +categoryId }

            await axios.put(`${url}/cuisines/${id}`, dataAdded, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })

            Toastify({
                text: "Success edit cuisine",
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

            navigate('/')
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

    return (
        <>
            <Form url={url} handleSubmit={handleSubmit} product={product} nameProp="Edit Cuisine" />
        </>
    )
}