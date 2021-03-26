import { joinClassName } from './stringUtils';

export const renderButtons = (buttons, isNeedFlex = true) => {
  const leftButtons = buttons.filter((b) => b.position && b.position === 'left');
  const rightButtons = buttons.filter((b) => !leftButtons.includes(b));
  const mapButtons = (arr) =>
    arr.length > 0 &&
    arr.map((button, index) => (
      <button key={index} type={button.type} className={button.className} onClick={button.onClick}>
        {button.name}
      </button>
    ));

  return (
    <div className={isNeedFlex ? joinClassName(['d-flex flex-row', `justify-content-${leftButtons.length > 0 ? 'between' : 'end'}`]) : ''}>
      <div>{mapButtons(leftButtons)}</div>
      <div>{mapButtons(rightButtons)}</div>
    </div>
  );
};
