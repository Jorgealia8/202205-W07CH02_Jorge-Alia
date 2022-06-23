/* eslint-disable no-unused-vars */
import { mongoConnect } from '../db/mongo.js';
import { ObjectId } from 'mongodb';
import { DataModel } from './data.model.js';

export interface iThings {
    id: number;
    name: string;
    category: string;
    difficulty: number;
}

export class Things extends DataModel<iThings> implements iThings {
    id: number;
    constructor(
        public name: string = '',
        public category: string = '',
        public difficulty: number = 5
    ) {
        super('things-db');
        this.id = 0;
    }
    async findAll(): Promise<Array<iThings>> {
        const { connect, collection } = await mongoConnect('ISDI', 'notes');
        const cursor = collection.find();
        const result = await (cursor.toArray() as unknown as Promise<
            Array<iThings>
        >);
        console.log(result);
        connect.close();
        return result;
    }
    async find(id: string): Promise<iThings | undefined> {
        console.log(id);
        const { connect, collection } = await mongoConnect('ISDI', 'notes');
        const dbId = new ObjectId(id);
        const result = (await collection.findOne({
            _id: dbId,
        })) as unknown as iThings;
        if (result === null) return undefined;
        connect.close();
        return result;
    }
    async create(data: Partial<iThings>): Promise<iThings> {
        const { connect, collection } = await mongoConnect('ISDI', 'notes');
        const result = (await collection.insertOne(
            data
        )) as unknown as Promise<any>;
        connect.close();
        return result;
    }
    async update(id: string, data: Partial<iThings>): Promise<iThings> {
        const { connect, collection } = await mongoConnect('ISDI', 'notes');
        const dbId = new ObjectId(id);
        const result = (await collection.findOneAndUpdate(
            { _id: dbId },
            { $set: { ...data } }
        )) as unknown as Promise<any>;
        connect.close();
        return result;
    }
    async delete(id: string) {
        const { connect, collection } = await mongoConnect('ISDI', 'notes');
        const dbId = new ObjectId(id);
        const result = await collection.findOneAndDelete({ _id: dbId });
        connect.close();
        console.log(result);
        if (!result.value) return { status: 404 };
        return { status: 202 };
    }
}
