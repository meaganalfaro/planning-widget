
const buttonStyle = {
    width: '11px',
    height: '11px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    };

export default function WindowChrome({ title = 'summer planner'}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
      padding: '10px 16px',
      background: 'var(--secondary)',
      borderRadius: '20px 20px 0 0',
    }}>
      <button style={{...buttonStyle, background: '#FF6B6B'}} onClick={() => {}}/>
      <button style={{ ...buttonStyle, background: '#FFD93D'}} onClick={() => {}} />
      <button style={{...buttonStyle, background: '#6BCB77' }} onClick={() => {}}/>
      <span style={{
        marginLeft: '6px',
        fontSize: '13px',
        fontWeight: '700',
        color: 'var(--title)',
        opacity: 0.8,
        letterSpacing: '0.03em',
      }}>
        {title} 
      </span>
    </div>
  );
}