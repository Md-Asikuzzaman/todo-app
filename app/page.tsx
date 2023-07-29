'use client';

import Form from '@/components/form';
import Todo from '@/components/todo';
import { fetchTodo } from '@/redux/features/todoSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { NextPage } from 'next';
import { useEffect } from 'react';

interface Props {}

const Home: NextPage<Props> = ({}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  const data = useAppSelector((state) => state.todoList);

  return (
    <div className='container bg-white p-5 m-5 rounded-md shadow-md min-h-[95vh]'>
      <Form />
      <Todo todo={data.todo} isLoading={data.loading} isError={data.error} />
    </div>
  );
};

export default Home;
