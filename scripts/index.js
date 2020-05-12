render();

async function render() {
    const response = await fetch("https://estshorter.github.io/AnimeStats/data/animes.json")
    const animes = await response.json();
    // assume animes is sorted in descending order
    const table = createAnimeHistoryTable(animes.years);
    const hitrateAll = (animes.numWatchedToLast / animes.num * 100).toFixed(1);
    const yearResultString = `全期間完走率: ${animes.numWatchedToLast}/${animes.num} = ${hitrateAll}%`;
    document.getElementById("report").innerHTML = `<p>${yearResultString}</p>${table}`;
    Highcharts.setOptions({
        plotOptions: {
            series: {
                animation: false
            },
            sma: {
                showInLegend: true
            }
        }
    });
    drawAnimeHistory(animes.years);
    drawHitRate(animes.years);
}

function createAnimeHistoryTable(animesJson) {
    let html = "<table>";
    const yearsDes = Object.keys(animesJson).reverse();
    for (const year of yearsDes) {
        const animesYear = animesJson[year]
        const coursDes = Object.keys(animesYear.cours).reverse();
        for (const cour of coursDes) {
            html += `<th>${year}.${cour}</th>`
            for (const anime of animesYear.cours[cour].animes) {
                if (anime.watchedToLast) {
                    html += "<tr><td>";
                } else {
                    html += '<tr id ="notWatchedAll"><td>';
                }
                html += `${anime.title}</td></tr>`;
            }
        }
    }
    html += "</table>"
    return html;
}

function drawAnimeHistory(animesJson) {
    const sumByCourArray = [];
    const sumByCourWatchedAllArray = [];
    const courName = [];
    for (const year of Object.keys(animesJson)) {
        const animesYear = animesJson[year]
        for (const cour of Object.keys(animesYear.cours)) {
            sumByCourArray.push(animesYear.cours[cour].num);
            sumByCourWatchedAllArray.push(animesYear.cours[cour].numWatchedToLast);
            courName.push(`${year}.${cour}`);
        }
    }

    // グラフオプションを指定
    Highcharts.chart('animeHistory', {
        title: {
            text: "Anime History"
        },
        xAxis: {
            categories: courName
        },
        yAxis: {
            title: {
                text: 'Number of Anime [-]'
            }
        },
        tooltip: {
            shared: true
        },
        credits: {
            enabled: false
        },
        // データ系列を作成
        series: [
            { name: "視聴", data: sumByCourArray, id: 'watched' },
            { name: "完走", data: sumByCourWatchedAllArray, id: 'watchedToLast' },
            {
                name: "視聴(移動平均)", linkedTo: 'watched', type: 'sma', params: {
                    period: 4
                }, marker: {
                    enabled: false
                }, tooltip: { valueDecimals: 2 }
            },
            {
                name: "完走(移動平均)", linkedTo: 'watchedToLast', type: 'sma', params: {
                    period: 4
                }, marker: {
                    enabled: false
                }, tooltip: { valueDecimals: 2 }
            }]
    });
}
function drawHitRate(animesJson) {
    const hitRate = [];
    const sumByYearArray = [];
    const sumByYearWatchedAllArray = [];
    const yearName = [];
    for (const year of Object.keys(animesJson)) {
        const animesYear = animesJson[year]
        hitRate.push(animesYear.numWatchedToLast / animesYear.num * 100);
        sumByYearArray.push(animesYear.num);
        sumByYearWatchedAllArray.push(animesYear.numWatchedToLast);
        yearName.push(year);
    }

    // グラフオプションを指定
    Highcharts.chart('hitrate', {
        title: {
            text: "Annual Statistics"
        },
        xAxis: {
            categories: yearName
        },
        yAxis: [{
            title: {
                text: 'Number of Anime [-]'
            }
        },
        {
            title: {
                text: 'Completion rate [%]'
            },
            opposite: true,
        }],
        tooltip: {
            shared: true
        },
        credits: {
            enabled: false
        },
        // データ系列を作成
        series: [
            { name: "視聴", data: sumByYearArray },
            { name: "完走", data: sumByYearWatchedAllArray },
            { name: "完走率", data: hitRate, yAxis: 1, tooltip: { valueSuffix: ' %', valueDecimals: 1 } }
        ]
    });

}
