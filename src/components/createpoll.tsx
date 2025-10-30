import {useState} from "react";
import {getUsername} from './util.tsx';

interface CreatePollProps {
    setCreatePollState: (state: boolean) => void;
    token?: string;
}

function CreatePoll({setCreatePollState, token} : CreatePollProps) {

    const username = token ? getUsername(token) : "";

    const [question, setQuestion] = useState("");
    const [validUntil, setValidUntil] = useState("");
    const [option, setOption] = useState<string[]>(["", ""]);

    const addOption = () => setOption(ops => [...ops, ""]);
    const removeOption = (index: number) =>
        setOption((ops) => ops.filter((_, i) => i !== index));
    const updateOption = (index: number, value: string) =>
        setOption((ops) => ops.map((o, i) => (i === index ? value : o)));

    const createPoll = async() => {
        if (!username) {
            console.error("No username available (token not provided).");
            return;
        }

        if (!question) {
            console.error("Question is required");
            return;
        }

        const removeEmptyOptions = option.map(o => o.trim()).filter(o => o.length > 0);
        if (removeEmptyOptions.length < 1) {
            console.error("At least one option is required");
        }

        const validUntilMillis = validUntil ? new Date(validUntil).getTime() : Date.now();
        if (isNaN(validUntilMillis)) {
            console.error("Invalid date for validUntil");
            return;
        }

        try {
            const url = `http://localhost:8080/polls?username=${encodeURIComponent(
                username
            )}&question=${encodeURIComponent(question)}&validuntil=${encodeURIComponent(
                String(validUntilMillis)
            )}`;            const response = await fetch(url, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(removeEmptyOptions)
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            const result = await response.json().catch(() => null);
            console.log("Created poll:", result);
        } catch (err: any) {
            console.error("Failed to create poll", err?.message ?? err);
        }
    }

    return (
    <>
        <div className='loginForm'>
            <div className='back'>
                <h4 className='clickable' onClick={()=> setCreatePollState(false)}>← Back</h4>
            </div>
            <h2>Create Poll</h2>

            <input
                type="text"
                className='pollQuestion'
                placeholder='Poll Caption'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <label>Valid_until</label>
            <input
                type="datetime-local"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
            />

            <h2 className='pollQuestion'>Poll Options</h2>
            <div className='pollOptions'>
                {option.map((opt, idx) => (
                    <div className="option clickable" key={idx}>
                        <input
                            type="text"
                            placeholder="Caption"
                            value={opt}
                            onChange={(e) => updateOption(idx, e.target.value)}
                        />
                        <input
                            type="button"
                            value="Remove"
                            onClick={() => removeOption(idx)}
                            disabled={option.length <= 1}
                        />
                    </div>
                ))}

            </div>
            <input type="button" value='Add Option' className='addOption' onClick={addOption}/>
            <input type="button" onClick={createPoll} value='Publish Poll'/>
        </div>
    </>
    )
}

export default CreatePoll
