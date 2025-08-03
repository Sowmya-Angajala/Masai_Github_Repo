import React, { useState } from 'react';

const corrections = {
  "teh": "the",
  "recieve": "receive",
  "adress": "address",
  "wierd": "weird",
  "thier": "their"
};

function CorrectedPreview({ text, corrections }) {
  const correctedText = text
    .split(' ')
    .map(word => corrections[word] || word)
    .join(' ');

  return (
    <div className="mt-4 text-green-600 font-semibold">
      Corrected Text: {correctedText}
    </div>
  );
}

export default function AutoCorrectApp() {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold">AutoCorrect App</h1>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type something..."
        className="w-full p-2 border border-gray-300 rounded"
      />
      <CorrectedPreview text={inputText} corrections={corrections} />
    </div>
  );
}
