import React, { useState, useEffect, useRef } from 'react';
import styles from './autocomplete.module.scss';
import { debounce } from "lodash";
import axios from 'axios';
import API_ENDPOINTS from '../../utils/api';

const Autocomplete = () => {
    const [input, setInput] = useState("");
    const [query, setQuery] = useState(false);
    const [results, setResults] = useState([]);
    //store the historicalSearches on cache/redis
    const historicalSearches = [
        "Elon Musk",
        "SpaceX news",
        "Innovative startups 2023",
        "Recipes for avocado toast",
        "Taylor Swift latest album",
        "Best coding bootcamps",
        "Sustainable living tips",
        "Famous movie quotes",
        "Virtual reality trends",
        "Mindfulness meditation techniques"
      ];

    const debouncedSearch = useRef(debounce(async (criteria) => {
        const response = await axios.get(`your_backend_api_url?query=${criteria}`);
        setResults(response.data);
    }, 300)).current;

    useEffect(() => {
        if (query){
            debouncedSearch(input);
        }

    }, [query,input,debouncedSearch]);

    const handleChange = (e) => {
        setInput(e.target.value);
        setQuery(e.target.value.length >= 3);
    };
    return (
        <div className={styles.searchComponent}>
            <div className={styles.searchBar}>
                <input onChange={handleChange} value={input} />
            </div>
            <div className={styles.dropdownMenu}>
            {
                <ul>
                {(results.length > 0 ? results : historicalSearches).map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
                </ul>
                }
            </div>

        </div>
    );
};
export default Autocomplete;
