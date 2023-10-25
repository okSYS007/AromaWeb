function calculatePrices() {
    // Получаем значения из полей ввода
    const totalPrice = parseFloat(document.getElementById('totalPrice').value);
    const totalVolume = parseFloat(document.getElementById('totalVolume').value);
    const additionalExpenses = parseFloat(document.getElementById('additionalExpenses').value);
    const markup = parseFloat(document.getElementById('markup').value);

    // Проверяем, что все значения введены корректно
    if (!isNaN(totalPrice) && !isNaN(totalVolume) && !isNaN(additionalExpenses) && !isNaN(markup)) {
        // Задаем цены для флаконов разных размеров
        const bottlePrices = {
            3: 6.6,
            5: 6.78,
            10: 10.45,
            20: 29.7
        };

        // Вычисляем цену за 1 мл
        const pricePerML = totalPrice / totalVolume;

        // Вычисляем цену для каждого флакона с учетом дополнительных расходов
        const results = {};
        const profits = {};
        for (const size in bottlePrices) {
            if (bottlePrices.hasOwnProperty(size)) {
                results[size] = pricePerML * size + bottlePrices[size] + additionalExpenses;
                profits[size] = results[size] * totalVolume / size - totalPrice;
            }
        }

        // Отображаем результат на странице без наценки
        displayResults(results, profits, 'price-', 'profit-');

        // Вычисляем цену за 1 мл
        let PriceWithMarkup = pricePerML + additionalExpenses;
        const pricePerMLmarkup = PriceWithMarkup + ((PriceWithMarkup * markup) / 100)
        
        // Вычисляем цену для каждого флакона с учетом наценки
        const markedUpResults = {};
        const markedUpProfits = {};
        for (const size in bottlePrices) {
            if (bottlePrices.hasOwnProperty(size)) {
                markedUpResults[size] = pricePerMLmarkup * size + bottlePrices[size];
                markedUpProfits[size] = markedUpResults[size] * totalVolume / size - totalPrice;
            }
        }

        // Отображаем результат на странице с наценкой
        displayResults(markedUpResults, markedUpProfits, 'price-marked-up-', 'profit-marked-up-');
    } else {
        // Если введены некорректные данные, выводим сообщение об ошибке
        alert('Пожалуйста, введите корректные числовые значения.');
        // Очищаем результат
        displayResults({}, {}, 'price-', 'profit-');
        displayResults({}, {}, 'price-marked-up-', 'profit-marked-up-');
    }
}

function displayResults(results, profits, pricePrefix, profitPrefix) {
    for (const size in results) {
        if (results.hasOwnProperty(size)) {
            document.getElementById(`${pricePrefix}${size}-ml`).textContent = results[size].toFixed(2) + ' грн';
            document.getElementById(`${profitPrefix}${size}-ml`).textContent = profits[size].toFixed(2) + ' грн';
        }
    }
}
