package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
)

type animes map[int]animesYear

type animesYear struct {
	Cours            map[int]animesCour `json:"cours"`
	Year             int                `json:"year"`
	Num              int                `json:"num"`
	NumWatchedToLast int                `json:"numWatchedToLast"`
}

type animesCour struct {
	Animes           []anime `json:"animes"`
	Cour             int     `json:"cour"`
	Num              int     `json:"num"`
	NumWatchedToLast int     `json:"numWatchedToLast"`
}
type anime struct {
	Title         string `json:"title"`
	Year          int    `json:"year"`
	Cour          int    `json:"cour"`
	WatchedToLast bool   `json:"watchedToLast"`
}

func sortAnimesAsc(animes []anime) {
	//ascending by year and cour
	sort.Slice(animes, func(i, j int) bool {
		if animes[i].Year == animes[j].Year {
			return animes[i].Cour < animes[j].Cour
		}
		return animes[i].Year < animes[j].Year
	})
}

func sortAnimesDes(animes []anime) {
	//ascending by year and cour
	sort.Slice(animes, func(i, j int) bool {
		if animes[i].Year == animes[j].Year {
			return animes[i].Cour > animes[j].Cour
		}
		return animes[i].Year > animes[j].Year
	})
}

func readAnimeHistory(filepath string) ([]byte, error) {
	fp, err := os.Open(filepath)
	if err != nil {
		return nil, err
	}
	defer fp.Close()

	data, err := ioutil.ReadAll(fp)
	if err != nil {
		log.Fatal(err)
	}
	return data, nil
}

func parse(animesBytes []byte) (animes, error) {
	animes := make(animes)
	var year, cour int
	var err error
	scanner := bufio.NewScanner(bytes.NewReader(animesBytes))
	for scanner.Scan() {
		if strings.HasPrefix(scanner.Text(), "##") {
			trimmed := strings.Trim(scanner.Text()[2:], " ")
			yearCour := strings.Split(trimmed, ".")
			if len(yearCour) != 2 {
				return nil, errors.New("YearCour cannot be splitted by '.'")
			}
			year, err = strconv.Atoi(yearCour[0])
			if err != nil {
				return nil, err
			}
			cour, err = strconv.Atoi(yearCour[1])
			if err != nil {
				return nil, err
			}
		} else if strings.HasPrefix(scanner.Text(), "- ") {
			titleCandidate := scanner.Text()[2:]
			watchedToLast := true
			if rune(titleCandidate[0]) == '#' {
				watchedToLast = false
				titleCandidate = titleCandidate[1:]
			}
			anime := anime{
				titleCandidate,
				year,
				cour,
				watchedToLast,
			}
			setAnime(anime, animes)
		}
	}
	return animes, nil
}

func setAnime(anm anime, anms animes) {
	v1, ok := anms[anm.Year]
	if !ok {
		v1 = animesYear{
			make(map[int]animesCour),
			anm.Year,
			1,
			watchedToLastToInt(anm)}
	} else {
		v1.Num++
		v1.NumWatchedToLast += watchedToLastToInt(anm)
	}
	anms[anm.Year] = v1
	v2, ok := v1.Cours[anm.Cour]
	if !ok {
		v2 = animesCour{
			[]anime{anm},
			anm.Cour,
			1,
			watchedToLastToInt(anm)}
	} else {
		v2.Animes = append(v2.Animes, anm)
		v2.Num++
		v2.NumWatchedToLast += watchedToLastToInt(anm)
	}
	v1.Cours[anm.Cour] = v2
}

func watchedToLastToInt(anime anime) int {
	if anime.WatchedToLast {
		return 1
	}
	return 0
}

func marshal(pathToAnimeHistory, outputFileName string) error {
	animes, err := readAnimeHistory(pathToAnimeHistory)
	if err != nil {
		return err
	}
	animesJSON, err := parse(animes)
	if err != nil {
		return err
	}
	// sortAnimesDes(animesJSON)
	jsonBytes, err := json.MarshalIndent(animesJSON, "", "    ")
	if err != nil {
		return err
	}
	// fmt.Println(string(jsonBytes))
	ioutil.WriteFile(outputFileName, jsonBytes, os.ModePerm)
	return nil
}

func unMarshal(jsonToBeUnmarshalled, unmarshalled string) error {
	animesBytes, err := readAnimeHistory(jsonToBeUnmarshalled)
	if err != nil {
		return err
	}

	var animes []anime
	if err := json.Unmarshal(animesBytes, &animes); err != nil {
		return err
	}
	// sortAnimesDes(animes)
	year := 0
	cour := 0
	var b strings.Builder
	fmt.Fprint(&b, "# Anime History	\n\n")
	for _, anime := range animes {
		if anime.Year != year || anime.Cour != cour {
			fmt.Fprintf(&b, "## %v.%v\n", anime.Year, anime.Cour)
			year = anime.Year
			cour = anime.Cour
		}
		fmt.Fprint(&b, "- ")
		if !anime.WatchedToLast {
			fmt.Fprint(&b, "#")
		}
		fmt.Fprintf(&b, "%v\n", strings.Trim(anime.Title, " "))
	}
	ioutil.WriteFile(unmarshalled, []byte(b.String()), os.ModePerm)
	return nil
}

func main() {
	var toJSON, toMd bool
	var src, dst string
	flag.BoolVar(&toJSON, "json", false, "Convert to json from md")
	flag.BoolVar(&toMd, "md", true, "Convert to md from json")
	flag.StringVar(&src, "s", "../data/AnimeHistory.md", "Src file")
	flag.StringVar(&dst, "d", "../data/animes.json", "Destination file")

	flag.Parse()

	if toJSON {
		toMd = false
	}

	if toMd {
		// md -> json
		if filepath.Ext(src) != ".md" {
			fmt.Printf("Please specify a md file as a src file")
			return
		} else if filepath.Ext(dst) != ".json" {
			fmt.Printf("Please specify a json file as a dst file")
			return
		}

		fmt.Println("Converting to JSON...")
		if err := marshal(filepath.Clean(src), filepath.Clean(dst)); err != nil {
			log.Fatal(err)
		}
	} else {
		// json -> md
		if filepath.Ext(src) != ".json" {
			fmt.Printf("Please specify a json file as a src file")
			return
		} else if filepath.Ext(dst) != ".md" {
			fmt.Printf("Please specify a md file as a dst file")
			return
		}

		fmt.Println("Converting to MD..")
		if err := unMarshal(filepath.Clean(src), filepath.Clean(dst)); err != nil {
			log.Fatal(err)
		}
	}
}
