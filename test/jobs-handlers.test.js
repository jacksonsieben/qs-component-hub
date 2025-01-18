const { expect } = require('chai');
const sinon = require('sinon');
const mysql = require('mysql2');
const jobsHandlers = require('../scripts/jobs-handlers.js');

describe('Jobs Handlers', () => {
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

    describe('getListJobs', () => {
        it('deve retornar uma lista de jobs para o tipo "ME"', () => {
            request.body = {
                type: "ME",
                identifier: 1
            };

            const mockJobs = [
                { JOB_ID: 1, USER_NAME_CREATED: 'User 1', EQUIPMENT_TYPE_DESCRIPTION: 'Type 1', STATUS_PROGRESS_DESCRIPTION: 'In Progress' }
            ];

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(null, mockJobs);
                })
            });

            jobsHandlers.getListJobs(request, response);

            expect(response.json.calledWith({ jobs: mockJobs })).to.be.true;
        });

        it('deve retornar uma lista vazia em caso de erro', () => {
            request.body = {
                type: "ME",
                identifier: 1
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(new Error('Erro de consulta'), null);
                })
            });

            jobsHandlers.getListJobs(request, response);

            expect(response.json.calledWith({ jobs: [] })).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });

    describe('getUserInfoInitState', () => {
        it('deve retornar o estado inicial da página', () => {
            const mockResults = [
                [{ CODE: '1', DESCRIPTION: 'Status 1' }],
                [{ CODE: '2', DESCRIPTION: 'Type 2' }],
                [{ CODE: '3', DESCRIPTION: 'Procedure 3' }],
                [{ CODE: '4', DESCRIPTION: 'Brand 4' }],
                [{ ID: 1, NAME: 'Client 1' }],
                [{ CODE: '5', DESCRIPTION: 'Priority 5' }]
            ];

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, callback) => {
                    callback(null, mockResults);
                })
            });

            jobsHandlers.getUserInfoInitState(request, response);

            expect(response.json.calledWith({ initPageState: mockResults })).to.be.true;
        });

        it('deve retornar uma lista vazia em caso de erro', () => {
            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, callback) => {
                    callback(new Error('Erro de consulta'), null);
                })
            });

            jobsHandlers.getUserInfoInitState(request, response);

            expect(response.json.calledWith({ initPageState: [] })).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });

    describe('editJobInfo', () => {
        it('deve atualizar as informações do job com sucesso', () => {
            request.body = {
                id: 1,
                userId: 1,
                status: "1",
                equipmentType: "Type 1",
                equipmentTypeOther: "",
                equipmentProcedure: "Procedure 1",
                equipmentProcedureOther: "",
                equipmentBrand: "Brand 1",
                notes: "Notas",
                priority: "1"
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub()
                    .onFirstCall().callsFake((query, values, callback) => {
                        callback(null, [{ PRIORITY_NUMBER: 1, TOTAL_JOBS: 1 }]);
                    })
                    .onSecondCall().callsFake((query, values, callback) => {
                        callback(null, { affectedRows: 1 });
                    })
            });

            jobsHandlers.editJobInfo(request, response);

            expect(response.sendStatus.calledWith(200)).to.be.true;
        });

        it('deve retornar erro ao atualizar as informações do job', () => {
            request.body = {
                id: 1,
                userId: 1,
                status: "1",
                equipmentType: "Type 1",
                equipmentTypeOther: "",
                equipmentProcedure: "Procedure 1",
                equipmentProcedureOther: "",
                equipmentBrand: "Brand 1",
                notes: "Notas",
                priority: "1"
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub()
                    .onFirstCall().callsFake((query, values, callback) => {
                        callback(new Error('Erro de consulta'), null);
                    })
            });

            jobsHandlers.editJobInfo(request, response);

            expect(response.sendStatus.calledWith(500)).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });

    describe('createJob', () => {
        it('deve criar um job com sucesso', () => {
            request.body = {
                userId: 1,
                userIdClient: 1,
                status: "1",
                equipmentType: "Type 1",
                equipmentTypeOther: "",
                equipmentProcedure: "Procedure 1",
                equipmentProcedureOther: "",
                equipmentBrand: "Brand 1",
                notes: "Notas",
                priority: "1"
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub()
                    .onFirstCall().callsFake((query, values, callback) => {
                        callback(null, [{ PRIORITY_NUMBER: 1 }]);
                    })
                    .onSecondCall().callsFake((query, values, callback) => {
                        callback(null, { affectedRows: 1 });
                    })
            });

            jobsHandlers.createJob(request, response);

            expect(response.sendStatus.calledWith(200)).to.be.true;
        });

        it('deve retornar erro ao criar um job', () => {
            request.body = {
                userId: 1,
                userIdClient: 1,
                status: "1",
                equipmentType: "Type 1",
                equipmentTypeOther: "",
                equipmentProcedure: "Procedure 1",
                equipmentProcedureOther: "",
                equipmentBrand: "Brand 1",
                notes: "Notas",
                priority: "1"
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub()
                    .onFirstCall().callsFake((query, values, callback) => {
                        callback(new Error('Erro de consulta'), null);
                    })
            });

            jobsHandlers.createJob(request, response);

            expect(response.sendStatus.calledWith(500)).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });

    describe('reopenJob', () => {
        it('deve reabrir um job com sucesso', () => {
            request.body = {
                JobId: 1
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(null, { affectedRows: 1 });
                })
            });

            jobsHandlers.reopenJob(request, response);

            expect(response.sendStatus.calledWith(200)).to.be.true;
        });

        it('deve retornar erro ao reabrir um job', () => {
            request.body = {
                JobId: 1
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(new Error('Erro de reabertura'), null);
                })
            });

            jobsHandlers.reopenJob(request, response);

            expect(response.sendStatus.calledWith(500)).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });

    describe('editOrderPriority', () => {
        it('deve atualizar a prioridade dos jobs com sucesso', () => {
            request.body = {
                startRowInfo: { id: 1, priorityWork: 2 },
                endRowInfo: { id: 2, priorityWork: 1 }
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(null, { affectedRows: 1 });
                })
            });

            jobsHandlers.editOrderPriority(request, response);

            expect(response.sendStatus.calledWith(200)).to.be.true;
        });

        it('deve retornar erro ao atualizar a prioridade dos jobs', () => {
            request.body = {
                startRowInfo: { id: 1, priorityWork: 2 },
                endRowInfo: { id: 2, priorityWork: 1 }
            };

            connectionStub.returns({
                connect: sinon.stub(),
                query: sinon.stub().callsFake((query, values, callback) => {
                    callback(new Error('Erro de atualização'), null);
                })
            });

            jobsHandlers.editOrderPriority(request, response);

            expect(response.sendStatus.calledWith(500)).to.be.true;
            expect(consoleStub.error.calledOnce).to.be.true;
        });
    });
});
