import React from "react";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

export default function Search() {
  const [crypto, setCrypto] = useState([]);
  const [searchresult, setSearchresult] = useState(crypto);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(true);
  // console.log(input)

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage='7d'`
    )
      .then((response) => response.json())
      .then((data) => {
        setCrypto(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const searchInput = () => {
      const myfilter = crypto.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setSearchresult(myfilter);
    };
    searchInput();
  }, [input, crypto]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    setIsSearching(true);
    checkIfsearching(input);
  };
  //checking is there is a search going on

  const checkIfsearching = (input) => {
    if (input.trim().length === 0) {
      setIsSearching(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container content-div">
      <nav className="navbar navbar-light">
          <form className="d-flex">
            <input
              className="form-control  me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleChange}
            />
            {input ? (
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
              >
                Search
              </button>
            ) : (
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
                disabled
              >
                Search
              </button>
            )}
          </form>
      </nav>
      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Symbol</th>
              <th scope="col">Current_price</th>
              <th scope="col">Net_PriceChange_24h</th>
            </tr>
          </thead>
          <tbody>
            {isSearching
              ? searchresult.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.symbol}</td>
                    <td>{item.current_price.toFixed(2)}</td>
                    <td>{item.price_change_24h.toFixed(2)}</td>
                  </tr>
                ))
              : crypto.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.symbol}</td>
                    <td>{item.current_price}</td>
                    <td>{item.price_change_24h}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        <div style={{ textAlign: "center", fontStyle: "italic" }}>
          {isLoading && <Spinner animation="border" variant="primary" />}
          {isSearching && searchresult.length === 0 && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}
