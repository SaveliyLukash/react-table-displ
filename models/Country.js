const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CountrySchema = {
    name:{
        type: String
    },
    total_cases:{
        type: Number,
    },
    new_cases:{
        type: Number,
    },
    total_death:{
        type: Number,
    },
    new_death:{
        type: Number,
    },
    total_recovered:{
        type: Number
    },
    active_cases:{
        type: Number
    },
    serious_critical:{
        type: Number
    },
    tot_cases_1m_pop:{
        type: Number
    },
    death_1m_pop:{
        type: Number
    },
    total_tests:{
        type: Number
    },
    tests_1m_pop:{
        type: Number
    },
    population:{
        type: Number
    }
}

module.exports = Country = mongoose.model('Country', CountrySchema)