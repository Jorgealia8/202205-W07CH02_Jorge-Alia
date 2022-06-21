import { Router } from 'express';
import {
    deleteController,
    getController,
    getIdController,
    patchController,
    postController,
} from '../controllers/things.controller.js';

export const thingsRouter = Router();

thingsRouter.get('/', getController);

thingsRouter.get('/:id', getIdController);

thingsRouter.post('/', postController);

thingsRouter.patch('/:id', patchController);

thingsRouter.delete('/:id', deleteController);
