const buttonStyle = {
    margin: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '7px',
    border: 'var(--letters) solid 0.5px',
    cursor: 'pointer',
    fontWeight: '800',
    color: 'var(--letters)',
};

const tabs = ['phases', 'buckets', 'week', 'calendar'];


export default function TabBar({activeTab, setActiveTab}){
    return(
        <div style={{
            display: 'flex',
            gap: '5px',
            padding: '4px',
            borderRadius: '12px',
            width: 'fit-content',
            }}
        >
            {tabs.map((tab) => (
                <button key={tab} style={{
                    ...buttonStyle,  
                    background: tab === activeTab ? 'var(--accent)' : 'none',
                    color: tab === activeTab ? 'var(--primary)' : 'var(--letters)'
                    }} onClick={() => setActiveTab(tab)}>
                    {tab}
                </button>
            ))}
        </div>
    )
}