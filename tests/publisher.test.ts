import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

chai.use(chaiHttp);
chai.should();

describe('Publishers', () => {
  let publisherId: number;
  describe('GET', () => {
    it('Should get all publishers', (done) => {
      chai
        .request(app)
        .get('/publishers')
        .end((err, res) => {
          res.body.data.length.should.equal(3);
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
          res.body.data.id.should.equal(id);
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('Should error not found if publisher not found in database', (done) => {
      const id: number = 0;
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
          publisherId = res.body.data.id;
          res.body.data.name.should.equal('new publisher');
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
      chai
        .request(app)
        .put(`/publishers/${publisherId}`)
        .send({
          name: 'Updated publisher',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.name.should.equal('Updated publisher');
          res.body.should.be.a('object');
          done();
        });
    });
    it('Should error bad request when name is empty', (done) => {
      chai
        .request(app)
        .put(`/publishers/${publisherId}`)
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
      const id: number = 0;
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
      chai
        .request(app)
        .delete(`/publishers/${publisherId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('Should error not found if publisher not found in database', (done) => {
      chai
        .request(app)
        .delete(`/publishers/${publisherId}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
