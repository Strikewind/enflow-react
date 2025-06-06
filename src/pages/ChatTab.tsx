import { useState } from 'react';

const initialPrompts = [
    'Explain from document...',
    'Analyze graph...',
    'Compare CAD models...',
    'Link with Jira...',
	'Summarize code changes...',
	'Suggest requirements...',
	'Find commit where...'
];

const ChatWindow = ({ messages }: { messages: string[] }) => {
	return (
		<div className="chat-window chat-scroll"> {/*TODO: User's name */}
			{messages.length === 0 ? ( 
				<div className="chat-greeting">Hello, I'm EVE 👋</div> 
			) : (
				<div style={{ display: 'flex', flexDirection: 'column'}}>
					{messages.map((msg, idx) => (
						<div key={idx} className="chat-message user">
							{msg}
						</div>
					))}
					{/* Placeholder for future AI response */}
					{/* <div className="chat-message ai">AI response goes here</div> */}
				</div>
			)}
		</div>
	)
}

const ChatInput = ({ input, setInput, handleSend }: { input: string, setInput: (input: string) => void, handleSend: () => void}) => {
	return (
		<div className="chat-input-container">
			<div className="add-icon" />
			<textarea
				className="chat-input chat-scroll"
				placeholder="Ask anything..."
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault();
						handleSend();
					}
				}}
			/>
			<div className="send-icon" onClick={handleSend} />
		</div>
	)
}

const ChatPrompts = ({ initialPrompts, handlePromptClick }: { initialPrompts: string[], handlePromptClick: (prompt: string) => void }) => {
	return (
		<div className="chat-prompts">
			{initialPrompts.map((prompt, idx) => (
				<div key={idx} className="chat-prompt" onClick={() => handlePromptClick(prompt)}>
					{prompt}
				</div>
			))}
		</div>
	)
}

const ChatTab = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, input]);
        setInput('');
    };

    const handlePromptClick = (prompt: string) => {
        setInput(prompt);
    };

    return (
        <div className='main-content'>
            <ChatWindow messages={messages} />
            <div className="chat-bottom">
				<ChatInput input={input} setInput={setInput} handleSend={handleSend} />
                <ChatPrompts initialPrompts={initialPrompts} handlePromptClick={handlePromptClick} />
            </div>
        </div>
    );
};

export default ChatTab;
