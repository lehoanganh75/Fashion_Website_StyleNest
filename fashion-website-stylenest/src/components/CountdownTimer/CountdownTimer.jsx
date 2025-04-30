import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer = () => {
    // Lưu thời gian kết thúc chỉ 1 lần duy nhất
    const endTimeRef = useRef(
        localStorage.getItem("endTime")
            ? parseInt(localStorage.getItem("endTime"))
            : Date.now() + 90 * 24 * 60 * 60 * 1000
    );

    // Nếu chưa lưu, thì lưu vào localStorage
    useEffect(() => {
        if (!localStorage.getItem("endTime")) {
            localStorage.setItem("endTime", endTimeRef.current.toString());
        }
    }, []);

    const [timeLeft, setTimeLeft] = useState(endTimeRef.current - Date.now());

    useEffect(() => {
        const intervalId = setInterval(() => {
            const remaining = endTimeRef.current - Date.now();
            if (remaining <= 0) {
                clearInterval(intervalId);
                setTimeLeft(0);
            } else {
                setTimeLeft(remaining);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // Tính đơn vị thời gian
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
        <div className="flex space-x-2">
            <div className="bg-gray-100 p-2 rounded text-center w-16">
                <div className="text-lg font-bold text-gray-900">{days}</div>
                <div className="text-xs text-gray-600">Ngày</div>
            </div>
            <div className="bg-gray-100 p-2 rounded text-center w-16">
                <div className="text-lg font-bold text-gray-900">{hours}</div>
                <div className="text-xs text-gray-600">Giờ</div>
            </div>
            <div className="bg-gray-100 p-2 rounded text-center w-16">
                <div className="text-lg font-bold text-gray-900">{minutes}</div>
                <div className="text-xs text-gray-600">Phút</div>
            </div>
            <div className="bg-gray-100 p-2 rounded text-center w-16">
                <div className="text-lg font-bold text-gray-900">{seconds}</div>
                <div className="text-xs text-gray-600">Giây</div>
            </div>
        </div>
    );
};

export default CountdownTimer;
