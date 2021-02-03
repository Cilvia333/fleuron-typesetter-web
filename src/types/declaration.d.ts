// ランタイム時には T 型だが、コンパイル時には T と区別したい型をつくる
// https://qiita.com/fsubal/items/cbbe170edbe07d775bab
type Branded<T, U extends string> = T & { [K in U]: never };
