import { useState } from 'react';

export default function Feedback() {
  const [showBox, setShowBox] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (feedback.trim()) {
      localStorage.setItem(`feedback_${Date.now()}`, feedback);
      setSubmitted(true);
      setFeedback('');
      setTimeout(() => {
        setShowBox(false);
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div>
      {/* Buton plutitor */}
      <button
        onClick={() => setShowBox(!showBox)}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg text-sm z-50"
      >
        Feedback
      </button>

      {/* Popup feedback */}
      {showBox && (
        <div className="fixed bottom-20 right-4 bg-white border border-gray-300 shadow-xl rounded-lg p-4 w-72 z-50">
          {!submitted ? (
            <>
              <p className="text-sm font-medium mb-2 text-gray-700">
                Ce am putea îmbunătăți?
              </p>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Scrie feedbackul tău..."
                className="w-full border rounded p-2 text-sm mb-2"
                rows={3}
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 rounded"
              >
                Trimite
              </button>
            </>
          ) : (
            <p className="text-green-600 font-semibold text-sm text-center">
              Mulțumim pentru feedback! 💙
            </p>
          )}
        </div>
      )}
    </div>
  );
}
