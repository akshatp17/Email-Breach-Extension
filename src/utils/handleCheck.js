import axios from "axios";

export const handleCheck = async ({ endpoint, data, changeload, setResult, phishmode }) => {
    try {
        changeload(true);

        let url = `http://localhost:8080/v1/${endpoint}`;

        // Handle different cases for phishing detection
        if (endpoint === "phishing") {
            url = phishmode === "site" ? "http://localhost:8080/v1/url" : "http://localhost:8080/v1/pmail";
        }

        const response = await axios.post(url, data);

        // Process response based on the type of check
        setResult({
            res: true,
            ...(endpoint === "phishing"
                ? { malicious: response.data.isMalicious }
                : { pwned: response.data.pwned }),
            message: response.data.message
        });
    } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
    } finally {
        changeload(false);
    }
};
