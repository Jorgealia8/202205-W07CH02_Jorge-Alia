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

let data = JSON.parse(dataFileContent);

export const getIdController = (req: Request, resp: Response) => {
    resp.setHeader('Content-type', 'application/json');
    const result = data.Things.find((item: any) => item.id === +req.params.id);
    if (result) {
        resp.end(JSON.stringify(result));
    } else {
        resp.status(404);
        resp.end(JSON.stringify({}));
    }
};

export const postController = async (req: Request, resp: Response) => {
    console.log(data, 'PRUEBAAAAAA');
    const newThings = {
        ...req.body,
        id: data.Things[data.Things.length - 1].id + 1,
    };
    data.Things.push(newThings);
    console.log(data, 'INCLUIDO');

    await fs.writeFile(dataFilePath, JSON.stringify(data));
    resp.setHeader('Content-type', 'application/json');
    resp.status(201);
    resp.end(JSON.stringify(newThings));
};

export const patchController = async (req: Request, resp: Response) => {
    let newThings;
    data.Things = data.Things.map((item: any) => {
        if (item.id === +req.params.id) {
            newThings = { ...item, ...req.body };
            return newThings;
        } else {
            return item;
        }
    });
    await fs.writeFile(dataFilePath, JSON.stringify(data));
    resp.setHeader('Content-type', 'application/json');
    resp.end(JSON.stringify(newThings));
};

export const deleteController = async (req: Request, resp: Response) => {
    const prevLength = data.Things.length;
    data.Things = data.Things.filter((item: any) => item.id !== +req.params.id);

    fs.writeFile(dataFilePath, JSON.stringify(data));
    resp.status(prevLength === data.Things.length ? 404 : 202);
    resp.end(JSON.stringify({}));
};
