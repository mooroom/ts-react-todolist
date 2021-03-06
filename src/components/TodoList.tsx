import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  return (
    <TodoListBlock>
      <TodoItem id="1" text="프로젝트 생성하기" done={true} />
      <TodoItem id="2" text="컴포넌트 스타일링 하기" done={true} />
      <TodoItem id="3" text="Context 만들기" done={false} />
      <TodoItem id="4" text="기능 구현하기" done={false} />
    </TodoListBlock>
  );
}

export default TodoList;
