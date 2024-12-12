export const botResponse = async (userMessage: string, userId: number, onStreamUpdate) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        userid: userId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Something went wrong');
    }

    // Ensure the response is a stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let accumulatedText = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      // Decode and append the streamed chunk
      const chunk = decoder.decode(value, { stream: true });
      accumulatedText += chunk;

      // Notify updates to the caller via callback
      if (onStreamUpdate && typeof onStreamUpdate === 'function') {
        onStreamUpdate(chunk);
      }
    }

    // Return the full accumulated response after the stream ends
    return {
      id: Date.now().toString(),
      sender: 'bot',
      text: accumulatedText,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `Error: ${error.message}`,
      };
    } else {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: 'An unknown error occurred.',
      };
    }
  }
};
