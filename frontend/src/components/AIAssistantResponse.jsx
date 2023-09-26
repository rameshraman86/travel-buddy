import React from "react";

export default function AIAssistantResponse({ response }) {
  const createMarkup = () => ({ __html: response });
  return (
    <div className="list-disc text-md leading-6 font-medium text-gray-700 ml-2 mb-1" dangerouslySetInnerHTML={createMarkup()} />
  );
}
