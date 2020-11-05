import { Component } from "react"
import { connect } from 'react-redux'
import Section from "./Section"
import '../css/App.css'

let _ = require("underscore")

class Configuration extends Component {

    componentDidMount() {
        console.log(this.props)
    }

    render() {

        let sections = _.map(this.props.sections, sect => {
            return <Section key={_.uniqueId()} section={sect} />
        })
        return (
            <div className="configuration-container">
                {sections}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { sections } = state
    return { sections }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration)
