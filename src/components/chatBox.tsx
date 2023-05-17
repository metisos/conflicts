import { useState } from "react";
import axios from "axios";
import { NextPage } from "next";
import { Textarea, Button, Grid } from "@nextui-org/react";

const OPENAI_API_URL =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";

const api = axios.create({
  baseURL: OPENAI_API_URL,
  timeout: 30000,
  headers: {
    Authorization: `Bearer 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`,
    "Content-Type": "application/json",
  },
});

const ChatBox: NextPage = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("", {
        prompt: message,
        max_tokens: 60,
      });
      setResponse(res.data.choices[0].text.trim());
      setMessage(""); // clear the input field after receiving the response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1></h1>
      <form onSubmit={handleSubmit}>
        <Textarea
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Ask Metis"
          minRows={1}
          maxRows={10}
        />

        <Button bordered color="primary" auto type="submit">
          Send
        </Button>
        <Grid>
          <div>{response}</div>
        </Grid>
      </form>
    </div>
  );
};

export default ChatBox;
