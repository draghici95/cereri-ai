import { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import Feedback from '../components/Feedback';

const tipuriCereri = [
  'Cerere de demisie',
  'Cerere concediu de odihnă',
  'Cerere concediu fără plată',
  'Cerere pentru eveniment',
];

export default function Home() {
  const [nume, setNume] = useState('');
  const [functie, setFunctie] = useState('');
  const [firma, setFirma] = useState('');
  const [dataStart, setDataStart] = useState('');
  const [dataEnd, setDataEnd] = useState('');
  const [dataSingle, setDataSingle] = useState('');
  const [tip, setTip] = useState(tipuriCereri[0]);
  const [cerere, setCerere] = useState('');
  const [loading, setLoading] = useState(false);

  const esteConcediu = tip.includes('concediu');

  const filtrareText = (text: string): string => {
    const linii = text.trim().split('\n');
    if (linii[0].toLowerCase().includes('cerere')) linii.shift();
    return linii
      .filter((l) => !l.toLowerCase().includes('semnătură') && !l.toLowerCase().includes('data:'))
      .join('\n');
  };

  const genereazaCererea = async () => {
    setLoading(true);
    const data = esteConcediu ? `${dataStart} - ${dataEnd}` : dataSingle;

    const res = await fetch('/api/genereaza', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nume, functie, data, tip, firma }),
    });

    const dataRes = await res.json();
    setCerere(filtrareText(dataRes.output));
    setLoading(false);
  };

  const descarcaPDF = async () => {
    const doc = await PDFDocument.create();
    doc.registerFontkit(fontkit);

    let page = doc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();

    const fontUrl = '/fonts/noto.ttf';
    const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
    const customFont = await doc.embedFont(fontBytes);

    const fontSize = 11;
    const lineHeight = 20;
    const maxWidth = width - 80;
    const startX = 40;
    let y = height - 60;

    page.drawText(tip, {
      x: (width - customFont.widthOfTextAtSize(tip, fontSize + 2)) / 2,
      y,
      size: fontSize + 2,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight * 2;

    const wrappedLines: string[] = [];
    cerere.split('\n').forEach((paragraph) => {
      const words = paragraph.split(' ');
      let line = '';
      words.forEach((word) => {
        const testLine = line + word + ' ';
        const testWidth = customFont.widthOfTextAtSize(testLine, fontSize);
        if (testWidth < maxWidth) {
          line = testLine;
        } else {
          wrappedLines.push(line.trim());
          line = word + ' ';
        }
      });
      if (line.trim()) wrappedLines.push(line.trim());
      wrappedLines.push('');
    });

    wrappedLines.forEach((line) => {
      if (y < 80) {
        page = doc.addPage([595.28, 841.89]);
        y = height - 60;
      }
      page.drawText(line, {
        x: startX,
        y,
        size: fontSize,
        font: customFont,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight;
    });

    y -= 40;

    page.drawText('Semnătură:', {
      x: startX,
      y,
      size: fontSize,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    page.drawLine({
      start: { x: startX + 70, y: y - 2 },
      end: { x: startX + 270, y: y - 2 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    const dataFormata = new Date().toLocaleDateString('ro-RO');
    page.drawText(`Data: ${dataFormata}`, {
      x: width - 120,
      y: 40,
      size: fontSize,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await doc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `cerere_${tip.replace(/\s+/g, '_')}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const descarcaWord = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: tip, bold: true, size: 26, break: 1 }),
              ],
              spacing: { after: 200 },
            }),
            ...cerere.split('\n').map(
              (line) =>
                new Paragraph({
                  children: [new TextRun({ text: line, size: 22 })],
                  spacing: { after: 100 },
                })
            ),
            new Paragraph({
              children: [
                new TextRun({ text: 'Semnătură:', size: 22 }),
                new TextRun({ text: ' ______________________', size: 22 }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Data: ${new Date().toLocaleDateString('ro-RO')}`,
                  size: 22,
                }),
              ],
              alignment: 'right',
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cerere_${tip.replace(/\s+/g, '_')}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-12 relative">
      <div className="w-full max-w-md bg-white p-6 rounded shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Generează cererea</h1>

        <input
          type="text"
          placeholder="Numele tău"
          value={nume}
          onChange={(e) => setNume(e.target.value)}
          className="w-full border rounded p-2 text-sm"
        />
        <input
          type="text"
          placeholder="Funcția ta"
          value={functie}
          onChange={(e) => setFunctie(e.target.value)}
          className="w-full border rounded p-2 text-sm"
        />
        <input
          type="text"
          placeholder="Numele companiei (opțional)"
          value={firma}
          onChange={(e) => setFirma(e.target.value)}
          className="w-full border rounded p-2 text-sm"
        />

        <select
          value={tip}
          onChange={(e) => setTip(e.target.value)}
          className="w-full border rounded p-2 text-sm"
        >
          {tipuriCereri.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>

        {esteConcediu ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="date"
              value={dataStart}
              onChange={(e) => setDataStart(e.target.value)}
              placeholder="Data început"
              className="w-full border rounded p-2 text-sm text-gray-500"
            />
            <input
              type="date"
              value={dataEnd}
              onChange={(e) => setDataEnd(e.target.value)}
              placeholder="Data sfârșit"
              className="w-full border rounded p-2 text-sm text-gray-500"
            />
          </div>
        ) : (
          <input
            type="date"
            value={dataSingle}
            onChange={(e) => setDataSingle(e.target.value)}
            placeholder="Selectează o dată"
            className="w-full border rounded p-2 text-sm text-gray-500"
          />
        )}

        <button
          onClick={genereazaCererea}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
        >
          {loading ? 'Se generează...' : 'Generează cererea'}
        </button>

        {cerere && (
          <>
            <textarea
              className="w-full border rounded p-2 h-48 text-sm"
              value={cerere}
              readOnly
            />
            <button
              onClick={() => navigator.clipboard.writeText(cerere)}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm"
            >
              Copiază textul
            </button>
            <button
              onClick={descarcaPDF}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 text-sm"
            >
              Descarcă PDF
            </button>
            <button
              onClick={descarcaWord}
              className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 text-sm"
            >
              Descarcă Word
            </button>
          </>
        )}
      </div>
      <Feedback />
    </div>
  );
}
