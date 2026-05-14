import { defaultWeek } from "../../data/default";
import React, { useMemo } from "react";
import { useState } from "react";

export default function WeekTab() {

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'weekend'];
    const times = ['morning', 'midday', 'afternoon', 'evening'];
    const colorList = ['var(--one)', 'var(--two)', 'var(--three)', 'var(--four)', 'var(--five)', 'var(--six)', 'var(--seven)', 'var(--eight)', 'var(--nine)', 'var(--ten)'];
    const [showPopup, setShowPopup] = useState(false);
    const [newEvent, setNewEvent] = useState({ day: '', time: '', task: '' });
    const [week, setWeek] = useState(defaultWeek);

    const weeklyStyle = {
        margin: '1rem',
        padding: '0.5rem',
        color: '#000',
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: 'var(--design) solid 3px',
    }
    const eventButtonStyle = {
        margin: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        border: 'var(--letters) solid 0.5px',
        background: 'transparent',
        color: 'var(--letters)',
        fontWeight: '800',
        fontSize: '1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'left',
    }
    const buttonStyle = {
        margin: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        border: 'var(--secondary) solid 3px',
        background: 'var(--accent)',
        color: 'var(--primary)',
        fontWeight: '800',
        fontSize: '0.75rem',
        cursor: 'pointer',
    }

    const selectStyle = {
        margin: '0.5rem',
        padding: '0.5rem',
        borderRadius: '10px',
        border: 'var(--secondary) solid 3px',
        background: 'var(--accent)',
        color: 'var(--primary)',
        fontWeight: '650',
        fontSize: '0.75rem',  
    }

    const inputStyle = {
        margin: '0.5rem',
        padding: '0.5rem',
        borderRadius: '10px',
        border: 'var(--secondary) solid 3px',
        background: 'var(--accent)',
        color: 'var(--primary)',
        fontWeight: '800',
        fontSize: '0.75rem', 
        outline: 'none', 
    }
    
    const taskColors = useMemo(() => {
        const map = {};
        let colorIndex = 0;
    

        days.forEach(day => {
            times.forEach(time => {
            const task = week[day][time];
            if (task && !map[task]) {
                map[task] = colorList[colorIndex % colorList.length];
                colorIndex++;
            }
            });
        });

        return map;
    }, [week]);

    function handleAddEvent() {
        if (newEvent.day && newEvent.time && newEvent.task) {
            setWeek(prevWeek => ({
                ...prevWeek,
                [newEvent.day]: {
                    ...prevWeek[newEvent.day],
                    [newEvent.time]: newEvent.task
                }
            }));
            setNewEvent({ day: '', time: '', task: '' });
            setShowPopup(false);
        }
    }

    return (
        <div style={{ margin: '0.5rem', padding: '0.5rem' }}>

            {/* grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '80px repeat(6, 1fr)',
                gap: '4px',
                color: 'var(--letters)',
                fontWeight: 800,
            }}>

            <div></div>

            {days.map(day => <p key={day}>{day}</p>)}
            {times.map(time => (
                <React.Fragment key={time}>
                <p style={{ padding: '0.5rem', display: 'flex', alignItems: 'center' }}>{time}</p>
                {days.map(day => (
                    <p key={day} style={{ ...weeklyStyle, background: taskColors[week[day][time]] || 'var(--design)' }}>
                    {week[day][time]}
                    </p>
                ))}
                </React.Fragment>
            ))}
            </div>

            {/* legend */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', margin: '1rem 0.5rem' }}>
            {Object.entries(taskColors).map(([task, color]) => (
                <div key={task} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '3px', background: color }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--letters)', fontWeight: 800 }}>{task}</span>
                </div>
            ))}
            </div>

            {/* button + popup */}
            <button style={eventButtonStyle}
                    onClick={() => setShowPopup(true)}
                >⋆ add event</button>
            {showPopup && (
            <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'var(--design)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2rem',
                    borderRadius: '20px',
                    border: 'var(--primary) solid 3px',
                }}>
                    <p style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                    ⋅˚₊‧ please enter new event details ‧₊˚ ⋅
                    </p>
                    <div style={{ display: 'flex' }}>
                        <select style={selectStyle} value={newEvent.day} onChange={(e) => setNewEvent({...newEvent, day: e.target.value})}>
                            <option value="">select day</option>
                            {days.map(day => <option key={day} value={day}>{day}</option>)}
                        </select>
                        <select style={selectStyle} value={newEvent.time} onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}>
                            <option value="">select time</option>
                            {times.map(time => <option key={time} value={time}>{time}</option>)}
                        </select>
                        <input
                            style={{...inputStyle, color: 'var(--primary)'}}
                            placeholder="task name..."
                            value={newEvent.task}
                            onChange={(e) => setNewEvent({...newEvent, task: e.target.value})}
                        />
                    </div>
                    <div style={{ display: 'flex', marginTop: '1rem' }}>
                        <button style={buttonStyle} onClick={handleAddEvent}>add</button>
                        <button style={buttonStyle} onClick={() => setShowPopup(false)}>cancel</button>
                    </div>
                </div>
            </div>
            )}
        </div>
        );
}