import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from "../Auth";
import { useParams } from "react-router-dom";

function Translate (props) {
  const [translatedText, setTranslatedText] = useState('')
  const handleTranslateClick = () => {
    const text = props.jaContent
    const fromLang = 'ja'
    const toLang = 'en'
    console.log(text)
    // 翻訳
    const params = {
      key: process.env.REACT_APP_GCP_TRANSLATE_API_KEY,
      q: text,
      source: fromLang,
      target: toLang
    }
    console.log(params)
    axios.get(`https://translation.googleapis.com/language/translate/v2`, { params: params }).then(res => {
      // https://qiita.com/mfykmn/items/4a3afbad46b04f92da29
      // HTML文字列の特殊文字をデコードする
      const parser = new DOMParser();
      const doc = parser.parseFromString(res.data["data"]["translations"][0]["translatedText"], "text/html");
      setTranslatedText(doc.body.innerText)
    })

    console.log(translatedText)
    
    // return translatedText
  }
  
  return(
    <>
      <button onClick={handleTranslateClick}>翻訳する</button>
      <div>
        <p>日本語</p>
        { props.jaContent }
      </div>
      <div>
        <p>翻訳語</p>
        { translatedText }
      </div>
    </>
  )
}

export default Translate;