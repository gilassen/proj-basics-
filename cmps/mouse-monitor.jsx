const { useState, useEffect } = React

export function MouseMonitor() {
  const [isOn, setIsOn] = useState(true)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function updatePos(e) {
      setPos({ x: e.clientX, y: e.clientY })
    }
    if (!isOn) return
    document.addEventListener('mousemove', updatePos)
    return () => document.removeEventListener('mousemove', updatePos)
  }, [isOn])

  return (
    <section className="MouseMonitor">
      <h3>Mouse Position</h3>
      <div>
        {isOn ? `x: ${pos.x}, y: ${pos.y}` : <span>Paused</span>}
      </div>
      <button onClick={() => setIsOn(on => !on)}>
        {isOn ? 'Pause' : 'Resume'}
      </button>
    </section>
  )
}
