const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const User = require('./models/User')
const config = require('./config/key')

//*bodyparser 옵션 설정*
//application/x-www-form-urlencoded이걸 분석해줌
app.use(bodyParser.urlencoded({ extended: true }))
    //application/json을 분석해줌
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => console.log('MongoDB Connected!')) //연결이 잘 됐는지 확인
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', (req, res) => {
    //회원 가입할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터베이스에 넣어준다.

    //유저모델 인스턴스 생성
    const user = new User(req.body);
    //req.body안에는 json형식으로 id, password등이 들어있음.
    //이는 앞의 bodyParser덕분

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err }) //성공하지 못하면 제이슨형식으로 알려줌
        return res.status(200).json({ //성공시
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on part ${port}!`))