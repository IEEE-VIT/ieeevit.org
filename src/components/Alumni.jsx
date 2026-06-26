import React, { useState, useEffect } from 'react';

export default function Alumni({ theme }) {
  const [boardData, setBoardData] = useState({});
  const [selectedYearCode, setSelectedYearCode] = useState('image-grid6');
  const [boardColumns, setBoardColumns] = useState(5);

  const yearMap = {
    'image-grid6': '2024-25',
    'image-grid5': '2023-24',
    'image-grid4': '2022-23',
    'image-grid3': '2021-22',
    'image-grid2': '2020-21',
  };

  const selectedYearKey = yearMap[selectedYearCode] || '2024-25';
  const members = boardData[selectedYearKey]?.board || [];

  useEffect(() => {
    fetch('/alumni_board/board.json')
      .then((res) => res.json())
      .then((data) => setBoardData(data))
      .catch((err) => console.error('Error fetching alumni board data:', err));
  }, []);

  // Columns calculation for the board section
  useEffect(() => {
    if (members.length === 0) return;
    const adjustBoard = () => {
      const boardEl = document.getElementById('board');
      if (!boardEl) return;
      const clientWidth = boardEl.clientWidth;
      let count = Math.floor(clientWidth / 185);

      if (members.length % count !== 0) {
        count = members.length % (count - 1) === 0 ? count - 1 : count;
      }
      count = Math.max(1, Math.min(count, 5));
      setBoardColumns(count);
    };

    adjustBoard();
    window.addEventListener('resize', adjustBoard);
    return () => window.removeEventListener('resize', adjustBoard);
  }, [members]);

  const handleDropdownChange = (e) => {
    setSelectedYearCode(e.target.value);
  };

  const formatYearLabel = (key) => {
    return key.replace('-', ' - ');
  };

  return (
    <div id="main-content" style={{ display: 'block' }}>
      <section id="alumni-board">
        <div className="year">Choose a year</div>

        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="dropdown-container"></label>
          <select
            name="dropdown-container"
            id="dropdown-container"
            value={selectedYearCode}
            onChange={handleDropdownChange}
          >
            <option value="image-grid6">2024 - 25</option>
            <option value="image-grid5">2023 - 24</option>
            <option value="image-grid4">2022 - 23</option>
            <option value="image-grid3">2021 - 22</option>
            <option value="image-grid2">2020 - 21</option>
          </select>
        </form>

        <div id="text-container">
          Executive board {formatYearLabel(selectedYearKey)}
        </div>

        <section id="board" className="board-section">
          <div
            className="board-members"
            style={{ gridTemplateColumns: `repeat(${boardColumns}, 185px)` }}
          >
            {members.map((member, i) => (
              <div className="board-member animate-card" key={i}>
                <img
                  src={`/images/alumni-board/${selectedYearKey}/${member.img}.jpg`}
                  alt={member.name}
                />
                <div className="content">
                  <div className="position">{member.pos}</div>
                  <div className="name">{member.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
