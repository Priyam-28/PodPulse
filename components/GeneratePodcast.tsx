'use client'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { GeneratePodcastProps } from '@/types'
import { useToast } from './ui/use-toast'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { v4 as uuidv4 } from 'uuid';



const useGeneratePodcast=({setAudio,voiceType, voicePrompt, setAudioStorageId
}: GeneratePodcastProps)=>{
  const[isGenerating,setIsGenerating]=useState(false);

  const {toast}=useToast();

  const generateUploadUrl=useMutation(api.files.generateUploadUrl);
  // used by convex along with upload stuff for uploading files in convex

  const {startUpload} =useUploadFiles(generateUploadUrl)
  const getPodcastAudio=useAction(api.openai.generateAudioAction);
  // using the openai function in here


  const generatePodcast=async()=>{
    setIsGenerating(true);
    setAudio('');

    if(!voicePrompt){
      toast({
        title:"Please select a voice"
      })

      return setIsGenerating(false);
    }

    try{
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt
      })

      const blob = new Blob([response], { type: 'audio/mpeg' });
      const filename=`podcast-${uuidv4()}.mp3`;
      const file = new File([blob], filename, { type: 'audio/mpeg' });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "Podcast generated successfully",
      })



    }
    catch (error){
      console.log("Error generating podcasts",error);
      toast({
        title: "Error creating a podcast",
        variant: 'destructive',
      })
      setIsGenerating(false);
    }
  
  }
  return {isGenerating,generatePodcast}
}


const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);
  return (
    <div>
      <div className='flex flex-cl gap-2.5'>
        <Label>Enter AI Prompt</Label>
        <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Write a short podcast description"
        rows={5}
        value={props.voicePrompt} 
        onChange={(e) => props.setVoicePrompt(e.target.value)}/>
      </div>
      <div className="mt-5 w-full max-w-[200px]">
      <Button type="submit" className="text-16 bg-orange-1 py-4 font-bold text-white-1" onClick={generatePodcast}>
        {isGenerating ? (
          <>
            Generating
            <Loader size={20} className="animate-spin ml-2" />
          </>
        ) : (
          'Generate'
        )}
      </Button>
      </div>
      {props.audio && (
        <audio
         controls
         src={props.audio}
         autoPlay
         className='mt-5'
         onLoadedMetadata={(e)=> props.setAudioDuration(e.currentTarget.duration)}/>
        //  event handler that is triggered when the metadata of a media element (like audio or video) has been loaded  
      )}

    </div>
  )
}

export default GeneratePodcast
