const server_URL = process.env.SERVER_URL || 'https://checkers-multiplayer-server.herokuapp.com' || 'http://localhost:3001';
//const server_URL = 'http://localhost:3001';

console.log('Definied api server: ' + server_URL);
console.log(process.env.SERVER_URL);

const config = {
    server_URL
};

export default config;