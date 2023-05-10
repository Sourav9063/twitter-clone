const requestOptions = {
  method: "GET",
  redirect: "follow",
};
const fetchUnseen = async (myId, toId, setRecentMessages) => {
  console.log("called");
  try {
    const response = await fetch(
      `/api/v2/users/getNotification?sender=${myId}&type=unseen&id=${toId}`,
      requestOptions
    );
    const result = await response.json();
    console.log(result);
    if (result.msg == "Success" && result.notifications.length > 0) {
      setRecentMessages((state) => {
        return {
          ...state,
          unseenMessages: result.notifications,
        };
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchUnseen;
