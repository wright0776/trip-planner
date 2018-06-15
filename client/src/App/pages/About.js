import React from 'react'

function About() {
    return (
        <div className="about">
            <h2>Creators</h2> 
            <p><a href="https://github.com/wright0776">Matt Wright</a>, <a href="https://github.com/vnsn/">Jennifer Evenson</a>, <a href="https://github.com/Ateeqbahaduri">Ateeq Bahaduri</a></p>

            <h2>Objective</h2>
            <p>Keep travel plans and reservation information for (primarily) multi-city trips all in one place for easy reference on the go. </p>
            
            <p>Example use case is an American traveling to Europe for 2 weeks and visiting 4 cities in those 2 weeks. </p>
            <ul>
                <li>For each city, the person will have some method of traveling there - flight, train, boat, etc. - as well as some way of getting to and from airports / train stations.</li>
                <li>There might be rental cars.</li>
                <li>They'll have hotel reservations for each city, as well as possibly having reservations for tours, museums, fancy restaurants, going up in the Eiffel Tower, etc.</li>
                <li>There's a lot to keep track of and it's a pain to keep digging through email to find reservation times on confirmation emails.</li>
            </ul>

        <h2>View on Github</h2>
            <p><a href="https://github.com/vnsn/trip-planner">github.com/vnsn/trip-planner</a></p>
        </div>
    )
}

export default About
