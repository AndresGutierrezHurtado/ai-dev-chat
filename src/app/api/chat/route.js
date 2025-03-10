import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { inputs } = await request.json();
        const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
        const model = process.env.HUGGINGFACE_MODEL_NAME;

        const response = await hf.textGeneration({
            model,
            inputs,
            parameters: {
                temperature: 0.1,
            },
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
    }
}
