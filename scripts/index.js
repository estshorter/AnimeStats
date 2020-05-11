class MapCounter extends Map {
    get(key) {
        if (!this.has(key)) return 0;
        return super.get(key);
    }

    increment(key) {
        super.set(key, this.get(key) + 1);
    }
    constructor(entries) {
        super(entries);
    }
}

fetch("https://estshorter.github.io/AnimeStats/data/animes.json")
    .then(response => {
        return response.json().then(animes => {
            const animeStats = jsonParser(animes.sort(compareYearCourDec));
            let yearResultString = ""
            for (const year of animeStats.sumByYear.keys()) {
                yearResultString += getYearResultString(animeStats, year)
            }
            const hitrateAll = (animeStats.sumWatchedAll / animeStats.sum * 100).toFixed(1)
            yearResultString += `All : ${animeStats.sumWatchedAll}/${animeStats.sum}, ${hitrateAll}%`
            document.getElementById("annualReport").innerHTML = `<p>${yearResultString}</p>${animeStats.message}`;
            draw(animeStats.sumByCour, animeStats.sumByCourWatchedAll);
            drawHitRate(animeStats.sumByYear, animeStats.sumByYearWatchedAll);
        });
    });

function compareYearCourDec(a, b) {
    let r = 0;
    if (a.year > b.year) { r = -1; }
    else if (a.year < b.year) { r = 1; }
    else {
        r = compareCourDec(a, b)
    }

    return r;
}

function compareCourDec(a, b) {
    let r = 0;
    if (a.cour > b.cour) { r = -1; }
    else if (a.cour < b.cour) { r = 1; }
    return r;
}

function getYearResultString(data, year) {
    return `${year}: ${data.sumByYearWatchedAll.get(year)}/${data.sumByYear.get(year)}<br>`
}

function jsonParser(animes) {
    let message = "<table><tr><th>タイトル</th><th>最後まで見たか</th></tr>";
    let sumByYear = new MapCounter();
    let sumByYearWatchedAll = new MapCounter();
    let sumByCour = new MapCounter();
    let sumByCourWatchedAll = new MapCounter();
    const sum = animes.length;
    let sumWatchedAll = 0;
    for (anime of animes) {
        const yearCour = `${anime.year}.${anime.cour}`
        const year = anime.year
        if (!sumByCour.has(yearCour)) {
            message += `<th colspan="3">${yearCour}</th>`
        }
        sumByYear.increment(year)
        if (anime.watchedToLast) {
            message += "<tr><td>";
        } else {
            message += "<tr id = \"notWatchedAll\"><td>";
        }
        message += anime.title;
        message += "</td><td>"
        message += anime.watchedToLast;
        message += "</td></tr>"

        sumByCour.increment(yearCour)

        if (anime.watchedToLast) {
            sumWatchedAll++
            sumByYearWatchedAll.increment(year)
            sumByCourWatchedAll.increment(yearCour)
        }
    }
    message += "</table>"

    const ret = { message, sum, sumWatchedAll, sumByYear, sumByYearWatchedAll, sumByCour, sumByCourWatchedAll }
    return ret;
}

function draw(sumByCour, sumByCourWatchedAll) {
    let sumByCourArray = [];
    let sumByCourWatchedAllArray = [];
    let courName = [];
    const sumByCourAsc = new Map([...sumByCour.entries()].sort());
    for (const courYear of sumByCourAsc.keys()) {
        sumByCourArray.push(sumByCour.get(courYear));
        sumByCourWatchedAllArray.push(sumByCourWatchedAll.get(courYear));
        courName.push(courYear);
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
                }
            },
            {
                name: "完走(移動平均)", linkedTo: 'watchedToLast', type: 'sma', params: {
                    period: 4
                }, marker: {
                    enabled: false
                }
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
function drawHitRate(sumByYear, sumByYearWatchedAll) {
    let hitRate = [];
    let sumByYearArray = [];
    let sumByYearWatchedAllArray = [];
    let yearName = [];
    const sumByYearAsc = new Map([...sumByYear.entries()].sort());
    for (const year of sumByYearAsc.keys()) {
        hitRate.push(Math.round(sumByYearWatchedAll.get(year) / sumByYear.get(year) * 100 * 10) / 10);
        sumByYearArray.push(sumByYear.get(year));
        sumByYearWatchedAllArray.push(sumByYearWatchedAll.get(year));
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
            { name: "完走率", data: hitRate, yAxis: 1, tooltip: { valueSuffix: ' %' } }
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
