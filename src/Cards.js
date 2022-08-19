import { Container, Card, Col, Row, Dropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function Cards({
  todos,
  categories,
  handleUpdate,
  handleDelete,
  textboxStyle,
  mode,
}) {
  return todos.length > 0
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
                  onBlur={(e) =>
                    handleUpdate(todo.id, 'description', e.target.value)
                  }
                />
              </Col>
              {[
                ['date', 'date_due', todo.date_due],
                ['time', 'time_due', todo.time_due.substring(11, 16)],
              ].map(([type, attr, todo_attr]) => (
                <Col key={type} align="left">
                  <input
                    type={type}
                    style={textboxStyle}
                    defaultValue={todo_attr}
                    onBlur={(e) => handleUpdate(todo.id, attr, e.target.value)}
                  />
                </Col>
              ))}
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
                        onClick={() =>
                          handleUpdate(todo.id, 'category_name', category.name)
                        }
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
                          handleUpdate(todo.id, 'priority', priority);
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
                  variant={mode === 'light' ? 'light' : 'dark'}
                  style={{
                    // border: 'none',
                    // background: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    handleUpdate(todo.id, 'completed', !todo.completed);
                  }}
                >
                  {todo.completed ? '✅ ' : mode === 'light' ? '🔲 ' : '🔳 '}
                </Button>
              </Col>
              <Col align="right">
                <Button
                  variant={mode === 'light' ? 'light' : 'dark'}
                  style={{
                    // border: 'none',
                    // background: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    handleDelete(todo.id);
                  }}
                >
                  🗑️
                </Button>
              </Col>
            </Row>
          </Container>
        </Card>
      ))
    : null;
}
