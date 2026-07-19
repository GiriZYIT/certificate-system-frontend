import { useNavigate } from "react-router-dom";
import "../styles/cards.css";

export default function QuickAction({
    title,
    subtitle,
    icon,
    link
}) {

    const navigate = useNavigate();

    return (

        <div
            className="quick-card"
            onClick={() => navigate(link)}
        >

            <div className="quick-icon">

                {icon}

            </div>

            <h3>

                {title}

            </h3>

            <p>

                {subtitle}

            </p>

            <button>

                Open

            </button>

        </div>

    );

}