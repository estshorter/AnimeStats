fetch("https://estshorter.github.io/AnimeStats/data/animes.json")
    .then(response => {
        return response.json().then(animes => {
            // assume animes is sorted in descending order
            const table = createAnimeHistoryTable(animes.years);
            let yearResultString = ""
            // const years = Object.keys(animes.years);
            // years.reverse()
            // for (const year of years) {
            //     sumByYear = animes.years[year].num
            //     sumByYearWatchedAll = animes.years[year].numWatchedToLast
            //     yearResultString += `${year}: ${sumByYearWatchedAll}/${sumByYear}<br>`
            // }
            const hitrateAll = (animes.numWatchedToLast / animes.num * 100).toFixed(1)
            yearResultString += `全期間完走率: ${animes.numWatchedToLast}/${animes.num} = ${hitrateAll}%`
            document.getElementById("report").innerHTML = `<p>${yearResultString}</p>${table}`;
            drawAnimeHistory(animes.years);
            drawHitRate(animes.years);
        });
    });

function createAnimeHistoryTable(animesJson) {
    let html = "<table><tr><th>タイトル</th></tr>";
    const years = Object.keys(animesJson);
    years.reverse()
    for (const year of years) {
        const animesYear = animesJson[year]
        const cours = Object.keys(animesYear.cours);
        cours.reverse()
        for (const cour of cours) {
            let showYearCour = true
            for (const anime of animesYear.cours[cour].animes) {
                if (showYearCour) {
                    html += `<th>${anime.year}.${anime.cour}</th>`
                    showYearCour = false
                }
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
            text: "アニメ視聴数"
        },
        xAxis: {
            categories: courName
        },
        yAxis: {
            title: {
                text: 'アニメ数 [-]'
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
            }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 600
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

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
                text: 'アニメ数 [-]'
            }
        },
        {
            title: {
                text: '完走率 [%]'
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
        ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 600
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });

}
