import { useNavigate } from "react-router-dom";
export default function Card({ product }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/detail/${id}`);
  }

  return (
    <>
<div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
  <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" style={{backgroundImage: `url(${product.imgUrl})`, width: '150%', }}></div>

  <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
    <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{product.name}</h3>

    <div className="flex items-center justify-between px-3 py-2" style={{backgroundColor: '#F9F7F3'}}>
      <span className="font-bold" style={{color: '#3E2921'}}> Rp {product.price}</span>
      <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform rounded hover:bg-olive focus:bg-olive focus:outline-none" style={{backgroundColor: '#5C704B'}}onClick={() => handleClick(product.id)}>See Detail</button>
    </div>
  </div>
</div>


    </>
  );
}
