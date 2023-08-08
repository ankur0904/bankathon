import React from 'react';

const Hero = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        try {
            const response = await fetch('http://localhost:8080/uploadProfilePicture', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Form data submitted successfully:', data);
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" aria-describedby="descriptionHelp" />
                    <div id="descriptionHelp" className="form-text">Please provide the description of the job</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="resume" className="form-label">Resume/CV</label>
                    <input type="file" accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="form-control" id="resume" name="resume" multiple />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-success hero-button-success rounded-circle"><svg xmlns="http://www.w3.org/2000/svg" height="75" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                </svg></button>
            </div>
        </div>
    );
};

export default Hero;
