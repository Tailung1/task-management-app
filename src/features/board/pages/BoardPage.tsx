import EmptyBoardState from "./EmptyBoardState";
import BoardView from "./BoardView";
import { useModalContext } from "../../../contexts/ModalContext";
import ModalRenderer from "../../../components/modal/ModalRenderer";

export default function BoardPage() {
  const { activeModal } = useModalContext();

  // Temporary data until you connect the active board
  const columns = [
    {
      id: "1",
      name: "TodoTodoTodoTodoTodoTodoTodoTodo",
      tasks: [
        { id: "1", title: "Create dashboard UI" },
        { id: "2", title: "Set up authentication" },
        { id: "1", title: "Create dashboard UI" },
        { id: "2", title: "Set up authentication" },
        { id: "1", title: "Create dashboard UI" },
        { id: "2", title: "Set up authentication" },
        { id: "1", title: "Create dashboard UI" },
        { id: "2", title: "Set up authentication" },
        { id: "1", title: "Create dashboard UI" },
        { id: "2", title: "Set up authentication" },
        { id: "1", title: "Create dashboard UI" },
        { id: "2", title: "Set up authentication" },
        { id: "1", title: "Create dashboard UI" },
        { id: "2", title: "Set up authentication" },
        { id: "1", title: "Create dashboard UI" },
        { id: "2", title: "Set up authentication" },
        { id: "1", title: "Create dashboard UI" },
        { id: "2", title: "Set up authentication" },
        { id: "1", title: "Create dashboard UI" },
        { id: "2", title: "Set up authentication" },
      ],
    },
    {
      id: "2",
      name: "Doing",
      tasks: [{ id: "3", title: "Build board layout" }],
    },
    {
      id: "3",
      name: "Done",
      tasks: [{ id: "4", title: "Configure routing" }],
    },
    {
      id: "2",
      name: "Doing",
      tasks: [{ id: "3", title: "Build board layout" }],
    },
    {
      id: "3",
      name: "Done",
      tasks: [{ id: "4", title: "Configure routing" }],
    },
    {
      id: "2",
      name: "Doing",
      tasks: [{ id: "3", title: "Build board layout" }],
    },
    {
      id: "3",
      name: "Done",
      tasks: [{ id: "4", title: "Configure routing" }],
    },
    {
      id: "2",
      name: "Doing",
      tasks: [{ id: "3", title: "Build board layout" }],
    },
    {
      id: "3",
      name: "Done",
      tasks: [{ id: "4", title: "Configure routing" }],
    },
  ];

  return (
    <>
      {activeModal ? (
        <ModalRenderer />
      ) : columns.length === 0 ? (
        <div className='flex flex-1 items-center justify-center'>
          <EmptyBoardState />
        </div>
      ) : (
        <BoardView columns={columns} />
      )}
    </>
  );
}
