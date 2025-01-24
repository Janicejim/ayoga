import React from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { useSelector } from 'react-redux';
import { IRootState } from '../redux/store';
import EditUserInfo from './EditUserInfo';
import ChangePassword from './ChangePassword';
import EditTeacherInfo from './EditTeacherInfo';



export default function EditUserInfoPage() {

    const isTeacherMode = useSelector(
        (state: IRootState) => state.auth.isTeacherMode
    );

    return (
        <div className="card">
            <Accordion activeIndex={0}>
                <AccordionTab style={{ textDecoration: 'none', color: 'inherit' }} header="Edit User Info">
                    <EditUserInfo />
                </AccordionTab>
                <AccordionTab header="Change Password">
                    <ChangePassword />
                </AccordionTab>
                {isTeacherMode && <AccordionTab header="Edit Teacher Info">
                    <EditTeacherInfo />
                </AccordionTab>}

            </Accordion>
        </div>
    )
}
