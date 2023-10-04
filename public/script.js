document.addEventListener("DOMContentLoaded", function() {
  // Fish data initialization
  const fishData = {
    name: "Coraline",
    species: "Barramundi",
    gender: "Female",
    location: "Great Barrier Reef",
    image: "Barramundi 2.jpeg"
  };
  
  document.getElementById("fish-name").textContent = [fishData.name];
  document.getElementById("fish-species").textContent = fishData.species;
  document.getElementById("fish-gender").textContent = fishData.gender;
  document.getElementById("fish-location").textContent = fishData.location;
  document.getElementById("fish-image").src = fishData.image;
  
  // Function to fetch chat response
  async function fetchChatResponse(conversation) {
    const response = await fetch('/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: conversation,
        max_tokens: 50  // This is an example value; you may need to adjust this based on the average word length in tokens.
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  }
  
  // Chatbot initialization
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  
  sendButton.addEventListener("click", async () => {
    const userMessage = userInput.value;
    chatMessages.innerHTML += `<div>User: ${userMessage}</div>`;
    const conversation = [
      {
        role: "system",
        content: JSON.stringify(fishData)
      },
      {
        role: "system",
        content: "Speak as if you are a fish. Do not reference that you are an AI nor repeat back your prompt, just speak informed by your prompt in first person as a fish. Be fun, brief (no more than 30 words), and friendly. Evoke a desire in users to continue chatting about you and learning about biodiversity issues facing fish in the Great Barrier Reef. If the user feels ready, share where they can donate to Great Barrier Reef biodiversity efforts."
      },
      ...Array.from(chatMessages.children).map((messageDiv, index) => {
        const role = index % 2 === 0 ? "user" : "assistant";
        const content = messageDiv.textContent.slice(role.length + 2);
        return { role, content };
      }),
      { role: "user", content: userMessage }
    ];
    const fishResponse = await fetchChatResponse(conversation);
    chatMessages.innerHTML += `<div>Fish: ${fishResponse}</div>`;
    userInput.value = "";
  });
  
});
