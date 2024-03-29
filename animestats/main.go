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
	Years        map[int]animeYear `json:"years"`
	Num          int               `json:"num"`
	NumCompleted int               `json:"numCompleted"`
}
type animeYear struct {
	Cours        map[int]animeCour `json:"cours"`
	Year         int               `json:"year"`
	Num          int               `json:"num"`
	NumCompleted int               `json:"numCompleted"`
}

type animeCour struct {
	Animes       []anime `json:"animes"`
	Cour         int     `json:"cour"`
	Num          int     `json:"num"`
	NumCompleted int     `json:"numCompleted"`
}
type anime struct {
	Title     string `json:"title"`
	Year      int    `json:"year"`
	Cour      int    `json:"cour"`
	Completed bool   `json:"completed"`
}

// func sortAnimesAsc(animes []anime) {
// 	//ascending by year and cour
// 	sort.Slice(animes, func(i, j int) bool {
// 		if animes[i].Year == animes[j].Year {
// 			return animes[i].Cour < animes[j].Cour
// 		}
// 		return animes[i].Year < animes[j].Year
// 	})
// }

// func sortAnimesDes(animes []anime) {
// 	//ascending by year and cour
// 	sort.Slice(animes, func(i, j int) bool {
// 		if animes[i].Year == animes[j].Year {
// 			return animes[i].Cour > animes[j].Cour
// 		}
// 		return animes[i].Year > animes[j].Year
// 	})
// }

func (anime *anime) completedToInt() int {
	if anime.Completed {
		return 1
	}
	return 0
}

func (anms *animeAll) mdString() string {
	var b strings.Builder
	fmt.Fprint(&b, "# Anime History	\n\n")
	years := sortYearsDec(anms.Years)
	for _, year := range years {
		animeYear := anms.Years[year]
		cours := sortCoursDec(animeYear.Cours)
		for _, cour := range cours {
			fmt.Fprintf(&b, "## %v.%v\n", year, cour)
			for _, anime := range animeYear.Cours[cour].Animes {
				fmt.Fprint(&b, "- ")
				if !anime.Completed {
					fmt.Fprint(&b, "#")
				}
				fmt.Fprintf(&b, "%v\n", strings.Trim(anime.Title, " "))
			}
		}
	}
	return b.String()
}

func (anms *animeAll) populateMap(year, cour int) {
	v1, ok := anms.Years[year]
	if !ok {
		v1 = animeYear{
			make(map[int]animeCour),
			year,
			0,
			0}
		anms.Years[year] = v1
	}
	v2, ok := v1.Cours[cour]
	if !ok {
		v2 = animeCour{
			[]anime{},
			cour,
			0,
			0}
		v1.Cours[cour] = v2
	}
}

func (anms *animeAll) setAnime(anm *anime) {
	completedInt := anm.completedToInt()
	v1, ok := anms.Years[anm.Year]
	if !ok {
		v1 = animeYear{
			make(map[int]animeCour),
			anm.Year,
			1,
			completedInt}
	} else {
		v1.Num++
		v1.NumCompleted += completedInt
	}
	anms.Years[anm.Year] = v1
	v2, ok := v1.Cours[anm.Cour]
	if !ok {
		v2 = animeCour{
			[]anime{*anm},
			anm.Cour,
			1,
			completedInt}
	} else {
		v2.Animes = append(v2.Animes, *anm)
		v2.Num++
		v2.NumCompleted += completedInt
	}
	v1.Cours[anm.Cour] = v2
	anms.Num++
	anms.NumCompleted += completedInt
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

func parseMd(animesBytes []byte) (*animeAll, error) {
	animes := &animeAll{make(map[int]animeYear), 0, 0}
	var year, cour int
	var err error
	scanner := bufio.NewScanner(bytes.NewReader(animesBytes))
	for scanner.Scan() {
		if strings.HasPrefix(scanner.Text(), "##") {
			if year, cour, err = parseMdYearCour(scanner.Text()[2:]); err != nil {
				return nil, err
			}
			animes.populateMap(year, cour)
		} else if strings.HasPrefix(scanner.Text(), "- ") {
			parseTitle(animes, scanner.Text()[2:], year, cour)
		}
	}
	return animes, nil
}

func parseMdYearCour(txt string) (int, int, error) {
	trimmed := strings.Trim(txt, " ")
	yearCour := strings.Split(trimmed, ".")
	if len(yearCour) != 2 {
		return 0, 0, errors.New("YearCour cannot be splitted by '.'")
	}
	year, err := strconv.Atoi(yearCour[0])
	if err != nil {
		return 0, 0, err
	}
	cour, err := strconv.Atoi(yearCour[1])
	if err != nil {
		return 0, 0, err
	}
	return year, cour, nil
}

func parseTitle(animes *animeAll, titleCandidate string, year, cour int) {
	completed := true
	if rune(titleCandidate[0]) == '#' {
		completed = false
		titleCandidate = titleCandidate[1:]
	}
	anime := anime{
		titleCandidate,
		year,
		cour,
		completed,
	}
	animes.setAnime(&anime)
}

func convertToJSON(srcMd, dstJSON string) error {
	animes, err := readAnimeHistory(srcMd)
	if err != nil {
		return err
	}
	animesJSON, err := parseMd(animes)
	if err != nil {
		return err
	}
	// sortAnimesDes(animesJSON)
	// jsonBytes, err := json.MarshalIndent(animesJSON, "", "    ")
	jsonBytes, err := json.Marshal(animesJSON)
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
	mdStr := animes.mdString()
	ioutil.WriteFile(dstMd, []byte(mdStr), os.ModePerm)
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

	if ConverttoJSON {
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
