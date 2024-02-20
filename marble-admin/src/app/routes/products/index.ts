import { prismaClient } from "../../clients/prisma";
import { FastifyInstance, FastifyRequest } from 'fastify';
import { Product } from '@prisma/client';

export default async function (fastify: FastifyInstance) {
  const prisma = prismaClient();

  // Interface for a single product
  interface ProductResponse extends Product {}

  // GET all products
  fastify.get('/', async function () {
    try {
      const products = await prisma.product.findMany();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  });

  // GET a specific product by ID
  fastify.get('/:id', async (req: FastifyRequest<{Params: {id: string}}>) => {
    try {
      const { id } = req.params;
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: { store: true, category: true }
      });
      return product as ProductResponse;
    } catch (error) {
      throw new Error(error);
    }
  });

  // PUT update a product by ID
  fastify.put('/:id', async (req: FastifyRequest<{Params: {id: string}}>) => {
    try {
      const { id } = req.params;
      const body = req.body as Partial<Product>;
      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: body
      });
      return updatedProduct;
    } catch (error) {
      throw new Error(error);
    }
  });

  // POST create a new product
  fastify.post("/", async(req: FastifyRequest<{ Body: { name: string; description: string; price: number; imageUrl: string; location: string; storeId: number; categoryId: number } }>, res) =>{
    try {
      const { name, description, price, imageUrl, location, storeId, categoryId } = req.body;
      const newProduct = await prisma.product.create({
        data: {
          name,
          description,
          price,
          imageUrl,
          location,
          storeId,
          categoryId
        }
      });

      return res.code(201).send(newProduct);
    } catch (error) {
      return res.code(400).send(error.message);
    }
  });

  // DELETE a product by ID
  fastify.delete('/:id', async (req: FastifyRequest<{Params: {id: string}}>) => {
    try {
      const { id } = req.params;
      const deletedProduct = await prisma.product.delete({
        where: { id: parseInt(id) }
      });
      return deletedProduct;
    } catch (error) {
      throw new Error(error);
    }
  });
}
