import React, {
  useReducer,
  createContext,
  Dispatch,
  useContext,
  useRef,
} from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type Todos = Todo[];

type Action =
  | { type: "CREATE"; todo: Todo }
  | { type: "TOGGLE"; id: number }
  | { type: "REMOVE"; id: number };

type TodoDispatch = Dispatch<Action>;

const initialTodos: Todos = [
  {
    id: 1,
    text: "프로젝트 생성하기",
    done: true,
  },
  {
    id: 2,
    text: "컴포넌트 스타일링하기",
    done: true,
  },
  {
    id: 3,
    text: "Context 만들기",
    done: false,
  },
  {
    id: 4,
    text: "기능 구현하기",
    done: false,
  },
];

const TodoStateContext = createContext<Todos | null>(null);
const TodoDispatchContext = createContext<TodoDispatch | null>(null);
const TodoNextIdContext = createContext<React.MutableRefObject<number> | null>(
  null
);

function todoReducer(state: Todos, action: Action): Todos {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type`);
  }
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) throw new Error("cannot find TodoProvider");

  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) throw new Error("cannot find TodoProvider");

  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) throw new Error("cannot find TodoProvider");

  return context;
}
