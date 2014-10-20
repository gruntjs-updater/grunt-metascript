
var assert = require('assert');
var fs = require('fs');
var grunt = require('grunt');

suite('grunt-metascript', function() {
  suite('generating', function() {
    test('program mode', function() {
      assert.ok(fs.existsSync('out/somemeta-program.js'));
      assert.equal(fs.readFileSync('out/somemeta-program.js', 'utf8'), fs.readFileSync('test/fixtures/somemeta-program.js', 'utf8'));
    });

    test('transform mode', function() {
      assert.ok(fs.existsSync('out/somemeta-transform.js'));
      assert.equal(fs.readFileSync('out/somemeta-transform.js', 'utf8'), fs.readFileSync('test/fixtures/somemeta-transform.js', 'utf8'));
    });

    test('multiple files: exclude program', function() {
      assert.ok(!fs.existsSync('out/multi/somemeta-program.js'));
    });

    test('multiple files transformation', function() {
      grunt.file.recurse('out/multi/', function(abspath, rootdir, subdir, filename) {
        assert.equal(fs.readFileSync(abspath, 'utf8'), fs.readFileSync('test/fixtures/multi/' + (subdir?subdir+'/':'') + filename, 'utf8'));
      });
    });
  });
});