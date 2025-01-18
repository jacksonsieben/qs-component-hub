const { expect } = require('chai');
const sinon = require('sinon');
const mysql = require('mysql2');
const authenticationHandlers = require('../scripts/authentication-handlers.js');

describe('Função login', () => {
    let connectionStub, request, response;

    beforeEach(() => {
        connectionStub = sinon.stub(mysql, 'createConnection').returns({
            connect: sinon.stub().callsArgWith(0, null),
            query: sinon.stub()
        });

        request = {
            body: {
                login: 'testuser',
                password: 'testpassword'
            },
            session: {}
        };
        response = {
            sendStatus: sinon.spy(),
            send: sinon.spy()
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('deve retornar status 500 em caso de erro de conexão com o banco de dados', () => {
        connectionStub.returns({
            connect: sinon.stub().callsArgWith(0, new Error('Erro de conexão')),
            query: sinon.stub()
        });
    
        authenticationHandlers.login(request, response);
    
        expect(response.sendStatus.calledWith(500)).to.be.true;
    });

    it('deve retornar status 401 se as credenciais forem inválidas', () => {
        connectionStub.returns({
            connect: sinon.stub().callsArgWith(0, null),
            query: sinon.stub().callsArgWith(2, null, [])
        });

        authenticationHandlers.login(request, response);

        expect(response.sendStatus.calledWith(401)).to.be.true;
    });

    it('deve autenticar o usuário e adicioná-lo à sessão se as credenciais forem válidas', () => {
        const user = {
            id: 1,
            userName: 'testuser',
            name: 'Test User',
            email: 'test@example.com',
            roleCode: 'ADMIN',
            roleDescription: 'Administrator'
        };

        connectionStub.returns({
            connect: sinon.stub().callsArgWith(0, null),
            query: sinon.stub().callsArgWith(2, null, [user])
        });

        authenticationHandlers.login(request, response);

        expect(request.session.User).to.deep.equal(user);
        expect(response.send.calledWith(JSON.stringify(user))).to.be.true;
    });
});
