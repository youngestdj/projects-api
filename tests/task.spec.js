import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { validTask, invalidUserId, invalidProjectId } from './helpers';

chai.use(chaiHttp);
const { expect } = chai;

describe('Make a request to create task with valid details', () => {
  it('returns a success message.', (done) => {
    chai
      .request(app)
      .post('/API/tasks')
      .send(validTask)
      .end((err, res) => {
        const {
          status,
          body: {
            message,
            task: { id, description, name, userId, projectId, score },
          },
        } = res;
        expect(status).to.be.equal(201);
        expect(id).to.be.equal(1);
        expect(message).to.be.equal('Task added successfully.');
        expect(res.body.task.status).to.be.equal('declined');
        expect(name).to.be.equal('Sample task');
        expect(score).to.be.equal(4);
        expect(description).to.be.equal('Lorem ipsum stuff');
        expect(userId).to.be.equal(1);
        expect(projectId).to.be.equal(1);
        done(err);
      });
  });
});

describe('Make a request to create task with empty fields', () => {
  it('returns an array of errors.', (done) => {
    chai
      .request(app)
      .post('/API/tasks')
      .end((err, res) => {
        const {
          status,
          body: { errors },
        } = res;
        expect(status).to.be.equal(422);
        expect(errors).to.be.an('Array');
        expect(errors[0]).to.be.equal('Task should have a description text.');
        expect(errors[1]).to.be.equal(
          'Name must be at least 2 characters long.'
        );
        expect(errors[2]).to.be.equal('Name must be alphanumeric characters.');
        expect(errors[3]).to.be.equal('Please enter a userId.');
        expect(errors[4]).to.be.equal('userId should be an integer.');
        expect(errors[5]).to.be.equal('Please enter a project id.');
        expect(errors[6]).to.be.equal('Project id should be an integer.');
        expect(errors[7]).to.be.equal('Please enter a score.');
        expect(errors[8]).to.be.equal('Score should be an integer.');
        expect(errors[9]).to.be.equal('Task should have a status.');
        expect(errors[10]).to.be.equal(
          'Status should either be active, inactive, declined or completed.'
        );
        done(err);
      });
  });
});

describe('Make a request to create task with invalid userid', () => {
  it('returns an array of errors.', (done) => {
    chai
      .request(app)
      .post('/API/tasks')
      .send(invalidUserId)
      .end((err, res) => {
        const {
          status,
          body: { errors },
        } = res;
        expect(status).to.be.equal(404);
        expect(errors).to.be.an('Array');
        expect(errors[0]).to.be.equal('User does not exist.');
        done(err);
      });
  });
});

describe('Make a request to create task with invalid project id', () => {
  it('returns an array of errors.', (done) => {
    chai
      .request(app)
      .post('/API/tasks')
      .send(invalidProjectId)
      .end((err, res) => {
        const {
          status,
          body: { errors },
        } = res;
        expect(status).to.be.equal(404);
        expect(errors).to.be.an('Array');
        expect(errors[0]).to.be.equal('Project does not exist.');
        done(err);
      });
  });
});

describe('Make a request to get a lists of tasks with no parameters', () => {
  it('returns an array of errors.', (done) => {
    chai
      .request(app)
      .get('/API/tasks')
      .end((err, res) => {
        const {
          status,
          body: {
            tasks: { count, rows },
          },
        } = res;
        expect(status).to.be.equal(200);
        expect(count).to.be.equal(1);
        expect(rows).to.be.an('Array');
        expect(rows.length).to.be.equal(1);
        done(err);
      });
  });
});

describe('Make a request to get a lists of tasks with parameters', () => {
  it('returns an array of errors.', (done) => {
    chai
      .request(app)
      .get(
        '/API/tasks?name=Sample task&description=Lorem ipsum stuff&status=active&status=declined&assignerName=valid&assignerSurname=surname&assigneeName=valid&assigneeSurname=surname&assigneeId=1&score=4'
      )
      .end((err, res) => {
        const {
          status,
          body: {
            tasks: { count, rows },
          },
        } = res;
        expect(status).to.be.equal(200);
        expect(count).to.be.equal(1);
        expect(rows).to.be.an('Array');
        expect(rows.length).to.be.equal(1);
        done(err);
      });
  });
});
