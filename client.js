const net = require('net');
const fs = require('fs');
const stdin = process.stdin;

const client = net.createConnection({
	host: 'localhost',
	port: 3000,
});

client.setEncoding('utf8');

client.on('connect', () => {
	console.log('Server connected');
});

stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', (data) => {
	client.write(data);
});

client.on('data', (data) => {
	const writeStream = fs.createWriteStream('./data/write.txt', 'utf8');
	writeStream.write(data);
});
