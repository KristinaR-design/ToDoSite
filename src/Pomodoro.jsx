import React, { Component, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Header.css';
import styles from './css/button.module.css';
// import History from "./History";
// import Card from "./Card";

const FOCUS_TIME = 3;
const BREAK_TIME = 1;
// const [historyTask, setHistoryTask] = useState([]);

class Pomodoro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: FOCUS_TIME,
            counter: this.props.pomo_c,
            task: this.props.cur_task,
            isRunning: false,
            isBreak: false,
            button_state: false,
            cycleCount: 1,
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
            this.setState({ isRunning: false });
        } else {
            this.timer = setInterval(this.tick, 1000);
        }
    }

    tick = () => {
        this.setState((prevState) => {
            if (prevState.timeLeft <= 1) {
                clearInterval(this.timer);
                this.switchMode();

                this.toggleTimer();
                return { timeLeft: 0, isRunning: false };
            }

            return !this.props.button_state ? { timeLeft: prevState.timeLeft - 1 } : { timeLeft: prevState.timeLeft };
        });
    };

    switchMode = () => {
        const newMode = !this.state.isBreak;
        const newTime = !newMode ? FOCUS_TIME : BREAK_TIME;
        const newCounter = newMode ? this.state.counter : Math.max(this.state.counter - 1, 0);

        if (newCounter == 0) {
            if (typeof this.props.onDone === "function") {
                console.log("Вызываем onDone из Pomodoro");
                this.props.onDone();
            } else {
                console.error("Ошибка: onDone не передан или не является функцией!", this.props.onDone);
            }
            clearInterval(this.timer);
            this.timer = null;
            this.setState({ timeLeft: 0, isRunning: true, isBreak: false, button_state: false, counter: newCounter });
        }
        else {
            this.setState({ isBreak: newMode, timeLeft: newTime, counter: newCounter });
        }


    }


    formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };


    render() {
        return (
            <>
                <p className="product-details__price">Pomodoros: {this.state.counter}</p>
                <div className={styles.header__timer}>
                    <p className={styles.timer__label}>
                        {this.state.isBreak ? "Break" : "Work"}: {this.formatTime(this.state.timeLeft)}
                    </p>
                    <div className={styles.timer__btn__container}>
                        <button className={styles.timer__btn} onClick={() => {
                            this.state.button_state = !this.state.button_state;
                            if (this.state.button_state) {
                                this.toggleTimer()
                            }
                            else {
                                clearInterval(this.timer);
                            }
                        }}>
                            {this.state.button_state ? "Pause" : "Start"}
                        </button>
                        <button className={`${styles.timer__btn} ${styles.reset__btn}`} onClick={() => {
                            clearInterval(this.timer);
                            this.timer = null;
                            this.state.button_state = false;
                            this.setState({ timeLeft: FOCUS_TIME, isRunning: false, isBreak: false });
                        }
                        }>
                            Reset
                        </button>
                    </div>
                </div>
            </>

        )
    }
}
export default Pomodoro;

