const { useState, useEffect } = React

export function CountDown({startFrom, onDone, toTime}) {
    
    function secondsLeft(targetMs) {
        return Math.max(0, Math.ceil((targetMs - Date.now()) / 1000))
    }

    const [count, setCount] = useState(
        toTime ? secondsLeft(toTime) : startFrom
    )

    useEffect(() => {
        if(count <= 0)
        {
            onDone()
            return
        }
        const id = setInterval(() =>
            setCount(prev => prev-1), 1000)
        return () => clearInterval(id)
    }, [count])

    return (
        <section className="count-down">
            <h1 className={`count ${count <= 6 ? 'danger' : ''}`}>
                {String(count).padStart(2, '0')}
            </h1>
        </section>
    )
}