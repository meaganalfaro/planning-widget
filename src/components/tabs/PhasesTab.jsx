import { useState } from 'react';
import { defaultPhases } from '../../data/default.js';

const monthCardStyle = {
    margin: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    border: 'var(--secondary) solid 5px',
    cursor: 'pointer',
}

const InfoCard = {
    margin: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    border: 'var(--secondary) solid 5px',
    display: 'flex',
    flexDirection: 'column',
    textAlign:'left',
}

export default function PhasesTab() {
    const [selectedPhase, setSelectedPhase] = useState(defaultPhases[0]);

    return (
        <div style={{ padding: '1rem' }}>

            {/* cards row */}
            <div style={{ display: 'flex', gap: '5px'}}>
                {defaultPhases.map((phase) => (
                    <div key={phase.id} style={{...monthCardStyle, position: 'relative'}} onClick={() => setSelectedPhase(phase)}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: 0,
                            height: 0,
                            borderStyle: 'solid',
                            borderWidth: '0 30px 30px 0',
                            borderColor: `transparent var(--secondary) transparent transparent`,
                            borderRadius: '0 3px  0',
                        }} />
                        <p style={{textAlign:'left'}}>{phase.name}</p>
                        <p style={{ color: 'var(--title)', fontWeight: 800, textAlign:'left'}}>{phase.title}</p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                            {phase.tags.map((tag, index) => (
                                <span key={index} style={{
                                    color: 'var(--primary)',
                                    background: 'var(--accent)',
                                    borderRadius: '7px',
                                    padding: '0.25rem 0.5rem'
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* detail below */}
            <div style={InfoCard}>
                <p>{selectedPhase.name}</p>
                    {selectedPhase.items.map((item, index) => (
                        <p style={{color: 'var(--letters)'}} key={index}>{item}</p>
                    ))}
            </div>

        </div>
    )
}