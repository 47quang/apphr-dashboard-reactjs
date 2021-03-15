export const renderButtons = (buttons) => {
  return (
    <div className={'d-flex flex-row justify-content-lg-end'}>
      {buttons.map((button, index) => (
        <button key={index} type={button.type} className={button.className} onClick={button.onClick}>
          {button.name}
        </button>
      ))}
    </div>
  );
};
