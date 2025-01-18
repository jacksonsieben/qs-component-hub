const { expect } = require('chai');
const sinon = require('sinon');
const mysql = require('mysql2');
const clientsHandlers = require('../scripts/clients-handlers.js');

describe('Clients Handlers', () => {
    let connectionStub, request, response, consoleStub;

    beforeEach(() => {
        connectionStub = sinon.stub(mysql, 'createConnection').returns({
            connect: sinon.stub(),
            query: sinon.stub()
        });

        request = {
            body: {},
            params: {}
        };
        response = {
            json: sinon.spy(),
            sendStatus: sinon.spy()
        };

        consoleStub = {
            error: sinon.stub(console, 'error'),
            log: sinon.stub(console, 'log')
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getClients', () => {
        it('deve retornar uma lista de clientes', () => {
            const mockClients = [
                { id: 1, name: 'Client 1', address: 'Address 1', postCode: '12345', email: 'client1@example.com', nif: '123456789', TOTAL_JOBS: 2, TOTAL_JOBS_FINALISED: 1 }
            ];

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, callback) => {
                    callback(null, mockClients);
                })
            });

            clientsHandlers.getClients(request, response);

            expect(response.json.calledWith({ clients: mockClients })).to.be.true;
        });

        it('deve retornar uma lista vazia em caso de erro', () => {
            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, callback) => {
                    callback(new Error('Erro de consulta'), null);
                })
            });

            clientsHandlers.getClients(request, response);

            expect(response.json.calledWith({ clients: [] })).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });

    describe('editClient', () => {
        it('deve atualizar um cliente com sucesso', () => {
            request.body = {
                id: 1,
                name: 'Updated Client',
                address: 'Updated Address',
                postCode: '54321',
                email: 'updated@example.com',
                nif: '987654321'
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(null, { affectedRows: 1 });
                })
            });

            clientsHandlers.editClient(request, response);

            expect(response.json.calledWith({ success: true })).to.be.true;
        });

        it('deve retornar erro ao atualizar um cliente', () => {
            request.body = {
                id: 1,
                name: 'Updated Client',
                address: 'Updated Address',
                postCode: '54321',
                email: 'updated@example.com',
                nif: '987654321'
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(new Error('Erro de atualização'), null);
                })
            });

            clientsHandlers.editClient(request, response);

            expect(response.json.calledWith({ success: false })).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });

    describe('deleteClient', () => {
        it('deve deletar um cliente com sucesso', () => {
            request.params = { id: 1 };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(null, { affectedRows: 1 });
                })
            });

            clientsHandlers.deleteClient(request, response);

            expect(response.sendStatus.calledWith(200)).to.be.true;
        });

        it('deve retornar erro ao deletar um cliente', () => {
            request.params = { id: 1 };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(new Error('Erro de exclusão'), null);
                })
            });

            clientsHandlers.deleteClient(request, response);

            expect(response.sendStatus.calledWith(500)).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });

    describe('createClient', () => {
        it('deve criar um cliente com sucesso', () => {
            request.body = {
                name: 'New Client',
                address: 'New Address',
                postCode: '12345',
                email: 'new@example.com',
                nif: '123456789'
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(null, { affectedRows: 1 });
                })
            });

            clientsHandlers.createClient(request, response);

            expect(response.sendStatus.calledWith(200)).to.be.true;
        });

        it('deve retornar erro ao criar um cliente', () => {
            request.body = {
                name: 'New Client',
                address: 'New Address',
                postCode: '12345',
                email: 'new@example.com',
                nif: '123456789'
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(new Error('Erro de criação'), null);
                })
            });

            clientsHandlers.createClient(request, response);

            expect(response.sendStatus.calledWith(500)).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });
});
