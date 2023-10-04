document.addEventListener("DOMContentLoaded", function() {
  // Fish data initialization
  const fishData = {
  name: "Nemo",
  species: "Clownfish",
  gender: "Male",
  location: "Great Barrier Reef",
  image: "nemo.jpg"
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
  body: JSON.stringify({ messages: conversation })
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
  content: "You are a fish."
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