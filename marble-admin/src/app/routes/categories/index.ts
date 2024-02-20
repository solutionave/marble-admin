import { prismaClient } from "../../clients/prisma";
import { FastifyInstance, FastifyRequest } from 'fastify';
import { Category } from '@prisma/client'; // Assuming Category type is exported by Prisma

export default async function (fastify: FastifyInstance) {
  const prisma = prismaClient();

  // Interface for a single category
  interface CategoryResponse extends Category {}

  // GET all categories
  fastify.get('/', async function () {
    try {
      const categories = await prisma.category.findMany();
      return categories;
    } catch (error) {
      throw new Error(error);
    }
  });

  // GET a specific category by ID
  fastify.get('/:id', async (req: FastifyRequest<{Params: {id: string}}>) => {
    try {
      const { id } = req.params;
      const category = await prisma.category.findUnique({
        where: { id: parseInt(id) },
        include: { subcategories: true, products: true }
      });
      return category as CategoryResponse; // Casting to CategoryResponse
    } catch (error) {
      throw new Error(error);
    }
  });

  // PUT update a category by ID
  fastify.put('/:id', async (req: FastifyRequest<{Params: {id: string}}>) => {
    try {
        const { id } = req.params;
        const body = req.body as Partial<Category>; // Partial<Category> allows updating only specified properties
        const updatedCategory = await prisma.category.update({
          where: { id: parseInt(id) },
          data: body
        });
        return updatedCategory;
      } catch (error) {
        throw new Error(error);
      }
  });

  // POST create a new category
  fastify.post("/", async(req: FastifyRequest<{ Body: { name: string; parentCategoryId?: number | null } }>, res) =>{
    try {
        const { name, parentCategoryId } = req.body;
        const newCategory = await prisma.category.create({
            data: {
              name: name,
              parentCategoryId: parentCategoryId,
            },
          });

        return res.code(201).send(newCategory);
    } catch (error) {
        return res.code(400).send(error.message);
    }
  });
  // DELETE a category by ID
  fastify.delete('/:id', async (req: FastifyRequest<{Params: {id: string}}>) => {
    try {
      const { id } = req.params;
      const deletedCategory = await prisma.category.delete({
        where: { id: parseInt(id) }
      });
      return deletedCategory;
    } catch (error) {
      throw new Error(error);
    }
  });
}
