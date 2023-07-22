import { deleteTodo, selectTodo, updateTodo } from '@/prisma/todo';
import { NextResponse } from 'next/server';

//* FETCH TODO BY ID...
export const GET = async (
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  try {
    const todo = await selectTodo(params.id);
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something wrong!' }, { status: 404 });
  }
};

//* DELETE TODO BY ID...
export const DELETE = async (
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  try {
    const todo = await deleteTodo(params.id);
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something wrong!' }, { status: 404 });
  }
};

//* UPDATE TODO BY ID...
export const PUT = async (
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  try {
    const { title, description } = await request.json();
    const updatedTodo = await updateTodo(params.id, title, description);
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something wrong!' }, { status: 404 });
  }
};
