
import { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { classNames } from 'primereact/utils';
import defaultIcon from "../assets/avatar-big.png";
import { Row } from 'react-bootstrap';
import moment from 'moment';
import commentStyle from "../css/comment.module.css"
import { REACT_APP_UPLOAD_IMAGE } from "../utils/config";
import { CommentItem } from "../utils/models"

interface Props {
    data: CommentItem[]
}

export default function Comments(props: Props) {
    const [comments, setComments] = useState<CommentItem[]>([]);

    useEffect(() => {

        setComments(props.data)
    }, [props.data])



    const commentTemplate = (comment: CommentItem) => {
        return (
            <Row key={comment.id} >

                <div className="col-3" >
                    <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': comment.id !== 0 })}>
                        {comment.icon === "undefined" || comment.icon === "" || comment.icon === null ? (
                            <img
                                className={commentStyle.icon}
                                src={defaultIcon}
                                alt="icon"
                            />
                        ) : (
                            <img
                                className={commentStyle.icon}
                                src={`${REACT_APP_UPLOAD_IMAGE}/${comment.icon}`} alt="icon"
                            />
                        )}
                        <div className={commentStyle.username}>{comment.name}</div>
                    </div> </div>
                <div className='col-9'>
                    <div style={{ margin: "2rem" }} className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3 ">
                            <Rating unstyled={true} className={commentStyle.star} value={comment.star} readOnly cancel={false}></Rating>
                            <div className="text-2xl font-bold text-900">{comment.comment}</div>
                            <div className={commentStyle.createdDate}>{moment(`${comment.updated_at}`).format("ddd, Do MMM YYYY")}</div>
                        </div>

                    </div></div>





            </Row>

        );
    };




    const listTemplate = (comments: CommentItem[]) => {
        if (!comments || comments.length === 0) return null;

        let list = comments.map((comment) => {
            return commentTemplate(comment);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <div className="card">
            {listTemplate &&
                //@ts-ignore
                <DataView value={comments} listTemplate={listTemplate} paginator rows={5} />}

        </div>
    )
}
