import React, { RefObject } from 'react';

interface SeparatorProps {
  soundsContainer: RefObject<HTMLDivElement>;
  messagesContainer: RefObject<HTMLDivElement>;
}

const Separator: React.FC<SeparatorProps> = ({
  soundsContainer,
  messagesContainer,
}) => {
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;
  };

  const onMouseMove = (e: any) => {
    e.preventDefault();

    // 32 = self margin (16) + main margin (16)
    let yy = Math.min(e.clientY, document.body.clientHeight - 32);
    yy = Math.max(yy, 32);
    // Exclude main margins
    yy -= 32;

    // 64 = self top and bottom margin (32) + main top and bottom margin (32)
    const flexFirst = yy / (document.body.clientHeight - 64);
    const flexSecond = 1 - flexFirst;

    if (soundsContainer && soundsContainer.current) {
      soundsContainer.current.style.flex = String(flexFirst);
    }

    if (messagesContainer && messagesContainer.current) {
      messagesContainer.current.style.flex = String(flexSecond);
    }
  };

  const onMouseUp = (e: any) => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  return (
    <div
      style={{
        marginTop: 16,
        marginBottom: 16,
        width: '90%',
        cursor: 'ns-resize',
      }}
      onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => onMouseDown(e)}
    >
      <hr
        style={{
          border: '2px solid #222',
          borderRadius: 5,
        }}
      />
    </div>
  );
};

export default Separator;
