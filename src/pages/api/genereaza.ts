import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  const { nume, functie, data, tip, firma } = req.body;

  const numeFinal = nume?.trim() !== '' ? nume : '......................';
  const functieFinal = functie?.trim() !== '' ? functie : '......................';
  const firmaFinal = firma?.trim() !== '' ? firma : '......................';

  const prompt = `
Scrie o cerere oficială în limba română pentru: ${tip}.

✅ Include:
- Angajat: ${numeFinal}
- Funcția: ${functieFinal}
- Compania: ${firmaFinal}
- Data / Perioada: ${data}

📌 Format:
- Exclusiv în limba română
- Nu folosi [paranteze pătrate] sau variabile fictive – înlocuiește-le cu spații punctate „.....................”
- Nu include cuvinte în engleză (ex: Dear, Thank you etc.)
- Fără „Către”, „Subiect” sau titluri oficiale (ex: Domnule Director)
- Fără antet, adresă, casierie, parafă etc.
- Fără semnătură sau dată – acestea vor fi adăugate ulterior în PDF

🛠 Stil:
- Clar, oficial și politicos
- Textul trebuie să poată fi imprimat ca atare

Trimite doar corpul cererii, fără titlu sau alte informații adiționale.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.35,
    });

    const output = completion.choices[0].message.content;
    res.status(200).json({ output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Eroare la generare text' });
  }
}
