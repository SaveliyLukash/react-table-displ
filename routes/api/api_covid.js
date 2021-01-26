const express = require('express');
const router = express.Router();
const fs = require('fs');

const Country = require('../../models/Country');

// @route POST api/covid
// @add 1 country
// @access Private
router.post('/', (req, res) => {
    const req_body = req.body;

    const {
        name,
        total_cases,
        new_cases,
        total_death,
        new_death,
        total_recovered,
        active_cases,
        serious_critical,
        tot_cases_1m_pop,
        death_1m_pop,
        total_tests,
        tests_1m_pop,
        population
    } = req_body;

    // Process data and validate data if needed
    // console.log(req_body)

    const new_country = Country({
        name,
        total_cases,
        new_cases,
        total_death,
        new_death,
        total_recovered,
        active_cases,
        serious_critical,
        tot_cases_1m_pop,
        death_1m_pop,
        total_tests,
        tests_1m_pop,
        population
    });

    new_country
        .save()
        .then(item => res.json(item))
        .catch(e => {
            res.status(400).json(e);
        });
});


// @route GET api/covid/all
// @get countries
// @params currentSortKey, currentSortOrder, currentPageNumber
// @access Private
const pageSize = 10;
router.get('/all', (req, res) => {

    const {currentSortKey = "name", currentSortOrder = "asc", currentPageNumber = 0} = req.query;

    const offset = currentPageNumber * 10;

    Promise
        .all([
            Country.countDocuments({}),
            Country
                .find({})
                .sort({[currentSortKey]: currentSortOrder})
                .skip(offset)
                .limit(pageSize)
        ])
        .then(([itemCount, countries]) => {
            const pageCount = Math.ceil(itemCount / pageSize);
            res.json({
                pageCount,
                countries
            })
        })
        .catch(e => {
            res.status(400).json(e);
        });
});

// Fill in the database with test data from custom .json file generated in Python from .csv file

// router.get('/fill', (req, res) => {
//     let rawdata = fs.readFileSync('other/covid_data.json');
//     let countries = JSON.parse(rawdata);
//
//     let ins_array = []
//
//     for (const [key, value] of Object.entries(countries)) {
//
//         let newObj = {}
//         for (const [key2, value2] of Object.entries(value)) {
//             if (value2) {
//                 newObj[key2] = value2;
//             }
//         }
//         ins_array.push(newObj)
//     }
//     Country
//         .insertMany(ins_array)
//         .then(
//             res.json({yes: "Yes!"})
//         )
//         .catch(e => {
//             res.status(400).json(e);
//         });
// });

module.exports = router;