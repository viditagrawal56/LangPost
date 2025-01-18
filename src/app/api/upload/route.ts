import { NextResponse } from "next/server";

const targetLanguages = ["hi", "hu", "ta", "kn", "bn", "mr", "ml", "pa", "or"];

// Add delay helper function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function translateText(html: string, targetLang: string) {
  try {
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
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Translation error for ${targetLang}:`, error);
    throw error;
  }
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
        // Add delay between requests to avoid rate limiting
        await delay(1000);
        const result = await translateText(combinedText, lang);
        if (!result.trans) {
          throw new Error("Translation response missing");
        }
        translations[lang] = result.trans;
      } catch (error: any) {
        console.error(`Error translating to ${lang}:`, error);
        translations[lang] = `Error translating to ${lang}: ${error.message}`;
      }
    }

    return NextResponse.json({
      message: "Files processed and translated successfully",
      original: combinedText.trim(),
      translations,
    });
  } catch (error) {
    console.error("Main processing error:", error);
    return NextResponse.json(
      {
        error: "Error processing files",
        details:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
