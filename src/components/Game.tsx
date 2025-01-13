import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Card as CardType, cardContents } from '../types/CardType';
import Modal from './Modal';


interface MemoryGameState {
    cards: CardType[];
    flippedCards: number[];
    matchedCards: number[];
    isGameOver: boolean;
    modalContent: string;  // モーダルに表示する内容
    modalImage: string,
    isModalOpen: boolean;  // モーダルが開いているかどうか
}

const MemoryGame: React.FC = () => {
    const [gameState, setGameState] = useState<MemoryGameState>({
        cards: [],
        flippedCards: [],
        matchedCards: [],
        isGameOver: false,
        modalContent: '',
        modalImage: '',
        isModalOpen: false,  // 初期状態ではモーダルは閉じている
    });

    useEffect(() => {
        const shuffledCards = generateCards();
        setGameState({
            cards: shuffledCards,
            flippedCards: [],
            matchedCards: [],
            isGameOver: false,
            modalContent: '',
            modalImage: '',
            isModalOpen: false,
        });
    }, []);

    const getRandomCards = (num: number) => {
        const shuffled = [...cardContents].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, num);
    };

    const generateCards = (): CardType[] => {
        const randomCards = getRandomCards(7);
        const shuffledContents = [...randomCards, ...randomCards];
        const shuffled = shuffledContents
            .map((content, index) => ({
                id: index,
                cardText: content.content,
                frontImage: content.frontImage,
                backImage: content.backImage,
                isFlipped: false,
                isMatched: false,
            }))
            .sort(() => Math.random() - 0.5);

        return shuffled;
    };

    const handleCardClick = (id: number): void => {
        if (gameState.isGameOver || gameState.flippedCards.length === 2 || gameState.cards[id].isFlipped || gameState.cards[id].isMatched) {
            return;
        }

        const updatedCards = [...gameState.cards];
        updatedCards[id].isFlipped = true;

        const flippedCards = [...gameState.flippedCards, id];

        setGameState((prevState) => ({
            ...prevState,
            cards: updatedCards,
            flippedCards,
        }));

        if (flippedCards.length === 2) {
            const [firstCardId, secondCardId] = flippedCards;
            const firstCard = updatedCards[firstCardId];
            const secondCard = updatedCards[secondCardId];

            if (firstCard.cardText === secondCard.cardText) {
                setGameState((prevState) => ({
                    ...prevState,
                    cards: updatedCards.map((card) =>
                        card.cardText === firstCard.cardText
                            ? { ...card, isMatched: true }
                            : card
                    ),
                    matchedCards: [...prevState.matchedCards, firstCardId, secondCardId],
                    flippedCards: [],
                    modalContent: firstCard.cardText,  // モーダルに一致したカードの内容を渡す
                    isModalOpen: true,  // モーダルを開く
                    modalImage: firstCard.frontImage,
                }));
            } else {
                setTimeout(() => {
                    setGameState((prevState) => ({
                        ...prevState,
                        cards: updatedCards.map((card) => ({ ...card, isFlipped: false })),
                        flippedCards: [],
                    }));
                }, 2000);//２秒に修正
            }
        }
    };

    useEffect(() => {
        if (gameState.matchedCards.length === gameState.cards.length) {
            setGameState((prevState) => ({
                ...prevState,
                isGameOver: true,
            }));
        }
    }, [gameState.matchedCards, gameState.cards.length]);

    const resetGame = () => {
        const shuffledCards = generateCards();
        setGameState({
            cards: shuffledCards,
            flippedCards: [],
            matchedCards: [],
            isGameOver: false,
            modalContent: '',
            modalImage: '',
            isModalOpen: false,
        });
    };

    // モーダルが閉じられた時
    const closeModal = () => {
        setGameState((prevState) => ({
            ...prevState,
            isModalOpen: false,
        }));
    };

    return (
        <div style={styles.gameContainer}>
            <h1>ニノクロ神経衰弱</h1>
            {gameState.isGameOver && (
                <div style={styles.gameOverText}>
                    ゲーム終了{' '}
                    <button onClick={resetGame} style={styles.resetButton}>
                        ゲームスタート
                    </button>
                    
                </div>
            )}
            <label  style={{ fontSize: "15px",marginLeft:"30px",color:"black" }}>※スマホは横画面推奨</label>
            <div style={styles.cardContainer}>
                {gameState.cards.map((card, index) => (
                    <Card
                        key={index}
                        id={index}
                        content={card.cardText}
                        frontImage={card.frontImage}
                        backImage={card.backImage}
                        isFlipped={card.isFlipped || card.isMatched}
                        isMatched={card.isMatched}
                        onClick={handleCardClick}
                    />
                ))}
            </div>

            {/* モーダルを表示 */}
            <Modal
                isOpen={gameState.isModalOpen}
                content={gameState.modalContent}
                imageSrc={gameState.modalImage}
                onClose={closeModal}
            />
        </div>
    );
};

const styles = {
    gameContainer: {
        textAlign: 'center' as 'center',
        marginTop: '50px',
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
        justifyContent: 'center',
    },
    gameOverText: {
        marginTop: '20px',
        fontSize: '24px',
        color: 'green',
    },
    resetButton: {
        marginTop: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
    },
};

export default MemoryGame;
