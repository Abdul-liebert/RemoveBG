// import { NextRequest, NextResponse } from "next/server";

// export const runtime = "nodejs";

// export async function POST(req: NextRequest) {
//   const apiKey = process.env.REMOVE_BG_API_KEY;
//   if (!apiKey) {
//     return NextResponse.json({ error: "API key not found" }, { status: 500 });
//   }

//   const body = await req.formData();
//   const file = body.get("image_file") as Blob;
//   if (!file) {
//     return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
//   }

//   const form = new FormData();
//   form.append("size", "preview");
//   form.append("image_file", file);

//   try {
//     const res = await fetch("https://api.remove.bg/v1.0/removebg", {
//       method: "POST",
//       headers: { "X-Api-Key": apiKey },
//       body: form,
//     });

//     if (!res.ok) {
//       const errorText = await res.text();
//       return NextResponse.json({ error: errorText }, { status: res.status });
//     }

//     const buffer = await res.arrayBuffer();
//     return new Response(buffer, {
//       headers: { "Content-Type": "image/png" },
//     });
//   } catch (err: any) {
//     console.error("Remove.bg failed:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// rembg
// import { NextRequest, NextResponse } from "next/server";
// import { writeFile, unlink, readFile } from "fs/promises";
// import { spawn } from "child_process";
// import path from "path";
// import { tmpdir } from "os";
// import { randomUUID } from "crypto";

// export const runtime = "nodejs";

// export async function POST(req: NextRequest) {
//   const formData = await req.formData();
//   const file = formData.get("image_file") as File;

//   if (!file) {
//     return NextResponse.json({ error: " No image uploaded" }, { status: 400 });
//   }

//   try {
//     const inputPath = path.join(tmpdir(), `${randomUUID()}-input.png`);
//     const outputPath = path.join(tmpdir(), `${randomUUID()}-output.png`);
//     const fileBuffer = Buffer.from(await file.arrayBuffer());

//     await writeFile(inputPath, fileBuffer);

//     await new Promise<void>((resolve, reject) => {
      
//       const process = spawn('rembg', [inputPath, outputPath]);

//       process.on("close", (code) => {
//         if (code === 0) resolve();
//         else reject(new Error(`rembg exited with code ${code}`));
//       });
//     });

//     const outputBuffer = await readFile(outputPath);
//     const response = new Response(Buffer.from(outputBuffer), {
//       headers: {
//         "Content-Type": "image/png",
//       },
//     });

//     await unlink(inputPath);
//     await unlink(outputPath);

//     return response;
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Remove.bg failed: ", detail: err },
//       { status: 500 }
//     );
//   }
// }

// removal.ai

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const apiKey = process.env.REMOVAL_AI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not found" }, { status: 500 });
  }

  const formData = await req.formData();
  const file = formData.get("image_file");

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "No valid image uploaded" }, { status: 400 });
  }

  const proxyForm = new FormData();
  proxyForm.append("image_file", file, (file as any).name || "upload.png");

  // Validasi jenis file
  if (!["image/png", "image/jpeg"].includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  // Konversi File ke Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const form = new FormData();
  form.append("image_file", new Blob([buffer], { type: file.type }), file.name);

  try {
    const res = await fetch("https://sdk.photoroom.com/v1/segment", {
      method: "POST",
      headers: {
        "X-API-KEy": apiKey,
      },
      body: proxyForm,
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const imageBuffer = await res.arrayBuffer();

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": "inline; filename=output.png",
      },
    });
  } catch (error) {
    console.error("removal.ai failed:", error);
    return NextResponse.    json({ error: "Server error" }, { status: 500 });
  }
}

