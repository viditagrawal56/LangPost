import { NextResponse } from "next/server";

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

    return NextResponse.json({
      message: "Files processed successfully",
      text: combinedText.trim(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing files" },
      { status: 500 }
    );
  }
}
