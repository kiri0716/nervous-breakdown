import React, { useState, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    content: string;
    imageSrc: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, imageSrc, content, onClose }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    // ウィンドウのリサイズを監視
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // クリーンアップ
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!isOpen) return null;  // isOpenがfalseならモーダルは表示されない

    return (
        <div style={styles.modalOverlay}>
            <div style={{
                ...styles.modal,
                maxWidth: windowWidth < 768 ? '90%' : '600px', // モバイルの場合に幅を調整
                maxHeight: windowHeight < 768 ? '80%' : 'auto', // モバイルの場合に高さを調整
                overflowY: 'auto', // 画像が大きすぎる場合にスクロール
            }}>
                {/* Closeボタンを右上に配置 */}
                <button onClick={onClose} style={styles.closeButton}>閉じる</button>

                {/* テキストを上部に表示 */}
                <p style={styles.content}>{content}</p>

                {/* 画像 */}
                <img src={imageSrc} alt="Matched Card" style={styles.image} />
            </div>
        </div>
    );
};

const styles = {
    modalOverlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        padding: '2px',
        borderRadius: '8px',
        textAlign: 'center' as 'center',
        width: '100%',
        maxWidth: '600px', // 最大幅を設定
        maxHeight: '80%', // 最大高さを設定
        overflowY: 'auto'as'auto', // 高さがオーバーフローした場合にスクロール
        position: 'relative' as 'relative', // ボタンを右上に配置するため
    },
    image: {
        width: '90%', // 画像の幅をモーダルに合わせる
        height: 'auto', // アスペクト比を維持して高さを調整
        marginBottom: '20px', // 画像とテキストの間に余白を追加
        objectFit: 'contain' as 'contain', // 画像をモーダル内に収める
    },
    content: {
        fontSize: '16px', // デフォルトのフォントサイズ
        lineHeight: '1.5',
        marginBottom: '1px', // コンテンツとボタンの間に余白を追加
        wordBreak: 'break-word' as 'break-word', // 長い単語を折り返し
        whiteSpace: 'pre-wrap' as 'pre-wrap', // 改行を保持
        overflowY: 'auto'as'auto', // テキストが長すぎる場合にスクロール
    },
    closeButton: {
        position: 'absolute' as 'absolute', // ボタンを右上に固定
        top: '10px',
        right: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#ff0000', // 赤色
        color: 'white',
        border: 'none',
        borderRadius: '10%', // 丸いボタン
        zIndex: 1001, // モーダルの上に表示するため
    },
};

export default Modal;
