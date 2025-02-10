import { Dropdown, DropdownButton } from "react-bootstrap";
import AI_gameStyles from "../css/AI_game.module.css";
import { convertToTitleCase } from "../utils/convertTitle";

export function PosesDropDown({ poses, onChangeCurrentPose }: any) {
  function toSetTargetPose(pose: any) {
    onChangeCurrentPose(pose);
  }

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Pick another pose"
      className={AI_gameStyles.dropdownMenu}
    >
      {
        //@ts-ignore
        poses.map((pose) => (
          <Dropdown.Item
            key={pose.id}
            onClick={() => toSetTargetPose(pose)}
            className={AI_gameStyles.dropDownItem}
          >
            {convertToTitleCase(pose.name)}
          </Dropdown.Item>
        ))
      }
    </DropdownButton>
  );
}
