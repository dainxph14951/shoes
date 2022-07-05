import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { CategoryType } from '../../../Types/CategoryType';
import { ProductType } from '../../../Types/ProductsType';
import axios from 'axios';
import { addProduct } from '../../../freatures/productSlice';
import { listCategorys } from '../../../freatures/categorySlice';


const AddProducts = () => {

  const dispatch = useAppDispatch();
  const {register, handleSubmit, formState: {errors}, reset} = useForm<ProductType>();

  const [categorys, setCategorys] = useState<CategoryType[]>([])

  const navigate = useNavigate();

  const [files, setFiles] = useState<any>([])

  const CLOUDINARY_PRESET = "k9yoyn7r";
  const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/dev7lem1d/image/upload";

  const onSubmit: SubmitHandler<ProductType> = async (data) => {
    const formData = new FormData();
    if (files) {
      let imgLink = []
      for (let index = 0; index < files.length; index++) {
          formData.append("file", files[index]);
          formData.append("upload_preset", CLOUDINARY_PRESET);
          const image = await axios.post(CLOUDINARY_API_URL, formData, {
              headers: {
                  "Content-Type": "application/form-data",
              },
          });
          imgLink.push(image.data.url)
      }
       dispatch(addProduct({ ...data, img: imgLink[0] }));
      alert("Thêm thành công ");
      navigate("/admin/products");
  }
}

const previewImg = (ig: any) => {
  let imgs = [];
  for (let i = 0; i < ig.length; i++) {
      imgs.push(ig[i])
  }
  setFiles(imgs)
}

useEffect(() => {
  const getCategorys = async () => {
      const { data } = await listCategorys();
      setCategorys(data)
      console.log(data);
  }
  getCategorys();
}, []);
  return (
    <div className=''>
    <div className='flex justify-between mb-[20px]'>
        <h1 className='text-[30px]'>List Products / Add</h1>
    </div>
    <form className="justify-center w-full mx-auto" method="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
            <div className="mt-4">
            <div className=" mb-[10px]">
                            <label htmlFor="Category">Category</label>
                            <select {...register('category', { required: true })} >
                                <option className="py-1">Categorys</option>
                                {categorys && categorys.map((item, index) => {
                                    return <option key={index} className="py-1" value={item._id}>{item.name}</option>
                                })}
                            </select>
                        </div>
                <div className="w-full mb-[10px]">
                    <label htmlFor="Name" className="block mb-3 text-sm font-semibold text-gray-500">Product Name</label>
                    <input type="text" {...register('name', { required: true, minLength: 5 })} placeholder="...." className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    {errors.name && <span className='text-red-500'>Vui lòng không để trống, nhập lớn hơn 5</span> }<br/>
                </div>
                <div className="w-full  mb-[10px]">
                    <label htmlFor="Price" className="block mb-3 text-sm font-semibold text-gray-500">Price</label>
                    <input type="text" {...register('price', { required: true, minLength: 5 })} placeholder="...." className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    {errors.price && <span className='text-red-500'>Vui lòng không để trống, nhập lớn hơn 5</span> }<br/>
                </div>
                <div className="w-full  mb-[10px]">
                    <label htmlFor="Image" className="block mb-3 text-sm font-semibold text-gray-500">Image</label>
                    <input multiple onChange={(e) => { previewImg(e.target.files) }} type="file" placeholder="...." className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            <label htmlFor="" className='flex pt-3'>
                                {files && files.map((item, index) => {
                                    return <img key={index} className='ml-5' src={URL.createObjectURL(item)} alt="" width={150} height={200} />
                                })}
                            </label>
                </div>
                <div className="w-full  mb-[10px]">
                    <label htmlFor="Quantity" className="block mb-3 text-sm font-semibold text-gray-500">Quantity</label>
                    <input type="number" {...register('quantity', { required: true, minLength: 5 })} placeholder="...." className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    {errors.quantity && <span className='text-red-500'>Vui lòng không để trống, nhập lớn hơn 5</span> }<br/>
                </div>
                <div className="w-full  mb-[10px]">
                    <label htmlFor="Description" className="block mb-3 text-sm font-semibold text-gray-500">Description</label>
                    <textarea rows={20} {...register('desc', { required: true, minLength: 5 })} placeholder="...." className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    {errors.desc && <span className='text-red-500'>Vui lòng không để trống, nhập lớn hơn 5</span> }<br/>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <Link to="/admin/products" className="flex font-semibold text-indigo-600 text-sm mt-10">
                    <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                    Cancel
                </Link>
                <button className="px-6 py-2 text-blue-200 bg-indigo-500 hover:bg-indigo-600">Created</button>
            </div>
        </div>
    </form>
</div>
  )
}

export default AddProducts