import { Pact } from '@pact-foundation/pact';
import { getById } from './todos';
import html404 from './404.js';

const mockProvider = new Pact({
    port: 3002,
    consumer: "ATDD-REACT",
    provider: "ATDD-EXPRESS",
    logLevel: "INFO" // the usual log levels - DEBUG, INFO, WARN, ERROR, etc.
});

describe('todos - Pact test', () => {
    beforeAll(async () => {
        await mockProvider.setup()
    });

    afterAll(async () => {
        await mockProvider.finalize()
    });

    describe('retrieving a todo', () => {

        beforeAll(async () => {
            await mockProvider.addInteraction({
                state: 'a todo with ID 1 exists',
                uponReceiving: 'a request to get a todo',
                withRequest: {
                    method: 'GET',
                    path: '/todos/1',
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: { id: 1, name: "Do something", completed: false },
                },
            });
        });

        test('ID 1 exists', async () => {
            const expectedTodo = { id: 1, name: "Do something", completed: false }
            const todo = await getById(1);
            expect(todo).toStrictEqual(expectedTodo);
        });
    });

    describe('try retrieve unexistent todo', () => {
        beforeAll(async () => {
            await mockProvider.addInteraction({
                state: 'a todo with ID 999 not exists',
                uponReceiving: 'a request to get a todo',
                withRequest: {
                    method: 'GET',
                    path: '/todos/999',
                },
                willRespondWith: {
                    status: 404,
                    headers: {
                        'Content-Type': 'text/html; charset=UTF-8',
                    },
                    body: html404,
                },
            });
        });

        test('ID 999 not exists', async () => {
            const todo = await getById(999);
            expect(todo.replace(/\s/g, '')).toStrictEqual(html404.replace(/\s/g, ''));
        });
    });
});