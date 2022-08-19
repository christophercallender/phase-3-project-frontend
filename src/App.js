import React, { useEffect, useState } from 'react';
import { Navbar, Container, Dropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import buttondark from './media/buttondark.png';
import buttonlight from './media/buttonlight.png';
import Cards from './Cards.js';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [sortSelected, setSortSelected] = useState('');
  const [sortedByDescription, setSortedByDescription] = useState(true);
  const [sortedByDate, setSortedByDate] = useState(true);
  const [sortedByTime, setSortedByTime] = useState(true);
  const [sortedByCategory, setSortedByCategory] = useState(true);
  const [sortedByPriority, setSortedByPriority] = useState(true);
  const [sortedByCompleted, setSortedByCompleted] = useState(true);
  const [mode, setMode] = useState('light');
  const [rerender, setRerender] = useState(false);
  const textboxStyle =
    mode === 'light'
      ? {
          backgroundColor: 'rgba(230, 230, 230)',
          borderColor: 'white',
          borderRadius: '5px',
          borderWidth: '1px',
          color: 'black',
        }
      : {
          backgroundColor: 'rgb(25, 25, 25)',
          borderColor: 'black',
          borderRadius: '5px',
          borderWidth: '1px',
          color: 'lightgray',
        };

  useEffect(() => {
    fetch('http://localhost:9292/todos')
      .then((r) => r.json())
      .then((d) => setTodos(d.reverse()))
      .then(() =>
        fetch('http://localhost:9292/categories')
          .then((r) => r.json())
          .then((d) => setCategories(d))
      );
  }, [rerender]);

  function handleCreate(e) {
    e.preventDefault();
    fetch('http://localhost:9292/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: newDescription,
        date_due: newDate,
        time_due: newTime,
        category_id: null,
        category_name: newCategory,
        priority: newPriority,
        completed: false,
      }),
    })
      .then((r) => r.json())
      .then((d) => setTodos(todos.map((todo) => (todo.id === d.id ? d : todo))))
      .then(() => setRerender(!rerender))
      .then(() => {
        setNewDescription('');
        setNewCategory('');
        setNewPriority('');
        setNewDate('');
        setNewTime('');
      });
  }

  function handleUpdate(id, attr, value) {
    let fetchURL = null;
    attr === 'category_name'
      ? (fetchURL = `http://localhost:9292/todos/${id}/category`)
      : (fetchURL = `http://localhost:9292/todos/${id}`);

    fetch(fetchURL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [attr]: value,
      }),
    })
      .then((r) => r.json())
      .then((d) => setTodos(todos.map((todo) => (todo.id === d.id ? d : todo))))
      .then(() => setRerender(!rerender));
  }

  function handleDelete(id) {
    fetch(`http://localhost:9292/todos/${id}`, {
      method: 'DELETE',
    })
      .then((r) => r.json())
      .then((d) => setTodos(todos.filter((todo) => todo.id !== d.id)))
      .then(() => setRerender(!rerender));
  }

  return (
    <>
      <Navbar
        bg="dark"
        expand="sm-md-lg"
        className="sticky-top"
        style={{
          borderBottomColor: 'rgb(255, 255, 255, 0.2)',
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4)',
        }}
      >
        <Container
          fluid
          style={{ color: 'white', marginRight: '10px', marginLeft: '10px' }}
        >
          <h3>Todo List Pro</h3>
          <input
            type="text"
            style={textboxStyle}
            placeholder="Enter a new todo"
            value={newDescription}
            onChange={(e) =>
              setNewDescription(
                e.target.value
                  .split('. ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join('. ')
                  .split('! ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join('! ')
                  .split('? ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join('? ')
              )
            }
          />
          <input
            type="date"
            style={textboxStyle}
            placeholder=""
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <input
            type="time"
            style={textboxStyle}
            placeholder=""
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
          <input
            type="text"
            style={textboxStyle}
            placeholder="Enter a category"
            value={newCategory}
            onChange={(e) =>
              setNewCategory(
                e.target.value
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
              )
            }
          />
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
              {newPriority || 'Priority'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {['High', 'Medium', 'Low'].map((priority) => (
                <Dropdown.Item
                  key={priority}
                  onClick={() => {
                    setNewPriority(priority);
                  }}
                >
                  {priority}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              newDescription && newDate && newTime && newCategory && newPriority
                ? handleCreate(e) && window.scrollTo(0, 0)
                : alert('Please fill out all fields!');
            }}
          >
            Submit
          </Button>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
              {sortSelected || 'Sort by'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {[
                [
                  'description',
                  'Description',
                  sortedByDescription,
                  setSortedByDescription,
                ],
                ['date_due', 'Date', sortedByDate, setSortedByDate],
                ['time_due', 'Time', sortedByTime, setSortedByTime],
                [
                  'category_name',
                  'Category',
                  sortedByCategory,
                  setSortedByCategory,
                ],
                ['priority', 'Priority', sortedByPriority, setSortedByPriority],
                [
                  'completed',
                  'Completed',
                  sortedByCompleted,
                  setSortedByCompleted,
                ],
              ].map(([key, label, sortedBy, setSortedBy]) => (
                <Dropdown.Item
                  key={key}
                  onClick={() => {
                    setTodos(
                      todos.sort((a, b) => {
                        return key === 'priority'
                          ? a[key] === 'High'
                            ? 1
                            : b[key] === 'High'
                            ? -1
                            : a[key] === 'Medium'
                            ? 1
                            : b[key] === 'Medium'
                            ? -1
                            : a[key] === 'Low'
                            ? 1
                            : b[key] === 'Low'
                            ? -1
                            : 0
                          : a[key] < b[key]
                          ? 1
                          : -1;
                      })
                    );
                    setSortSelected(label);
                    setSortedBy(!sortedBy);
                    sortedBy ? setTodos(todos.reverse()) : setTodos(todos);
                  }}
                >
                  {label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button
            variant="dark"
            style={{
              // border: 'none',
              // background: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          >
            <img
              src={mode === 'light' ? buttonlight : buttondark}
              width={20}
              alt={'darkmode button'}
            />
          </Button>
        </Container>
      </Navbar>

      <Cards
        todos={todos}
        categories={categories}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        textboxStyle={textboxStyle}
        mode={mode}
      />

      <Navbar
        bg="dark"
        expand="sm-md-lg"
        className="sticky-bottom"
        style={{
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4)',
          borderTopColor: 'rgb(255, 255, 255, 0.3)',
          borderTopStyle: 'solid',
          borderTopWidth: '1px',
          marginTop: '15px',
        }}
      >
        <Container
          fluid
          className="d-flex justify-content-center"
          style={{ color: 'white', marginLeft: '10px', marginRight: '10px' }}
        >
          <h3>Todo List Pro</h3>
        </Container>
        <Container
          fluid
          className="d-flex justify-content-center"
          style={{ color: 'white', marginLeft: '10px', marginRight: '10px' }}
        >
          <small>
            Copyright © 2022 Todo List Pro Inc. All rights reserved.
          </small>
        </Container>
      </Navbar>
    </>
  );
}
