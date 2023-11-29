import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_BASE_URL

//export default function EditBookmarkForm () {}
const EditBookmarkForm = () => {

    const [editBookmark, setEditBookmark] = useState({
        name: "",
        url: "",
        category: "",
        description: "",
        is_favorite: false,
    })

    const { id } = useParams()
    const navigate = useNavigate()

    //on Change [this is a prop]
    //function handleChange() {}
    const handleChange = (event) => {
        const idValue = event.target.id
        const inputValue = event.target.value
        //prev is the previous useState object above, which is editBookmark object with name, url etc. 
        setEditBookmark((prev) => {
            return { ...prev, [idValue]: inputValue }
        })
    }

    const handleCheckbox = (event) => {
        const isChecked = event.target.checked

        setEditBookmark((prev) => {
            return { ...prev, is_favorite: isChecked }

        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(`${API}/bookmarks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(editBookmark),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => navigate(`/bookmarks/${id}`))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch(`${API}/bookmarks/${id}`)
            .then(res => res.json())
            .then(resJSON => setEditBookmark(resJSON))
            .catch(err => console.log(err))
    }, [])



    return (
        <div className='editBookmarkForm'>

            <form onSubmit={handleSubmit}>

                {/* name */}
                <label htmlFor="name"> Bookmark Name:
                    <input
                        type="text"
                        id="name"
                        value={editBookmark.name}
                        onChange={handleChange}
                    />
                </label>

                <br /><br />

                {/* url */}
                <label htmlFor="url"> Bookmark URL:
                    <input
                        type="url"
                        id="url"
                        value={editBookmark.url}
                        onChange={handleChange}
                    />
                </label>

                <br /><br />

                {/* Category */}
                <label htmlFor="category"> Category:
                    <input
                        type="text"
                        id="category"
                        value={editBookmark.category}
                        onChange={handleChange}
                    />
                </label>

                <br /><br />

                {/* Description */}
                <label htmlFor="description"> Description:
                    <input
                        type="text"
                        id="description"
                        value={editBookmark.description}
                        onChange={handleChange}
                    />
                </label>

                <br /><br />

                {/* is_favorite Checkbox */}
                <label htmlFor="is_favorite"> Favorite:
                    <input
                        type="checkbox"
                        id="is_favorite"
                        value={editBookmark.is_favorite}
                        checked={editBookmark.is_favorite}
                        onChange={handleCheckbox}
                    />

                </label>

                <br /> <br />
                <input
                    type="submit"
                    value="Update Bookmark"
                />

            </form >
        </div >
    );
};

export default EditBookmarkForm;