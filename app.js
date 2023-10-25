const express = require('express');
const app = express();
const path = require('path');

// Указываем Express обслуживать статические файлы из текущей директории
app.use(express.static(__dirname));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
