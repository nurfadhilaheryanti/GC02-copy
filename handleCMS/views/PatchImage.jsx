import axios from 'axios'
import Toastify from 'toastify-js'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";

export default function ProductsForm({ url }) {
    const navigate = useNavigate()
    const { id } = useParams()


    async function handleSubmit(e, imgUrl) {
        e.preventDefault()
        try {
            const dataAdded = { imgUrl }

            await axios.patch(`${url}/cuisines/${id}`, dataAdded, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })

            Toastify({
                text: "Success edit image",
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
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
    <div className="grid grid-cols-1 gap-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Image (File)
            </label>
            <input
                onChange={(e) => setSelectedFile(e.target.files[0])}
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
        </div>
    </div>
    <div className="mt-6">
        <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Edit Image
        </button>
    </div>
</form>
        </>
    )
}