import React, { useState, useEffect } from 'react';

interface CardProps {
    id: number;
    content: string;
    isFlipped: boolean;
    isMatched: boolean;
    frontImage: string;
    backImage: string;
    onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, frontImage, backImage, isFlipped, isMatched, onClick }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // ウィンドウ幅が変更された際にスタイルを再計算
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        
        // クリーンアップ
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // スタイルの定義
    const styles = {
        cardContainer: {
            display: 'flex',
            flexWrap: 'wrap' as 'wrap',
            justifyContent: 'center' as 'center',
            gap: '10px', // カード間の間隔を確保
        },
        card: {
            width: windowWidth < 768 ? 'calc(50% - 20px)' : windowWidth < 1024 ? 'calc(33.33% - 20px)' : 'calc(20% - 20px)', // メディアクエリに相当
            height: windowWidth < 768 ? '180px' : windowWidth < 1024 ? '200px' : '220px', // サイズの調整
            margin: '10px',
            backgroundColor: 'black',
            color: 'transparent',
            display: 'inline-block',
            textAlign: 'center' as 'center',
            lineHeight: '100px',
            fontSize: '24px',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
        },
        flippedCard: {
            backgroundColor: 'white',
            color: 'black',
        },
        matchedCard: {
            backgroundColor: 'lightgreen',
            color: 'black',
        },
        image: {
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            objectFit: windowWidth < 768 ? 'contain' : 'cover' as 'cover' | 'contain', // 型指定を追加
        },
        content: {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <div
            style={{
                ...styles.card,
                ...(isFlipped || isMatched ? styles.flippedCard : {}),
                ...(isMatched ? styles.matchedCard : {}),
            }}
            onClick={() => onClick(id)}
        >
            {/* 表面画像と裏面画像の表示 */}
            {isFlipped || isMatched ? (
                <img src={frontImage} alt="Front" style={styles.image} />
            ) : (
                <img src={backImage} alt="Back" style={styles.image} />
            )}
        </div>
    );
};

export default Card;
