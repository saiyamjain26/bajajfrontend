import React, { useState, useEffect, useRef } from 'react';

function App() {
    const [jsonData, setJsonData] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        // Set the document title to your registration number
        document.title = "21BCE5072";
    }, []);

    const handleJsonInput = (e) => {
        setJsonData(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            // Parse jsonData to a JavaScript array
            const data = JSON.parse(jsonData);

            // Send request with proper format
            const response = await fetch('https://bajajbackend-91xo.onrender.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data, selectedOptions }),
            });
            const result = await response.json();
            setResponseData(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (option) => {
        if (selectedOptions.includes(option)) {
            // If already selected, remove the option
            setSelectedOptions(selectedOptions.filter(opt => opt !== option));
        } else {
            // Add the new option
            setSelectedOptions([...selectedOptions, option]);
        }
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    const handleRemoveOption = (option) => {
        setSelectedOptions(selectedOptions.filter(opt => opt !== option));
    };

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div style={styles.app}>
            <h1 style={styles.heading}>Bajaj Finserv Health Challenge</h1>
            <textarea
                placeholder='API Input (JSON array)'
                value={jsonData}
                onChange={handleJsonInput}
                rows="5"
                cols="40"
                style={styles.textarea}
            ></textarea>
            <br />
            <button onClick={handleSubmit} style={styles.button}>Submit</button>
            <br />
            <div style={styles.dropdownContainer} ref={dropdownRef}>
                <div style={styles.selectedOptionsContainer} onClick={toggleDropdown}>
                    {selectedOptions.length === 0 ? (
                        <span style={styles.placeholder}>Select options</span>
                    ) : (
                        selectedOptions.map((option, index) => (
                            <div key={index} style={styles.selectedOption}>
                                {option}
                                <span
                                    style={styles.removeOption}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveOption(option);
                                    }}
                                >
                                    &times;
                                </span>
                            </div>
                        ))
                    )}
                    <span style={styles.arrow}>{isDropdownOpen ? '▲' : '▼'}</span>
                </div>
                {isDropdownOpen && (
                    <div style={styles.dropdown}>
                        <div
                            style={styles.dropdownItem}
                            onClick={() => handleOptionClick('alphabets')}
                        >
                            Alphabets
                        </div>
                        <div
                            style={styles.dropdownItem}
                            onClick={() => handleOptionClick('numbers')}
                        >
                            Numbers
                        </div>
                        <div
                            style={styles.dropdownItem}
                            onClick={() => handleOptionClick('highest_lowercase_alphabet')}
                        >
                            Highest Lowercase Alphabet
                        </div>
                    </div>
                )}
            </div>
            <div>
                {responseData && (
                    <div style={styles.filteredResponse}>
                        <h2 style={styles.responseHeading}>Filtered Response:</h2>
                        {selectedOptions.includes("alphabets") && (
                            <div>Alphabets: {JSON.stringify(responseData.alphabets)}</div>
                        )}
                        {selectedOptions.includes("numbers") && (
                            <div>Numbers: {JSON.stringify(responseData.numbers)}</div>
                        )}
                        {selectedOptions.includes("highest_lowercase_alphabet") && (
                            <div>Highest Lowercase Alphabet: {JSON.stringify(responseData.highest_lowercase_alphabet)}</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    app: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '500px',
        margin: '50px auto',
        textAlign: 'center',
    },
    heading: {
        color: '#2A579A',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '10px',
    },
    button: {
        backgroundColor: '#2A579A',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px',
    },
    dropdownContainer: {
        position: 'relative',
        width: '100%',
        marginTop: '20px',
        marginBottom: '10px',
        fontSize: '16px',
        textAlign: 'left',
    },
    selectedOptionsContainer: {
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
        cursor: 'pointer',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    placeholder: {
        color: '#999',
    },
    selectedOption: {
        backgroundColor: '#E0E0E0',
        borderRadius: '4px',
        padding: '5px 10px',
        margin: '2px',
        display: 'flex',
        alignItems: 'center',
    },
    removeOption: {
        marginLeft: '8px',
        cursor: 'pointer',
    },
    arrow: {
        marginLeft: 'auto',
        paddingLeft: '10px',
    },
    dropdown: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '4px',
        zIndex: 1,
        marginTop: '5px',
    },
    dropdownItem: {
        padding: '10px',
        cursor: 'pointer',
    },
    dropdownItemHover: {
        backgroundColor: '#F0F0F0',
    },
    responseHeading: {
        marginTop: '10px',
        fontSize: '20px',
    },
    filteredResponse: {
        marginTop: '0px',
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
        fontSize: '16px',
        textAlign: 'left',
    },
};

export default App;
