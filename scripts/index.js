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
    let tableHTML = "<table>";
    for (const animesYear of Object.values(animesJson).reverse()) {
        for (const animesCour of Object.values(animesYear.cours).reverse()) {
            tableHTML += `<th>${animesYear.year}.${animesCour.cour}</th>`
            for (const anime of animesCour.animes) {
                if (anime.watchedToLast) {
                    tableHTML += "<tr><td>";
                } else {
                    tableHTML += '<tr id ="notWatchedAll"><td>';
                }
                tableHTML += `${anime.title}</td></tr>`;
            }
        }
    }
    tableHTML += "</table>"
    return tableHTML;
}

function drawAnimeHistory(animesJson) {
    const sumByCourArray = [];
    const sumByCourWatchedAllArray = [];
    const courName = [];
    for (const animesYear of Object.values(animesJson)) {
        for (const animesCour of Object.values(animesYear.cours)) {
            sumByCourArray.push(animesCour.num);
            sumByCourWatchedAllArray.push(animesCour.numWatchedToLast);
            courName.push(`${animesYear.year}.${animesCour.cour}`);
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
    for (const animesYear of Object.values(animesJson)) {
        hitRate.push(animesYear.numWatchedToLast / animesYear.num * 100);
        sumByYearArray.push(animesYear.num);
        sumByYearWatchedAllArray.push(animesYear.numWatchedToLast);
    }
    const yearName = Object.keys(animesJson);

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
