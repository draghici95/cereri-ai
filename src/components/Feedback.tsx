import { useState } from 'react';

export default function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (feedback.trim()) {
      localStorage.setItem(`feedback_${Date.now()}`, feedback);
      setSubmitted(true);
      setFeedback('');
    }
  };

  return (
    <div className="mt-8 border-t pt-4 text-sm text-center">
      {!submitted ? (
        <>
          <p className="mb-2">Ai o idee sau ceva de îmbunătățit?</p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border p-2 rounded text-sm"
            placeholder="Lasă un feedback scurt aici..."
          />
          <button
            onClick={handleSubmit}
            className="mt-2 bg-gray-800 text-white px-4 py-1 rounded text-sm hover:bg-gray-900"
          >
            Trimite feedback
          </button>
        </>
      ) : (
        <p className="text-green-600 font-medium">Mulțumim pentru feedback!</p>
      )}
    </div>
  );
}
