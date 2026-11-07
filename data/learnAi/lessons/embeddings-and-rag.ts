import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'embeddings-and-rag',
  track: 'build',
  order: 13,
  title: 'Embeddings and RAG',
  metaTitle: 'What Is RAG? Embeddings and Retrieval Explained Simply',
  metaDescription:
    'What is RAG (retrieval-augmented generation)? Learn embeddings, vector search and the open-book exam idea, and when RAG beats pasting it all into the prompt.',
  h1: 'What is RAG? Embeddings, vector search and retrieval-augmented generation, explained simply',
  tldr: 'RAG (retrieval-augmented generation) means: first search your own documents for the passages that answer a question, then give those passages to the model so it answers from them. The search runs on embeddings, lists of numbers that capture meaning, so "refund" can match "money back". It turns a closed-book exam into an open-book one.',
  minutes: 10,
  level: 'Beginner',
  steps: [
    {
      heading: 'Why can’t the model just answer from memory?',
      body: [
        'A model learns from data collected up to a cut-off date. It has never seen your company’s leave policy, your college syllabus or last week’s price list. Ask about them and it may guess, confidently. (That is the hallucination problem from the earlier lesson.)',
        'Think of exams. In a closed-book exam you answer from memory. In an open-book exam you first turn to the right page, then write your answer from it. RAG makes the model sit an open-book exam.',
        'The idea was named in a 2020 research paper by Patrick Lewis and colleagues, "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks". As AWS explains, companies use it to let a model answer from their own data without retraining it.',
      ],
      keyIdea: 'RAG = retrieve the right pages first, then generate the answer from them.',
    },
    {
      heading: 'What is an embedding?',
      body: [
        'To find the right page, the computer needs to compare meanings, not just matching words. An embedding turns a piece of text into a list of numbers. OpenAI’s docs put it simply: "An embedding is a vector (list) of floating point numbers," and the distance between two vectors shows how related they are.',
        'Think of map coordinates. Two shops with close latitude and longitude are near each other. Embeddings work the same way, only with far more than two numbers: OpenAI’s text-embedding-3-small uses 1,536. Texts with similar meaning land close together, even if they share no words.',
      ],
      example: {
        label: 'Toy example (numbers made up, real ones are much longer)',
        code: true,
        text: '"refund my order"     -> [0.12, -0.48, 0.33, ...]\n"I want my money back" -> [0.10, -0.45, 0.31, ...]  close\n"train to Pune"        -> [-0.71, 0.05, 0.88, ...]  far',
      },
    },
    {
      heading: 'How does vector search find the right passage?',
      body: [
        'First you prepare your documents once. Split them into small chunks, a few paragraphs each. Turn every chunk into an embedding with an embedding model. Store the chunks and their numbers in a vector database, a store built to find the closest vectors quickly.',
        'When a question comes in, you embed the question too, and ask the database for the chunks whose numbers sit closest. That is vector search, also called semantic search, because it matches meaning.',
        'It is not perfect. Anthropic found that mixing vector search with plain keyword search (a method called BM25) and adding context to each chunk cut failed retrievals by 49% in their tests, and by 67% when they also re-ranked results.',
      ],
      flow: [
        'Your documents',
        'Split into chunks',
        'Embed each chunk',
        'Store in a vector database',
      ],
    },
    {
      heading: 'How does RAG answer a question?',
      body: [
        'At question time, the system finds the top few matching chunks and pastes them into the prompt, with an instruction to answer only from them. The model then writes the answer and can point to which chunk it used.',
        'This is why RAG answers can include citations, and why you can update the answers just by updating the documents. No retraining needed.',
      ],
      flow: [
        'Question',
        'Embed the question',
        'Find closest chunks',
        'Add chunks to the prompt',
        'Model answers with sources',
      ],
      example: {
        label: 'What the model actually receives (example)',
        code: true,
        text: 'Answer using ONLY the context below.\nIf the answer is not there, say "I don’t know".\n\nContext:\n[1] Employees get 18 paid leaves per year.\n[2] Up to 6 unused leaves carry forward to next year.\n\nQuestion: How many leaves can I carry forward?',
      },
    },
    {
      heading: 'When is RAG better than pasting everything into the prompt?',
      body: [
        'Today’s context windows are large, so sometimes you don’t need RAG at all. Anthropic’s advice: if your knowledge base is smaller than 200,000 tokens (roughly 500 pages), you can often just put all of it in the prompt, and prompt caching makes that faster and cheaper.',
        'RAG starts to win when one or more of these is true:',
      ],
      bullets: [
        'Your documents are too big for the context window, or too costly to send with every question.',
        'They change often, and you want answers to update without changing the prompt.',
        'You need citations so people can check the source.',
        'Different users may see different documents, so you must filter what gets retrieved.',
      ],
      keyIdea: 'Small and stable? Paste it in. Big, changing or private? Retrieve it.',
    },
  ],
  keyTerms: [
    {
      term: 'RAG',
      meaning:
        'Retrieval-augmented generation: search your documents first, then have the model answer using what was found.',
    },
    {
      term: 'Embedding',
      meaning:
        'A list of numbers that represents the meaning of a piece of text, so similar meanings get similar numbers.',
    },
    {
      term: 'Chunk',
      meaning: 'A small piece of a document, a few paragraphs long, that gets its own embedding.',
    },
    {
      term: 'Vector database',
      meaning: 'A database built to store embeddings and quickly find the ones closest to a query.',
    },
    {
      term: 'Semantic search',
      meaning: 'Search by meaning rather than exact words, usually done with embeddings.',
    },
  ],
  videos: [
    {
      youtubeId: 'T-D1OfcDW1M',
      title: 'What is Retrieval-Augmented Generation (RAG)?',
      channel: 'IBM Technology',
      minutes: 7,
      why: 'A clear explanation of why models give outdated or unsourced answers and how retrieval fixes it. Watch for the "content store" idea.',
    },
    {
      youtubeId: 'bGNYyK1L41g',
      title: 'What Are Vector Embeddings? (Explained in 2 Minutes) [Quick Question Ep. 6]',
      channel: 'Elastic',
      minutes: 2,
      why: 'A quick visual of how text becomes numbers and why close numbers mean close meanings.',
    },
  ],
  tryIt: {
    title: 'Chat with your own document',
    steps: [
      'Pick a PDF you know well, like your college syllabus, a hostel rule book or a product manual.',
      'Open NotebookLM with your Google account, create a notebook and add the PDF as a source.',
      'Ask three questions whose answers are in the document. Tap the citation numbers to see which passages it pulled. That is the retrieval step.',
      'Ask one question that is not in the document. Does it say so, or does it guess?',
      'Ask the same questions in a normal chatbot without the PDF and compare. Note which answers you could verify.',
    ],
    link: { label: 'Open NotebookLM', url: 'https://notebooklm.google.com' },
  },
  check: [
    {
      q: 'What does an embedding capture?',
      options: [
        'The exact spelling of a sentence',
        'The meaning of text, as a list of numbers',
        'The font and size of the text',
        'How many people have read the text',
      ],
      answer: 1,
      why: 'Embeddings place text with similar meaning close together, which is what makes meaning-based search work.',
    },
    {
      q: 'In RAG, what happens before the model writes its answer?',
      options: [
        'The model is retrained on your documents',
        'The most relevant chunks are retrieved and added to the prompt',
        'The user uploads the answer',
        'The model searches its own memory harder',
      ],
      answer: 1,
      why: 'Retrieve, then generate. The retrieved passages are pasted into the prompt so the model answers from them.',
    },
    {
      q: 'Your FAQ is 20 pages long and rarely changes. What is a sensible first approach?',
      options: [
        'Build a vector database with re-ranking',
        'Fine-tune a new model on it',
        'Put the whole FAQ in the prompt',
        'Do nothing, the model already knows it',
      ],
      answer: 2,
      why: '20 pages is far below the roughly 500 pages (200,000 tokens) where Anthropic suggests RAG becomes necessary. Start simple and add retrieval when the content grows or changes often.',
    },
  ],
  fromTheSource: [
    {
      who: 'Tomas Mikolov, Kai Chen, Greg Corrado and Jeffrey Dean (Google)',
      role: 'The Google team behind word2vec, the 2013 work that made word embeddings fast and popular.',
      work: 'Efficient Estimation of Word Representations in Vector Space (paper, 2013)',
      url: 'https://arxiv.org/abs/1301.3781',
      idea: 'They showed two simple models that learn a list of numbers for every word by reading huge amounts of text, quickly and cheaply. In the resulting space, similar words sit close together, and even simple sums work: King minus Man plus Woman lands nearest to Queen.',
      breakdown: [
        'The trick is guessing from neighbours. One model (CBOW) guesses a word from the words around it. The other (Skip-gram) guesses the words around a given word.',
        'Words that appear in similar company end up with similar numbers. That is why "refund" and "money back" can match.',
        'It was fast: the paper reports learning good vectors from 1.6 billion words in less than a day.',
        'Modern embedding models work on whole sentences and paragraphs, not single words, but the idea of meaning as position is the same.',
      ],
      use: 'When you embed your document chunks for RAG, you are using the grown-up version of this idea. Close numbers mean close meaning, so a question can find a passage that uses different words.',
    },
    {
      who: 'Patrick Lewis, Ethan Perez, Douwe Kiela and colleagues (Facebook AI Research, UCL and NYU)',
      role: 'Authors of the 2020 paper that named retrieval-augmented generation (RAG).',
      work: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (paper, 2020)',
      url: 'https://arxiv.org/abs/2005.11401',
      idea: 'A model stores facts in its parameters, but it cannot easily look them up precisely, show where they came from, or update them. RAG pairs the model with a second memory, a searchable vector index of Wikipedia, and a retriever that fetches passages before the model writes.',
      breakdown: [
        'Two memories: what the model learned in training (inside the parameters) and an outside library it can search (the index).',
        'A retriever turns the question into numbers and finds the closest passages, exactly like the vector search in this lesson.',
        'The authors report that RAG wrote "more specific, diverse and factual" text than a model without retrieval.',
        'Change the library and the answers change, with no retraining. That was one of the open problems the paper set out to address.',
      ],
      use: 'Keep facts that change, or that are private, in your own searchable store, and let the model read them at question time. Ask it to cite the passages so you can check its answers.',
    },
  ],
  sources: [
    {
      label:
        'Lewis et al. (2020), Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
      url: 'https://arxiv.org/abs/2005.11401',
    },
    {
      label: 'Mikolov et al. (2013), Efficient Estimation of Word Representations in Vector Space',
      url: 'https://arxiv.org/abs/1301.3781',
    },
    {
      label: 'AWS: What is RAG?',
      url: 'https://aws.amazon.com/what-is/retrieval-augmented-generation/',
    },
    {
      label: 'Anthropic: Introducing Contextual Retrieval',
      url: 'https://www.anthropic.com/news/contextual-retrieval',
    },
    {
      label: 'OpenAI docs: Vector embeddings',
      url: 'https://developers.openai.com/api/docs/guides/embeddings',
    },
  ],
  faqs: [
    {
      q: 'What is RAG in simple terms?',
      a: 'RAG lets an AI answer from your documents. It first searches them for the passages most related to the question, then gives those passages to the model with the question, so the answer is based on real sources instead of memory.',
    },
    {
      q: 'What is the difference between RAG and fine-tuning?',
      a: 'RAG gives the model the right facts at question time, so you can update knowledge by updating documents. Fine-tuning trains the model further to change its behaviour or style. For fresh or private facts, RAG is usually cheaper and easier. The later lesson on prompting vs RAG vs fine-tuning goes deeper.',
    },
    {
      q: 'Do I need a vector database for RAG?',
      a: 'Not always. If your documents fit comfortably in the prompt, you can skip retrieval. For larger sets, a vector database makes meaning-based search fast, and combining it with keyword search often finds better passages.',
    },
  ],
  related: [
    { label: 'Why AI makes things up', href: '/learn-ai/ai-hallucinations' },
    { label: 'Previous: Tool calling', href: '/learn-ai/tool-calling' },
    { label: 'Next: What is MCP?', href: '/learn-ai/what-is-mcp' },
    { label: 'Prompting vs RAG vs fine-tuning', href: '/learn-ai/fine-tuning-vs-rag' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
}
