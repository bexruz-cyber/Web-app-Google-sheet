interface ButtonProps {
  title: string;
  type: 'button' | 'submit' | 'reset';
  fun?: (e: React.FormEvent) => void; // Accepts a function that takes an event
  loading: boolean;
}

const ButtonSubmit: React.FC<ButtonProps> = ({ title, type, fun, loading }) => {
  return (
    <button type={type} className="submitBtn" onClick={fun}>
      {

        loading ?
        <div className="loader"></div>
          :
          title
      }
    </button>
  );
}

export default ButtonSubmit;
