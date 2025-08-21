const { useState, useEffect } = React

export function SeasonClock() {
  const [time, setTime] = useState(new Date())
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  function getSeasonByMonth(m) {
    if (m === 11 || m === 0 || m === 1) return 'winter'
    if (m >= 2 && m <= 4) return 'spring'
    if (m >= 5 && m <= 7) return 'summer'
    return 'autumn'
  }

  function onToggleDarkMode() {
    setIsDark(isDark => !isDark)
  }

  const season = getSeasonByMonth(time.getMonth())
  const darkModeClass = isDark ?'dark' : 'light'

  return (
    <section className={`season-clock ${season} ${darkModeClass}`}>
       <img 
        className="clock-icon"
        src={`./assets/img/${season}.png`} 
        alt={season} 
        onClick={onToggleDarkMode} 
        style={{cursor: 'pointer'}}
      />
      <p>{time.toLocaleTimeString()}</p>
    </section>
  )
}
