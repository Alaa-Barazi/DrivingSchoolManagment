function Button({ children, action = "", className = "" }) {
  return (
    <button className={className} onClick={action}>
      {children}
    </button>
  );
}

export default Button;
