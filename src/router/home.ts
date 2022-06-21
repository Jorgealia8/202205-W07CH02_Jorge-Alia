import { Router } from 'express';

export const routerHome = Router();

routerHome.get('/', (req, resp) => {
    req;
    resp.setHeader('Content-type', 'text-html');
    resp.end('App Express');
});
