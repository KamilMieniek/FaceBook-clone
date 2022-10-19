import './Icon.css';
export const Icon = ({ img, className = '', ...props }) => {
  return (
    <div className={`icon ${props.size}`}>
      <img
        src={`${img}`}
        alt="img/svg"
        className={`icon-img ${className}`}
        id={props?.id}
      />
    </div>
  );
};
