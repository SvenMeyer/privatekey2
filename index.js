// https://ethereum.stackexchange.com/questions/1771/how-to-validate-a-private-key


const private_key = '3334057ece90ab38e401718737636c4ebb8c623f82382c6aa53c309bf0d6ec62';
var pk            = '3334057ece90ab38e401718737636c4ebb8c623f82382c6aa53c309bf0';
var public_address = 'af7560c61fc7d3d4404e8403b7b9194d62d7be2e'.toLowerCase();

if (process.argv.length == 4) {
	public_address = process.argv[2].toLowerCase();
	pk = process.argv[3];
}
pk = pk.padEnd(64,'0');

console.log("public_address :", public_address)
console.log("private_key    :", pk)

const secp256k1 = require('secp256k1')
const ethereumjsWallet = require('ethereumjs-wallet')
var r
var pk_buf = Buffer.from(pk, 'hex');

const start = Date.now();

const public_address_buf = Buffer.from(public_address, 'hex');

console.log("public_address_buf :", public_address_buf)

var n=0;
for (let x = 255; x >= 0; x--) {
	pk_buf[29] = x;
	console.log(x , pk_buf)

	for (let y = 255; y >= 0; y--) {
		pk_buf[30] = y;

		for (let z = 255; z >= 0; z--) {
			pk_buf[31] = z;

			r = ethereumjsWallet.fromPrivateKey(pk_buf)
			n++;

			if (public_address_buf.compare(r.getAddress()) == 0) {
				console.log("found matching addess")
				console.log("public address :", r.getAddress().toString('hex'))
				// console.log("Public Key     :", r.getPublicKey().toString('hex'))
				console.log("private key    :", r.getPrivateKey().toString('hex'))
				console.log(n , " combinations tested");
				x = -1;
				y = -1;
				z = -1;
			}
		}
	}
}

console.log("processing time =", (Date.now() - start)/1000, "sec")
