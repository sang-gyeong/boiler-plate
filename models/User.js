const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
        name: {
            type: String,
            maxlength: 50
        },
        email: {
            type: String,
            trim: true, //빈칸 제거
            unique: 1 //중복 없음
        },
        password: {
            type: String,
            minlength: 5
        },
        role: { //일반유저, 관리자 유저
            type: Number,
            default: 0
        },
        image: String,
        token: {
            type: String
        },
        tokenExp: { //토큰 유효기간
            type: Number
        }
    })
    //스키마를 이용해서 모델 생성
const User = mongoose.model('User', userSchema);

module.exports = User;