import { Rating, RatingChangeEvent } from 'primereact/rating'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { showMsgAlert } from '../utils/alert'
import { postOrPatchTextForm } from '../api/api'
import style from "../css/comment.module.css"


export default function CreateComment(props: { classId: number, onReload: () => void }) {
    const [rating, setRating] = useState<number>(0)
    const [comment, setComment] = useState<string>("")

    const submitComment = async () => {

        if (rating === 0 || comment === "") {
            showMsgAlert("error", "missing rating or comment")
            return
        }

        let result = await postOrPatchTextForm("POST", `api/class/comment/${props.classId}`, { classId: props.classId, rating, comment })
        if (result.success) {
            props.onReload()

        } else {
            showMsgAlert("error", result.msg)
        }

    }


    return (

        <div className={style.front}>
            <h3 className={style.sectionTitle}>Feedback</h3>
            <div className={`${style.feedbackContainer} container`}>
                <div >Rating for Teacher:</div>

                <Rating unstyled={true} className={style.star} value={rating} onChange={(e: RatingChangeEvent) => setRating(e.value!)} cancel={false} />

                <div>Comment:</div>
                <textarea className={style.textAreaStyle} value={comment} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)} />
                <br />
                <div className={style.flex}> <Button className={style.submitBtn} onClick={submitComment}>Submit</Button></div>

            </div>
        </div>
    )
}
