import { mongoConnect } from '../db/mongo';
import { Things } from './things.model';

jest.mock('../db/mongo.js');

describe('Given a instantiated model Things', () => {
    let model: Things;
    // let mockItem = { id: 1, test: 'test' };
    const mockFind = jest.fn();
    const mockCloseconnection = jest.fn();
    const mockFindOne = jest.fn();
    const mockInsertOne = jest.fn();
    const mockFindOneAndUpdate = jest.fn();
    const mockFindOneAndDelete = jest.fn();
    beforeEach(() => {
        (mongoConnect as jest.Mock).mockReturnValue({
            connect: { close: mockCloseconnection },
            collection: {
                find: mockFind,
                findOne: mockFindOne,
                insertOne: mockInsertOne,
                findOneAndUpdate: mockFindOneAndUpdate,
                findOneAndDelete: mockFindOneAndDelete,
            },
        });
        model = new Things('test-db');
    });

    describe('When method findAll is called', () => {
        test('Then collection.find() should be called', async () => {
            mockFind.mockReturnValue({
                toArray: jest.fn().mockResolvedValue({}),
            });
            await model.findAll();
            expect(mockFind).toHaveBeenCalled();
            expect(mockCloseconnection).toHaveBeenCalled();
        });
    });
    describe('When method find is called', () => {
        test('Then an item should be found', async () => {
            mockFindOne.mockResolvedValue({}),
                await model.find('62b49f01ca0c7c8c99214332');
            expect(mockFindOne).toHaveBeenCalled();
        });
    });
    describe('When method find is called', () => {
        test('Then an item should be null', async () => {
            mockFindOne.mockResolvedValue(null);
            await model.find('62b49f01ca0c7c8c99214332');
            expect(mockFindOne).toHaveBeenCalled();
        });
    });
    describe('When method create is called ', () => {
        test('Then an item should be created', async () => {
            mockInsertOne.mockResolvedValue({});
            await model.create({});
            expect(mockInsertOne).toHaveBeenCalled();
        });
    });
    describe('When method update is called', () => {
        test('Then an item should be updated', async () => {
            mockFindOneAndUpdate.mockResolvedValue({});
            await model.update('62b49f01ca0c7c8c99214332', {});
            expect(mockFindOneAndUpdate).toHaveBeenCalled();
        });
    });
    describe('When method delete is called with a valid id', () => {
        test('Then an item should be  deleted', async () => {
            mockFindOneAndDelete.mockResolvedValue({});
            await model.delete('62b49f01ca0c7c8c99214332');
            expect(mockFindOneAndDelete).toHaveBeenCalled();
        });
    });
});
