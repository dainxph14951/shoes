import React from 'react'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm,  } from "react-hook-form"
import { CategoryType } from '../../../Types/CategoryType'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import {addCategory} from '../../../freatures/categorySlice'
import "toastr/build/toastr.min.css"
import toastr from 'toastr'
const AddCategory = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState : {errors} , reset} = useForm<CategoryType>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CategoryType> = data => {
    dispatch(addCategory(data))
    toastr.success('Thêm thành công !!')
    navigate("/admin/category");
}
  return (
    <div>
    <div className='flex justify-between mb-[20px]'>
        <h3 className='text-[30px]'>Add Category</h3>
    </div>
    <form action="" onSubmit={handleSubmit(onSubmit)}>
                <span>Name Category</span><br/>
                <input type="text" {...register('name', { required: true, minLength: 3 })} /><hr />
                   {errors.name && <span className='text-red-500'>Vui lòng không để trống</span> }<br/>
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Add
                </button>

            </form>
</div>
  )
}

export default AddCategory