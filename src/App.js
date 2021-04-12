import React, {useState} from 'react'

const api = {
  key: 'af87c4c2f1592abd2c176ab434370655',
  base: 'https://api.openweathermap.org/data/2.5/'
}

const App = () => {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}&lang=ru`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          console.log(result);
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
    let days = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != 'undefined') 
      ? ((weather.main.temp > 5) 
        ? 'app warm' 
        : 'app') 
      : 'app'}>
      <main>
        <div className="search-box">
          <input 
          type="text"
          className='search-bar'
          placeholder='Введите название города'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name},  {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}<sup>°C</sup>
            </div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  )
}

export default App