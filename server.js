const net = require('net');
const fs = require('fs');

const server = net.createServer();

const PORT = 3000;

server.on('connection', (conn) => {
	console.log('New client connected');

	conn.setEncoding('utf8');

	//request data
	conn.write('Request a file:  ');

	//logging the incoming message from client
	conn.on('data', (data) => {
		conn.setEncoding('utf8');

		//get data
		const requestedFileName = `./data/${data}`;

		//check if data exists in directory??
		//read the data then write to client
		const readStream = fs.createReadStream(requestedFileName.trim(), 'utf8');

		readStream.on('data', (data) => {
			conn.write(data);
		});
	});
});

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
