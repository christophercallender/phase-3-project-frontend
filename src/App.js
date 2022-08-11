import React, { useEffect, useState } from 'react';
import {
  Navbar,
  Container,
  Card,
  Col,
  Row,
  Dropdown,
  Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import buttondark from './media/buttondark.png';
import buttonlight from './media/buttonlight.png';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [sortBy, setSortBy] = useState('');
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

  function handleCreateTodo(e) {
    e.preventDefault();
    fetch('http://localhost:9292/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: newDescription,
        priority: newPriority,
        date_due: newDate,
        time_due: newTime,
        completed: false,
        category_id: null,
        category_name: newCategory,
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

  function handleChangeDescription(id, description) {
    fetch(`http://localhost:9292/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: description,
      }),
    })
      .then((r) => r.json())
      .then((d) =>
        setTodos(
          todos.map((todo) =>
            todo.id === d.id
              ? {
                  ...todo,
                  description: d.description,
                }
              : todo
          )
        )
      );
  }

  function handleChangeCategory(id, category) {
    fetch(`http://localhost:9292/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category_name: category,
      }),
    })
      .then((r) => r.json())
      .then((d) =>
        setTodos(
          todos.map((todo) =>
            todo.id === d.id
              ? {
                  ...todo,
                  category_name: d.category_name,
                }
              : todo
          )
        )
      );
  }

  function handleChangeDate(id, date) {
    fetch(`http://localhost:9292/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date_due: date,
      }),
    })
      .then((r) => r.json())
      .then((d) =>
        setTodos(
          todos.map((todo) =>
            todo.id === d.id
              ? {
                  ...todo,
                  date_due: d.date_due,
                }
              : todo
          )
        )
      );
  }

  function handleChangeTime(id, time) {
    fetch(`http://localhost:9292/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        time_due: time,
      }),
    })
      .then((r) => r.json())
      .then((d) =>
        setTodos(
          todos.map((todo) =>
            todo.id === d.id
              ? {
                  ...todo,
                  time_due: d.time_due,
                }
              : todo
          )
        )
      );
  }

  function handleChangePriority(id, priority) {
    fetch(`http://localhost:9292/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priority: priority,
      }),
    })
      .then((r) => r.json())
      .then((d) =>
        setTodos(
          todos.map((todo) =>
            todo.id === d.id
              ? {
                  ...todo,
                  priority: d.priority,
                }
              : todo
          )
        )
      );
  }

  function handleChangeCompleted(id, completed) {
    fetch(`http://localhost:9292/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !completed,
      }),
    })
      .then((r) => r.json())
      .then((d) =>
        setTodos(
          todos.map((todo) =>
            todo.id === d.id
              ? {
                  ...todo,
                  completed: d.completed,
                }
              : todo
          )
        )
      );
  }

  function handleDeleteTodo(id) {
    fetch(`http://localhost:9292/todos/${id}`, {
      method: 'DELETE',
    })
      .then((r) => r.json())
      .then((d) => setTodos(todos.filter((todo) => todo.id !== d.id)));
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
                  .split('.')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join('.')
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
              handleCreateTodo(e);
            }}
          >
            Submit
          </Button>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
              {sortBy || 'Sort by'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {[
                'description',
                'category_name',
                'date_due',
                'time_due',
                'completed',
              ].map((toSortBy) => (
                <Dropdown.Item
                  key={toSortBy}
                  onClick={() => {
                    setTodos(
                      todos.sort((a, b) => {
                        if (a[toSortBy] < b[toSortBy]) {
                          return -1;
                        }
                        if (a[toSortBy] > b[toSortBy]) {
                          return 1;
                        }
                        return 0;
                      })
                    );
                    setSortBy(
                      toSortBy === 'description'
                        ? 'Description'
                        : toSortBy === 'category_name'
                        ? 'Category'
                        : toSortBy === 'date_due'
                        ? 'Date'
                        : toSortBy === 'time_due'
                        ? 'Time'
                        : toSortBy === 'completed'
                        ? 'Completed'
                        : ''
                    );
                  }}
                >
                  {toSortBy === 'description'
                    ? 'Description'
                    : toSortBy === 'category_name'
                    ? 'Category'
                    : toSortBy === 'date_due'
                    ? 'Date'
                    : toSortBy === 'time_due'
                    ? 'Time'
                    : toSortBy === 'completed'
                    ? 'Completed'
                    : ''}
                </Dropdown.Item>
              ))}
              <Dropdown.Item
                onClick={() => {
                  setTodos(
                    todos.sort((a, b) => {
                      if (a.priority === 'High' && b.priority === 'Medium') {
                        return -1;
                      }
                      if (a.priority === 'Medium' && b.priority === 'High') {
                        return 1;
                      }
                      if (a.priority === 'High' && b.priority === 'Low') {
                        return -1;
                      }
                      if (a.priority === 'Low' && b.priority === 'High') {
                        return 1;
                      }
                      if (a.priority === 'Medium' && b.priority === 'Low') {
                        return -1;
                      }
                      if (a.priority === 'Low' && b.priority === 'Medium') {
                        return 1;
                      }
                      return 0;
                    })
                  );
                  setSortBy('Priority');
                }}
              >
                Priority
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setTodos(todos.reverse());
                  setSortBy('REVERSE');
                }}
              >
                REVERSE
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <button
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          >
            <img
              src={mode === 'light' ? buttonlight : buttondark}
              width={20}
              alt={'darkmode button'}
            />
          </button>
        </Container>
      </Navbar>

      {todos.length > 0
        ? todos.map((todo) => (
            <Card
              key={todo.id}
              bg={mode === 'light' ? 'light' : 'dark'}
              expand="sm-md-lg"
              className="d-flex justify-content-between"
              style={{
                color: 'black',
                width: '66%',
                marginTop: '15px',
                marginLeft: 'auto',
                marginRight: 'auto',
                boxShadow:
                  '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)',
              }}
            >
              <Container
                fluid
                style={{
                  color: 'black',
                  paddingTop: '15px',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  paddingBottom: '15px',
                }}
              >
                <Row
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <Col align="left">
                    <textarea
                      style={textboxStyle}
                      defaultValue={todo.description}
                      onChange={(e) =>
                        handleChangeDescription(todo.id, e.target.value)
                      }
                    />
                  </Col>
                  <Col align="right">
                    <input
                      style={textboxStyle}
                      type="date"
                      defaultValue={todo.date_due}
                      onChange={(e) =>
                        handleChangeDate(todo.id, e.target.value)
                      }
                    />
                  </Col>
                  <Col align="right">
                    <input
                      style={textboxStyle}
                      type="time"
                      defaultValue={todo.time_due.substring(11, 16)}
                      onChange={(e) =>
                        handleChangeTime(todo.id, e.target.value)
                      }
                    />
                  </Col>
                  <Col align="right">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="secondary"
                        size="sm"
                        id="dropdown-basic"
                      >
                        {todo.category_name}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {categories.map((category) => (
                          <Dropdown.Item
                            key={category.id}
                            onClick={() => {
                              handleChangeCategory(todo.id, category.name);
                            }}
                          >
                            {category.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col align="right">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant={
                          todo.priority === 'Low'
                            ? 'primary'
                            : todo.priority === 'Medium'
                            ? 'warning'
                            : 'danger'
                        }
                        size="sm"
                        id="dropdown-basic"
                      >
                        {todo.priority}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {['High', 'Medium', 'Low'].map((priority) => (
                          <Dropdown.Item
                            key={priority}
                            onClick={() => {
                              handleChangePriority(todo.id, priority);
                            }}
                          >
                            {priority}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col align="right">
                    <Button
                      variant="none"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handleChangeCompleted(todo.id, todo.completed);
                      }}
                    >
                      {todo.completed
                        ? '✅ '
                        : mode === 'light'
                        ? '🔲 '
                        : '🔳 '}
                    </Button>
                  </Col>
                  <Col align="right">
                    <Button
                      variant="none"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handleDeleteTodo(todo.id);
                      }}
                    >
                      🗑️
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Card>
          ))
        : null}

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
