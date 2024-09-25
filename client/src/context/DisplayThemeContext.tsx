import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface DisplayThemeContextType {
    mode: string,
    setMode: (value: string) => void,
    displayTheme: Theme,
    setDisplayTheme: (value: Theme) => void,
    toggleMode: () => void,
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#222",
                },
            }
        },
    }
})

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#D2B48C',  // Jasny kolor przypominający stary papier
        },
        primary: {
            main: "#4d1f1c",
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f3e7c1', // Jasny żółty przypominający stary papier
                    backgroundSize: 'cover',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#4d1f1c",
                },
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    color: "#FFF",
                    backgroundColor: '#2c1917',
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: "#FFF",
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    // backgroundColor: '#4169e1', // Kolor wskaźnika dla wybranego zakładki (biały)
                    backgroundColor: '#FFF', // Kolor wskaźnika dla wybranego zakładki (biały)
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: '#FFF',  // Kolor tekstu dla wybranej zakładki (biały)
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #0000001f', // Ciemniejszy kolor linii między wierszami
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: "#f3e7c1" 
                }
            }
        }
    }
})

const DisplayThemeContext = createContext<DisplayThemeContextType | undefined>(undefined);

const DisplayThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [displayTheme, setDisplayTheme] = useState<Theme>(localStorage.getItem('mode') === 'light' ? lightTheme : darkTheme);
    const [mode, setMode] = useState(localStorage.getItem('mode') ?? "light")
    const toggleMode = () => {
        if (mode === 'dark') {
            localStorage.setItem('mode', 'light');
            setMode('light');
            setDisplayTheme(lightTheme);
        } else {
            localStorage.setItem('mode', 'dark');
            setMode('dark');
            setDisplayTheme(darkTheme);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('mode')) {
            localStorage.setItem('mode', 'light');
        }
    }, [])

    return (
        <DisplayThemeContext.Provider value={{ displayTheme, setDisplayTheme, mode, setMode, toggleMode }}>
            {children}
        </DisplayThemeContext.Provider>
    );
}

const useDisplayThemeContext = () => {
    const context = useContext(DisplayThemeContext);
    if (!context) {
        throw new Error('useDisplayThemeContext must be used within a DisplayThemeProvider');
    }
    return context;
};

export { DisplayThemeContextProvider, useDisplayThemeContext };