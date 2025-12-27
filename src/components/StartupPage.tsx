import scream from '../assets/scream.svg';
import pua from '../assets/pua.png';
import './startup-page.css'

export default function StartupPage({onContinue}: {onContinue: () => void}) {
    return (
        <div className="startup-page">
            <h1>✨A Natural Scream✨</h1>
            <p>Welcome :P</p>
            <img src={scream} alt="scream.svg" className="scream-image" />
            <div className="bottom">
                <img src={pua} alt="pua.png" className="pua-image" />
                <div className="question">
                    Do you love me?<br/>(Answer honestly)
                    <button className="yes-button" onClick={onContinue}>yes</button>
                </div>
            </div>
        </div>
    );
}