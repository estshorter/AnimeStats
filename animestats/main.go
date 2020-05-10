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

type anime struct {
	Title         string `json:"title"`
	Year          int    `json:"year"`
	Kur           int    `json:"kur"`
	WatchedToLast bool   `json:"watchedToLast"`
}

func sortAnimesAsc(animes []anime) {
	//ascending by year and kur
	sort.Slice(animes, func(i, j int) bool {
		if animes[i].Year == animes[j].Year {
			return animes[i].Kur < animes[j].Kur
		}
		return animes[i].Year < animes[j].Year
	})
}

func sortAnimesDes(animes []anime) {
	//ascending by year and kur
	sort.Slice(animes, func(i, j int) bool {
		if animes[i].Year == animes[j].Year {
			return animes[i].Kur > animes[j].Kur
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

func parse(animesBytes []byte) ([]anime, error) {
	var animes []anime
	var year, kur int
	var err error
	scanner := bufio.NewScanner(bytes.NewReader(animesBytes))
	for scanner.Scan() {
		if strings.HasPrefix(scanner.Text(), "##") {
			trimmed := strings.Trim(scanner.Text()[2:], " ")
			yearKur := strings.Split(trimmed, ".")
			if len(yearKur) != 2 {
				return nil, errors.New("YearKur cannot be splitted by '.'")
			}
			year, err = strconv.Atoi(yearKur[0])
			if err != nil {
				return nil, err
			}
			kur, err = strconv.Atoi(yearKur[1])
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
				kur,
				watchedToLast,
			}
			animes = append(animes, anime)
		}
	}
	return animes, nil
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
	sortAnimesDes(animesJSON)
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
	sortAnimesDes(animes)
	year := 0
	kur := 0
	var b strings.Builder
	fmt.Fprint(&b, "# Anime History	\n\n")
	for _, anime := range animes {
		if anime.Year != year || anime.Kur != kur {
			fmt.Fprintf(&b, "## %v.%v\n", anime.Year, anime.Kur)
			year = anime.Year
			kur = anime.Kur
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
	var unmarshal bool
	var src, dst string
	flag.BoolVar(&unmarshal, "um", false, "True if unmarshalling (json -> md) else marshalling (md -> json)")
	flag.StringVar(&src, "s", "", "Src file")
	flag.StringVar(&dst, "d", "", "Destination file")

	flag.Parse()

	if src == "" {
		fmt.Printf("Please specify a src file")
		return
	} else if dst == "" {
		fmt.Printf("Please specify a destination file")
		return
	}

	if !unmarshal {
		// md -> json
		if filepath.Ext(src) != ".md" {
			fmt.Printf("Please specify a md file as a src file")
			return
		} else if filepath.Ext(dst) != ".json" {
			fmt.Printf("Please specify a json file as a dst file")
			return
		}

		fmt.Println("Marshalling..")
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

		fmt.Println("Unmarshalling..")
		if err := unMarshal(filepath.Clean(src), filepath.Clean(dst)); err != nil {
			log.Fatal(err)
		}
	}
}
