const { expect } = require('chai');
const sinon = require('sinon');
const mysql = require('mysql2');
const usersHandlers = require('../scripts/users-handlers.js');
const {server } = require('../app.js');

describe('Users Handlers', () => {
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

    describe('getUsers', () => {
        it('deve retornar uma lista de usuários', () => {
            const mockUsers = [
                { id: 1, userName: 'user1', name: 'User 1', email: 'user1@example.com', roleCode: 'ADMIN', roleDescription: 'Administrator', TOTAL_JOBS: 2 }
            ];

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, callback) => {
                    callback(null, mockUsers);
                })
            });

            usersHandlers.getUsers(request, response);

            expect(response.json.calledWith({ users: mockUsers })).to.be.true;
        });

        it('deve retornar uma lista vazia em caso de erro', () => {
            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, callback) => {
                    callback(new Error('Erro de consulta'), null);
                })
            });

            usersHandlers.getUsers(request, response);

            expect(response.json.calledWith({ users: [] })).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });

    describe('createUser', () => {
        it('deve criar um usuário com sucesso', () => {
            request.body = {
                name: 'User 1',
                userName: 'user1',
                email: 'user1@example.com',
                password: 'password123',
                role: 'ADMIN'
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(null, { affectedRows: 1 });
                })
            });

            usersHandlers.createUser(request, response);

            expect(response.sendStatus.calledWith(200)).to.be.true;
        });

        it('deve retornar erro ao criar um usuário', () => {
            request.body = {
                name: 'User 1',
                userName: 'user1',
                email: 'user1@example.com',
                password: 'password123',
                role: 'ADMIN'
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(new Error('Erro de criação'), null);
                })
            });

            usersHandlers.createUser(request, response);

            expect(response.sendStatus.calledWith(500)).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });

    describe('editUser', () => {
        it('deve editar um usuário com sucesso', () => {
            request.body = {
                id: 1,
                name: 'Updated User',
                email: 'updated@example.com',
                role: 'USER'
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(null, { affectedRows: 1 });
                })
            });

            usersHandlers.editUser(request, response);

            expect(response.json.calledWith({ success: true })).to.be.true;
        });

        it('deve retornar erro ao editar um usuário', () => {
            request.body = {
                id: 1,
                name: 'Updated User',
                email: 'updated@example.com',
                role: 'USER'
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(new Error('Erro de edição'), null);
                })
            });

            usersHandlers.editUser(request, response);

            expect(response.json.calledWith({ success: false })).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });

    describe('deleteUser', () => {
        it('deve deletar um usuário com sucesso', () => {
            request.params = {
                id: 1
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(null, { affectedRows: 1 });
                })
            });

            usersHandlers.deleteUser(request, response);

            expect(response.sendStatus.calledWith(200)).to.be.true;
        });

        it('deve retornar erro ao deletar um usuário', () => {
            request.params = {
                id: 1
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(new Error('Erro de exclusão'), null);
                })
            });

            usersHandlers.deleteUser(request, response);

            expect(response.sendStatus.calledWith(500)).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });

    describe('getPageSettings', () => {
        it('deve carregar as configurações da página com sucesso', () => {
            const mockSettings = [
                { CODE: 'ADMIN', DESCRIPTION: 'Administrator' },
                { CODE: 'USER', DESCRIPTION: 'User' }
            ];

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, callback) => {
                    callback(null, mockSettings);
                })
            });

            usersHandlers.getPageSettings(request, response);

            expect(response.json.calledWith({ pageSettings: [mockSettings] })).to.be.true;
        });

        it('deve retornar uma lista vazia em caso de erro', () => {
            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, callback) => {
                    callback(new Error('Erro de consulta'), null);
                })
            });

            usersHandlers.getPageSettings(request, response);

            expect(response.json.calledWith({ pageSettings: [] })).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });
    after(() => {
        // Encerra o servidor após a execução de todos os testes
        server.close(() => {
            console.log('Servidor encerrado.');
            process.exit(0);
        });
    });
});
