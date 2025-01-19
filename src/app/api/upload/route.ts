import prisma from "@/lib/db";
import { BLEUCalculator } from "@/utils/BLEU";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

const targetLanguages = ["hi", "hu", "ta", "kn", "bn", "mr", "ml", "pa", "or"];

const languageMap: { [key: string]: string } = {
  hi: "hindi",
  ta: "tamil",
  kn: "kannada",
  bn: "bengali",
  mr: "marathi",
  ml: "malayalam",
  pa: "punjabi",
  or: "odia",
  hu: "hungarian",
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Translates HTML content from English to a specified target language using Google Translate API.
 *
 * @param {string} html - The HTML content to be translated.
 * @param {string} targetLang - The target language code for translation.
 *
 * @returns {Promise<any>} - A promise that resolves to the translated data.
 *
 * @throws {Error} - Throws an error if the HTTP request fails.
 */

async function translateTextGoogle(html: string, targetLang: string) {
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
      signal: AbortSignal.timeout(10000), // 10 second timeout
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
}

async function translateTextRev(content: string) {
  try {
    const url = "https://revapi.reverieinc.com/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "REV-API-KEY": "d23590b757a07f3beef0ebd545c6a88317411672",
        "REV-APP-ID": "com.tanmaytambat01",
        src_lang: "en",
        tgt_lang: "hi,as,bn,gu,kn,ml,mr,or,pa,ta,te",
        domain: "generic",
        "REV-APPNAME": "localization",
        "REV-APPVERSION": "3.0",
      },
      body: JSON.stringify({
        enableNmt: true,
        enableLookup: true,
        data: [content],
      }),
      signal: AbortSignal.timeout(10000), // 10 second timeout
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
}

async function processMP4File(file: File) {
  try {
    const formData = new FormData();
    formData.append("video", file);

    const response = await fetch(
      "https://ac9c-36-255-9-10.ngrok-free.app/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Video processing failed with status: ${response.status}`
      );
    }

    const data = await response.json();
    return data.text || ""; // Assuming the endpoint returns { text: "transcribed text" }
  } catch (error) {
    console.error("Video processing error:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files");
    const title = formData.get("title")?.toString() || "Untitled";
    const ext = formData.get("ext")?.toString();
    const userId = await getDataFromToken(request);
    let combinedText = "";

    if (!userId || userId.trim() === "") {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    // Process uploaded files
    for (const file of files) {
      if (file instanceof File) {
        if (ext === "mp4" || ext === "mov") {
          // Handle MP4 file
          const transcribedText = await processMP4File(file);
          combinedText += transcribedText + " ";
        } else {
          // Handle text file as before
          const buffer = await file.arrayBuffer();
          const text = Buffer.from(buffer).toString("utf-8");
          combinedText += text.replace(/[\r\n]+/g, " ");
        }
      }
    }

    // Trim any extra whitespace
    combinedText = combinedText.trim();

    // Create base English post
    const basePost = await prisma.post.create({
      data: {
        title,
        content: combinedText,
        path: `${title.toLowerCase().replace(/\s+/g, "-")}`,
        language: "en",
        type: "PUBLISHED",
        authorId: userId,
      },
    });

    const translations = [];
    const googleTranslations = new Map();
    const bleuScores = [];

    // Create translated versions
    for (const lang of targetLanguages) {
      try {
        await delay(1000); // Rate limiting
        const translatedContent = await translateTextGoogle(combinedText, lang);

        if (!translatedContent.trans) {
          continue;
        }

        const translatedPost = await prisma.post.create({
          data: {
            title: `${title} (${languageMap[lang]})`,
            content: translatedContent.trans,
            path: `${title.toLowerCase().replace(/\s+/g, "-")}-${
              languageMap[lang]
            }`,
            language: lang,
            type: "PUBLISHED",
            authorId: userId,
            originalId: basePost.id,
          },
        });
        googleTranslations.set(lang, translatedContent.trans);

        translations.push({
          language: lang,
          path: translatedPost.path,
          title: translatedPost.title,
        });
      } catch (error) {
        console.error(`Translation failed for ${lang}:`, error);
      }
    }

    try {
      let translatedContent = await translateTextRev(combinedText);
      console.log(translatedContent);
      let responseList = translatedContent.responseList[0];
      let outStrings = responseList.outStrings;
      for (const [lang, googleTrans] of googleTranslations.entries()) {
        if (outStrings[lang]) {
          const score = BLEUCalculator.calculateBLEU(
            googleTrans,
            outStrings[lang]
          );
          bleuScores.push({
            language: lang,
            languageName: languageMap[lang],
            score: score,
            googleTranslation: googleTrans,
            revTranslation: outStrings[lang],
          });
        }
      }
    } catch (error) {
      console.error(`Translation failed for Rev API:`, error);
    }
    console.log(bleuScores);
    return NextResponse.json({
      success: true,
      original: {
        path: basePost.path,
        title: basePost.title,
      },
      translations,
      comparison: {
        bleuScores,
      },
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
