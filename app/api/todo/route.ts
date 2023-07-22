import { createTodo, fetchTodo } from '@/prisma/todo';
import { NextRequest, NextResponse } from 'next/server';

//* FETCH ALL TODO...
export const GET = async () => {
  try {
    const allTodo = await fetchTodo();
    return NextResponse.json(allTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something wrong!' }, { status: 404 });
  }
};

//* CREATE NEW TODO...
export const POST = async (request: NextRequest) => {
  const { title, description } = await request.json();
  try {
    const newTodo = await createTodo(title, description);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Something wrong!' }, { status: 404 });
  }
};
