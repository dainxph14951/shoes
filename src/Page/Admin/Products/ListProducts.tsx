import React, { useEffect, useRef, useState } from 'react'
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import {ProductType} from '../../../Types/ProductsType'
import {listProduct, readProduct, removeProduct, filterProduct, filterProName , namesProduct} from '../../../freatures/productSlice'
import {listCategorys} from '../../../freatures/categorySlice'
import { Link } from 'react-router-dom'
import cartSlice from '../../../freatures/cartSlice'
import toastr from 'toastr'
import { CategoryType } from '../../../Types/CategoryType'

const ListProducts = () => {

    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.value)
    const [ categorys, setCategorys] = useState<CategoryType[]>();
    const timeClearRef = useRef(null);

    useEffect(() => {
        const getCategorry = async () => {
            const {data} = await listCategorys();
            setCategorys(data);
        }
        getCategorry();
        dispatch(listProduct());
  },[])


    const removeItem = async (id : any) => {
      const confirm = window.confirm('bạn có muốn xóa không ? ')
      if(confirm){
      await dispatch(removeProduct(id))
      toastr.success('xóa thành công !!')
      }
    }

    const fiterProduct = (id: string) => {
        if (id == "All") dispatch(listProduct())
        dispatch(filterProduct(id))
    }

    const searchName = (keyword :string) => {
        if (timeClearRef.current) {
            clearTimeout(timeClearRef.current)
        };
        timeClearRef.current = setTimeout(() => {
            dispatch(namesProduct(keyword))
        }, 300)
      }
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
    <div className='flex justify-between mb-[20px]'>
        <h1 className='text-[30px]'>View Products</h1>
        <Link to="/admin/products/create" className=' bg-purple-600 hover:bg-purple-800 text-white p-[10px] mr-[20px]'>Created</Link>
    </div>
    <form className='mb-4 flex'>
                <select onChange={(e) => fiterProduct(e.target.value)} className="w-[300px] mr-[20px] border bg-white rounded px-3 py-2 outline-none">
                    <option className="py-1" value="All" defaultChecked>All</option>
                    {categorys && categorys?.map((item, index) => {
                        return <option key={index} className="py-1" value={item._id}>{item.name}</option>
                    })}
                </select>
                <div className="w-[400px] flex items-center">
                <input onChange={(e) => searchName(e.target.value)} type="text" id="form-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="Search name product" />
                    <svg className="w-4 h-4 fill-current text-gray-500 -ml-8 z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                </div>
            </form>
    <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
            <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-70 dark:text-gray-400 dark:bg-gray-800 bg-purple-600 text-white">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Creat Time</th>
                    <th className="px-4 py-3">Desc</th>
                    <th className="px-4 py-3">Action</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {products?.map((item: ProductType, index) => {
                    return (
                        <tr key={index} className="text-gray-700 dark:text-gray-400">
                            <td className="px-4 py-3 text-sm">
                                {index + 1}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    {/* Avatar with inset shadow */}
                                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                        <img className="object-cover w-full h-full rounded-full" src={item.img} alt="" loading="lazy" />
                                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                                $ {item.price}
                            </td>
                            <td className="px-4 py-3 text-xs">
                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                    {item.quantity}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm">
                                {item.updatedAt}
                            </td>
                            <td className="px-4 py-3 text-sm">
                                {item.desc}
                            </td>
                            <td className="px-4 py-3 text-xs">
                                <button className='p-2 underline'
                                    onClick={() => {
                                        removeItem(item._id)
                                    }}
                                >Remove</button>
                                <Link to={`/admin/product/${item._id}/edit`} className="p-2 underline">Edit</Link>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
</div>
  )
}

export default ListProducts