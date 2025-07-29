export default function Sai(){
    //Math.random()」は0〜1未満（1は入らない）までの小数による乱数を生成する
    const roll =  Math.floor(Math.random()*6)+1;
    return <h1>{ roll }</h1>
}