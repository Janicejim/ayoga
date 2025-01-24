
import { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { classNames } from 'primereact/utils';
import defaultIcon from "../../assets/avatar-big.png";
import { Row } from 'react-bootstrap';
import moment from 'moment';
interface Comment {
    id: number,
    comment: string,
    star: number,
    name: string,
    icon: string | null,
    updated_at: string,

}
interface Props {
    data: Comment[]
}


export default function Comments(props: Props) {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {

        setComments(props.data)
    }, [props.data])



    const commentTemplate = (comment: Comment) => {
        return (
            <Row key={comment.id} >

                <div className="col-3" >
                    <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': comment.id !== 0 })}>
                        {comment.icon === "undefined" || comment.icon === "" || comment.icon === null ? (
                            <img
                                style={{ width: "3rem", height: "3rem" }}
                                src={defaultIcon}
                                alt="icon"
                            />
                        ) : (
                            <img
                                style={{ width: "15px", height: "15px" }}
                                src={`${process.env.REACT_APP_API_SERVER}/${comment.icon}`} alt="icon"
                            />
                        )}
                        <div style={{ fontSize: "1rem" }}>{comment.name}</div>
                    </div> </div>
                <div className='col-9'>
                    <div style={{ margin: "2rem" }} className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <Rating value={comment.star} readOnly cancel={false}></Rating>
                            <div className="text-2xl font-bold text-900">{comment.comment}</div>
                            <div style={{ display: "flex", justifyContent: "end", color: "gray" }}>{moment(`${comment.updated_at}`).format("ddd, Do MMM YYYY")}</div>
                        </div>

                    </div></div>





            </Row>

        );
    };




    const listTemplate = (comments: Comment[]) => {
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
