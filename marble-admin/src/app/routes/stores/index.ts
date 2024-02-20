import { prismaClient } from "../../clients/prisma";
import { FastifyInstance, FastifyRequest } from 'fastify';
import { Store } from '@prisma/client';

export default async function (fastify: FastifyInstance) {
  const prisma = prismaClient();

  // Interface for a single store
  interface StoreResponse extends Store {}

  // GET all stores
  fastify.get('/', async function () {
    try {
      const stores = await prisma.store.findMany();
      return stores;
    } catch (error) {
      throw new Error(error);
    }
  });

  // GET a specific store by ID
  fastify.get('/:id', async (req: FastifyRequest<{Params: {id: string}}>) => {
    try {
      const { id } = req.params;
      const store = await prisma.store.findUnique({
        where: { id: parseInt(id) },
        include: { products: true }
      });
      return store as StoreResponse;
    } catch (error) {
      throw new Error(error);
    }
  });

  // PUT update a store by ID
  fastify.put('/:id', async (req: FastifyRequest<{Params: {id: string}}>) => {
    try {
      const { id } = req.params;
      const body = req.body as Partial<Store>;
      const updatedStore = await prisma.store.update({
        where: { id: parseInt(id) },
        data: body
      });
      return updatedStore;
    } catch (error) {
      throw new Error(error);
    }
  });

  // POST create a new store
  fastify.post("/", async(req: FastifyRequest<{ Body: { name: string; email: string; telephone: string; whatsapp: string; address: string } }>, res) =>{
    try {
      const { name, email, telephone, whatsapp, address } = req.body;
      const newStore = await prisma.store.create({
        data: {
          name,
          email,
          telephone,
          whatsapp,
          address
        }
      });

      return res.code(201).send(newStore);
    } catch (error) {
      return res.code(400).send(error.message);
    }
  });

  // DELETE a store by ID
  fastify.delete('/:id', async (req: FastifyRequest<{Params: {id: string}}>) => {
    try {
      const { id } = req.params;
      const deletedStore = await prisma.store.delete({
        where: { id: parseInt(id) }
      });
      return deletedStore;
    } catch (error) {
      throw new Error(error);
    }
  });
}
