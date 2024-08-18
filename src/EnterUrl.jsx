import { useState } from "react"

const InputUrl = () => {
    return (
        <div className='yt-extension-input'>
          Enter video URL : <input type="text" placeholder='www.youtube.com' value={videoURL}/>
        </div>
    )
}