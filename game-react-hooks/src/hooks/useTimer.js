import {
    useState,
    useEffect
} from "react";

const useTimer = (fromTime, intervalTime) => {
    const [time, setTime] = useState(fromTime);
    useEffect(() => {
        const interval = setInterval(() => {
            if (time === 0) {
                return clearInterval(interval);
            }
            setTime(prev => prev - 1);
        }, intervalTime);
        return () => {
            clearInterval(interval);
        }
    }, [time, intervalTime])
    return [time, setTime];
}

export default useTimer;