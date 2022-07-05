import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { CategoryType } from '../../../Types/CategoryType';
import { Link, useNavigate, useParams } from "react-router-dom";
import { readCate } from '../../../Api/categary';
import { useAppDispatch } from '../../../app/hooks';
import { updateCategory } from '../../../freatures/categorySlice';
import "toastr/build/toastr.min.css"
import toastr from 'toastr'
const EditCategory = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CategoryType>();
    const { id } = useParams();

    useEffect(() => {
        const getCategory = async () => {
            const { data } = await readCate(id);
            reset(data);
        }
        getCategory();
    }, [])
    
    const onSubmit: SubmitHandler<CategoryType> = data => {
        dispatch(updateCategory(data))
        console.log(data);
        toastr.success('update thành công !!')
        navigate("/admin/categorys")
    }
    return (
        <div>
            <div className='flex justify-between mb-[20px]'>
                <h3 className='text-[30px]'>Update Categorys  </h3>
            </div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <span>Name Category</span>
                <input type="text" {...register('name', { required: true })} /><hr />
                {errors.name && <span>Vui lòng không để trống</span> }
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    update
                </button>

            </form>
        </div>
    )
}

export default EditCategory 