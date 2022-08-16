import React from "react"
//import MemesData from "../memesData.js"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemeImages, setAllMemeImage] = React.useState([])


    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemeImage(data.data.memes))
    }, [])

    
    
    function getMemeImage() {
       // const memeList = allMemeImages.data.memes
        const rand = Math.floor(Math.random() * allMemeImages.length)
        console.log(allMemeImages[rand].url)
        setMeme(prevUrl => {
            return {
                ...prevUrl,
                randomImage: allMemeImages[rand].url
            }
        })     
        //memeList[rand].url   
    } 

    console.log(meme.topText, meme.bottomText)

    function handleChange(event) {
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [event.target.name]: event.target.value
            }
        })
    }


    return (
        <main className= "meme">
            <div className="form1">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="formInput"
                    name="topText"
                    onChange={handleChange}
                    value={meme.topText}
                />
                <input 
                    type="text"
                    placeholder="Top text"
                    className="formInput"
                    name="bottomText"
                    onChange={handleChange}
                    value={meme.bottomText}
                />
                <button  
                    onClick={getMemeImage}
                    className="formButton"> get a new meme
                </button>
            </div>
            <div className ="imagePos">
                <a href={meme.randomImage}>
                    <img alt="" src={meme.randomImage} className="memeImage" />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </a>
            </div>
           
        </main>
    )
}