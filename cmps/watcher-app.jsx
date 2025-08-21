import {storageService} from "../services/async-storage.service.js"

const { useState, useEffect } = React

const ENTITY = 'watchers'

export function WatcherApp () {

    const[watchers, setWatchers] = useState(null)
    const [selectedWatcher, setSelectedWatcher] = useState(null)

    useEffect(() => {
        loadwatchers()
    }, [])

    function loadwatchers(){
        storageService.query(ENTITY)
        .then(setWatchers)
        .catch(err => {
                console.log('err:', err)
            })
    }

    function onPost(watcher) {
    storageService.post(ENTITY, watcher)
        .then(newWatcher => setWatchers(prev => [...prev, newWatcher]))
        .catch(err => console.log('err:', err))
    }


    function onRemove(watcherID) {
        storageService.remove(ENTITY,watcherID)
            .then(() => {
                setWatchers(watchers => watchers.filter(watcher => watcher.id !== watcherID))
            })
            .catch(err=>{
                console.log('err:', err)
            })
    }

    function onPut(watcher) {
        storageService.put(ENTITY, watcher)
           .then(() => loadwatchers())
           .catch(err => console.log('err:', err))
    }

    if (!watchers) return <div>Loading...</div>
   return (
  <section className="watcher-app">
    <h2>Watcher App</h2>

   <button onClick={() => {
    const fullname = prompt('Full name?')
    if (!fullname) return

    const moviesStr = prompt('Favorite movies (comma-separated)?') || ''
    const movies = moviesStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    onPost({ fullname: fullname.trim(), movies })
    }}>
        Add Watcher
    </button>


    <section className="watcher-list">
      {watchers.map(w => (
        <article key={w.id} className="watcher-card">
          <h3>{w.fullname}</h3>
          <div className="actions">
            <button onClick={() => onRemove(w.id)}>x</button>
            <button onClick={() => setSelectedWatcher(w)}>Select</button>
            <button onClick={() => {
        const fullname = prompt('Update name:', w.fullname)
        if (fullname == null) return
        
        const moviesStr = prompt('Update movies (comma-separated):', (w.movies || []).join(', '))
        if (moviesStr == null) return
        
        const movies = moviesStr.split(',').map(s => s.trim()).filter(Boolean)
        
        onPut({ id: w.id, fullname: fullname.trim(), movies })
        }}>
            Edit
    </button>
          </div>
        </article>
      ))}
    </section>

    {selectedWatcher && (
        <div className="modal-backdrop" onClick={() => setSelectedWatcher(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h3>{selectedWatcher.fullname}</h3>
                {Array.isArray(selectedWatcher.movies) && selectedWatcher.movies.length ? (
                    <ul className="movies">
                        {selectedWatcher.movies.map((movie, idx) => (
                            <li key={idx}>{movie}</li>
                        ))}
                    </ul>
                ) : (
                <p className="empty">No movies yet</p>)}
        <button onClick={() => setSelectedWatcher(null)}>Close</button>
        </div>
        </div>
    )}
    </section>
)}