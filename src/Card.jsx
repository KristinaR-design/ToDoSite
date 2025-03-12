import 'bootstrap/dist/css/bootstrap.min.css'
import './css/font.css'
import './css/components.css'
import './css/Card.css'
import Pomodoro from './Pomodoro';
import styled from 'styled-components';


import { useState } from "react";

const Button = styled.button`
    color: var(--black_900) !important;
    margin-top: 6px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 0px 20px !important;
    font-family: Dongle;
    font-size: 40px;
    background-color: var(--lime_300_f9) !important;
    box-shadow: 4px 4px 4px 0 #0000003f;
    height: 60px !important;
    border-radius: 14px !important;
    border: 1px solid var(--black_900);
    position: relative;
    float: right;
    @media only screen and (max-width: 1440px) {
        font-size: 35px;
    }

    @media only screen and (max-width: 1050px) {
        font-size: 32px;
        margin-left: 0px;
        margin-right: 0px;
    }
    
    @media only screen and (max-width: 550px) {
        font-size: 26px;
        padding-left: var(--space-sm);
        padding-right: var(--space-sm);
    }

    &:hover {
        background-color: var(--darker_lime_300_f9) !important  }
  `;

function Card({ task, onUpdate, onDelete, onMoveToHistory }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDelete = () => {
        onDelete();
    }

    const handleSave = () => {
        onUpdate(editedTask);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };


    const handleDone = () => {
        onDelete();
        onMoveToHistory(task);
    }


    return (


        <div className="outer__block col-xl-6 col-md-6 col-sm-12">
            <div className='section__image-row'>
                {isEditing ? (
                    <>

                        <input type="text" name="name" value={editedTask.name} onChange={handleChange} />
                        <input type="text" name="description" value={editedTask.description} onChange={handleChange} />
                        <input type="datetime-local" name="date" value={editedTask.date} onChange={handleChange} />
                        <input type="number" name="pomo" value={editedTask.pomo} onChange={handleChange} />

                        <tr />
                        <div className='buttons-container'>

                            <div className='pom_div'>
                                <Pomodoro pomo_c={task.pomo} cur_task={task} onDone={handleDone} />
                            </div>


                            {isEditing ? (
                                <Button onClick={handleSave} >Save</Button>
                            ) : (
                                <Button onClick={handleEdit} >Edit</Button>
                            )

                            }
                            <Button onClick={handleDelete}>Delete</Button>
                            <Button onClick={handleDone}>Done</Button>



                        </div>

                        <tr />

                    </>
                ) : (
                    <>
                        <p className="product-details__name ui text size-text3x1">{task.name}</p>
                        <p className="product-details__stock-quantity">{task.description}</p>
                        <p className="product-details__price">Deadline: {task.date}</p>

                        <tr />
                        <div className='buttons-container'>

                            <div className='pom_div'>
                                <Pomodoro pomo_c={task.pomo} />
                            </div>


                            {isEditing ? (
                                <Button onClick={handleSave}>Save</Button>
                            ) : (
                                <Button onClick={handleEdit}>Edit</Button>
                            )

                            }
                            <Button onClick={handleDelete} >Delete</Button>
                            <Button onClick={handleDone}>Done</Button>



                        </div>

                        <tr />

                    </>
                )}


            </div>
        </div>
    );
}

export default Card;