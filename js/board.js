const adjustBoardSection = () => {
  const board_members = document.querySelector(".board-members");
  let count = parseInt(document.querySelector("#board").clientWidth / 185);

  if (board_members.childElementCount % count !== 0) {
    count =
      board_members.childElementCount % (count - 1) === 0 ? count - 1 : count;
  }
  count = parseInt(Math.max(1, count));
  if(count>5)
  {
    count=5;
  }
  board_members.style.gridTemplateColumns = `repeat(${count}, 185px)`;

};

window.onresize = () => {
  adjustBoardSection();
};

const makeBoardCard = ({ name, pos, img }) => {
  const img_el = document.createElement("img");
  img_el.src = `./images/board-images/${img}.jpg`;
  img_el.alt = name;

  const position = document.createElement("div");
  position.classList.add("position");
  position.innerText = pos;

  const name_el = document.createElement("div");
  name_el.classList.add("name");
  name_el.innerText = name;

  const content = document.createElement("div");
  content.classList.add("content");
  content.appendChild(position);
  content.appendChild(name_el);

  const board_member = document.createElement("div");
  board_member.classList.add("board-member");
  board_member.appendChild(img_el);
  board_member.appendChild(content);

  return board_member;
};

const fillBoard = (board_members) => {
  const container = document.querySelector(".board-members");

  board_members.forEach((board_member) => {
    container.appendChild(makeBoardCard(board_member));
  });
};

const addBoard = async () => {
  const response = await fetch("../data.json");
  const data = await response.json();

  fillBoard(data.board);
};

addBoard();
