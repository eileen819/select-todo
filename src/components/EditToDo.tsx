import { useForm } from "react-hook-form";
import { Categories, toDoState } from "../atom";
import { useSetRecoilState } from "recoil";

interface IEditProps {
  text: string;
  id: number;
  category: Categories;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IEditForm {
  editToDo: string;
}

function EditToDo({ text, category, id, setEdit }: IEditProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit } = useForm<IEditForm>({
    defaultValues: { editToDo: text },
  });

  const onValid = ({ editToDo }: IEditForm) => {
    // 인풋창의 내용을 제출하면 전체 toDo의 내용이 기존에서 새로운 것으로 교체되게 함 (setToDos 이용)
    setToDos((oldToDos) => {
      const editIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newEditToDo = { text: editToDo, id, category };
      return [
        ...oldToDos.slice(0, editIndex),
        newEditToDo,
        ...oldToDos.slice(editIndex + 1),
      ];
    });
    setEdit((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("editToDo", { required: "Please Write a To Do" })}
        type="text"
        autoFocus
      />
      <button>Edit</button>
    </form>
  );
}

export default EditToDo;
