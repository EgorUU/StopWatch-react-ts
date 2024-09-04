import React, { FC, useState, useEffect, useRef } from 'react'

const App: FC = () => {
    const [timecodes, setTimecodes] = useState<string[]>([
        
    ])
    const [stopwatchMil, setStopWatchMil] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [hours, setHours] = useState<number>(0)
    const [start, setStop] = useState<boolean>(false)
    const [interval, setInter] = useState<NodeJS.Timeout | null>(null)
    useEffect(() => {
        if (start) {
            const time = setInterval(() => {
                setStopWatchMil(prev => prev + 1)
            }, 10)
            setInter(time)
        }
        else {
            if (interval) {
                clearInterval(interval)
                setInter(null)
            }
        }
    }, [start])
    useEffect(() => {
        console.log(stopwatchMil)
        if (stopwatchMil >= 100) {
            setSeconds(prev => prev + 1)
            setStopWatchMil(0)
        }
        else if (seconds >= 60) {
            setMinutes(prev => prev + 1)
            setSeconds(0)
        }
        else if (minutes >= 60) {
            setHours(prev => prev + 1)
            setMinutes(0)
        }
    }, [stopwatchMil, seconds, minutes, hours])
    const timecode = useRef<any | null>(null)
    return (
        <>
            <div className="timecods">
                {
                    timecodes.map((el) => (
                        <div className="timecods-item">
                            <h1>{el}</h1>
                        </div>
                    ))
                }
            </div>
            <div className="stopwatch-container">
                <h1  ref={timecode}   className="stopwatch-time">
            {hours >= 10 ? hours: `0${hours}`}:{minutes >= 10 ? minutes : `0${minutes}`}:{seconds >= 10 ? seconds : `0${seconds}`}:{stopwatchMil >= 10 ? stopwatchMil : `0${stopwatchMil}`}
                </h1>
                <div className="stopwatch-manage">
                    <button onClick={() => setStop(false)}>STOP</button>
                    <button onClick={() => setStop(true)}>START</button>
                    <button onClick={() => {
                        setSeconds(0)
                        setMinutes(0)
                        setStopWatchMil(0)
                        setHours(0)
                    }}>RESET</button>
                    <button onClick={() => {
                        if (timecode.current)
                            setTimecodes([...timecodes, timecode.current.textContent])
                    }}>BOWING</button>
                </div>
            </div>
        </>
    )
}

export default App