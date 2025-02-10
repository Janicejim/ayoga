import { Rating } from 'primereact/rating'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { fetchToCreateComment } from '../api/class'


export default function CreateComment(props: { classId: number }) {
    const [rating, setRating] = useState<number>(0)
    const [comment, setComment] = useState<string>("")

    const submitComment = async () => {

        if (rating === 0 || comment === "") {
            alert("missing rating or comment")
            return
        }


        let result = await fetchToCreateComment(props.classId, rating, comment)
        if (result.success) {
            setComment("")
            setRating(0)
        }

    }


    return (

        <div>
            <h2>Feedback</h2>
            <div>Rating for Teacher:</div>
            <Rating value={rating} onChange={(e: any) => setRating(e.value)} cancel={false} />
            <div>Comment:</div>
            <textarea value={comment} onChange={(e: any) => setComment(e.target.value)} />
            <Button onClick={submitComment}>Submit</Button>
        </div>
    )
}
