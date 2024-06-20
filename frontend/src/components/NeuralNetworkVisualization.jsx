import React, { useEffect, useRef, useState } from 'react';

const AnimatedCanvas = () => {
    const canvasRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a long loading time (e.g., 5 seconds)
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
            resizeCanvas();
        }, 5000); // 5000 milliseconds = 5 seconds

        return () => clearTimeout(loadingTimeout);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            window.addEventListener('resize', resizeCanvas);
            initializeCanvas();
            return () => window.removeEventListener('resize', resizeCanvas);
        }
    }, [isLoading]);

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth * 0.9;
            canvas.height = window.innerHeight * 0.6;
            initializeCanvas();
        }
    };

    const initializeCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) {
            console.error('Failed to get canvas context');
            return;
        }

        const points = [];
        const velocity2 = 5; // velocity squared
        const radius = Math.min(canvas.width, canvas.height) / 40; // Dynamic radius based on canvas size
        const boundaryX = canvas.width;
        const boundaryY = canvas.height;
        const numberOfPoints = 30;

        const createPoint = () => {
            const point = {};
            point.x = Math.random() * boundaryX;
            point.y = Math.random() * boundaryY;
            // random vx
            point.vx = (Math.floor(Math.random() * 2) - 1) * Math.random();
            const vx2 = Math.pow(point.vx, 2);
            // vy^2 = velocity^2 - vx^2
            const vy2 = velocity2 - vx2;
            point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1);
            points.push(point);
        };

        const resetVelocity = (point, axis, dir) => {
            if (axis === 'x') {
                point.vx = dir * Math.random();
                const vx2 = Math.pow(point.vx, 2);
                const vy2 = velocity2 - vx2;
                point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1);
            } else {
                point.vy = dir * Math.random();
                const vy2 = Math.pow(point.vy, 2);
                const vx2 = velocity2 - vy2;
                point.vx = Math.sqrt(vx2) * (Math.random() * 2 - 1);
            }
        };

        const drawCircle = (x, y) => {
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI, false);
            context.fillStyle = '#97badc';
            context.fill();
        };

        const drawLine = (x1, y1, x2, y2) => {
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.strokeStyle = '#8ab2d8';
            context.stroke();
        };

        const draw = () => {
            for (let i = 0, l = points.length; i < l; i++) {
                const point = points[i];
                point.x += point.vx;
                point.y += point.vy;
                drawCircle(point.x, point.y);
                drawLine(point.x, point.y, point.buddy.x, point.buddy.y);
                if (point.x < 0 + radius) {
                    resetVelocity(point, 'x', 1);
                } else if (point.x > boundaryX - radius) {
                    resetVelocity(point, 'x', -1);
                } else if (point.y < 0 + radius) {
                    resetVelocity(point, 'y', 1);
                } else if (point.y > boundaryY - radius) {
                    resetVelocity(point, 'y', -1);
                }
            }
        };

        const animate = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            draw();
            requestAnimationFrame(animate);
        };

        const init = () => {
            for (let i = 0; i < numberOfPoints; i++) {
                createPoint();
            }

            for (let i = 0, l = points.length; i < l; i++) {
                if (i === 0) {
                    points[i].buddy = points[points.length - 1];
                } else {
                    points[i].buddy = points[i - 1];
                }
            }

            animate();
        };

        init();
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-800 transition-opacity duration-1000 ease-in-out">
            {isLoading ? (
                <div className="text-white text-center">Loading...</div>
            ) : (
                <canvas
                    id="container"
                    ref={canvasRef}
                    className="bg-gray-800"
                    style={{ opacity: isLoading ? 0 : 1 }}
                />
            )}
        </div>
    );
};

export default AnimatedCanvas;


