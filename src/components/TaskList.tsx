import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import {
  faUser,
  faChevronCircleDown,
  faX,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  viewTaskDetail,
  removeTask,
  completeTask,
  task,
} from "../store/features/Tasks";
import {
  addNotification,
  notification,
} from "../store/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

interface propss {
  task: task;
  userName: string;
}

export default function TaskList({ task, userName }: propss) {
  //   const task = tasks;
  const dispatch = useAppDispatch();
  const notifications: notification[] = useAppSelector(
    (state) => state.notificationReducer.contents
  );
  return (
    <div className="bg-blue-400 w-full p-5 rounded-2xl tracking-wider my-7 shadow-md even:bg-yellow-400 text-gray-800">
      <div
        className={`flex justify-between items-center text-lg ${
          task.clicked && "hidden"
        }`}
      >
        <p>
          <FontAwesomeIcon icon={faUser} className="h-6" />{" "}
          <span>{userName}</span>
        </p>
        <span>{task.date}</span>
      </div>
      <div
        className={`${
          !task.clicked && "flex"
        } items-center justify-between text-xl`}
      >
        <p className={`p-4 font-bold uppercase ${task.clicked && "hidden"}`}>
          {task.title}
        </p>
        <div
          className={`${task.clicked && "text-xl text-end p-2"} h-fit`}
          onClick={() => {
            dispatch(viewTaskDetail(task));
          }}
        >
          {!task.clicked ? (
            <FontAwesomeIcon icon={faChevronCircleDown} />
          ) : (
            <FontAwesomeIcon icon={faX} />
          )}
        </div>
      </div>

      <button
        onClick={() => {
          dispatch(removeTask(task));
          dispatch(
            addNotification({
              id: notifications.length - 1,
              header: "You deleted a task",
              message: task.title,
            })
          );
        }}
        className={`w-full mt-3 bg-transparent border-red-800 border-2 text-red-800 p-3 
hover:bg-red-800 hover:text-gray-100 duration-0.5 rounded-full ${
          task.clicked && "hidden"
        }`}
      >
        {" "}
        <p className="inline px-2">Delete Task</p>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <div className={`${!task.clicked && "hidden"}`}>
        <h2 className=" font-montserrat font-bold text-3xl break-all">
          {task.title}
        </h2>
        <div className="my-10 flex items-center justify-between px-3">
          <div>
            <p className=" text-emerald-700 font-bold">Date Created</p>
            <p className="text-sm px-1">oct 23, 2023</p>
          </div>
          <div>
            <p className="text-emerald-700 font-bold">Task Date</p>
            <p className="text-sm px-1">{task.date}</p>
          </div>
        </div>
        <div className="text-lg">
          {" "}
          <h2 className="font-bold text-emerald-700">Task Description</h2>
          <p className="">{task.description}</p>
        </div>

        <button
          onClick={() => {
            dispatch(completeTask(task));
          }}
          className="w-full mt-10 bg-gray-900 text-gray-100 p-3 hover:opacity-80 duration-0.5 rounded-full"
        >
          <FontAwesomeIcon icon={faMarkdown} />{" "}
          <p className="inline">Set as done</p>
        </button>
      </div>
    </div>
  );
}
