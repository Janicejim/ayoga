import { Dropdown, DropdownButton } from "react-bootstrap";
import AI_gameStyles from "../css/aiGame.module.css";
import { convertToTitleCase } from "../utils/convertTitle";
import { useState } from "react";
import { DropDownInfo } from "../utils/models";

interface Props {
  data: DropDownInfo[];
  onChangeCurrentItem: (item: any) => void,
  type: string
}


export function DropDown(props: Props) {
  const { data, onChangeCurrentItem, type } = props
  function toSetTargetItem(item: DropDownInfo) {
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
        data.map((item: any) => (
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
