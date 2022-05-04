import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useStores } from "../../store";
import TaskCard from "./taskCard";
import TaskForm from "./taskForm";

interface TasksEditorProps {
  listId: string;
}

const TasksEditor: FC<TasksEditorProps> = observer(({ listId }) => {
  const {
    tasks: { items, isLoading },
  } = useStores();

  const renderTasks = items.map((item) => (
    <TaskCard key={item._id} {...item} listId={listId} />
  ));

  return (
    <>
      {renderTasks}
      <TaskForm listId={listId} />
    </>
  );
});

export default TasksEditor;
