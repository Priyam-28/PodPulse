import React from 'react'

const PostCastDetails = ({params}:{params:{podcastId:string}}) => {
  return (
    <div>
        <p className='text-white-1'>Postcast details for {params.podcastId} </p>
      
    </div>
  )
}

export default PostCastDetails
