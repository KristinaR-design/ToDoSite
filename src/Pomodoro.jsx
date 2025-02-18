import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Header.css';

const FOCUS_TIME = 10;
const BREAK_TIME = 10;

class Pomodoro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: FOCUS_TIME,
            isRunning: false,
            isBreak: false,
        };
        this.timer = null;
    }

    componentDidMount() {
        console.log("Timer is uploaded.");
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        console.log("Timer is deleted.");
    }

    toggleTimer = () => {
        if (this.state.isRunning) {
            clearInterval(this.timer);
            this.setState({isRunning: false});
        } else {
            this.timer = setInterval(this.tick, 1000);
            this.setState({isRunning: true});
        }
    }

    tick = () => {
        this.setState((prevState) => {
            if (prevState.timeLeft <= 1) {
                clearInterval(this.timer);
                this.switchMode();
                return { timeLeft: 0, isRunning: false};
            }
            return { timeLeft: prevState.timeLeft - 1};
        });
    };

    switchMode = () => {
        const newMode = !this.state.isBreak;
        const newTime = newMode ? FOCUS_TIME : BREAK_TIME;
        this.setState({ isBreak: newMode, timeLeft: newTime});
    }

    formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    render() {
        return (
            <div className='header__timer'>
                <p className='timer-label'>
                    {this.state.isBreak ? "Break" : "Work"}: {this.formatTime(this.state.timeLeft)}
                </p>
                <div className='timer-btn-container'>
                    <button className="timer-btn" onClick={this.toggleTimer}>
                        {this.state.isRunning ? "Pause" : "Start"}
                    </button>
                    <button className="timer-btn reset-btn" onClick={() => {
                        clearInterval(this.timer);
                    this.timer = null;
                    this.setState({ timeLeft: FOCUS_TIME, isRunning: false, isBreak: false });
                }}>
                    Reset
                </button>
                </div>
            </div>
        )
    }

}

export default Pomodoro;

