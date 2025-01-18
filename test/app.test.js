const { expect } = require('chai');
const sinon = require('sinon');
const { isUserLoggedIn, redirectMiddleware, app } = require('../app.js');

describe('Função isUserLoggedIn', () => {
    
    it('deve retornar false se o usuário não estiver logado', () => {
        const request = {
            session: {}
        };
        const result = isUserLoggedIn(request);
        expect(result).to.be.false;
    });

    it('deve retornar true se o usuário estiver logado', () => {
        const request = {
            session: {
                User: { id: 1, name: 'John Doe' }
            }
        };
        const result = isUserLoggedIn(request);
        expect(result).to.be.true;
    });
});

describe('Middleware de Redirecionamento', () => {
    let request, response, next;

    beforeEach(() => {
        request = {
            url: '/home.html',
            session: {}
        };
        response = {
            redirect: sinon.spy()
        };
        next = sinon.spy();
    });

    it('deve redirecionar para /login.html se o usuário não estiver logado', () => {
        redirectMiddleware(request, response, next);
        expect(response.redirect.calledWith('/login.html')).to.be.true;
        expect(next.called).to.be.false;
    });

    it('deve chamar next() se o usuário estiver logado', () => {
        request.session.User = { id: 1, name: 'John Doe' };
        redirectMiddleware(request, response, next);
        expect(response.redirect.called).to.be.false;
        expect(next.called).to.be.true;
    });
});
