import { defaultBuckets } from "../../data/default";
import { useState } from "react";

const bucketCardStyle = {
    margin: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    border: 'var(--design) solid 5px',
    background: 'var(--secondary)',
    display: 'flex',
    flexDirection: 'column',
    textAlign:'left',
}

const inputStyle = {
    textAlign:'left',
    marginTop: '0.5rem',
    background: 'transparent',
    border: 'transparent',
    color: 'var(--letters)',
    outline: 'none',
    width: '100%',    
    fontSize: '1rem',
    fontFamily: 'inherit', 
    padding: '0',  
    fontWeight: '400'   
}

export default function BucketsTab() {

    const [buckets, setBuckets] = useState(defaultBuckets);
    const [inputValues, setInputValues] = useState({}); 
    const [focusedInput, setFocusedInput] = useState(null);
    
    function handleAddItem(bucketId, newItem) {
        setBuckets(prevBuckets => prevBuckets.map(bucket => {
            if (bucket.id === bucketId) {
                return {
                    ...bucket,
                    items: [...bucket.items, newItem]
                };
            }
            return bucket;
        }));
    }

    return (
        <div style={{display: 'flex', gap: '5px'}}>
            {buckets.map((bucket) => (
                <div key={bucket.id} style={{...bucketCardStyle, position: 'relative'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}>
                        <p style={{ textAlign: 'left', color: 'var(--letters)', fontWeight: '800' }}>
                            {bucket.name}
                        </p>
                        <span style={{ color: 'var(--accent)', fontSize: '1.5rem', flexShrink: 0 }}>✦</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flexDirection: 'column'}}>
                        {bucket.items.map((item, index) => (
                            <span key={index} style={{
                                color: 'var(--letters)',
                            }}>
                                {"⋆ " + item}
                            </span>
                        ))}

                    </div>
                    <input
                        className="bucket-input"
                        style={{...inputStyle,
                            color: focusedInput === bucket.id ? 'var(--letters)' : 'var(--accent)',
                            borderBottom: focusedInput === bucket.id ? 'var(--accent) solid 2px' : 'transparent '
                        }}
                        value={inputValues[bucket.id] || ''}
                        onChange={(e) => setInputValues({...inputValues, [bucket.id]: e.target.value})}
                        onFocus={() => setFocusedInput(bucket.id)}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="⋆ add item"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && inputValues[bucket.id]) {
                            handleAddItem(bucket.id, inputValues[bucket.id]);
                            setInputValues({...inputValues, [bucket.id]: ''});
                            }
                        }}
                    />
                </div>
            )
            )}
        </div>
    )
}

