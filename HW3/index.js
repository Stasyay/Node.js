// Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

// — На каждой странице реализован счетчик просмотров
// — Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
// — Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
// — Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.

const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express()

const pathJson = path.join(__dirname, 'counters.json')

app.get('/', (req, res) => {
    let counterVisit = JSON.parse(fs.readFileSync(pathJson, 'utf-8'))
    counterVisit[0].counter += 1
    fs.writeFileSync(pathJson, JSON.stringify(counterVisit, null, 2))
    res.send(`<h1>Это главная страница</h1> <a href = "/about">about</a> <p>количество просмотров: ${counterVisit[0].counter}</p>`);
})

app.get('/about', (req, res) => {
    let counterVisit = JSON.parse(fs.readFileSync(pathJson, 'utf-8'))
    counterVisit[1].counter += 1
    fs.writeFileSync(pathJson, JSON.stringify(counterVisit, null, 2))
    res.send(`<h1>Обо мне</h1> <a href = "/">main</a> <p>количество просмотров: ${counterVisit[1].counter}</p>`);
})

const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
});
