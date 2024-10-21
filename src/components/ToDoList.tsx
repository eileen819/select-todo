import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import PaintToDo from "./PaintToDo";
import { Categories, categoryState, toDoSelector } from "../atom";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
  };
  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <hr />
      <CreateToDo />
      <hr />
      <ul>
        {toDos.map((toDo) => (
          <PaintToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
