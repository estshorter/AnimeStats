const animes = [
    {
        "title": "新サクラ大戦 the Animation",
        "year": 2020,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "へやキャン△",
        "year": 2019,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "Fate/Grand Order -絶対魔獣戦線バビロニア-",
        "year": 2019,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "アイカツオンパレード！",
        "year": 2019,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "マギアレコード",
        "year": 2019,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "バビロン",
        "year": 2019,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "ID: INVADED",
        "year": 2019,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "ロード・エルメロイⅡ世の事件簿 -魔眼蒐集列車 Grace note-",
        "year": 2019,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "通常攻撃が全体攻撃で二回攻撃のお母さんは好きですか?",
        "year": 2019,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "まちカドまぞく",
        "year": 2019,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "ゲゲゲの鬼太郎",
        "year": 2019,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "世話やきキツネの仙狐さん",
        "year": 2019,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "ゲゲゲの鬼太郎",
        "year": 2019,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "閃乱カグラ SHINOVI MASTER -東京妖魔篇-",
        "year": 2018,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "ゴブリンスレイヤー",
        "year": 2018,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "ゾンビランドサガ",
        "year": 2018,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "あかねさす少女",
        "year": 2018,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "ゲゲゲの鬼太郎",
        "year": 2018,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "アイカツフレンズ！",
        "year": 2018,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "すのはら荘の管理人さん",
        "year": 2018,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "One Room セカンドシーズン",
        "year": 2018,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "シュタインズ・ゲート ゼロ",
        "year": 2018,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "ゲゲゲの鬼太郎",
        "year": 2018,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "少女 歌劇 レヴュースタァライト",
        "year": 2018,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "音楽少女",
        "year": 2018,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "ゲゲゲの鬼太郎",
        "year": 2018,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "（ウマ娘 プリティーダービー）",
        "year": 2018,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "踏切時間",
        "year": 2018,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "フルメタルパニック Invisible Victory",
        "year": 2018,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "シュタインズ・ゲート ゼロ",
        "year": 2018,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "ヴァイオレット・エヴァーガーデン",
        "year": 2018,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ゆるキャン△",
        "year": 2018,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "Fate/EXTRA Last Encore",
        "year": 2018,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ゲゲゲの鬼太郎",
        "year": 2018,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "BEATLESS",
        "year": 2018,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "宇宙よりも遠い場所",
        "year": 2018,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "結城友奈は勇者である -鷲尾須美の章-/-勇者の章-",
        "year": 2017,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "地獄少女 宵伽",
        "year": 2017,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "プリンセス・プリンシパル",
        "year": 2017,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "サクラクエスト",
        "year": 2017,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "NEW GAME!!",
        "year": 2017,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "サクラダリセット",
        "year": 2017,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "グランブルーファンタジー",
        "year": 2017,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "正解するカド",
        "year": 2017,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "ツインエンジェルBREAK",
        "year": 2017,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "サクラクエスト",
        "year": 2017,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "終末なにしてますか？ 忙しいですか？ 救ってもらっていいですか？",
        "year": 2017,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "OneRoom",
        "year": 2017,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "機動戦士ガンダム 鉄血のオルフェンズ",
        "year": 2017,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "BanG Dream!",
        "year": 2017,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "小林さんちのメイドラゴン",
        "year": 2017,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "この素晴らしい世界に祝福を！2",
        "year": 2017,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "けものフレンズ",
        "year": 2017,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "機動戦士ガンダム 鉄血のオルフェンズ",
        "year": 2016,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "終末のイゼッタ",
        "year": 2016,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "DRIFTERS",
        "year": 2016,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "ラブライブ！サンシャイン!!",
        "year": 2016,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "NEW GAME!",
        "year": 2016,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "アイカツスターズ！",
        "year": 2016,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "91Days",
        "year": 2016,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "アイカツスターズ！",
        "year": 2016,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "迷家‐マヨイガ‐",
        "year": 2016,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "はいふり",
        "year": 2016,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "機動戦士ガンダム 鉄血のオルフェンズ",
        "year": 2016,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ナースウイッチ小麦ちゃんR",
        "year": 2016,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "魔法つかいプリキュア！",
        "year": 2016,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "アイカツ！",
        "year": 2016,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "蒼穹のファフナー EXODUS",
        "year": 2015,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "サンダーバード ARE GO",
        "year": 2015,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "アイカツ！",
        "year": 2015,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "コンクリート・レボルティオ",
        "year": 2015,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "コメット・ルシファー",
        "year": 2015,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "機動戦士ガンダム 鉄血のオルフェンズ",
        "year": 2015,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "うたわれるもの 偽りの仮面",
        "year": 2015,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "ヤング ブラック・ジャック",
        "year": 2015,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "ルパン三世",
        "year": 2015,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "戦姫絶唱シンフォギアGX",
        "year": 2015,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "Classroom☆Crisis",
        "year": 2015,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "乱歩奇譚 Game of Laplace",
        "year": 2015,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "Charlotte",
        "year": 2015,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "アクエリオンロゴス",
        "year": 2015,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "アイカツ",
        "year": 2015,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "空戦魔導士候補生の教官",
        "year": 2015,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "がっこうぐらし",
        "year": 2015,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "アイカツ！",
        "year": 2015,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "放課後のプレアデス",
        "year": 2015,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "パンチライン",
        "year": 2015,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "SHOW BY ROCK！！",
        "year": 2015,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "Fate/stay night",
        "year": 2015,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "プラスティック・メモリーズ",
        "year": 2015,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "アルドノア・ゼロ",
        "year": 2015,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "アイカツ！",
        "year": 2015,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "SHIROBAKO",
        "year": 2015,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ユリ熊嵐",
        "year": 2015,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "蒼穹のファフナー EXODUS",
        "year": 2015,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "クロスアンジュ 天使と竜の輪舞",
        "year": 2015,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "夜ノヤッターマン",
        "year": 2015,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "グリザイアの果実",
        "year": 2014,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "アイカツ！",
        "year": 2014,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "デンキ街の本屋さん",
        "year": 2014,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "ガールフレンド（仮）",
        "year": 2014,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "天体のメソッド",
        "year": 2014,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "クロスアンジュ 天使と竜の輪舞",
        "year": 2014,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "失われた未来を求めて",
        "year": 2014,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "Fate/stay night",
        "year": 2014,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "SHIROBAKO",
        "year": 2014,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "ガンダム Gのレコンキスタ",
        "year": 2014,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "PSYCHO-PASS サイコパス 2",
        "year": 2014,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "プリパラ",
        "year": 2014,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "キャプテン・アース",
        "year": 2014,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "アルドノア・ゼロ",
        "year": 2014,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "普通の女子校生が【ろこどる】やってみた。",
        "year": 2014,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "アイカツ！",
        "year": 2014,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "プリパラ",
        "year": 2014,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "ハナヤマタ",
        "year": 2014,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "キャプテン・アース",
        "year": 2014,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "極黒のブリュンヒルデ",
        "year": 2014,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "アイカツ！",
        "year": 2014,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "魔法科高校の劣等生",
        "year": 2014,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "ジョジョの奇妙な冒険 スターダストクルセイダーズ",
        "year": 2014,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "ラブライブ！",
        "year": 2014,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "中二病でも恋がしたい！　戀",
        "year": 2014,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ハピネスチャージプリキュア！",
        "year": 2014,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "のうりん",
        "year": 2014,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "キルラキル",
        "year": 2014,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "アイカツ！",
        "year": 2014,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "世界征服　謀略のズヴィズダー",
        "year": 2014,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ガリレイドンナ",
        "year": 2013,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "革命機ヴァルヴレイヴ",
        "year": 2013,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "キルラキル",
        "year": 2013,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "アイカツ！",
        "year": 2013,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "勇者になれなかった俺はしぶしぶ就職を決意しました。",
        "year": 2013,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "蒼き鋼のアルペジオ",
        "year": 2013,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "ファンタジスタドール",
        "year": 2013,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "超次元ゲイム　ネプテューヌ",
        "year": 2013,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "宇宙戦艦ヤマト2199",
        "year": 2013,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "銀河機攻隊 マジェスティックプリンス",
        "year": 2013,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "戦姫絶唱シンフォギアG",
        "year": 2013,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "ガッチャマン　クラウズ",
        "year": 2013,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "Fate kaleid liner プリズマ☆イリヤ",
        "year": 2013,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "アイカツ！",
        "year": 2013,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "幻影ヲ駆ケル太陽",
        "year": 2013,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "百花繚乱 サムライガールズ",
        "year": 2013,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "アイカツ！",
        "year": 2013,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "革命機ヴァルヴレイヴ",
        "year": 2013,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "宇宙戦艦ヤマト2199",
        "year": 2013,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "翠星のガルガンティア",
        "year": 2013,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "銀河機攻隊 マジェスティックプリンス",
        "year": 2013,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "プリティーリズム・ディアマイフューチャー",
        "year": 2013,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "AKB0048",
        "year": 2013,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ラブライブ！",
        "year": 2013,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "アイカツ！",
        "year": 2013,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "新世界より",
        "year": 2013,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "たまこまーけっと",
        "year": 2013,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "PSYCHO-PASS",
        "year": 2013,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ROBOTICS;NOTES",
        "year": 2013,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "ジョジョの奇妙な冒険",
        "year": 2013,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ビビッドレッド・オペレーション",
        "year": 2013,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "閃乱カグラ",
        "year": 2013,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "超速変形ジャイロゼッター",
        "year": 2013,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "ガールズ\u0026パンツァー",
        "year": 2012,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "新世界より",
        "year": 2012,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "中二病でも恋がしたい！",
        "year": 2012,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "PSYCHO-PASS",
        "year": 2012,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "K",
        "year": 2012,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "ジョジョの奇妙な冒険",
        "year": 2012,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "アイカツ！",
        "year": 2012,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "プリティーリズム・ディアマイフューチャー",
        "year": 2012,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "リトルバスターズ！",
        "year": 2012,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "ROBOTICS;NOTES",
        "year": 2012,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "超速変形ジャイロゼッター",
        "year": 2012,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "輪廻のラグランジェ",
        "year": 2012,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "プリティーリズム・ディアマイフューチャー",
        "year": 2012,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "エウレカセブンAO",
        "year": 2012,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "DOG DAYS'",
        "year": 2012,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "氷菓",
        "year": 2012,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "マブラヴ　オルタネイティヴ　トータル・イクリプス",
        "year": 2012,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "戦国コレクション",
        "year": 2012,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "TARI　TARI",
        "year": 2012,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "スマイルプリキュア！",
        "year": 2012,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "Fate/Zero",
        "year": 2012,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "黄昏乙女×アムネジア",
        "year": 2012,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "LUPIN the Third -峰不二子という女-",
        "year": 2012,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "ZETMAN",
        "year": 2012,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "夏色キセキ",
        "year": 2012,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "氷菓",
        "year": 2012,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "エウレカセブンAO",
        "year": 2012,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "プリティーリズム・ディアマイフューチャー",
        "year": 2012,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "アクエリオンEVOL",
        "year": 2012,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "宇宙兄弟",
        "year": 2012,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "あの夏で待ってる",
        "year": 2012,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "プリティーリズム・オーロラドリーム",
        "year": 2012,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ジュエルペット　サンシャイン",
        "year": 2012,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "戦姫絶唱シンフォギア",
        "year": 2012,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "輪廻のラグランジェ",
        "year": 2012,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ギルティクラウン",
        "year": 2012,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ミルキィホームズ　第2幕",
        "year": 2012,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "ペルソナ4",
        "year": 2012,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "モーレツ宇宙海賊",
        "year": 2012,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "Another",
        "year": 2012,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "スマイルプリキュア！",
        "year": 2012,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "アクエリオンEVOL",
        "year": 2012,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ましろ色シンフォニー",
        "year": 2011,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "輪るピングドラム",
        "year": 2011,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "ペルソナ4",
        "year": 2011,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "僕は友達が少ない",
        "year": 2011,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "マケン姫っ！",
        "year": 2011,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "境界線上のホライゾン",
        "year": 2011,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "Fate/Zero",
        "year": 2011,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "ギルティクラウン",
        "year": 2011,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "ジュエルペット　サンシャイン",
        "year": 2011,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "THE IDOLM@STER",
        "year": 2011,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "セイクリッドセブン",
        "year": 2011,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "ロウきゅーぶ！",
        "year": 2011,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "輪るピングドラム",
        "year": 2011,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "TIGER \u0026 BUNNY",
        "year": 2011,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "花咲くいろは",
        "year": 2011,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "R-15",
        "year": 2011,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "異国迷路のクロワーゼ",
        "year": 2011,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "BLOOD-C",
        "year": 2011,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "ダンタリアンの書架",
        "year": 2011,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "Steins;Gate",
        "year": 2011,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "神様ドォルズ",
        "year": 2011,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "快盗天使ツインエンジェル",
        "year": 2011,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "ゆるゆり",
        "year": 2011,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "TIGER \u0026 BUNNY",
        "year": 2011,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "神のみぞ知るセカイ",
        "year": 2011,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "俺たちに翼はない",
        "year": 2011,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "C",
        "year": 2011,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "星空へ架かる橋",
        "year": 2011,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "30歳の保健体育",
        "year": 2011,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "まりあ†ほりっく あらいぶ",
        "year": 2011,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "あの日見た花の名前を僕達はまだ知らない。",
        "year": 2011,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "電波女と青春男",
        "year": 2011,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "そふてにっ",
        "year": 2011,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "Steins;Gate",
        "year": 2011,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "GOSICK",
        "year": 2011,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "DOG DAYS",
        "year": 2011,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "花咲くいろは",
        "year": 2011,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "デッドマン・ワンダーランド",
        "year": 2011,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "フラクタル",
        "year": 2011,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "お兄ちゃんのことなんかぜんぜん好きじゃないんだからねっ!!",
        "year": 2011,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "GOSICK -ゴシック-",
        "year": 2011,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ドラゴンクライシス！",
        "year": 2011,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "これはゾンビですか？",
        "year": 2011,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "レベルE",
        "year": 2011,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "魔法少女まどか☆マギカ",
        "year": 2011,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "ジュエルペット てぃんくる☆",
        "year": 2011,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "IS〈インフィニット・ストラトス〉",
        "year": 2011,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "パンティ＆ストッキングwithガーターベルト",
        "year": 2010,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "百花繚乱 サムライガールズ",
        "year": 2010,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "FORTUNE ARTERIAL 赤い約束",
        "year": 2010,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "ヨスガノソラ",
        "year": 2010,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "それでも町は廻っている",
        "year": 2010,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "俺の妹がこんなに可愛いわけがない",
        "year": 2010,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "神のみぞ知るセカイ",
        "year": 2010,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "探偵オペラ ミルキィホームズ",
        "year": 2010,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "侵略！イカ娘",
        "year": 2010,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "屍鬼",
        "year": 2010,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "おとめ妖怪 ざくろ",
        "year": 2010,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "えむえむっ！",
        "year": 2010,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "アマガミSS",
        "year": 2010,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "アイアンマン",
        "year": 2010,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "あそびにいくヨ！",
        "year": 2010,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "けいおん!!",
        "year": 2010,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "生徒会役員共",
        "year": 2010,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "世紀末オカルト学院",
        "year": 2010,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "ストライクウィッチーズ2",
        "year": 2010,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "祝福のカンパネラ",
        "year": 2010,
        "kur": 3,
        "watchedToLast": false
    },
    {
        "title": "屍鬼",
        "year": 2010,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "学園黙示録 HIGHSCHOOL OF THE DEAD",
        "year": 2010,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "アマガミSS",
        "year": 2010,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "いちばんうしろの大魔王",
        "year": 2010,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "荒川アンダー ザ ブリッジ",
        "year": 2010,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "閃光のナイトレイド",
        "year": 2010,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "迷い猫オーバーラン！",
        "year": 2010,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "四畳半神話大系",
        "year": 2010,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "B型H系",
        "year": 2010,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "WORKING!!",
        "year": 2010,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "Angel Beats!",
        "year": 2010,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "けいおん!!",
        "year": 2010,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "COBRA THE ANIMATION",
        "year": 2010,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "ソ・ラ・ノ・ヲ・ト",
        "year": 2010,
        "kur": 1,
        "watchedToLast": true
    },
    {
        "title": "刀語",
        "year": 2010,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "聖痕のクェイサー",
        "year": 2010,
        "kur": 1,
        "watchedToLast": false
    },
    {
        "title": "うみねこのなく頃に",
        "year": 2009,
        "kur": 4,
        "watchedToLast": true
    },
    {
        "title": "そらのおとしもの",
        "year": 2009,
        "kur": 4,
        "watchedToLast": false
    },
    {
        "title": "CANAAN",
        "year": 2009,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "うみねこのなく頃に",
        "year": 2009,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "懺・さよなら絶望先生",
        "year": 2009,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "化物語",
        "year": 2009,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "涼宮ハルヒの憂鬱",
        "year": 2009,
        "kur": 3,
        "watchedToLast": true
    },
    {
        "title": "けいおん",
        "year": 2009,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "宇宙をかける少女",
        "year": 2009,
        "kur": 2,
        "watchedToLast": true
    },
    {
        "title": "アスラクライン",
        "year": 2009,
        "kur": 2,
        "watchedToLast": false
    },
    {
        "title": "宇宙をかける少女",
        "year": 2009,
        "kur": 1,
        "watchedToLast": true
    }
]