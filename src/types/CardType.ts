
// ゲームで使用するカードのインターフェース
export interface Card {
    id: number;
    cardText: string;
    isFlipped: boolean;
    isMatched: boolean;
    frontImage:string;
    backImage:string;
}

// オリジナルカードの内容
export const cardContents = [
    { id: 0, content: 'ヤック大集合', frontImage: 'assets/cards/front1.png', backImage: '/assets/cards/back.png' },
    { id: 1, content: '朝活', frontImage: '/assets/cards/front2.png', backImage: '/assets/cards/back.png' },
    { id: 2, content: '煽られるサオり', frontImage: '/assets/cards/front3.png', backImage: '/assets/cards/back.png' },
    { id: 3, content: 'ウルフ・ソードマンズ', frontImage: '/assets/cards/front4.png', backImage: '/assets/cards/back.png' },
    { id: 4, content: '焼き団子さん', frontImage: '/assets/cards/front5.png', backImage: '/assets/cards/back.png' },
    { id: 5, content: '第一回ワンリュウを探せ', frontImage: '/assets/cards/front6.png', backImage: '/assets/cards/back.png' },
    { id: 6, content: '変顔対決', frontImage: '/assets/cards/front7.png', backImage: '/assets/cards/back.png' },
    { id: 7, content: '初FB追加カリア', frontImage: '/assets/cards/front8.png', backImage: '/assets/cards/back.png' },
    { id: 8, content: 'ボス待ちグルネーク大量発生', frontImage: '/assets/cards/front9.png', backImage: '/assets/cards/back.png' },
    { id: 9, content: 'サンタさんと追いかけっこ', frontImage: '/assets/cards/front10.png', backImage: '/assets/cards/back.png' },
    { id: 10, content: 'ハロウィンイベント', frontImage: '/assets/cards/front11.png', backImage: '/assets/cards/back.png' },
    { id: 11, content: '二次職追加', frontImage: '/assets/cards/front12.png', backImage: '/assets/cards/back.png' },
    { id: 12, content: '初王位！', frontImage: '/assets/cards/front13.png', backImage: '/assets/cards/back.png' },
    { id: 13, content: '都落ち', frontImage: '/assets/cards/front14.png', backImage: '/assets/cards/back.png' },
    { id: 14, content: '王位二連覇！', frontImage: '/assets/cards/front15.png', backImage: '/assets/cards/back.png' },
    { id: 15, content: 'フローリンと冬の空', frontImage: 'assets/cards/front16.png', backImage: '/assets/cards/back.png' },
    { id: 16, content: 'エスタバニアサイクリング', frontImage: '/assets/cards/front17.png', backImage: '/assets/cards/back.png' },
    { id: 17, content: 'フォクシーゲット！', frontImage: '/assets/cards/front18.png', backImage: '/assets/cards/back.png' },
    { id: 18, content: '虹カエル', frontImage: '/assets/cards/front19.png', backImage: '/assets/cards/back.png' },
    { id: 19, content: '魔女の森のフォクシー', frontImage: '/assets/cards/front20.png', backImage: '/assets/cards/back.png' },
    { id: 20, content: '謹賀新年', frontImage: '/assets/cards/front21.png', backImage: '/assets/cards/back.png' },
    { id: 21, content: '和服でパシャリ', frontImage: '/assets/cards/front22.png', backImage: '/assets/cards/back.png' },
    { id: 22, content: 'クリスマス', frontImage: '/assets/cards/front23.png', backImage: '/assets/cards/back.png' },
    { id: 23, content: 'ファルに乗せてもらったよ', frontImage: '/assets/cards/front24.png', backImage: '/assets/cards/back.png' },
    { id: 24, content: '雪だるまワンリュウ', frontImage: '/assets/cards/front25.png', backImage: '/assets/cards/back.png' },
    { id: 25, content: 'メカの大行進', frontImage: '/assets/cards/front26.png', backImage: '/assets/cards/back.png' },
    { id: 26, content: 'ルッチのプレゼント', frontImage: '/assets/cards/front27.png', backImage: '/assets/cards/back.png' },
    { id: 27, content: '祝！合併！', frontImage: '/assets/cards/front28.png', backImage: '/assets/cards/back.png' },
    { id: 28, content: 'フォトコン入選', frontImage: '/assets/cards/front29.png', backImage: '/assets/cards/back.png' },
    { id: 29, content: '一周年ワンリュウケーキ', frontImage: '/assets/cards/front30.png', backImage: '/assets/cards/back.png' },
  ];

export type CardContent = typeof cardContents[number];