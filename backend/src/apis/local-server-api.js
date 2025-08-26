import { createServer } from 'http';
import app from '../app';

const port = 8000;
const server = createServer(app);

server.listen(port);

export default server;