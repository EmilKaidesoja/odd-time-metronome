import { Component } from "react"
import { connect } from 'react-redux'
import sample from "../assets/sample.mp3"
import sample_first from "../assets/sample_first.mp3"

let _ = require("underscore")

class Metronome extends Component {

    state = {
        sample: null,
        sample_first: null,
        bpm: 100,
        playing: false,
        interval: 0,
        firstInterval: 4,
        secondInterval: 4
    }

    componentDidMount() {
        this.setState({
            sample: new Audio(sample),
            sample_first: new Audio(sample_first)
        })
    }

    getIntervalForBpm = (bpm) => {
        return (60 / bpm) * 1000
    }

    start = (bpm) => {
        this.setState({ playing: true, interval: this.getIntervalForBpm(bpm) }, () => {
            var expected = Date.now() + this.state.interval
            console.log("--- Start metronome with ", bpm, " BPM and ", this.state.interval, "interval and time signature", this.state.firstInterval, "/", this.state.secondInterval, "---")
            setTimeout(() => this.play(expected, this.state.firstInterval, 1), this.state.interval)
        })

    }
    play = (expected, bpmInterval, round) => {
        if (round === 1) {
            this.state.sample_first.play()
        } else {
            this.state.sample.play()
            if (round === bpmInterval) {
                round = 0
                bpmInterval = bpmInterval === this.state.firstInterval ? this.state.secondInterval : this.state.firstInterval
            }
        }

        var dt = Date.now() - expected
        expected += this.state.interval
        //console.log(expected, dt)
        if (this.state.playing) {
            setTimeout(() => this.play(expected, bpmInterval, round + 1), this.state.interval - dt)
        }
    }

    stop = () => {
        this.setState({ playing: false })
    }

    handleBpmChange = (value) => {
        this.setState({ bpm: value }, () => {
            if (this.state.playing) {
                this.setState({ playing: false }, () => {
                    setTimeout(() => this.start(this.state.bpm), this.state.interval)
                })
            }
        })
    }

    handleTimeSignatureChange = (e, isFirst) => {
        if (isFirst) {
            this.setState({ firstInterval: e.target.value })
        } else {
            this.setState({ secondInterval: e.target.value })
        }
    }

    render() {
        let intervalOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

        let options = []
        _.map(intervalOptions, opt => {
            options.push(
                <option key={_.uniqueId()} value={opt}>{opt}</option>
            )
        })

        return (
            <div>
                <p>
                    <select id="firstInterval" defaultValue={4} onChange={(e) => this.handleTimeSignatureChange(e, true)}>{options}</select>
                 /
                   <select id="secondInterval" defaultValue={4} onChange={(e) => this.handleTimeSignatureChange(e, false)}>{options}</select>
                </p>

                <p> {this.state.bpm} BPM</p>
                <div>
                    <button onClick={() => this.handleBpmChange(this.state.bpm - 4)} >- 4</button>
                    <input type="range" min="60" max="240" value={this.state.bpm} onChange={(e) => this.handleBpmChange(e.target.value)} />
                    <button onClick={() => this.handleBpmChange(this.state.bpm + 4)}>+ 4</button>
                </div>
                <br />
                <button className="start-button"
                    onClick={() => this.state.playing ? this.stop() : this.start(this.state.bpm)}>
                    <p>{this.state.playing ? "Stop" : "Start"}</p>

                </button>

            </div >
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Metronome)
