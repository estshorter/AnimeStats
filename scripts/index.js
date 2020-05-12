render();

async function render() {
    const response = await fetch("https://estshorter.github.io/AnimeStats/data/animes.json")
    const animes = await response.json();
    // assume animes is sorted in descending order
    const tableHTML = createAnimeHistoryTable(animes.years);
    const hitrateAll = (animes.numCompleted / animes.num * 100).toFixed(1);
    document.getElementById("reportHitrate").innerHTML =
        `全期間完走率: ${animes.numCompleted}/${animes.num} = ${hitrateAll}%`
    document.getElementById("reportTable").innerHTML = tableHTML

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
    let tableHTML = "";
    for (const animesYear of Object.values(animesJson).reverse()) {
        for (const animesCour of Object.values(animesYear.cours).reverse()) {
            tableHTML += `<th>${animesYear.year}.${animesCour.cour}</th>`
            for (const anime of animesCour.animes) {
                if (anime.completed) {
                    tableHTML += `<tr><td>${anime.title}</td></tr>`;
                } else {
                    tableHTML += `<tr id ="notCompleted"><td>${anime.title}</td></tr>`;
                }
            }
        }
    }
    return tableHTML;
}

function drawAnimeHistory(animesJson) {
    const sumByCourArray = [];
    const sumByCourCompletedArray = [];
    const courName = [];
    for (const animesYear of Object.values(animesJson)) {
        for (const animesCour of Object.values(animesYear.cours)) {
            sumByCourArray.push(animesCour.num);
            sumByCourCompletedArray.push(animesCour.numCompleted);
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
            { name: "完走", data: sumByCourCompletedArray, id: 'completed' },
            {
                name: "視聴(移動平均)", linkedTo: 'watched', type: 'sma',
                params: {
                    period: 4
                },
                marker: {
                    enabled: false
                },
                tooltip: {
                    valueDecimals: 2
                }
            },
            {
                name: "完走(移動平均)", linkedTo: 'completed', type: 'sma',
                params: {
                    period: 4
                },
                marker: {
                    enabled: false
                },
                tooltip: {
                    valueDecimals: 2
                }
            }]
    });
}
function drawHitRate(animesJson) {
    const hitRate = [];
    const sumByYearArray = [];
    const sumByYearCompletedArray = [];
    for (const animesYear of Object.values(animesJson)) {
        hitRate.push(animesYear.numCompleted / animesYear.num * 100);
        sumByYearArray.push(animesYear.num);
        sumByYearCompletedArray.push(animesYear.numCompleted);
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
            { name: "完走", data: sumByYearCompletedArray },
            {
                name: "完走率", data: hitRate, yAxis: 1,
                tooltip: {
                    valueSuffix: ' %',
                    valueDecimals: 1
                }
            }
        ]
    });

}
