import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

chai.use(chaiHttp);
chai.should();

describe('Publishers', () => {
  describe('GET', () => {
    it('Should get all publishers', (done) => {
      chai
        .request(app)
        .get('/publishers')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('Should get a single publisher', (done) => {
      const id: number = 1;
      chai
        .request(app)
        .get(`/publishers/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('Should error not found if publisher not found in database', (done) => {
      const id: number = 10;
      chai
        .request(app)
        .get(`/publishers/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('POST', () => {
    it('Should craete a new publisher', (done) => {
      chai
        .request(app)
        .post('/publishers')
        .send({
          name: 'new publisher',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
    it('Should error bad request when name is empty', (done) => {
      chai
        .request(app)
        .post('/publishers')
        .send({
          name: '',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('PUT', () => {
    it('Should update a publisher', (done) => {
      const id: number = 6;
      chai
        .request(app)
        .put(`/publishers/${id}`)
        .send({
          name: 'Updated publisher',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('Should error bad request when name is empty', (done) => {
      const id: number = 6;
      chai
        .request(app)
        .put(`/publishers/${id}`)
        .send({
          name: '',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
    it('Should error not found if publisher not found in database', (done) => {
      const id: number = 10;
      chai
        .request(app)
        .put(`/publishers/${id}`)
        .send({
          name: 'Test publisher not found',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('DELETE', () => {
    it('Should delete publisher', (done) => {
      const id: number = 6;
      chai
        .request(app)
        .delete(`/publishers/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('Should error not found if publisher not found in database', (done) => {
      const id: number = 6;
      chai
        .request(app)
        .delete(`/publishers/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
