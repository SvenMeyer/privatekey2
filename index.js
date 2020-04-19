const public_address = 'af7560c61fc7d3d4404e8403b7b9194d62d7be2e'.toLowerCase();
const private_key = '3334057ece90ab38e401718737636c4ebb8c623f82382c6aa53c309bf0d6ec62';
const pk          = '0000007ece90ab38e401718737636c4ebb8c623f82382c6aa53c309bf0d6ec62';

if (process.argv.length == 4) {
	console.log("parameter 1 :", process.argv[2])
	console.log("parameter 2 :", process.argv[3])
}

const ethereumjsWallet = require('ethereumjs-wallet')
var r
var pk_buf = Buffer.from(pk, 'hex');

const start = Date.now();

const public_address_buf = Buffer.from(public_address, 'hex');

console.log("public_address_buf :", public_address_buf)


for (let x = 50; x < 256; x++) {
	pk_buf[0] = x;
	console.log("x =", x)

	for (let y = 0; y < 256; y++) {
		pk_buf[1] = y;

		for (let z = 0; z < 256; z++) {
			pk_buf[2] = z;

			r = ethereumjsWallet.fromPrivateKey(pk_buf)
			// w_address = r.getAddress().toString('hex')
			// if (w_address == public_address) {
			if (public_address_buf.compare(r.getAddress()) == 0) {
				console.log("found matching addess")
				console.log("public address :", r.getAddress().toString('hex'))
				// console.log("Public Key     :", r.getPublicKey().toString('hex'))
				console.log("private key    :", r.getPrivateKey().toString('hex'))
				console.log(x * y * z , " combinations tested");
				x = 256;
				y = 256;
				z = 256;
			}
		}
	}
}

console.log("processing time =", (Date.now() - start)/1000, "sec")
