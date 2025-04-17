import { useState } from 'react';

export default function Feedback() {
  const [deschis, setDeschis] = useState(false);
  const [mesaj, setMesaj] = useState('');
  const [trimis, setTrimis] = useState(false);

  const handleSubmit = () => {
    if (mesaj.trim()) {
      localStorage.setItem(`feedback_${Date.now()}`, mesaj);
      setTrimis(true);
      setMesaj('');
      setTimeout(() => {
        setDeschis(false);
        setTrimis(false);
      }, 2500);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!deschis ? (
        <button
          onClick={() => setDeschis(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition-all text-sm"
        >
          Ai o sugestie?
        </button>
      ) : (
        <div className="bg-white border shadow-lg rounded p-4 w-64">
          {!trimis ? (
            <>
              <p className="text-sm mb-2 font-medium">Ce am putea îmbunătăți?</p>
              <textarea
                value={mesaj}
                onChange={(e) => setMesaj(e.target.value)}
                className="w-full border p-2 rounded text-sm mb-2"
                placeholder="Lasă o idee, o problemă, ceva ce ți-a plăcut sau nu..."
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setDeschis(false)}
                  className="text-gray-500 text-sm hover:underline"
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
            <p className="text-green-600 text-sm font-medium">
              Mulțumim! Sugestia ta a fost salvată.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
