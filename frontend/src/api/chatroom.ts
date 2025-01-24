const { REACT_APP_API_SERVER } = process.env;

export interface ChatInfo {
  chatTarget: string;
  chatTargetId: number;
  roomId: number;
}

export async function fetchChatroomList() {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/chatroom`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.json();
}

export async function fetchMessagesOfSingleRoom(roomId: number) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/chatroom/messages/${roomId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return res.json();
}

export async function fetchSendMsg(chatRoomId: number, chatContent: string) {
  const res = await fetch(`${REACT_APP_API_SERVER}/api/chatroom/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      roomId: chatRoomId,
      content: chatContent,
    }),
  });
  return res;
}

export async function fetchAddRoom(receiverId: number) {
  const res = await fetch(
    `${REACT_APP_API_SERVER}/api/chatroom?receiverId=${receiverId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return res;
}
