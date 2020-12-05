import React from "react";
import logo from "./logo.svg";
import "./App.css";
import countries from "world-countries";

countries.sort((a, b) => b.area - a.area);

const filtered = countries.filter(
  country => country.name.common !== "Antarctica"
);
const sliced = filtered.slice(0, 15);
const sliced5 = sliced.slice(0, 5);
const sliced10 = sliced.slice(5, 15);
let russia = sliced[0].area;

function App() {
  console.log(countries);
  console.log(filtered);
  console.log(sliced);
  console.log(russia);
  console.log(sliced5);
  console.log(sliced10);

  return (
    <div className="container">
      <div class="box">
        <div>
          <div class="flex1">
            {sliced5.map(x => (
              <CountryInfo key={x.cca3} detailed={true} data={x} />
            ))}
          </div>
          <div class="flex2">
            {sliced10.map(x => (
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
    <div>
      <div>
        <b>Country: </b> {country.name.common} {area.toFixed(1)} km<sup>2</sup>
        <div id="bar" style={{ width: bredd }}></div>
        {detailed && (
          <div>
            <b> {country.flag} Capital: </b> {country.capital}
            <b> Region: </b> {country.region}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
