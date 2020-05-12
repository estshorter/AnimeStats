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

type animeAll struct {
	Years            map[int]animeYear `json:"years"`
	Num              int               `json:"num"`
	NumWatchedToLast int               `json:"numWatchedToLast"`
}
type animeYear struct {
	Cours            map[int]animeCour `json:"cours"`
	Year             int               `json:"year"`
	Num              int               `json:"num"`
	NumWatchedToLast int               `json:"numWatchedToLast"`
}

type animeCour struct {
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

func parse(animesBytes []byte) (*animeAll, error) {
	animes := &animeAll{make(map[int]animeYear), 0, 0}
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

func setAnime(anm anime, anms *animeAll) {
	watchedToLastInt := watchedToLastToInt(anm)
	v1, ok := anms.Years[anm.Year]
	if !ok {
		v1 = animeYear{
			make(map[int]animeCour),
			anm.Year,
			1,
			watchedToLastInt}
	} else {
		v1.Num++
		v1.NumWatchedToLast += watchedToLastInt
	}
	anms.Years[anm.Year] = v1
	v2, ok := v1.Cours[anm.Cour]
	if !ok {
		v2 = animeCour{
			[]anime{anm},
			anm.Cour,
			1,
			watchedToLastInt}
	} else {
		v2.Animes = append(v2.Animes, anm)
		v2.Num++
		v2.NumWatchedToLast += watchedToLastInt
	}
	v1.Cours[anm.Cour] = v2
	anms.Num++
	anms.NumWatchedToLast += watchedToLastInt
}

func watchedToLastToInt(anime anime) int {
	if anime.WatchedToLast {
		return 1
	}
	return 0
}

func convertToJSON(srcMd, dstJSON string) error {
	animes, err := readAnimeHistory(srcMd)
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
	ioutil.WriteFile(dstJSON, jsonBytes, os.ModePerm)
	return nil
}

func convertToMd(srcJSON, dstMd string) error {
	animesBytes, err := readAnimeHistory(srcJSON)
	if err != nil {
		return err
	}

	var animes animeAll
	if err := json.Unmarshal(animesBytes, &animes); err != nil {
		return err
	}
	// sortAnimesDes(animes)
	var b strings.Builder
	fmt.Fprint(&b, "# Anime History	\n\n")

	years := sortYearsDec(animes.Years)
	for _, year := range years {
		animeYear := animes.Years[year]
		cours := sortCoursDec(animeYear.Cours)
		for _, cour := range cours {
			animeCour := animeYear.Cours[cour]
			fmt.Fprintf(&b, "## %v.%v\n", year, cour)
			for _, anime := range animeCour.Animes {
				fmt.Fprint(&b, "- ")
				if !anime.WatchedToLast {
					fmt.Fprint(&b, "#")
				}
				fmt.Fprintf(&b, "%v\n", strings.Trim(anime.Title, " "))
			}
		}
	}
	ioutil.WriteFile(dstMd, []byte(b.String()), os.ModePerm)
	return nil
}

func sortYearsDec(m map[int]animeYear) []int {
	years := make([]int, 0, len(m))
	for y := range m {
		years = append(years, y)
	}
	sort.Sort(sort.Reverse(sort.IntSlice(years)))
	return years
}

func sortCoursDec(m map[int]animeCour) []int {
	cours := make([]int, 0, len(m))
	for c := range m {
		cours = append(cours, c)
	}
	sort.Sort(sort.Reverse(sort.IntSlice(cours)))
	return cours
}

func main() {
	var ConverttoJSON, toMd bool
	var src, dst string
	flag.BoolVar(&ConverttoJSON, "json", true, "Convert to json from md")
	flag.BoolVar(&toMd, "md", false, "Convert to md from json")
	flag.StringVar(&src, "s", "../data/AnimeHistory.md", "Src file")
	flag.StringVar(&dst, "d", "../data/animes.json", "Destination file")

	flag.Parse()

	if toMd {
		ConverttoJSON = false
	}

	if !toMd {
		// md -> json
		if filepath.Ext(src) != ".md" {
			fmt.Printf("Please specify a md file as a src file")
			return
		} else if filepath.Ext(dst) != ".json" {
			fmt.Printf("Please specify a json file as a dst file")
			return
		}

		fmt.Println("Converting to JSON...")
		if err := convertToJSON(filepath.Clean(src), filepath.Clean(dst)); err != nil {
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
		if err := convertToMd(filepath.Clean(src), filepath.Clean(dst)); err != nil {
			log.Fatal(err)
		}
	}
}
