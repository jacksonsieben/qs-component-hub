const { expect } = require('chai');
const sinon = require('sinon');
const globalHandlers = require('../scripts/globalHandlers.js');

describe('Função logout', () => {
    let request, response;

    beforeEach(() => {
        request = {
            session: {
                User: { id: 1, name: 'John Doe' } 
            }
        };
        response = {
            sendStatus: sinon.spy() 
        };
    });

    it('deve remover o usuário da sessão e enviar status 200', () => {
        globalHandlers.logout(request, response);

        expect(request.session.User).to.be.undefined;

        expect(response.sendStatus.calledWith(200)).to.be.true;
    });
});