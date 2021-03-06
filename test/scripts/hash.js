'use strict';

const should = require('chai').should(); // eslint-disable-line
const crypto = require('crypto');

function sha1(content) {
  const hash = crypto.createHash('sha1');
  hash.update(content);

  return hash.digest();
}

describe('hash', () => {
  const hash = require('../../lib/hash');

  it('hash', () => {
    const content = '123456';
    hash.hash(content).should.eql(sha1(content));
  });

  it('HashStream', () => {
    const content = '123456';
    const stream = new hash.HashStream();

    stream.write(Buffer.from(content));
    stream.end();

    stream.read().should.eql(sha1(content));
  });

  it('createSha1Hash', function() {
    var _sha1 = hash.createSha1Hash();
    var content = '123456';
    _sha1.update(content);
    _sha1.digest().should.eql(sha1(content));
  });

  it('createSha1Hash - streamMode', function() {
    var content1 = '123456';
    var content2 = '654321';
    var stream = hash.createSha1Hash();
    // explicit convert
    stream.write(Buffer.from(content1));
    // implicit convert
    stream.write(content2);
    stream.end();
    stream.read().should.eql(sha1(content1 + content2));
  });
});
