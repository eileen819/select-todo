import { useRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atom";
import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { useState } from "react";
import EditToDo from "./EditToDo";

const Container = styled.li``;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditBtn = styled.button`
  width: 30px;
  height: 30px;
`;

const DeleteBtn = styled.button`
  width: 30px;
  height: 30px;
`;

function PaintToDo({ text, category, id }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [edit, setEdit] = useState(false);

  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const onDelete = () => {
    const deletedToDos = toDos.filter((toDo) => toDo.id !== id);
    setToDos(deletedToDos);
  };

  const onEdit = () => setEdit((prev) => !prev);
  // 클릭하면 텍스트를 수정할 수 있는 인풋창이 나타나게 만듦

  return (
    <Container>
      <Wrapper>
        {edit ? (
          <EditToDo text={text} id={id} category={category} setEdit={setEdit} />
        ) : (
          <span>{text}</span>
        )}

        {category !== Categories.TO_DO && (
          <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>
        )}
        {category !== Categories.DOING && (
          <button onClick={() => onClick(Categories.DOING)}>Doing</button>
        )}
        {category !== Categories.DONE && (
          <button onClick={() => onClick(Categories.DONE)}>Done</button>
        )}
        {edit ? null : (
          <EditBtn onClick={onEdit}>
            <MdOutlineModeEdit size="16" color="blue" />
          </EditBtn>
        )}
        <DeleteBtn onClick={onDelete}>
          <RiDeleteBin6Line color="red" />
        </DeleteBtn>
      </Wrapper>
    </Container>
  );
}

export default PaintToDo;
