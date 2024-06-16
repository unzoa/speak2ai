const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: ""
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'davinci' // 'gpt-3.5-turbo',
  });

  console.log(chatCompletion)

  return chatCompletion
}

main().then(res => {
  console.log(res)
})