import { Router } from 'express';
import { DataController } from '../controllers/things.controller.js';
import { Things } from '../models/things.model.js';

export const thingsController = new DataController(new Things('things'));

export const thingsRouter = Router();

thingsRouter.get('/', thingsController.getAllController);
thingsRouter.get('/:id', thingsController.getController);
thingsRouter.post('/', thingsController.postController);
thingsRouter.patch('/:id', thingsController.patchController);
thingsRouter.delete('/:id', thingsController.deleteController);
