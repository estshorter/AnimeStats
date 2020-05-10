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

$.getJSON("animes.json", function (animes) {
    const animeStats = jsonParser(animes.sort(compareYearKurDec));
    let yearResultString = ""
    for (const year of animeStats.sumByYear.keys()) {
        yearResultString += getYearResultString(animeStats, year)
    }
    const hitrateAll = (animeStats.sumWatchedAll / animeStats.sum * 100).toFixed(1)
    yearResultString += `All : ${animeStats.sumWatchedAll}/${animeStats.sum}, ${hitrateAll}%`
    $('#sample-result').html(`<p>${yearResultString}</p>${animeStats.message}`);
    draw(animeStats.sumByKur, animeStats.sumByKurWatchedAll);
    drawHitRate(animeStats.sumByYear, animeStats.sumByYearWatchedAll);
});
function compareYearKurDec(a, b) {
    let r = 0;
    if (a.year > b.year) { r = -1; }
    else if (a.year < b.year) { r = 1; }
    else {
        r = compareKurDec(a, b)
    }

    return r;
}

function compareKurDec(a, b) {
    let r = 0;
    if (a.kur > b.kur) { r = -1; }
    else if (a.kur < b.kur) { r = 1; }
    return r;
}

function getYearResultString(data, year) {
    return `${year}: ${data.sumByYearWatchedAll.get(year)}/${data.sumByYear.get(year)}<br>`
}

function jsonParser(animes) {
    let message = "<table><tr><th>タイトル</th><th>最後まで見たか</th></tr>";
    let sumByYear = new MapCounter();
    let sumByYearWatchedAll = new MapCounter();
    let sumByKur = new MapCounter();
    let sumByKurWatchedAll = new MapCounter();
    const sum = animes.length;
    let sumWatchedAll = 0;
    for (anime of animes) {
        const yearKur = `${anime.year}.${anime.kur}`
        const year = anime.year
        if (!sumByKur.has(yearKur)) {
            message += `<th colspan="3">${yearKur}</th>`
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

        sumByKur.increment(yearKur)

        if (anime.watchedToLast) {
            sumWatchedAll++
            sumByYearWatchedAll.increment(year)
            sumByKurWatchedAll.increment(yearKur)
        }
    }
    message += "</table>"

    const ret = { message, sum, sumWatchedAll, sumByYear, sumByYearWatchedAll, sumByKur, sumByKurWatchedAll }
    return ret;
}

function draw(sumByKur, sumByKurWatchedAll) {
    let sumByKurArray = [];
    let sumByKurWatchedAllArray = [];
    let kurName = [];
    const sumByKurAsc = new Map([...sumByKur.entries()].sort());
    for (const kurYear of sumByKurAsc.keys()) {
        sumByKurArray.push(sumByKur.get(kurYear));
        sumByKurWatchedAllArray.push(sumByKurWatchedAll.get(kurYear));
        kurName.push(kurYear);
    }
    // グラフオプションを指定
    const options = {
        // 出力先を指定
        chart: { renderTo: "container" },
        title: {
            text: "アニメ視聴数"
        },
        xAxis: {
            categories: kurName
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
            { name: "視聴", data: sumByKurArray, id: 'watched' },
            { name: "完走", data: sumByKurWatchedAllArray, id: 'watchedToLast' },
            {
                name: "視聴(移動平均)", linkedTo: 'watched', type: 'sma', params: {
                    period: 4
                }
            },
            {
                name: "完走(移動平均)", linkedTo: 'watchedToLast', type: 'sma', params: {
                    period: 4
                }, marker: {
                    enabled: false
                }
            }]
    }

    // グラフを作成
    chart = new Highcharts.Chart(options);

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
    const options = {
        // 出力先を指定
        chart: { renderTo: "hitrate" },
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
        ]
    }

    // グラフを作成
    chart = new Highcharts.Chart(options);

}
