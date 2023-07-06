# Blog Post Generator using ChatGPT

This repository contains code for generating sample blog post content using ChatGPT, a powerful language model developed by OpenAI.

How it Works
The blog post generator utilizes the text-davinci-003 Model to generate coherent and contextually relevant text based on a given prompt or topic. It leverages the power of completion AI to simulate a task with the model, providing a more interactive and dynamic approach to generating blog post content.

##Setup
To set up the project, follow the instructions below:

Clone the repository:

```sh
git clone https://github.com/your-username/blog-post-generator.git
```

Navigate to the project directory:

```sh
cd blog-post-generator
```

Install the required dependencies:

```sh
npm install
```

Obtain an API key for OpenAI's GPT-3.5 model. You can find more information on how to get an API key [here](https://openai.com/docs/guides/authentication/).

Create a .env file in the project directory and add your OpenAI API key and [AI Model](https://platform.openai.com/docs/models/overview):

```sh
OPENAI_API_KEY=your-api-key
OPENAI_MODEL="text-davinci-003" // set to latest model
```

Update prompts:

```sh
prompts.json
[
    { "prompt": "The benefits of using Magento for an e-commerce business.", "tag": "Magento"},
    { "prompt": "How to optimize a Magento store for maximum conversion.", "tag": "Magento"},
    ...
]
```

Run the script:

```sh
node generateBlogs.js
```

Migrate docs output in the `blog_posts` directory to your respective Google Drive or Sharepoint.
