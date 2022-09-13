import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import httpCodes from '../../../utils/httpCodes/httpCodes';
import response from '../../../utils/response';

const prisma = new PrismaClient();

const createPublisher = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (name == null || name == '') {
      return response(res, httpCodes.BAD_REQUEST, 'name cannot be empty', null);
    }

    const newPublisher = await prisma.publisher.create({
      data: {
        name,
      },
    });

    return response(res, httpCodes.CREATED, 'Publisher created', newPublisher);
  } catch (error: any) {
    return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const getPublishers = async (req: Request, res: Response) => {
  try {
    const publishers = await prisma.publisher.findMany();
    return response(
      res,
      httpCodes.OK,
      'Get all publishers success!',
      publishers,
    );
  } catch (error: any) {
    return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const getPublisherById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const selectedPublisher = await prisma.publisher.findFirst({
      where: { id: parseInt(id) },
      include: { games: true },
    });

    if (!selectedPublisher) {
      return response(res, httpCodes.NOT_FOUND, 'Publisher not found', null);
    }

    return response(
      res,
      httpCodes.OK,
      'Get publisher success!',
      selectedPublisher,
    );
  } catch (error: any) {
    return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const updatePublisher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (name == null || name == '') {
      return response(res, httpCodes.BAD_REQUEST, 'name cannot be empty', null);
    }

    const selectedPublisher = await prisma.publisher.findFirst({
      where: { id: parseInt(id) },
    });

    if (!selectedPublisher) {
      return response(res, httpCodes.NOT_FOUND, 'Publisher not found', null);
    }

    const updatedPublisher = await prisma.publisher.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    return response(
      res,
      httpCodes.OK,
      'Update publisher success!',
      updatedPublisher,
    );
  } catch (error: any) {
    return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const deletePublisher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const selectedPublisher = await prisma.publisher.findFirst({
      where: { id: parseInt(id) },
    });

    if (!selectedPublisher) {
      return response(res, httpCodes.NOT_FOUND, 'Publisher not found', null);
    }

    const deletedPublisher = await prisma.publisher.delete({
      where: { id: parseInt(id) },
    });

    return response(
      res,
      httpCodes.OK,
      'Delete publisher success!',
      deletedPublisher,
    );
  } catch (error: any) {
    return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

export default {
  getPublishers,
  getPublisherById,
  createPublisher,
  updatePublisher,
  deletePublisher,
};
