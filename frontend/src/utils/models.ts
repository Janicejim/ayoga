export type ClassDetails = {
    id: number,
    image: string;
    venue: string;
    name: string;
    date: string;
    start_time: string;
    capacity: number;
    end_time: string;
    teacher_name: string;
    teacher_id: number;
    credit: number;
    class_number: string;
    type: string;
    introduction: string;
    language: string;
    available: number;
    class_id: number;
    venue_point: { x: string, y: string }
};

export interface ClassItem {
    comment: string,
    class_number: string,
    yoga_type: string,
    id: number,
    image: string,
    venue: string,
    type: string,
    name: string,
    instructor: string,
    introduction: string,
    credit: number,
    language: string,
    capacity: number,
    date: string,
    end_time: string,
    start_time: string,
    is_end?: boolean
    user_id?: number
    max_capacity?: number
}

export interface HostClassItem {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
    date: string;
}

export interface TransactionPageItem {
    transaction_id: string,
    class: string,
    date: string,
    type: string,
    package: string,
    credit: number
}

export interface CommentItem {
    id: number,
    comment: string,
    star: number,
    name: string,
    icon: string | null,
    updated_at: string,
}

export interface RefundTransactionItem {
    id: number;
    type: string;
    user_id: number,
    class_id: number,
    credit: number,
    transaction_id: string;
    refund_related_id: string;
}

export interface DropDownInfo {
    id: number,
    code?: string,
    name: string,
    eng_name?: string
}
export interface Pose {
    id: number,
    name: string,
    image: string,
    detect_id?: number
}
export interface Bank {
    id: number,
    name: string,
    eng_name: string,
    code: string
}

export interface ApiResponse {
    success: boolean;
    msg: string;
    type?: string
}

export interface Teacher {
    score: number,
    id: number,
    name: string,
    photo: string
}