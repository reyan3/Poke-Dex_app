import "./Support.css";
import { FaEnvelope, FaBug } from "react-icons/fa";

const Support = (props) => {
  return (
    <div className={`support-container ${props.darkmode ? "darksupport" : ""}`}>
      <h2>Support🛠️</h2>
      <p>If you face issues or need help, reach out easily below.</p>

      <div className="support-options">
        {/* Opens email client */}
        <a href="mailto:clan6229@gmail.com" className="support-link">
          <FaEnvelope /> Email Us
        </a>

        {/* Opens a simple form / GitHub issues page */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSehUQ4dVz0jf6OeqZtH1fs7tX2bGa9eu2FDXDMe1F1vowFEgQ/viewform?usp=dialog"
          target="_blank"
          rel="noreferrer"
          className="support-link"
        >
          <FaBug /> Report Bug
        </a>
      </div>
    </div>
  );
};

export default Support;
