import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

chai.use(chaiHttp);
chai.should();

describe('Games', () => {
  let gameId: number;
  describe('GET', () => {
    it('Should get all games', (done) => {
      chai
        .request(app)
        .get('/games')
        .end((err, res) => {
          res.body.data.length.should.equal(3);
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('Should get a single game', (done) => {
      const id: number = 4;
      chai
        .request(app)
        .get(`/games/${id}`)
        .end((err, res) => {
          res.body.data.id.should.equal(id);
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('Should error not found if game not found in database', (done) => {
      const id: number = 0;
      chai
        .request(app)
        .get(`/games/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('POST', () => {
    it('Should craete a new game', (done) => {
      chai
        .request(app)
        .post('/games')
        .field('title', 'new game')
        .field('publisherId', 3)
        .attach('image', './tests/wismilak.jpg', 'wismilak.jpg')
        .end((err, res) => {
          gameId = res.body.data.id;
          res.body.data.title.should.equal('new game');
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
    it('Should error bad request when title is empty', (done) => {
      chai
        .request(app)
        .post('/games')
        .field('title', '')
        .field('publisherId', 3)
        .attach('image', './tests/wismilak.jpg', 'wismilak.jpg')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('PUT', () => {
    it('Should update a selected game', (done) => {
      chai
        .request(app)
        .put(`/games/${gameId}`)
        .field('title', 'updated game')
        .field('publisherId', 3)
        .attach('image', './tests/wismilak.jpg', 'wismilak.jpg')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.title.should.equal('updated game');
          res.body.should.be.a('object');
          done();
        });
    });

    it('Should error not found if selected game not found in database', (done) => {
      const id: number = 0;
      chai
        .request(app)
        .put(`/games/${id}`)
        .field('title', 'test game not found')
        .field('publisherId', 3)
        .attach('image', './tests/wismilak.jpg', 'wismilak.jpg')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('DELETE', () => {
    it('Should delete selected game', (done) => {
      chai
        .request(app)
        .delete(`/games/${gameId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('Should error not found if publisher not found in database', (done) => {
      chai
        .request(app)
        .delete(`/publishers/${gameId}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
