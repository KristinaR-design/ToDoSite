import 'bootstrap/dist/css/bootstrap.min.css'
import './css/font.css'
import './css/components.css'
import './css/Card.css'


import { useState } from "react";

function Card({ task, onUpdate, onDelete }) {
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



    return (


        <div className="outer__block col-xl-6 col-md-6 col-sm-12">
            <div className='section__image-row'>
                {isEditing ? (
                    <>

                        <input type="text" name="name" value={editedTask.name} onChange={handleChange} />
                        <input type="text" name="description" value={editedTask.description} onChange={handleChange} />
                        <input type="datetime-local" name="date" value={editedTask.date} onChange={handleChange} />
                    </>
                ) : (
                    <>
                        <p className="product-details__name ui text size-text3x1">{task.name}</p>
                        <p className="product-details__stock-quantity">{task.description}</p>
                        <p className="product-details__price">Deadline: {task.date}</p>
                    </>
                )}

                <tr />

                <div className='buttons-container'>
                    {isEditing ? (
                        <button onClick={handleSave} className="product-details__add-button ui button lime_300_f9 size-xl fill round add-to-cart-button">Save</button>
                    ) : (
                        <button onClick={handleEdit} className="product-details__add-button ui button lime_300_f9 size-xl fill round add-to-cart-button">Edit</button>
                    )

                    }

                    <button onClick={handleDelete} className="product-details__add-button ui button lime_300_f9 size-xl fill round add-to-cart-button">Delete</button>



                </div>

                <tr />
            </div>
        </div>
    );
}

export default Card;