document.addEventListener("DOMContentLoaded", function () {
    const detailsLinks = document.querySelectorAll(".details-link");

    detailsLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const details = this.nextElementSibling;

            if (details.style.display === "block") {
                details.style.display = "none";
            } else {
                details.style.display = "block";
            }
        });
    });

    // Функция для загрузки данных с fxmonitor.online
    function fetchData() {
        fetch('https://fxmonitor.online/a/102380664?view=pro')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(data, 'text/html');

                // Получаем доходность
                const profitElement = htmlDocument.querySelector('.row.d-flex.align-items-center.item_summary_hrz span[itemprop="priceChange"]');
                let profit = profitElement ? profitElement.innerText : 'недоступно';

                // Извлекаем только процент прибыли
                profit = profit.match(/[+-]?([0-9]*[.])?[0-9]+%/);
                profit = profit ? profit[0] : 'недоступно';

                // Обновляем данные на странице
                document.getElementById('fund1').querySelector('h3').innerText = 'ESTONIANWHALES';
                document.getElementById('profit1').innerText = `Доходность: ${profit}`;
            })
            .catch(error => console.error('Ошибка загрузки данных:', error));
    }

    // Вызываем функцию для загрузки данных при загрузке страницы и обновляем каждые 10 секунд
    fetchData();
    setInterval(fetchData, 10000);
});
