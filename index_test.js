const public_address = 'af7560c61fc7d3d4404e8403b7b9194d62d7be2e'.toLowerCase();
const pk = '3334057ece90ab38e401718737636c4ebb8c623f82382c6aa53c309bf0d6ec62';

const ethers = require('ethers')
let w = new ethers.Wallet(pk)

try {
	w = new ethers.Wallet(pk)
	console.log(w)
	w_address = w.signingKey.address
	console.log("address =", w_address)
}
catch (e) {
	console.log('Invalid private key.')
}



// -----------------------------------------------------------
const ethereumjsWallet = require('ethereumjs-wallet')
var r

var pk_buf = Buffer.from(pk, 'hex');
console.log({pk_buf})
r = ethereumjsWallet.fromPrivateKey(pk_buf)
console.log("result = ", r)
console.log("result = ", r.getAddress().toString('hex'))
console.log("result = ", r.getPrivateKey().toString('hex'))

// -----------------------------------------------------------

const start = Date.now();
var result
const public_address_buf = Buffer.from(public_address, 'hex');

console.log("public_address_buf :", public_address_buf)

for (let x = 0; x < 256; x++) {
	pk_buf[0] = x;

	for (let y = 0; y < 256; y++) {
		pk_buf[1] = y;

			r = ethereumjsWallet.fromPrivateKey(pk_buf)
			// w_address = r.getAddress().toString('hex')
			// if (w_address == public_address) {
			if (public_address_buf.compare(r.getAddress()) == 0) {
				console.log("found matching addess")
				console.log("public address :", w_address)
				console.log("Public Key     :", r.getPublicKey().toString('hex'))
				console.log("private key    :", r.getPrivateKey().toString('hex'))
				// exit
			}

	}
}

console.log("processing time =", (Date.now() - start)/1000, "sec")
