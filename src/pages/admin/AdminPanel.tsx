import { useNavigate } from "react-router-dom";

function AdminPanel() {
    const navigate = useNavigate();

    return (
        <div className="admin-panel">
            <h2 className="admin-panel__title">Hi Admin</h2>
            <p className="admin-panel__subtitle">Select a section to manage</p>

            <div className="admin-panel__grid">
                <button
                    className="admin-panel__card"
                    onClick={() => navigate("/travel-list")}
                >
                    <span className="admin-panel__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 21s-6-5.2-6-10a6 6 0 0 1 12 0c0 4.8-6 10-6 10z"/>
                            <circle cx="12" cy="11" r="2.4"/>
                            <path d="M3 21h18"/>
                        </svg>
                        <span className="admin-panel__pencil">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 3l4 4L7 21H3v-4L17 3z"/>
                            </svg>
                        </span>
                    </span>
                    <span className="admin-panel__label">Manage Travels</span>
                </button>

                <button
                    className="admin-panel__card"
                    onClick={() => navigate("/buses-list")}
                >
                    <span className="admin-panel__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 16V6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10"/>
                            <path d="M4 16h16"/>
                            <circle cx="7.5" cy="19" r="1.5"/>
                            <circle cx="16.5" cy="19" r="1.5"/>
                            <path d="M9 19h6"/>
                            <path d="M8 2v2"/>
                            <path d="M16 2v2"/>
                            <path d="M4 10h16"/>
                        </svg>
                        <span className="admin-panel__pencil">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 3l4 4L7 21H3v-4L17 3z"/>
                            </svg>
                        </span>
                    </span>
                    <span className="admin-panel__label">Manage Buses</span>
                </button>
            </div>
        </div>
    );
}

export default AdminPanel;
