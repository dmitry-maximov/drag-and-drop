import { useState } from 'react';
import './App.css';

function App() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'Главная доска',
      items: [
        { id: 1, title: 'Какая-то прям главная задача' },
        {
          id: 2,
          title: 'Какая-то тоже главная задача, но не такая как верхняя ',
        },
        {
          id: 3,
          title: 'Задача которая хочет быть главной, но не суждено',
        },
        {
          id: 4,
          title: 'Задача которая хочет быть перетащенной',
        },
      ],
    },
    {
      id: 2,
      title: 'Не главная доска',
      items: [
        { id: 1, title: 'Главная задача которую лишили основного списка' },
        { id: 2, title: 'Задача-партизан и тут и там ' },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const onDragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 2px 3px gray';
    }
  };

  const onDragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none';
  };

  const onDragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const onDragEndHandler = (e) => {
    e.preventDefault();
    e.target.style.boxShadow = 'none';
  };

  const onDropHandler = (e, board, item) => {
    e.preventDefault();
    e.target.style.boxShadow = 'none';

    const currIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currIndex, 1);

    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  };

  const onDropCardHandler = (e, board) => {
    board.items.push(currentItem);
    const currIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currIndex, 1);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  };

  return (
    <div className="app">
      {boards.map((board) => (
        <div
          className="board"
          onDragOver={(e) => onDragOverHandler(e)}
          onDrop={(e) => onDropCardHandler(e, board)}
        >
          <div className="board__title">
            <h2>{board.title}</h2>
          </div>
          {board.items.map((item) => (
            <div
              draggable={true}
              className="item"
              onDragOver={(e) => onDragOverHandler(e)}
              onDragLeave={(e) => onDragLeaveHandler(e)}
              onDragStart={(e) => onDragStartHandler(e, board, item)}
              onDragEnd={(e) => onDragEndHandler(e)}
              onDrop={(e) => onDropHandler(e, board)}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
