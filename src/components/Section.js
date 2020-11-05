
import { Component } from "react"
import '../css/App.css'

function Section(props) {
    return (
        <div className="section-container" >
            <p>
                {props.section.firstInterval} / {props.section.secondInterval}
            </p>

        </div>
    )
}

export default Section
