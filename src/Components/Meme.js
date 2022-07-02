import React from "react";

export default function Meme(){
    // const [memeImage , setMemeImage] = React.useState("")
    //creating new state
    const [meme, setMeme] = React.useState(
        {
            topText : "",
            bottomText : "",
            randomImage : "https://i.imgflip.com/1g8my4.jpg"
        }
    )
   /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */


    const [allMemeImages, setAllMemeImages] = React.useState([])
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes))

              
    // React.useEffect(() => {
    //     async function getMemes() {
    //         const res = await fetch("https://api.imgflip.com/get_memes")
    //         const data = await res.json()
    //         setAllMemes(data.data.memes)
    //     }
    //     getMemes()
    // }, [])

    },[])


    function getMemeImage(){
        
            
            const randomNumber = Math.floor(Math.random() * allMemeImages.length)
            const url = allMemeImages[randomNumber].url;
            setMeme(prevState => (
                {
                    ...prevState,
                    randomImage : url
                }
            ))
    }

    function handleChange(event){
        const {name,value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name] : value
        }))
    }
    return(
        <main className="meme--outbox">
            <div className="form">
                <input 
                type="text" 
                className="form--input"
                placeholder="top text"
                onChange={handleChange}
                name = "topText"
                value={meme.topText}
                />

                <input 
                type="text" 
                className="form--input"
                onChange={handleChange}
                name = "bottomText"
                value={meme.bottomText}
                placeholder = "bottom text"
                />
                <button className="form--btn" 
                  onClick={getMemeImage}  
                >Get a new meme image</button>
            </div>
            <div className="meme--image--div">
            <img className="meme--image" src={meme.randomImage} alt="memeImage"></img>
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

