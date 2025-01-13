import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Card as CardType, cardContents } from '../types/CardType';
import Modal from './Modal';

//ゲーム状態の定義
interface MemoryGameState {
    //全てのカード情報
    cards: CardType[];
    //裏返されたカードのID
    flippedCards: number[];
    //マッチしたカードのID
    matchedCards: number[];
    //ゲームが終了しているかのフラグ
    isGameOver: boolean;
    //モーダルに表示するテキスト
    modalContent: string;
    //モーダルに表示する写真
    modalImage: string;
    // モーダルが開いているかどうか
    isModalOpen: boolean;
}

const MemoryGame: React.FC = () => {

    //useStateによる状態の初期化
    const [gameState, setGameState] = useState<MemoryGameState>({
        cards: [],
        flippedCards: [],
        matchedCards: [],
        isGameOver: false,
        modalContent: '',
        modalImage: '',
        isModalOpen: false,
    });

    /**
     * ゲームの初期状態を設定
     * 初回に一度だけレンダリング(第二引数が[]のため)
     * ゲームスタート前から画像を表示可能
     * この部分をなくすとスタート前はカードを表示しない
     * ゲームスタート時にカードの内容も変わっている
     */
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

    /**
     * カードを指定した枚数分返す関数
     * @param num 選択したいカードの枚数
     * @returns 
     */
    const getRandomCards = (num: number) => {
        //.sort(() => Math.random() - 0.5) は配列をランダムにシャッフル
        //配列の中身はCardType.tsで定義したcardContentsの全て
        //cardContentsの中身を直接変更しないために、スプレッド構文で新しい配列にコピー
        const shuffled = [...cardContents].sort(() => Math.random() - 0.5);
        //0番目からnum番目まで要素を返す
        return shuffled.slice(0, num);
    };

    /**
     * カードをシャッフルして返す関数
     * @returns ゲームに使用するカードを返す
     */
    const generateCards = (): CardType[] => {
        //７種のカードを生成して格納
        const randomCards = getRandomCards(7);
        //...randomCardsを二回繰り返すことでペアを作成　同じカードが二枚に
        const shuffledContents = [...randomCards, ...randomCards];

        //map() メソッドを使って、shuffledContents の各カードに対して、ゲーム内で使う情報を設定
        //第一引数はコールバック関数（カードデータが格納されている）
        const shuffled = shuffledContents
            .map((content, index) => ({
                id: index,
                cardText: content.content,
                frontImage: content.frontImage,
                backImage: content.backImage,
                //カードが裏返されているかどうか
                isFlipped: false,
                //カードが揃っているか
                isMatched: false,
            }))
            //カードデータを格納した後シャッフル
            .sort(() => Math.random() - 0.5);
        //カード配列を返す
        return shuffled;
    };

    /**
     * カードをクリックした際の処理
     * @param id 
     * @returns 
     */
    const handleCardClick = (id: number): void => {
        //ゲーム終了の場合、２枚のカードを裏返されている場合、
        //クリックしたカードが裏返されている場合、一致しているカードの場合は処理を中断
        if (gameState.isGameOver || gameState.flippedCards.length === 2 || gameState.cards[id].isFlipped || gameState.cards[id].isMatched) {
            return;
        }

        //現在のカードの状態をコピーした配列を作成
        const updatedCards = [...gameState.cards];
        //クリックしたカードを裏返しフラグを変更（引数のidで取得）
        updatedCards[id].isFlipped = true;
        //裏返されたカード一覧配列にidを追加
        //...gameState.flippedCardsはこれまでに追加されたidを取得するため。
        //１枚目か２枚目か判断に必要
        const flippedCards = [...gameState.flippedCards, id];

        //状態の更新
        //prevStateは、useStateの現在の情報を持っている
        setGameState((prevState) => ({
            //他の情報はそのまま渡す
            ...prevState,
            //裏返しフラグを変更した配列をセット
            cards: updatedCards,
            //裏返されたカード一覧配列をセット
            flippedCards,
        }));

        //二枚目のカードが裏返された際の処理
        if (flippedCards.length === 2) {
            //配列の内容を分割　１枚目と２枚目で
            const [firstCardId, secondCardId] = flippedCards;
            //現在のカード情報から１枚目のIDのデータを取得
            const firstCard = updatedCards[firstCardId];
            //同様に２枚目のIDからデータを取得
            const secondCard = updatedCards[secondCardId];

            //カードが一致している場合の処理
            if (firstCard.cardText === secondCard.cardText) {
                //prevStateは、useStateの現在の情報
                setGameState((prevState) => ({
                    ...prevState,
                    //全てのカード情報を更新
                    cards: updatedCards.map((card) =>
                        //一致しているカードの一致フラグを更新
                        //ない場合はそのまま返す
                        card.cardText === firstCard.cardText
                            ? { ...card, isMatched: true }
                            : card
                    ),
                    //ゲーム内で一致したカードのIDを保持する配列
                    matchedCards: [...prevState.matchedCards, firstCardId, secondCardId],
                    //配列を空にする　この処理をしないとこの後裏返せない
                    flippedCards: [],
                    modalContent: firstCard.cardText,  // モーダルに一致したカードのテキストを渡す用
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
            <label style={{ fontSize: "15px", marginLeft: "30px", color: "black" }}>※スマホは横画面推奨</label>
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
