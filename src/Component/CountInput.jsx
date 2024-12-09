import { useEffect, useState } from "react"
import "./CountInput.css"
const CountInput = () => {
  const [start, setStart] = useState(false)
  const [pause, setPause] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [timer, setTimer] = useState(0)


  //Start Function
  const handleStart = ()=>{
    setStart(true)
  }

  //Restart Function
  const handleRestart = ()=>{
    setStart(false)
    clearInterval(timer)
    setHours(0)
    setMinutes(0)
    setSeconds(0)
  }

  //Pause Function
  const handlePause = ()=>{
    setPause(true)
    clearInterval(timer)
    
  }

  //Resume Function
  const handleResume = ()=>{
    setPause(false)
    runTimer(seconds, minutes, hours)
  }


  //User Input
  const handleInput = (e)=> {
    const value = parseInt(e.target.value)
    const id = e.target.id

    if(id === "hours"){
      setHours(value)
    }else if(id === "minutes"){
      setMinutes(value)
    }else{
      setSeconds(value)
    }

  }

  //Mount agaa
  useEffect(()=>{
    let timer;
    if(start){
      timer = setInterval(()=>{
        runTimer(seconds, minutes, hours, timer)
      },1000)
      setTimer(timer)
    }
    return(()=>{
      clearInterval(timer)
    })

  },[start,hours,minutes,seconds])

  //RunTimer
  const runTimer = (sec, min, hr, tid)=>{
    if(sec > 0){
      setSeconds((s)=> s - 1)
    }else if(sec === 0 && min > 0){
      setMinutes((m)=> m - 1)
      setSeconds(59)
    }else if(min > 0){
      setHours((h)=> h - 1)
      setMinutes(59)
      setSeconds(59)
    }

    if(sec === 0 && min === 0 && hr === 0){
      clearInterval(tid)
      alert("Time's Up")
    }
  }
  
  return (
    <>
      <div className="main-container">
       {
        !start &&  <div className="input-box">
        <input type="number" id="hours" placeholder="HH" onChange={handleInput} />
        <input type="number" id="minutes" placeholder="MM" onChange={handleInput} />
        <input type="number" id="seconds" placeholder="SS" onChange={handleInput} />
        <div className="start-button">
          <button onClick={handleStart}>Start</button>
        </div>
      </div>
       }

        {
          start && <div className="action">
          <div className="timer">
            <div>{hours < 10 ? `0${hours}` : hours}</div>
            <span>:</span>
            <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
            <span>:</span>
            <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
          </div>
         {
          !pause &&  <button className="restart-button"onClick={handlePause}>Pause</button>
         }

         {
          pause &&  <button className="restart-button"onClick={handleResume}>Resume</button>
         }
          <button className="restart-button" onClick={handleRestart}>Restart</button>
        </div>
        }
      </div>

   </>
  )
}

export default CountInput