import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import LightGreenCheckmark from "./LightGreenCheckMark";

const LessonControlButtons = () => {
  return (
    <div className="float-end">
      <GreenCheckmark />
      
    </div>
  );
};

const LessonControlButtonsLight = () => {
  return (
    <div className="float-end">
      <LightGreenCheckmark />
    </div>
  );
};

export { LessonControlButtons, LessonControlButtonsLight };