'use client';

import { deleteTodo, handleTodo } from '@/redux/features/todoSlice';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { NextPage } from 'next';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsTrash2Fill } from 'react-icons/bs';
import { LuEdit2 } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Props {
  todo: TodoType[];
  isLoading: boolean;
  isError: string;
}

const Todo: NextPage<Props> = ({ todo, isLoading, isError }) => {
  const dispatch = useAppDispatch();

  // DELETE TODO ITEM...
  const handleDelete = (id: string) => {
    if (window.confirm('Do you really want to delete this item?'))
      dispatch(deleteTodo(id));
  };

  // COMPLETED TASK...
  const handleTask = (todo: any) => {
    dispatch(handleTodo(todo));
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        todo.map((todo) => (
          <div
            key={todo.id}
            className='flex items-center justify-between bg-sldate-400 py-3 border-b-2'
          >
            {todo.status == 1 ? (
              <p className='text-gray-400 text-md'>
                <del>{todo.title}</del>
              </p>
            ) : (
              <div>
                <p className='text-gray-600 text-md'>{todo.title}</p>
                <p className='text-sm text-gray-400'>
                  {new Date(todo.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
            <div className='flex items-center gap-3'>
              <AiFillCheckCircle
                onClick={() => handleTask(todo)}
                title='Done'
                className={`${
                  todo.status == 1 && 'text-green-500'
                } h-6 w-6 cursor-pointer text-gray-600 duration-200 hover:text-green-500`}
              />

              <Link href={'/edit/' + todo.id}>
                <LuEdit2
                  title='Edit'
                  className='h-6 w-6 cursor-pointer text-gray-600 duration-200 hover:text-orange-500'
                />
              </Link>

              <BsTrash2Fill
                onClick={() => handleDelete(todo.id)}
                title='Delete'
                className='h-6 w-6 cursor-pointer text-gray-600 duration-200 hover:text-rose-600'
              />
            </div>
          </div>
        ))
      )}

      {/* <Edit /> */}
    </>
  );
};

export default Todo;
