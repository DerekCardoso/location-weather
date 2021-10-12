import React, { useState } from "react";

const api = {
  key: "4c8d0bdade4295e2df3f73f43cf3c833",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
        .catch((error) => {
          console.log('Catch :', error);
        });
    }
  } 

  const dateBuilder = (d) => {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Augusto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} de ${month} de ${year}`
  }

  const armazenar =(chave,valor) =>{
    localStorage.setItem(chave, valor);
  };
  const apagar =(chave) =>{
    localStorage.removeItem(chave);
  };

  return (
    <div className="wrapper">
      <div className="main">
        
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>

              <button onClick={() => armazenar('ls_w', [new Date(),weather.main.temp, weather.name])}>Armazenar</button>
              <button onClick={() => apagar('ls_w')}>Apagar</button>
          </div>
        </div>
        ) : ('')}
      </main>
        </div>
    </div>
</div>
  );
}

export default App;
