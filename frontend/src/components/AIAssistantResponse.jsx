import React from "react";

export default function AIAssistantResponse({ response }) {
  const createMarkup = () => ({ __html: response });

  return (
    <div dangerouslySetInnerHTML={createMarkup()} />
  );
}
