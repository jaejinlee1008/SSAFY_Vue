import OpenAI from "openai";
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/stores/theme";


const themeStore = useThemeStore();

const { GPTDialog, gptreply, gptTheme, aiImg, title, description, companion, period } = storeToRefs(themeStore);
const { VITE_OPENAI_API_KEY } = import.meta.env;

const openai = new OpenAI({
    apiKey: VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});
async function connect(msg) {
    console.log(msg);
    console.log('api call 보낸다!!!!!!!!');
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "너는 여행 컨설턴트야" },
            { role: "assistant", content: "너에게 여행장소들의 리스트를 줄테니 테마제목,테마설명,추천 여행 동반자,예상 여행 기간을 ex) {테마제목 : 답변}의 json형태로 줄바꿈 없이 JSON.parse 하기 쉽게 꼭 하나의 답변만해줘" },
            { role: "user", content: msg }],
        model: "gpt-3.5-turbo",
        temperature: 0.3,
    });
    console.log(completion);
    console.log(completion.choices[0]);
    gptreply.value = completion.choices[0].message.content;
    gptTheme.value = JSON.parse(completion.choices[0].message.content);
    title.value = gptTheme.value["테마제목"];
    description.value = gptTheme.value["테마설명"];
    companion.value = gptTheme.value["추천 여행 동반자"];
    period.value = gptTheme.value["예상 여행 기간"];
    GPTDialog.value = false;
}

async function getimg(msg) {
    console.log(msg);
    console.log('api call 보낸다!!!!!!!!');
    const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: msg,
        n: 1,
        size: "256x256",
    });
    console.log(response.data[0].url);
    aiImg.value = response.data[0].url;
    GPTDialog.value = false;
}

export { connect, getimg };