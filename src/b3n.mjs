// 使用顶级await语法确保在启动应用程序前加载.env文件
import { config } from 'dotenv';

// 加载.env文件中的环境变量
config();

import axios from 'axios'

const url = 'https://api.b3n.fun/v1/chat/completions'

const body = {
  "model": "gpt-3.5-turbo",
  "max_tokens": 4096,
  "messages": [
    {
      "role": "user",
      "content": "hello"
    }
  ]
}
console.log(process.env.b3n_key)
const options = {
  headers: {
    Authorization: process.env.b3n_key,
    "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
    "Content-Type": "application/json"
  }
}

async function test (params) {
  axios.post(url, body, options).then(res => console.log(res.data.choices[0].message.content))
}
test()