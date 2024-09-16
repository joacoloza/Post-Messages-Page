async function loadMessages() {
    try{
    //API solicitude for messages
    const response = await fetch('/messages');
    const messages = await response.json();

    const messagesContainer = document.getElementById('messagesContainer');

    console.log('message funciont');

    //clean the container
    messagesContainer.innerHTML = '';

    //loop trought the messages
    messages.forEach((message)=>{
        const messageElement = document.createElement('div');
        messageElement.classList.add('messageCard');
        messageElement.innerHTML = `
            <p><strong>${message.user}:</strong></p>
            <p>${message.text}</p>
            <small>${new Date(message.added).toLocaleString()}</small>
        `;
        messagesContainer.appendChild(messageElement);
    });
    }catch(error){
        console.log('an error ocurred',error);
    }
}

//function call
document.addEventListener('DOMContentLoaded',loadMessages);