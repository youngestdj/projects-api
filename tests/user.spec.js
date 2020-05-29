import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { validUser } from './helpers';

chai.use(chaiHttp);
const { expect } = chai;

describe('Make a request to an unidentified route', () => {
  it('returns 404 error', (done) => {
    chai
      .request(app)
      .get('/wrong-url')
      .end((err, res) => {
        const {
          status,
          body: { error },
        } = res;
        expect(status).to.be.equal(404);
        expect(error).to.be.equal('Page not found.');
        done(err);
      });
  });
});

describe('Make a request to signup with valid details', () => {
  it('returns a success message.', (done) => {
    chai
      .request(app)
      .post('/API/users')
      .send(validUser)
      .end((err, res) => {
        const {
          status,
          body: {
            message,
            user: { id, email, name, surname },
          },
        } = res;
        expect(status).to.be.equal(201);
        expect(id).to.be.equal(1);
        expect(message).to.be.equal('You have signed up successfully.');
        expect(email).to.be.equal('validemail@test.com');
        expect(name).to.be.equal('valid');
        expect(surname).to.be.equal('surname');
        done(err);
      });
  });
});

describe('Make a request to signup with empty signup fields', () => {
  it('returns an array of errors.', (done) => {
    chai
      .request(app)
      .post('/API/users')
      .end((err, res) => {
        const {
          status,
          body: { errors },
        } = res;
        expect(status).to.be.equal(422);
        expect(errors).to.be.an('Array');
        expect(errors[0]).to.be.equal('Please enter a valid email address.');
        expect(errors[1]).to.be.equal(
          'Name must be at least 2 characters long.'
        );
        expect(errors[2]).to.be.equal('Name must be alphanumeric characters.');
        expect(errors[3]).to.be.equal(
          'Surname must be at least 2 characters long.'
        );
        expect(errors[4]).to.be.equal(
          'Surname must be alphanumeric characters.'
        );
        done(err);
      });
  });
});

describe('Make a request to signup with existing email', () => {
  it('returns an error.', (done) => {
    chai
      .request(app)
      .post('/API/users')
      .send(validUser)
      .end((err, res) => {
        const {
          status,
          body: { errors },
        } = res;
        expect(status).to.be.equal(409);
        expect(errors).to.be.an('Array');
        expect(errors[0]).to.be.equal('Email already exists');
        done(err);
      });
  });
});

describe('Make a request to get all users', () => {
  it('returns all users', (done) => {
    chai
      .request(app)
      .get('/API/users')
      .end((err, res) => {
        const {
          status,
          body: {
            users: { count, rows },
          },
        } = res;
        expect(status).to.be.equal(200);
        expect(count).to.be.equal(1);
        expect(rows[0].id).to.be.equal(1);
        expect(rows[0].email).to.be.equal('validemail@test.com');
        expect(rows[0].name).to.be.equal('valid');
        expect(rows[0].surname).to.be.equal('surname');
        done(err);
      });
  });
});
describe('Make a request to get all users with name and surname parameters', () => {
  it('returns all users', (done) => {
    chai
      .request(app)
      .get('/API/users?name=valid&surname=surname')
      .end((err, res) => {
        const {
          status,
          body: {
            users: { count, rows },
          },
        } = res;
        expect(status).to.be.equal(200);
        expect(count).to.be.equal(1);
        expect(rows[0].id).to.be.equal(1);
        expect(rows[0].email).to.be.equal('validemail@test.com');
        expect(rows[0].name).to.be.equal('valid');
        expect(rows[0].surname).to.be.equal('surname');
        done(err);
      });
  });
});
