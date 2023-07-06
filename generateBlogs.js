require('dotenv').config();
const promptData = require('./prompts.json');
const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');
const officegen = require('officegen');
const fs = require('fs');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const promptStart = "In the format for a word document and using proper headers and page structure. Write a blog post about ";

const promptsAndTags = promptData;

async function createDocs() {
    // Create directory if it doesn't exist
    const dir = './blog_posts';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    for (let i = 0; i < promptsAndTags.length; i++) {
        const promptAndTag = promptsAndTags[i];
        const response = await openai.createCompletion({
            model: process.env.OPENAI_MODEL,
            prompt: promptStart + promptAndTag.prompt,
            max_tokens: 1000
        });

        let docx = officegen('docx');

        // Create a new Word document with the blog content
        let pObj = docx.createP();
        pObj.addText(response.data.choices[0].text);

        let tableStyle = {
            tableColWidth: 4261,
            tableSize: 24,
            tableColor: "ada",
            tableAlign: "left",
            tableFontFamily: "Avenir Book",
            borders: true,
        };

        // Create a table with metadata
        let table = [
            [{
                val: "Metadata",
                opts: {
                    cellColWidth: 4261,
                    b:true,
                    sz: '48',
                    shd: {
                        fill: "7F7F7F",
                        themeFill: "text1",
                        "themeFillTint": "80"
                    },
                    fontFamily: "Avenir Book"
                }
            },{
                val: "",
                opts: {
                    cellColWidth: 0,
                    b:true,
                    sz: '0',
                    shd: {
                        fill: "7F7F7F",
                        themeFill: "text1",
                        "themeFillTint": "80"
                    },
                    fontFamily: "Avenir Book"
                }
            }],
            ["Title", promptAndTag.prompt],
            ["Description", 'A blog post about ' + promptAndTag.prompt], // Add a real description here
            ["Tags", promptAndTag.tag]
        ];
        docx.createTable(table, tableStyle);

        let out = fs.createWriteStream(`${dir}/Blog_Post_${i+1}.docx`);
        docx.generate(out);
    }
}

createDocs();