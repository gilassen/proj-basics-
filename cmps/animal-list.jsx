
export function AnimalList({animalInfos}) {

    return (
        <section className="animal-list">
            <h2>Rare Animals</h2>
            <table>
                <tbody>
                    {animalInfos.map(animalInfo =>
                        <tr key={animalInfo.type}>
                            <td>{animalInfo.type}</td>
                            <td>{animalInfo.count}</td>
                            <td><a href={`https://www.google.com/search?q=${animalInfo.type}`} target="_blank">
                            Search</a></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}