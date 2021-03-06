import { Request, Response } from 'express';
import {
    deleteController,
    getController,
    getIdController,
    patchController,
    postController,
} from './things.controller';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Given a instantiated controller things Controller', () => {
    let req: Partial<Request>;
    let resp: Partial<Response>;

    beforeEach(() => {
        req = {
            params: { id: '1' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            end: jest.fn(),
        };
    });
    describe('When method getController is called', () => {
        test('Then resp.end should be called', async () => {
            let dataFileContent = {
                id: 1,
                name: 'manejarGIT',
                category: 'front',
                difficulty: 2,
            };
            (fs.readFile as jest.Mock).mockResolvedValue(
                JSON.stringify(dataFileContent)
            );
            await getController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
        });
    });
    describe('When method getIdController is called', () => {
        test('Then resp.end should be called', async () => {
            let dataFileContent = {
                id: 1,
                name: 'manejarGIT',
                category: 'front',
                difficulty: 2,
            };
            (fs.readFile as jest.Mock).mockResolvedValue(
                JSON.stringify({ Things: [dataFileContent] })
            );

            await getIdController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
        });
        test('Then resp.end should be called', async () => {
            let dataFileContent = {
                id: 1,
                name: 'manejarGIT',
                category: 'front',
                difficulty: 2,
            };
            (fs.readFile as jest.Mock).mockResolvedValue(
                JSON.stringify({ Things: [dataFileContent] })
            );
            req = {
                params: { id: '8' },
            };
            await getIdController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
        });
    });
    describe('When method postController is called', () => {
        test('Then resp.end should be called', async () => {
            let dataFileContent = {
                id: 1,
                name: 'manejarGIT',
                category: 'front',
                difficulty: 2,
            };
            (fs.writeFile as jest.Mock).mockResolvedValue(
                JSON.stringify({ Things: [dataFileContent] })
            );
            await postController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
        });
    });
    describe('When method pathController is called', () => {
        test('Then resp.end should be called', async () => {
            let dataFileContent = {
                id: 1,
                name: 'manejarGIT',
                category: 'front',
                difficulty: 2,
            };
            (fs.writeFile as jest.Mock).mockResolvedValue(
                JSON.stringify({ Things: [dataFileContent] })
            );
            await patchController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
        });
    });
    describe('When method pathController is called', () => {
        test('Then resp.end should be called', async () => {
            let dataFileContent = {
                id: 1,
                name: 'manejarGIT',
                category: 'front',
                difficulty: 2,
            };
            (fs.writeFile as jest.Mock).mockResolvedValue(
                JSON.stringify({ Things: [dataFileContent] })
            );
            req = {
                params: { id: '8' },
            };
            await patchController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
        });
    });
    describe('When method deleteController is called', () => {
        test('Then resp.end should be called', async () => {
            let dataFileContent = {
                id: 1,
                name: 'manejarGIT',
                category: 'front',
                difficulty: 2,
            };
            (fs.writeFile as jest.Mock).mockResolvedValue(
                JSON.stringify({ Things: [dataFileContent] })
            );
            await deleteController(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalled();
        });
    });
});
