import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  const data = localStorage.getItem('list')
  return data ? JSON.parse(data) : []
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name) {
      showAlert('danger', 'name your item.')
      return;
    }
    if(isEditing){
      updateList()
      return
    }
    addItem()
  }

  const addItem = () => {
    const newItem = { id: crypto.randomUUID(), title: name }
    setList([...list, newItem])
    setName('')
    showAlert('success', 'item added.')
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  const deleteItem = (id) => {
    const newList = list.filter((item) => item.id !== id)
    setList(newList);
    setAlert('success', 'item removed.')
  }

  const updateList = () => {
    const newList = list.map((item) => {
      if(item.id ===editID)
      return { ...item, title: name }
      return item;
    })
    setList(newList)
    setIsEditing(false)
    setName('')
    showAlert('success', 'item updated.')
  }

  const clearList = () => {
    setList([])
    showAlert('success', 'list has been cleared.')
  }

  const showAlert = (type='', msg='') => {
    setAlert({show: true, type, msg})
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000)
    return () => clearTimeout(timeout);
  }, [alert])

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return <section className='section-center'>
    <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} />}
      <h3>grocery bud</h3>
      <div className='form-control'>
        <input
          type='text'
          className='grocery'
          placeholder='e.g. eggs'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit' className='submit-btn'>
          {isEditing ? 'edit' : 'submit'}
        </button>
      </div>
    </form>
    { list.length > 0 && (
      <div className='grocery-container'>
        <List items={list} deleteItem={deleteItem} editItem={editItem} />
        <button 
          type='button' 
          className='clear-btn'
          onClick={() => clearList()}
        >
          clear list
        </button>
      </div>
    )}
  </section>
}

export default App
