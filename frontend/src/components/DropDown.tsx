import { Dropdown, DropdownButton } from "react-bootstrap";
import AI_gameStyles from "../css/AI_game.module.css";
import { convertToTitleCase } from "../utils/convertTitle";
import { useState } from "react";

export function DropDown({ data, onChangeCurrentItem, type }: any) {
  function toSetTargetItem(item: any) {
    onChangeCurrentItem(item);
    if (type === "bank") {
      setTitle(`(${item.code}) ${item.eng_name}`)
    }

  }

  const [title, setTitle] = useState<any>(type === "bank" ? "Pick a bank" : "Pick another pose")

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={title}
      className={AI_gameStyles.dropdownMenu}
    >
      {
        //@ts-ignore
        data.map((item) => (
          <Dropdown.Item
            key={item.id}
            onClick={() => toSetTargetItem(item)}
            className={AI_gameStyles.dropDownItem}
          >
            {type === "bank" ? `(${item.code}) ${item.eng_name}` : convertToTitleCase(item.name)}
          </Dropdown.Item>
        ))
      }
    </DropdownButton>
  );
}
