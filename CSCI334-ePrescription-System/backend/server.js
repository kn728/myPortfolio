const {generate, generateSamplePatient} = require('./generateSampleData');
const Server = require('./server/Server')

const server = new Server();
server.listen();
//generate()
//generateSamplePatient();