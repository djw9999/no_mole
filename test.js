const { Writable } = require('stream');
const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
});

// process.stdin.pipe(outStream);

const { Readable } = require('stream');  

// const inStream = new Readable();

// inStream.push('ABCDEFGHIJKLM');
// inStream.push('NOPQRSTUVWXYZ');

// inStream.push(null); // 没有更多数据了

// inStream.pipe(process.stdout);

const inStream = new Readable({
    read(size) {
      this.push(String.fromCharCode(this.currentCharCode++));
      if (this.currentCharCode > 90) {
        this.push(null);
      }
    }
  });

  Readable.prototype.pipe = function (Writable) {
      console.log(this)
      this.on('data', (chunk) => {
          const res = Writable.write(chunk);
          if(res === false) {
              this.pause();
          }
      });
      Writable.on('drain', () => {
          this.resume();
      });
      this.on('end', () => {
          Writable.end()
      })
  }
  
  inStream.currentCharCode = 65
  
  inStream.pipe(outStream);