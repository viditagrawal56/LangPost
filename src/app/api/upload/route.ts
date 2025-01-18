import { NextResponse } from "next/server";

const targetLanguages = ["hi", "hu", "ta", "kn", "bn", "mr", "ml", "pa", "or"];

async function translateText(html: string, targetLang: string) {
  const url =
    "https://google-translate113.p.rapidapi.com/api/v1/translator/html";
  const options = {
    method: "POST",
    headers: {
      "X-RapidAPI-Key": "323f7e31cdmsh2e553cbf0512be7p146aa8jsnca23d1f7d881",
      "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "en",
      to: targetLang,
      html: html,
    }),
  };

  const response = await fetch(url, options);
  return response.json();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files");
    let combinedText = "";

    for (const file of files) {
      if (file instanceof File) {
        const buffer = await file.arrayBuffer();
        const text = Buffer.from(buffer).toString("utf-8");
        combinedText += text.replace(/[\r\n]+/g, " ");
      }
    }

    const translations: { [key: string]: string } = {};
    for (const lang of targetLanguages) {
      try {
        const result = await translateText(combinedText, lang);
        translations[lang] = result.trans;
      } catch (error) {
        translations[lang] = `Error translating to ${lang}`;
      }
    }

    return NextResponse.json({
      message: "Files processed and translated successfully",
      original: combinedText.trim(),
      translations,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing files" },
      { status: 500 }
    );
  }
}
