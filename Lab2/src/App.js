import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import countries from "world-countries";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

countries.sort((a, b) => b.area - a.area);

const filtered = countries.filter(
  country => country.name.common !== "Antarctica"
);
const sliced = filtered.slice(0, 15);
const sliced5 = sliced.slice(0, 5);
const sliced10 = sliced.slice(5, 15);
let russia = sliced[0].area;

/*
function showInput(text)
{
  const characters = text.split("");
  
  
  return characters.join("");
}
*/
function CountryList() {
  /*console.log(countries);
  console.log(filtered);
  console.log(sliced);
  console.log(russia);
  console.log(sliced5);
  console.log(sliced10);*/
  console.log(getCountryByCca3);

  const [searchString, setSearchString] = useState("");

  function changeList(event) {
    setSearchString(event.target.value);
  }

  const matchText = country => {
    const lowerCaseWord = searchString.toLowerCase();
    const lowerCaseCountry = country.name.common.toLowerCase();

    return lowerCaseCountry.indexOf(lowerCaseWord) === 0;
  };

  const finalList = filtered.filter(matchText);
  const slicedfinalList = finalList.slice(0, 5);

  return (
    <div className="container">
      <div className="box">
        <input
          type="text"
          placeholder="Search for a country..."
          onChange={changeList}
        />
        <div>
          <div className="flex1">
            {slicedfinalList.map(x => (
              <CountryInfo key={x.cca3} detailed={false} data={x} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const CountryInfo = props => {
  const country = props.data;
  const detailed = props.detailed;
  const area = props.data.area / 1000000;

  let bredd = (country.area / russia) * 90 + "%";

  return (
    <Link to={"/country/" + country.cca3}>
      <p>
        {" "}
        <b> {country.name.common} </b> {area.toFixed(1)} km<sup>2</sup>{" "}
      </p>
      <div id="bar" style={{ width: bredd }}>
        {" "}
      </div>
      {detailed && (
        <div>
          <b> {country.flag} Capital: </b> {country.capital}
          <b> Region: </b> {country.region}
        </div>
      )}
    </Link>
  );
};

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/country/:cca3" component={CountryDetails} />

          <Route path="/">
            <CountryList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const getCountryByCca3 = cca3 => {
  let getCountryByCca3 = filtered.find(found => found.cca3 === cca3);

  return getCountryByCca3;
};

console.log(filtered);

function CountryDetails(props) {
  console.log("props: ", props);

  let cca3n = props.match.params.cca3;

  let name = getCountryByCca3(cca3n).name.common;
  let borders = getCountryByCca3(cca3n).borders;
  console.log(cca3n);
  console.log(borders);
 /* const f = x => getCountryByCca3(x); */
  let countries = borders.map(getCountryByCca3);

  console.log(countries);

  console.log(props.match.params.cca3);

  return (
    <div>
      <div>
        <Link to="/">Back to search</Link> <h1> Border countries of {name}</h1>{" "}
      </div>

      <div className="box">
        {" "}
        {countries
          .sort((a, b) => b.area - a.area)
          .map(x => (
            <CountryInfo key={x.cca3} detailed={false} data={x} />
          ))}
      </div>
    </div>
  );
}

export default App;