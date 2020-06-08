import React, { useState, useEffect } from 'react';
import { Select, Tag } from 'antd';
import styled from 'styled-components';

const { Option, OptGroup } = Select;

const SearchBarDiv = styled.div`
  z-index: 500;
  width: 100%;
  position: absolute;
  max-width: 60%;
  margin: 5rem 5rem auto;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  z-index: 500;
`;

function tagRender(props) {
  const colorOptions = { // search bar items
    bus: '#3cb300',
    trolley: '#198cff',
    tram: '#ff4433',
    disabled: '#ffff',
  };
  const { label, closable, onClose } = props;
  console.log(props);
  return (
    <Tag color={colorOptions.bus} closable={closable} onClose={onClose}>
      {label}
    </Tag>
  );
}

function searchBarItems(data, label, altLabel) {
  const optionsList = Object.keys(data).map((routeId) => {
    const value = `${label}-${routeId}`;
    return <Option key={value} value={value} title={label}>{`${altLabel} ${routeId}`}</Option>;
  });
  return optionsList;
}

function SearchBar({ vehiclesData }) {
  const [searchBarOptions, setSearchBarOptions] = useState({});
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    if (vehiclesData) {
      const { trolleys, buses, trams } = vehiclesData;
      let trolleysOptionsList;
      let busesOptionsList;
      let tramsOptionsList;
      if (typeof trolleys !== 'undefined') {
        trolleysOptionsList = searchBarItems(trolleys, 'trolley', 'Trolleybus');
      }
      if (typeof buses !== 'undefined') {
        busesOptionsList = searchBarItems(buses, 'bus', 'Bus');
      }
      if (typeof trams !== 'undefined') {
        tramsOptionsList = searchBarItems(trams, 'tram', 'Tramway');
      }
      setSearchBarOptions({
        trolleys: trolleysOptionsList,
        buses: busesOptionsList,
        trams: tramsOptionsList,
      });
    }
    return () => {
      setSearchBarOptions({});
    };
  }, [vehiclesData]);

  return (
    <SearchBarDiv>
      <StyledSelect
        className="route-search-bar"
        mode="multiple"
        tagRender={tagRender}
        notFoundContent="Not found"
        placeholder="Routes.."
        allowClear="true"
        size="large"
        onChange={(item) => { setSelectedValues(item); }}
        defaultValue={selectedValues}
        // labelInValue="true"
        // open="true"
      >
        {searchBarOptions.trolleys && (
          <OptGroup key="optgroup-trolley" label="Trolleybus">
            {searchBarOptions.trolleys}
          </OptGroup>
        )}
        {searchBarOptions.buses && (
          <OptGroup key="optgroup-bus" label="Bus">
            {searchBarOptions.buses}
          </OptGroup>
        )}
        {searchBarOptions.trams && (
          <OptGroup key="optgroup-tram" label="Tramway">
            {searchBarOptions.trams}
          </OptGroup>
        )}
      </StyledSelect>
    </SearchBarDiv>
  );
}

export default SearchBar;
