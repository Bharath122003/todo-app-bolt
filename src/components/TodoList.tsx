import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { PlusCircle } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-4 text-center">My To-Do List</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Add a new task"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo} className="ml-2 p-2 rounded-full bg-green-500 text-white hover:bg-green-700 focus:outline-none focus:shadow-outline">
          <PlusCircle className="h-5 w-5" />
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
