const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('views/index', { result: null });
});

app.post('/calculate', (req, res) => {
    const volume = parseFloat(req.body.volume);
    const cost = parseFloat(req.body.cost);
    const expenses = parseFloat(req.body.expenses);

    if (!isNaN(volume) && !isNaN(cost) && !isNaN(expenses)) {
        const profit = volume * (cost - expenses);
        res.render('views/index', { result: { profit, cost } });
    } else {
        res.render('views/index', { result: null });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
