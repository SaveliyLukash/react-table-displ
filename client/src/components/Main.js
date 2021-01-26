import {Table, Row, Container} from 'react-bootstrap';
import {getCountriesSort} from "../actions/countryActions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import SortingHeader from "./SortingHeader";
import {SortParamsContext} from "../contexts/SortContext";
import ReactPaginate from 'react-paginate';

function Main() {

    const countries = useSelector(store => store.country_store.countries);
    const pageCount = useSelector(store => store.country_store.pageCount);
    const dispatch = useDispatch();

    const [currentSortKey, setCurrentSortKey] = useState();
    const [currentSortOrder, setCurrentSortOrder] = useState();
    const [currentPageNumber, setCurrentPageNumber] = useState();

    function cycleSort(e, newSortKey) {
        if (currentSortKey !== newSortKey) {
            setCurrentSortOrder("desc");
            setCurrentSortKey(newSortKey);
        } else {
            (currentSortOrder === "desc") ? setCurrentSortOrder("asc") : setCurrentSortOrder("desc");
        }

    }

    let handlePageClick = (e) => {
        const selectedPage = e.selected;
        setCurrentPageNumber(selectedPage);
    };

    useEffect(() => {
        console.log("Run!")
        dispatch(getCountriesSort({currentSortKey, currentSortOrder}, {currentPageNumber}));
    }, [currentSortKey, currentSortOrder, currentPageNumber])

    let centerPagination = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    }
    return (
        <Container fluid>
            <Row>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <SortParamsContext.Provider value={{currentSortKey, currentSortOrder}}>
                            <SortingHeader onClick={cycleSort} dbValue={"name"}>Country</SortingHeader>
                            <SortingHeader onClick={cycleSort} dbValue={"total_cases"}>Total cases</SortingHeader>
                            <SortingHeader onClick={cycleSort} dbValue={"new_cases"}>New cases</SortingHeader>
                            <SortingHeader onClick={cycleSort} dbValue={"total_death"}>Total deaths</SortingHeader>
                            <SortingHeader onClick={cycleSort} dbValue={"new_death"}>New deaths</SortingHeader>
                            <SortingHeader onClick={cycleSort} dbValue={"total_recovered"}>Total
                                recovered</SortingHeader>
                            <SortingHeader onClick={cycleSort} dbValue={"active_cases"}>Active cases</SortingHeader>
                            <SortingHeader onClick={cycleSort} dbValue={"serious_critical"}>Serious,
                                critical</SortingHeader>
                            <SortingHeader onClick={cycleSort} dbValue={"tot_cases_1m_pop"}>Tot cases / 1M
                                pop</SortingHeader>
                            <SortingHeader onClick={cycleSort} dbValue={"death_1m_pop"}>Death / 1M pop</SortingHeader>
                            <SortingHeader onClick={cycleSort} dbValue={"total_tests"}>Total tests</SortingHeader>
                            <SortingHeader onClick={cycleSort} dbValue={"tests_1m_pop"}>Tests / 1M pop</SortingHeader>
                            <SortingHeader onClick={cycleSort} dbValue={"population"}>Population</SortingHeader>
                        </SortParamsContext.Provider>
                    </tr>
                    </thead>
                    <tbody>

                    {countries.map((country, index) => (
                        <tr key={country._id}>
                            <td>{country.name}</td>
                            <td>{country.total_cases}</td>
                            <td>{country.new_cases}</td>
                            <td>{country.total_death}</td>
                            <td>{country.new_death}</td>
                            <td>{country.total_recovered}</td>
                            <td>{country.active_cases}</td>
                            <td>{country.serious_critical}</td>
                            <td>{country.tot_cases_1m_pop}</td>
                            <td>{country.death_1m_pop}</td>
                            <td>{country.total_tests}</td>
                            <td>{country.tests_1m_pop}</td>
                            <td>{country.population}</td>
                        </tr>
                    ))}

                    </tbody>
                </Table>
                <div style={centerPagination}>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                </div>
            </Row>
        </Container>
    );
}

export default Main;
