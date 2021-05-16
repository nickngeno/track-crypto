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

  useEffect(() =>{
    searchInput()

  })

  const handleChange = (e) => {
    const val = e.target.value
    setInput(val);
    setIsSearching(true);
    searchInput(input);
    checkIfsearching(input)
  };

  const checkIfsearching =(input) =>{
    if (input.trim().length === 0){
      setIsSearching(false)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    searchInput();
  };


  const searchInput = () => {
    const myfilter = crypto.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setSearchresult(myfilter);
  }

  return (
    <div className="container">
      <div className="row searchbar">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <form className="d-flex">
              <input
                className="form-control  me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleChange}
              />
              {input ? (<button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
              >
                Search
              </button>) : (<button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
                disabled
              >
                Search
              </button>) }
            </form>
          </div>
        </nav>
      </div>
      {isLoading && <Spinner animation="border" />}
      <div className="row">
        <div className="col resultstable">
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
            {isSearching
              ? searchresult.map((item,index) => (
                  <tbody>
                    <tr key={item.id} >
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.symbol}</td>
                      <td>{item.current_price}</td>
                      <td>{item.price_change_24h}</td>
                    </tr>
                  </tbody>
                ))
              : crypto.map((item, index) => (
                  <tbody>
                    <tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.symbol}</td>
                      <td>{item.current_price}</td>
                      <td>{item.price_change_24h}</td>
                    </tr>
                  </tbody>
                ))}
                
          </table>
          {(isSearching && searchresult.length ===0) && (<p style={{textAlign: "center",fontStyle:"italic"}}>No match found!</p>)}
        </div>
      </div>
    </div>
  );
}
