import {
  useState,
  useEffect,
  useCallback,
} from "react";
import React from "react";
import axios from "axios";
import loadingScreen from "./loadingScreen.gif";

export interface Root {
  result: string
  response: string
  data: Data
}
export interface Data {
  attributes: Attributes
}
export interface Attributes {
  title: Title
  altTitles: AltTitle[]
}
export interface AltTitle {
  ja?: string
  "ja-ro"?: string
}
export interface Title {
  en: string
}
export interface Chapter {
  hash: string
  data: string[]
  dataSaver: string[]
}
export interface playColors {
  colorOne: string
  colorTwo: string
  colorThree: string
  colorFour: string
}
interface MangaResponse {
  mangaNames: string[];
  correctNum: number,
  mangaId : string,
  imageUrl : string,
}
let ImageParams = {
  correctNum: 0,
  mangaId : "",
  mangaName : "",
  atHome : "https://api.mangadex.org/at-home/server/",
  imageUrl : "",
  chapterId : "",
}

// This variable controls the pop up timeout. Since I want 
let popOpTime : any = null;

function Play(){
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [hp, setHp] = useState(100);
  const [streak, setStreak] = useState(0);
  const [popUp, setPopUp] = useState(false);
  const [correctNum, setCorrectNum] = useState(0);
  const [mangaImageUrl, setMangaImageUrl] = useState("");
  const [manga, setManga] = useState({
    mangaOne: "",
    mangaTwo: "",
    mangaThree: "",
    mangaFour: "",
  });
  const handleManga = useCallback(
    async (res: MangaResponse) => {
      setManga({
        mangaOne: res.mangaNames[0],
        mangaTwo: res.mangaNames[1],
        mangaThree: res.mangaNames[2],
        mangaFour: res.mangaNames[3],
      });
    },
    [setManga]
  );

  const handleImage = useCallback(
    (res: string) => {
      setMangaImageUrl(res);
      clearTimeout(popOpTime);
      setIsLoading(false); 
    },
    [setMangaImageUrl]
  );

  const handleCorrectNum = useCallback(
    async (res: number) => {
      setCorrectNum(res);
    },
    [setCorrectNum]
  );

  const fetchData = async () => {
    const mangaArrayRes = await axios.get('https://expressjs-postgres-production-6029.up.railway.app/random_manga')
    .then((mangaArrayRes) => {
      return mangaArrayRes.data;
    })

    handleManga(mangaArrayRes);
    handleCorrectNum(mangaArrayRes.correctNum);

    fetch('https://expressjs-postgres-production-6029.up.railway.app/image/' + mangaArrayRes.mangaId)
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      handleImage(url);
    }).catch(error => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, [handleManga, handleManga, setCorrectNum]);

  function HandleAnswer(userAnswer : number) {
    if (userAnswer === correctNum) {
      setScore(score + 1);
      setPopUp(true);
      if (score >= streak)
        setStreak(score);
      hp + 10 > 100 ? setHp(100) : setHp(hp + 10);

      popOpTime = setTimeout(() => {
        setPopUp(false);
        setIsLoading(true);
        fetchData();
      }, 1000);
    }
    else if (userAnswer !== correctNum){
      if(score > 0)
        setScore(score - 1);
      hp - 10 < 0 ? setHp(0) : setHp(hp - 10);
    }
    if (hp <= 0) {
      setScore(0);
      setStreak(0);      
      setHp(100);
    }
  }
  
  if (isLoading) {
    return <div>
      <div className="flex flex-col items-center justify-center max-h-full pt-14">
        <img src={loadingScreen} className="rounded-lg shadow-lg max-w-[360px] md:max-w-lg"/>
        <div className="lds-ring pt-3"><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  }

  return ( 
    <div className="font-link">
      <div className="mx-2">
        <div className="flex flex-col space-x-4 items-center justify-center pt-4">
          
          {popUp && 
          <div className="grid absolute z-10 bg-slate-500 w-96 h-48 justify-center items-center shadow-lg rounded-lg">
            <h1 className="text-white text-2xl">You are correct! +10 HP</h1>
          </div>}
          
          <img className="rounded-xl shadow-xl max-w-[330px] md:max-w-[360px]" src={mangaImageUrl} alt="NO MANGA FOUND"/>
          
          <div className="mt-4 rounded-xl shadow-xl backdrop-blur bg-sky-300 font-link">
            <p>Current streak:   {streak}</p>
            <p>Current score:     {score}</p>
            <p>Current HP:           {hp}</p>
          </div>
        </div>
        <footer>
          <div className="grid gap-x-4 grid-cols-2 items-center pt-3">
            <div className="grid grid-cols-1 gap-y-2">
              <button className="buttonManga w-full" onClick={() => HandleAnswer(0)} style={{ backgroundColor: "#89CFF0", 
              fontSize: manga.mangaOne.length > 41 ? '12px' : 'inherit' }}>
              {manga.mangaOne}</button>
              <button className="buttonManga w-full" onClick={() => HandleAnswer(1)} style={{ backgroundColor: "#E3735E",
              fontSize: manga.mangaTwo.length > 41 ? '12px' : 'inherit'
              }}>{manga.mangaTwo}</button>
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <button className="buttonManga w-full" onClick={() => HandleAnswer(2)} style={{ backgroundColor: "#36454F",
              fontSize: manga.mangaThree.length > 41 ? '12px' : 'inherit'
              }}>{manga.mangaThree}</button>
              <button className="buttonManga w-full" onClick={() => HandleAnswer(3)} style={{ backgroundColor: "#009e60",
              fontSize: manga.mangaFour.length > 41 ? '12px' : 'inherit'
              }}>{manga.mangaFour}</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default Play;