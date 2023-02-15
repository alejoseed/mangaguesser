import {
  useState,
  useEffect,
  useCallback,
} from "react";
import React from "react";
import NavBar from "./navBar";
import axios from "axios";
import HandleColors from "./SortColors";
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

let correctNum : number = 0;

function randomNumber() {
  let random : number = 0;
  random = Math.floor(Math.random() * 4) ;
  return random;
}

function HandleAnswer(answer : number, manga : number) {
  if (answer === manga) {
    alert("correct");
    // reload the page
    window.location.reload();
  }
  else {
    alert("incorrect");
  }
}

function PlayGame(){
  const [isLoading, setIsLoading] = useState(true);
  const [allColors, setAllColors] = useState({
    colorOne: "",
    colorTwo: "",
    colorThree: "",
    colorFour: "",
  });
  const [mangaImageUrl, setMangaImageUrl] = useState("");

  const [manga, setManga] = useState({
    mangaOne: "",
    mangaTwo: "",
    mangaThree: "",
    mangaFour: "",
  });

  const handleManga = useCallback(
    (res: MangaResponse) => {
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
    },
    [setMangaImageUrl]
  );
  let image;

  useEffect(() => {
    const fetchData = async () => {
      const mangaArrayRes = await axios.get('https://expressjs-postgres-production-6029.up.railway.app/random_manga')
      .then((mangaArrayRes) => {
        return mangaArrayRes.data;
      })

      handleManga(mangaArrayRes);
      ImageParams.mangaId = mangaArrayRes.mangaId;
      correctNum = mangaArrayRes.correctNum;
      const mangaRes = await axios.get('https://expressjs-postgres-production-6029.up.railway.app/image/' + ImageParams.mangaId, { responseType: 'arraybuffer' })
      .then((mangaRes) => {
        return mangaRes.data;
      })
      
      image = URL.createObjectURL(new Blob([mangaRes], { type: 'image/jpeg' }));
      // remove blob: from the start of the string, also the port is different, it shoudl be 4000
      image = image.replace("blob:https://expressjs-postgres-production-6029.up.railway.app/", "https://expressjs-postgres-production-6029.up.railway.app/");

      console.log(image);
      ImageParams.imageUrl = image;

      handleImage(ImageParams.imageUrl);
      setIsLoading(false); // set isLoading to false when all the data has been fetched
    };
    fetchData();
  }, [handleManga, handleImage]);

  useEffect(() => {
    HandleColors(setAllColors);
  }, [HandleColors]);
  
  if (isLoading) {
    return <div>
      <NavBar />
      <div className="flex flex-row items-center justify-center h-screen">
        <img src={loadingScreen}></img>
      </div>
      <div>Loading</div>
    </div>
  }

  return ( 
    <div>
      <NavBar />
      <div className="flex flex-row space-x-4 items-center justify-center pt-4">
        <img className="rounded-xl shadow-xl max-w-full max-h-full md:w-[350px] md:h-[550px] scale-75 md:scale-100" src={ImageParams.imageUrl} alt="NO MANGA FOUND"/>
        <div>{}</div>
      </div>

        <div className="flex flex-row space-x-3 pt-3">
          <button className="buttonManga w-full" onClick={() => HandleAnswer(correctNum, 0)} style={{ backgroundColor: allColors.colorOne }}>{manga.mangaOne}</button>
          <button className="buttonManga w-full" onClick={() => HandleAnswer(correctNum, 1)} style={{ backgroundColor: allColors.colorTwo }}>{manga.mangaTwo}</button>
        </div>
        <div className="flex flex-row space-x-3 pt-3">
          <button className="buttonManga w-full" onClick={() => HandleAnswer(correctNum, 2)} style={{ backgroundColor: allColors.colorThree }}>{manga.mangaThree}</button>
          <button className="buttonManga w-full" onClick={() => HandleAnswer(correctNum, 3)} style={{ backgroundColor: allColors.colorFour }}>{manga.mangaFour}</button>
        </div>
      </div>
  );
}

export default PlayGame;
