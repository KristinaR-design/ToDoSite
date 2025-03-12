import React, { useState, useRef } from "react";
import './css/styles.css';
import './css/components.css';

function History({ historyTasks, setCurrentPage }) {
    const [search, setSearch] = useState("");
    const [filteredTasks, setFilteredTasks] = useState(historyTasks);

    const dateFromRef = useRef(null);
    const dateToRef = useRef(null);

    const filterTasks = () => {
        const dateFrom = dateFromRef.current.value;
        const dateTo = dateToRef.current.value;

        let filtered = historyTasks.filter(task =>
            task.name.toLowerCase().includes(search.toLowerCase())
        );

        if (dateFrom) {
            filtered = filtered.filter(task => new Date(task.date) >= new Date(dateFrom));
        }

        if (dateTo) {
            filtered = filtered.filter(task => new Date(task.date) <= new Date(dateTo));
        }

        setFilteredTasks(filtered);
    };

    return (
        <div className="container">
            <div className="search__container">
                <input
                    className="search__input"
                    type="text"
                    value={search}
                    placeholder="Search tasks..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="search__button" onClick={filterTasks}>
                    <img className="search__icon" src={'/images/search.png'} alt="search" />
                </button>
            </div>

            <div className="date__filter">
                <label className="ui text size-textmd">From: </label>
                <input className="date-input" type="date" ref={dateFromRef} />
                <label className="ui text size-textmd">To: </label>
                <input className="date-input" type="date" ref={dateToRef} />
                <button className="filter__button" onClick={filterTasks}>Apply Filter</button>
            </div>

            <br />
            {filteredTasks.length > 0 ? (
                <div className="row">
                    {filteredTasks.map((task, index) => (
                        <div key={index} className="col-md-4 mb-3">
                            <div className="card gcolor">
                                <div className="card-body">
                                    <h5 className="card-title">{task.name}</h5>
                                    <p className="card-text">{task.description}</p>
                                    <p className="card-text gcolor">
                                        <small className="text-muted gcolor">Completed on: {task.date}</small>  
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No completed tasks found.</p>
            )}

            <button className="product-details__add-button ui button lime_300_f9 size-xl fill round add-to-cart-button" onClick={() => setCurrentPage("tasks")}>
                Back to tasks
            </button>
        </div>
    );
}

export default History;
