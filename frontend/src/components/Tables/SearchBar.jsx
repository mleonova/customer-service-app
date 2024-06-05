/* 
  SearchBar Component
 
  This component represents a search bar used for filtering data.
  
  Props:
  - setSearchQuery: Function to set the search query state.
  - placeholder: Placeholder text for the search input field.
 */

import React from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
    display: flex;
    width: 50%;
`;

const SearchInput = styled.input`
    width: 80%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SearchBar = ({ setSearchQuery, placeholder }) => {

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <SearchBarContainer>
            <SearchInput
                type="text"
                placeholder={placeholder}
                onChange={handleInputChange}
            />
        </SearchBarContainer>
    );
};

export default SearchBar;
