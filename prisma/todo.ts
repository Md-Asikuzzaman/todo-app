import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//* CREATE A NEW TODO...
export const createTodo = async (title: string, description: string) => {
  const todo = await prisma.todo.create({ data: { title, description } });
  return todo;
};

//* FETCH ALL TODO...
export const fetchTodo = async () => {
  const todo = await prisma.todo.findMany();
  return todo;
};

//* FETCH TODO BY ID...
export const selectTodo = async (id: string) => {
  const todo = await prisma.todo.findFirst({ where: { id } });
  return todo;
};

//* UPDATE TODO...
export const updateTodo = async (
  id: string,
  title: string,
  description: string
) => {
  const todo = await prisma.todo.update({
    data: {
      title,
      description,
    },
    where: { id },
  });

  return todo;
};

//* DELETE TODO...
export const deleteTodo = async (id: string) => {
  const todo = await prisma.todo.delete({ where: { id } });
  return todo;
};
