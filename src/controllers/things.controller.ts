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
    let data = JSON.parse(dataFileContent).Things;
    console.log(data, 'PRUEBAAAAAA');
    const newThings = { ...req.body, id: data[data.length - 1].id + 1 };
    data.push(newThings);
    console.log(newThings);

    await fs.writeFile(dataFilePath, JSON.stringify(dataFileContent));
    resp.setHeader('Content-type', 'application/json');
    resp.status(201);
    resp.end(newThings);
};

export const patchController = (req: Request, resp: Response) => {};

export const deleteController = (req: Request, resp: Response) => {};
