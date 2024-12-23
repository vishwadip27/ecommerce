"use client"

import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react'

const TodoAndPhotoList = () => {
    const [todos , setTodos] = useState([]);
    const [photos, setPhotos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((data) => setTodos(data));
    })

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/photos")
       .then((response) => response.json())
       .then((data) => setPhotos(data));
    })

   const handleRoute = () => {
        router.push("/route");
   }

  return (
    <div>
        <h1>TodoAndPhotoList component</h1>
        <h2>Todos</h2>
        <ul>
            {todos.slice(0,5).map((todo: any) => (
                <li key={todo.id}>{todo.title} - {todo.completed ? "Completed" : "Pending"}</li>
            ))}
        </ul>
        <h2>Photos</h2>
        <ul>
            {photos.slice(0,2).map((photo: any) => (
                <li key={photo.id}>{photo.title}</li>
            ))}
        </ul>
        <Button onClick={handleRoute} label='click route' />
    </div>
  )
}

export default TodoAndPhotoList
