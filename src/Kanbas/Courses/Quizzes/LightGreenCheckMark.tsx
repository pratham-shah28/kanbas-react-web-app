import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function LightGreenCheckmark() {
    return (
      <span className="me-1 position-relative">
        <FaCheckCircle style={{ top: "2px", color: 'rgba(25, 135, 84, 0.5)' }}
          className="me-1 position-absolute fs-5" />
        <FaCircle className="text-white me-1 fs-6" />
      </span>
    );
}