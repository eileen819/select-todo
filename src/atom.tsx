import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  id: number;
  text: string;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDos",
  default: [],
  effects: [
    ({ setSelf }) => {
      const savedToDos = localStorage.getItem("toDos");
      if (savedToDos !== null) {
        setSelf(JSON.parse(savedToDos));
      }
    },
    ({ onSet }) => {
      onSet((newToDos) =>
        localStorage.setItem("toDos", JSON.stringify(newToDos))
      );
    },
  ],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
