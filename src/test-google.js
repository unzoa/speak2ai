const speech = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech');

// 设置Google Cloud客户端
const speechClient = new speech.SpeechClient();
const textToSpeechClient = new textToSpeech.TextToSpeechClient();



// 语音识别功能
async function transcribeAudio(audioBuffer) {
  const request = {
    audio: {
      content: audioBuffer.toString('base64'),
    },
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    },
  };

  const [response] = await speechClient.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');

  return transcription;
}

// 语音合成功能
async function synthesizeSpeech(text) {
  const request = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await textToSpeechClient.synthesizeSpeech(request);
  return response.audioContent;
}

const fs = require('fs')
synthesizeSpeech('hello').then((audioContent) => {
    fs.writeFileSync('output.mp3', audioContent);
  });

/*
/Users/unzoa/.nvm/versions/node/v18.17.0/bin/node ./src/test-google.js
Uncaught Error Error: Could not load the default credentials. Browse to https://cloud.google.com/docs/authentication/getting-started for more information.
    at getApplicationDefaultAsync (file:///Users/unzoa/github/speak2ai/node_modules/google-auth-library/build/src/auth/googleauth.js:271:15)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
Process exited with code 1
*/

