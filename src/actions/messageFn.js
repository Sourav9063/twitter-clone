import fetchUnseen from "@/helper/frontend/fetchUnseen";

export const postMessageFn = async (
  { event, senderEmail, senderId, receiverEmail, receiverId, message },
  { setMessages, setError, setLoading, setRecentMessages }
) => {
  event.preventDefault();
  setMessages((state) => "");

  setLoading(true);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    senderEmail: senderEmail,
    receiverEmail: receiverEmail,
    body: message,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  async function sendRequest() {
    try {
      var response = await fetch("/api/v2/messages", requestOptions);
      var result = await response.json();

      if (response.ok) {
        setRecentMessages((state) => {
          return { ...state, messages: [...state.messages, result] };
        });
        setMessages((state) => "");
        setError({ status: false, message: "" });
        setLoading(false);
      } else {
        throw new Error(result);
      }
    } catch (error) {
      console.log(error);
      setError({ status: true, message: error.message });
    } finally {
      setLoading(false);
    }
  }
  await sendRequest();
  await fetchUnseen(senderId, receiverId, setRecentMessages);
};
