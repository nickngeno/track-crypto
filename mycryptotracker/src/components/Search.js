import React from "react";
import { useState, useEffect } from "react";

export default function Search() {
  let [crypto, setCrypto] = useState([]);
  const [input, setInput] = useState("");

  console.log("input value:" + input);
  console.log(crypto);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage='7d'`
    )
      .then((response) => response.json())
      .then((data) => {
        setCrypto(data);
      });
  }, [input]);

  function handleSubmit(e) {
    e.preventDefault();
    searchFilter();
  }

  function searchFilter() {
    const myfilter = crypto.filter((item) => item.name.toLowerCase() === input);

    setCrypto(myfilter);
  }

  return (
    <div className="container">
      <div className="searchbar">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <form className="d-flex">
              <input
                className="form-control  me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={handleSubmit}
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
    
        <div className="row">
          <div
            className="resultstable"
            // style={{
            //   marginTop: "2em",
            //   backgroundColor: "khaki",
            //   borderRadius: 5,
              
            // }}
          >
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Symbol</th>
                  <th scope="col">Current_price</th>
                  <th scope="col">High_24h</th>
                  <th scope="col">Low_24h</th>
                  <th scope="col">Net_PriceChange</th>
                </tr>
              </thead>
              {crypto.map((item, index) => (
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.symbol}</td>
                    <td>{item.current_price}</td>
                    <td>{item.high_24h}</td>
                    <td>{item.low_24h}</td>
                    <td>{item.price_change_24h}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
    </div>
  );
}
