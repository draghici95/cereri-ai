import { useState, useEffect } from 'react';

export default function Feedback() {
  const [showBox, setShowBox] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (feedback.trim()) {
      localStorage.setItem(`feedback_${Date.now()}`, feedback);
      setSubmitted(true);
      setFeedback('');
      setTimeout(() => setShowBox(false), 2000);
    }
  };

  useEffect(() => {
    setSubmitted(false);
  }, [showBox]);

  return (
    <>
      {/* Floating Feedback Button */}
      {!showBox && (
        <button
          onClick={() => setShowBox(true)}
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md text-sm hover:bg-blue-700 z-50"
        >
          Ai o sugestie?
        </button>
      )}

      {/* Feedback Box */}
      {showBox && (
        <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 w-72 bg-white p-4 rounded shadow-md z-50 border">
          {!submitted ? (
            <>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full border p-2 rounded text-sm"
                placeholder="Scrie o sugestie sau o idee..."
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => setShowBox(false)}
                  className="text-gray-500 text-sm"
                >
                  Închide
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Trimite
                </button>
              </div>
            </>
          ) : (
            <p className="text-green-600 text-sm text-center font-medium">
              Mulțumim pentru sugestie!
            </p>
          )}
        </div>
      )}
    </>
  );
}
