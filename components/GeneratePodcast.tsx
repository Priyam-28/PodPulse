import React from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'

const GeneratePodcast = () => {
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
