type User = {
    uid: string;
    name: string;
    max_score_3: number;
    max_score_4: number;
    max_score_5: number;
};

type RankDto = {
    uid: string;
    name: string;
    max_score: number;
    rank: number;
};

export {User, RankDto};