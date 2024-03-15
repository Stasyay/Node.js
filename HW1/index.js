const http = require('http')

let mainCounter = 0
let aboutCounter = 0

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        mainCounter++
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
        res.end(`
        <h1>Добро пожаловать на мой сайт!</h1>
        <a href="/about">Обо мне</a>
        <p>Просмотров: ${mainCounter}</p>
        `)
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
        aboutCounter++
        res.end(
            `<h1>Обо мне</h1>
            <a href="/">Главная</a>
            <p>Просмотров: ${aboutCounter}`)
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' })
        res.end('<h1>404 Страница не найдена!</h1>')
    }
});

const port = 3000
server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
});