'use strict';
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const S3_BUCKET = process.env.AWS_S3_BUCKET;
const S3_POLICY_ACL = 'public-read';
const S3_POLICY_LENGTH = 5000000; // TODO how much is this?
const S3_POLICY_EXPIRATION_SECONDS = 60000; // TODO is it really seconds?

var policy = require('s3-policy');
var uuid = require('node-uuid');
var q = require('q');

class S3UploadPolicy {
  getRandomFilename(type) {
    return uuid.v4() + type.split('/')[1];
  }

  getSignedPolicy(filename) {
    return policy({
      acl: S3_POLICY_ACL,
      secret: AWS_SECRET_KEY,
      length: S3_POLICY_LENGTH,
      bucket: S3_BUCKET,
      key: filename,
      expires: new Date(Date.now() + S3_POLICY_EXPIRATION_SECONDS),
    });
  }

  getUploadPolicy(Policy,key) {
    return {
      AWSAccessKeyId: AWS_ACCESS_KEY,
      key: key,
      policy: Policy.policy,
      signature: Policy.signature
    };
  }

  generate(args) {
    // That awkward moment when you would love to have strong types
    ['name','size','type'].forEach(function(key) {
      if (!args[key]) {
        return q.reject(new Error('The `' + key + '` argument is required'));
      }
    });
    console.log('generating with ',args);
    let file = this.getRandomFilename(args.type);
    let policy = this.getSignedPolicy(file);
    let uploadPolicy = this.getUploadPolicy(policy,file);
    console.log(file,policy,uploadPolicy);
    return q.resolve(uploadPolicy);
  }
}

module.exports = S3UploadPolicy;
