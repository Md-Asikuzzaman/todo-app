'use client';

import { addTodo } from '@/redux/features/todoSlice';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { NextPage } from 'next';
import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';

interface Props {}

const Form: NextPage<Props> = ({}) => {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addTodo(title));
    setTitle('');
  };

  return (
    <div>
      <h2 className='text-purple-600 mb-5 font-semibold text-xl'>
        Todo Application
      </h2>
      <form onSubmit={handleSubmit} className='flex items-center gap-5'>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id='floating_email'
            className='block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-purple-500 dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='floating_email'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Type a todo
          </label>
        </div>
        <button
          type='submit'
          className='flex items-center gap-1 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-500'
        >
          <BsPlus className='h-5 w-5' /> ADD
        </button>
      </form>
    </div>
  );
};

export default Form;
