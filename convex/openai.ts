import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from 'openai';
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";


const openai= new OpenAI ({
    apiKey:process.env.OPEN_API_KEY,
})
export const doSomething = action({
  args: { input:v.string(),voice:v.string() },
  handler: (_, {voice,input}) => async () => {
    // do something with `args.a` and `args.b`
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: voice as SpeechCreateParams['voice'],
        input,
      });
      const buffer = Buffer.from(await mp3.arrayBuffer());
    // optionally return a value
    return buffer;
  },
});