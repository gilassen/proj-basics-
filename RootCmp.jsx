
import { AnimalList } from "./cmps/animal-list.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"
import { SeasonClock } from "./cmps/season-clock.jsx"
import { CountDown } from "./cmps/count-down.jsx"
import { WatcherApp } from "./cmps/watcher-app.jsx"
import { MouseMonitor } from "./cmps/mouse-monitor.jsx"

export function RootCmp() {
    return (
        <section className="app main-layout">
            <AppHeader />
            <main>
                <Home />
                {/* <AnimalList animalInfos={[
                    { type: 'Malayan Tiger', count: 787 },
                    { type: 'Mountain Gorilla', count: 212 },
                    { type: 'Fin Whale', count: 28 }
                    ]} /> */}

                {/* <SeasonClock /> */}
                {/* {<CountDown startFrom={10} onDone={()=>{console.log('Done!')}} /> } */}
                <CountDown toTime={Date.now() + 1000*10} onDone={()=>{ 
                    console.log('Its Time!') 
                }} /> 
                {/* <WatcherApp/> */}
                {/* {<MouseMonitor/>} */}
            </main>
        </section>
    )
}