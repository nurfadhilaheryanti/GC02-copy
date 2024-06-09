import Form from "../components/Form";
import axios from 'axios'
import Toastify from 'toastify-js'
import { useNavigate } from 'react-router-dom'

export default function ProductsForm({ url }) {
    const navigate = useNavigate()
    async function handleSubmit(e, name, description, price, imgUrl, categoryId) {
        e.preventDefault()
        try {
            const dataAdded = { name, description, price: +price, imgUrl, categoryId: +categoryId }

            const { data } = await axios.post(`${url}/cuisines`, dataAdded, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })

            Toastify({
                text: "Success add new cuisine",
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
            <Form url={url} handleSubmit={handleSubmit} nameProp="Add Cuisine" />
        </>
    )
}