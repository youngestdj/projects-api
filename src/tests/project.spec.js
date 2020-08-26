import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { validProject, invalidUserId, validTask } from './helpers';

chai.use(chaiHttp);
const { expect } = chai;

describe('Make a request to create project with valid details', () => {
  it('returns a success message.', (done) => {
    chai
      .request(app)
      .post('/API/projects')
      .send(validProject)
      .end((err, res) => {
        const {
          status,
          body: {
            message,
            project: { id, body, name, userId },
          },
        } = res;
        expect(status).to.be.equal(201);
        expect(id).to.be.equal(1);
        expect(message).to.be.equal('Project added successfully.');
        expect(res.body.project.status).to.be.equal('active');
        expect(name).to.be.equal('Sample project');
        expect(body).to.be.equal('Sample project description');
        expect(userId).to.be.equal(1);
        done(err);
      });
  });
});

describe('Make a request to create project with empty fields', () => {
  it('returns an array of errors.', (done) => {
    chai
      .request(app)
      .post('/API/projects')
      .end((err, res) => {
        const {
          status,
          body: { errors },
        } = res;
        expect(status).to.be.equal(422);
        expect(errors).to.be.an('Array');
        expect(errors[0]).to.be.equal('Project should have a body text.');
        expect(errors[1]).to.be.equal(
          'Name must be at least 2 characters long.'
        );
        expect(errors[2]).to.be.equal('Name must be alphanumeric characters.');
        expect(errors[3]).to.be.equal('Please enter a userId.');
        expect(errors[4]).to.be.equal('userId should be an integer.');
        expect(errors[5]).to.be.equal('Project should have a status.');
        expect(errors[6]).to.be.equal(
          'Status should either be active, inactive, declined or completed'
        );
        done(err);
      });
  });
});

describe('Make a request to create project with invalid userid', () => {
  it('returns an array of errors.', (done) => {
    chai
      .request(app)
      .post('/API/projects')
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

describe('Make a request to get a lists of projects with no parameters', () => {
  it('returns an array of projects.', (done) => {
    chai
      .request(app)
      .get('/API/projects')
      .end((err, res) => {
        const {
          status,
          body: {
            projects: { count, rows },
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
describe('Make a request to get a lists of projects with parameters', () => {
  it('returns an array of projects.', (done) => {
    chai
      .request(app)
      .get(
        '/API/projects?name=Sample project&status=active&assignerName=valid&assignerSurname=surname&assigneeName=valid&assigneeSurname=surname&assigneeId=1&taskScore=4&body=Sample project description'
      )
      .end((err, res) => {
        const {
          status,
          body: {
            projects: { count, rows },
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
