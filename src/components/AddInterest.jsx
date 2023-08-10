import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddInterest = ({ onBack }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
        aboutme: "",
        message: "",
    });

    const handleSubmit = async (e) => {
        navigate(`/`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div className="box">
            <form className="form-box" onSubmit={handleSubmit}>
                <div className="box-split">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label><br />
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label><br />
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label><br />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label><br />
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="box-split">
                    <div className="form-group">
                        <label htmlFor="aboutme">About me:</label><br />
                        <textarea
                            id="aboutme"
                            name="aboutme"
                            value={formData.aboutme}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label><br />
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>
                <button className="saveButton" type="submit">
                    Submit
                </button>
                <button className="closeButton" type="button" onClick={onBack}>
                    Close
                </button>
            </form>
        </div>
    );
};

export default AddInterest;
