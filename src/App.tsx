import { useEffect, useCallback } from 'react';
import './App.css';

interface Snowflake {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    wobble: number;
    opacity: number;
}

function App() {
    const createSnowflake = useCallback((id: number): Snowflake => {
        return {
            id,
            x: Math.random() * window.innerWidth,
            y: -20,
            size: Math.random() * 15 + 10,
            speed: 1 + Math.random() * 2,
            wobble: Math.random() * 2 - 1,
            opacity: Math.random() * 0.8 + 0.2
        };
    }, []);

    useEffect(() => {
        const snowflakes = new Map<number, Snowflake>();
        let nextId = 0;
        let animationFrameId: number;

        const addSnowflake = () => {
            snowflakes.set(nextId, createSnowflake(nextId));
            nextId++;
        };

        const updateSnowflakes = () => {
            const canvas = document.getElementById('snowCanvas') as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // キャンバスをクリア
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            snowflakes.forEach((snowflake, id) => {
                // 雪を移動
                snowflake.y += snowflake.speed;
                snowflake.x += Math.sin(snowflake.y * 0.02) * snowflake.wobble;

                // 雪を描画
                ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
                ctx.beginPath();
                ctx.arc(snowflake.x, snowflake.y, snowflake.size / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillText('❄', snowflake.x, snowflake.y);

                // 画面外に出た雪を削除
                if (snowflake.y > window.innerHeight) {
                    snowflakes.delete(id);
                }
            });

            animationFrameId = requestAnimationFrame(updateSnowflakes);
        };

        // キャンバスのサイズを設定
        const resizeCanvas = () => {
            const canvas = document.getElementById('snowCanvas') as HTMLCanvasElement;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // 初期設定
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // 雪を定期的に追加
        const intervalId = setInterval(addSnowflake, 100);
        animationFrameId = requestAnimationFrame(updateSnowflakes);

        // クリーンアップ
        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(intervalId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [createSnowflake]);

    return (
        <canvas
            id="snowCanvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                background: 'transparent'
            }}
        />
    );
}

export default App;