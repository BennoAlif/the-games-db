import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import httpCodes from '../../../utils/httpCodes/httpCodes';
import response from '../../../utils/response';

const prisma = new PrismaClient();

const createGame = async (req: Request, res: Response) => {
  try {
    const imageUrl = req.file?.filename;
    const { title, publisherId } = req.body;

    if (!title || !publisherId || !imageUrl) {
      return response(
        res,
        httpCodes.BAD_REQUEST,
        'All fields must be filled',
        null,
      );
    }

    const newGame = await prisma.game.create({
      data: {
        title,
        imageUrl: imageUrl != null ? imageUrl : 'No-Image-Placeholder.png',
        publisherId: parseInt(publisherId),
      },
    });

    return response(res, httpCodes.CREATED, 'Game created', newGame);
  } catch (error: any) {
    return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const getGames = async (req: Request, res: Response) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        publisher: true,
      },
    });
    return response(res, httpCodes.OK, 'Get all games success!', games);
  } catch (error: any) {
    return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const getGameById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const selectedGame = await prisma.game.findFirst({
      where: { id: parseInt(id) },
      include: { publisher: true },
    });

    if (!selectedGame) {
      return response(res, httpCodes.NOT_FOUND, 'Game not found', null);
    }

    return response(res, httpCodes.OK, 'Get publisher success!', selectedGame);
  } catch (error: any) {
    return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const updateGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const imageUrl = req.file?.filename;
    const { title, publisherId } = req.body;

    const selectedGame = await prisma.game.findFirst({
      where: { id: parseInt(id) },
    });

    if (!selectedGame) {
      return response(res, httpCodes.NOT_FOUND, 'Game not found', null);
    }

    const updatedGame = await prisma.game.update({
      where: { id: parseInt(id) },
      data: {
        title: title || undefined,
        imageUrl: imageUrl || undefined,
        publisherId: publisherId || undefined,
      },
    });

    return response(res, httpCodes.OK, 'Update game success!', updatedGame);
  } catch (error: any) {
    return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const deleteGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const selectedGame = await prisma.game.findFirst({
      where: { id: parseInt(id) },
    });

    if (!selectedGame) {
      return response(res, httpCodes.NOT_FOUND, 'Game not found', null);
    }

    const deletedGame = await prisma.game.delete({
      where: { id: parseInt(id) },
    });

    return response(res, httpCodes.OK, 'Delete game success!', deletedGame);
  } catch (error: any) {
    return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

export default { createGame, getGames, getGameById, updateGame, deleteGame };
