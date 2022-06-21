import { Request, Response } from 'express';
import fs from 'fs/promises';

const dataFilePath = './data/data.json';

let dataFileContent = await fs.readFile(dataFilePath, {
    encoding: 'utf-8',
});
export const getController = (req: Request, resp: Response) => {
    req;
    resp.setHeader('Content-type', 'application/json');
    resp.end(dataFileContent);
};

let data = JSON.parse(dataFileContent).Things;

export const getIdController = (req: Request, resp: Response) => {
    resp.setHeader('Content-type', 'application/json');
    const result = data.find((item: any) => item.id === +req.params.id);
    if (result) {
        resp.end(JSON.stringify(result));
    } else {
        resp.status(404);
        resp.end(JSON.stringify({}));
    }
};

export const postController = async (req: Request, resp: Response) => {
    console.log(data, 'PRUEBAAAAAA');
    const newThings = { ...req.body, id: data[data.length - 1].id + 1 };
    data.push(newThings);
    console.log(data, 'INCLUIDO');

    await fs.writeFile(dataFilePath, dataFileContent);
    resp.setHeader('Content-type', 'application/json');
    resp.status(201);
    resp.end(JSON.stringify(newThings));
};

export const patchController = (req: Request, resp: Response) => {
    let newThings;
    data = data.map((item: any) => {
        if (item.id === +req.params.id) {
            newThings = { ...item, ...req.body };
            return newThings;
        } else {
            return item;
        }
    });
    resp.setHeader('Content-type', 'application/json');
    resp.end(JSON.stringify(newThings));
};

export const deleteController = (req: Request, resp: Response) => {
    const prevLength = data.length;
    data = data.filter((item: any) => item.id !== +req.params.id);
    resp.status(prevLength === data.length ? 404 : 202);
    resp.end(JSON.stringify({}));
};
