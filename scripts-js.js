/**
 * Soccer Ticketing System - JavaScript Functions for InMemoryDatabase Integration
 */

// Base URL for API calls
const API_BASE_URL = 'http://localhost:8080';

// Common utility functions
const Utils = {
    // Format date to YYYY-MM-DD HH:MM format
    formatDate: function(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    
    // Format currency
    formatCurrency: function(amount) {
        return parseFloat(amount).toFixed(2);
    },
    
    // Generate a random ID (for demo purposes)
    generateId: function() {
        return Math.floor(100000 + Math.random() * 900000);
    },
    
    // Parse URL parameters
    getUrlParam: function(paramName) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(paramName);
    },
    
    // Show error message
    showError: function(message) {
        alert('Error: ' + message);
        console.error('Error:', message);
    }
};

// User authentication and session management
const Auth = {
    currentUser: null,
    
    // Check if user is logged in
    isLoggedIn: function() {
        return this.currentUser !== null || localStorage.getItem('currentUser') !== null;
    },
    
    // Get current user data
    getCurrentUser: function() {
        if (this.currentUser) {
            return this.currentUser;
        }
        
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            return this.currentUser;
        }
        
        return null;
    },
    
    // Set current user (after login)
    setCurrentUser: function(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    },
    
    // Clear user data (on logout)
    logout: function() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    },
    
    // Calculate user discount based on role
    getUserDiscount: function() {
        const user = this.getCurrentUser();
        if (!user) return 0;
        
        switch (user.role) {
            case 'STUDENT':
            case 'FACULTY':
                return 10;
            case 'FAMILY':
                return 15;
            default:
                return 0;
        }
    },
    
    // Login user
    login: function(username, password) {
        return fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }
            return response.json();
        })
        .then(user => {
            this.setCurrentUser(user);
            return user;
        });
    },
    
    // Register new user
    register: function(userData) {
        return fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed. Username may already exist.');
            }
            return response.json();
        })
        .then(user => {
            this.setCurrentUser(user);
            return user;
        });
    },
    
    // Update user profile
    updateProfile: function(userData) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) {
            throw new Error('You must be logged in to update your profile.');
        }
        
        return fetch(`${API_BASE_URL}/api/users/${currentUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update profile.');
            }
            return response.json();
        })
        .then(user => {
            this.setCurrentUser(user);
            return user;
        });
    }
};

// Game-related functions
const Games = {
    // Get game by ID
    getGameById: function(gameId) {
        return fetch(`${API_BASE_URL}/api/games/${gameId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch game details.');
                }
                return response.json();
            });
    },
    
    // Get all games
    getAllGames: function() {
        return fetch(`${API_BASE_URL}/api/games`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch games.');
                }
                return response.json();
            });
    },
    
    // Get available seats for a game
    getAvailableSeats: function(gameId) {
        return fetch(`${API_BASE_URL}/api/games/${gameId}/seats`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch available seats.');
                }
                return response.json();
            });
    }
};

// Booking-related functions
const Bookings = {
    // Create a new booking
    createBooking: function(gameId, seatId, price) {
        const currentUser = Auth.getCurrentUser();
        if (!currentUser) {
            throw new Error('You must be logged in to book a ticket.');
        }
        
        return fetch(`${API_BASE_URL}/api/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gameId: gameId,
                userId: currentUser.id,
                seatId: seatId,
                price: price
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Booking failed. Please try again.');
            }
            return response.json();
        });
    },
    
    // Get user bookings
    getUserBookings: function() {
        const currentUser = Auth.getCurrentUser();
        if (!currentUser) {
            throw new Error('You must be logged in to view your bookings.');
        }
        
        return fetch(`${API_BASE_URL}/api/users/${currentUser.id}/bookings`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings.');
                }
                return response.json();
            });
    },
    
    // Cancel booking
    cancelBooking: function(bookingId) {
        return fetch(`${API_BASE_URL}/api/bookings/${bookingId}/cancel`, {
            method: 'POST'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to cancel booking.');
            }
            return response.json();
        });
    }
};

// Payment-related functions
const Payments = {
    // Process payment
    processPayment: function(bookingId, paymentData) {
        const currentUser = Auth.getCurrentUser();
        if (!currentUser) {
            throw new Error('You must be logged in to make a payment.');
        }
        
        return fetch(`${API_BASE_URL}/api/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: currentUser.id,
                bookingId: bookingId,
                amount: paymentData.amount,
                cardNumber: paymentData.cardNumber,
                cardName: paymentData.cardName,
                expiryDate: paymentData.expiryDate,
                cvv: paymentData.cvv
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Payment processing failed.');
            }
            return response.json();
        });
    },
    
    // Get payments for a booking
    getPaymentsForBooking: function(bookingId) {
        return fetch(`${API_BASE_URL}/api/bookings/${bookingId}/payments`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch payment information.');
                }
                return response.json();
            });
    }
};

// Fallback to mock data if API is not available
const MockData = {
    // Mock login function
    login: function(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate a successful login for demo purposes
                if (username && password) {
                    const user = {
                        id: 1,
                        username: username,
                        email: username.includes('@') ? username : `${username}@example.com`,
                        role: 'STUDENT',
                        discountPercentage: 10
                    };
                    resolve(user);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 500);
        });
    },
    
    // Mock registration function
    register: function(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate a successful registration for demo purposes
                if (userData.username && userData.email && userData.password) {
                    const user = {
                        id: 1,
                        username: userData.username,
                        email: userData.email,
                        role: userData.role || 'REGULAR',
                        discountPercentage: userData.role === 'STUDENT' || userData.role === 'FACULTY' ? 10 : 
                                            userData.role === 'FAMILY' ? 15 : 0
                    };
                    resolve(user);
                } else {
                    reject(new Error('Invalid user data'));
                }
            }, 500);
        });
    },
    
    // Mock get all games function
    getAllGames: function() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        gameName: 'WVU Tech Women Soccer vs Kokomo University Women Soccer',
                        gameDate: '2025-05-04 15:00',
                        stadiumName: 'YMCA Complex',
                        gameType: 'OUTDOOR',
                        isHomeGame: true,
                        totalSeats: 100,
                        availableSeats: 30
                    },
                    {
                        id: 2,
                        gameName: 'WVU Tech Women Soccer vs Bluefield State Women Soccer',
                        gameDate: '2025-05-11 14:00',
                        stadiumName: 'YMCA Complex',
                        gameType: 'OUTDOOR',
                        isHomeGame: true,
                        totalSeats: 100,
                        availableSeats: 45
                    },
                    {
                        id: 3,
                        gameName: 'IU East Women Soccer vs WVU Tech Women Soccer',
                        gameDate: '2025-05-18 16:30',
                        stadiumName: 'IU East Stadium',
                        gameType: 'OUTDOOR',
                        isHomeGame: false,
                        totalSeats: 80,
                        availableSeats: 20
                    },
                    {
                        id: 4,
                        gameName: 'Shaw University Women Soccer vs WVU Tech Women Soccer',
                        gameDate: '2025-05-25 14:00',
                        stadiumName: 'Shaw University Stadium',
                        gameType: 'OUTDOOR',
                        isHomeGame: false,
                        totalSeats: 50,
                        availableSeats: 15
                    }
                ]);
            }, 500);
        });
    },
    
    // Mock get available seats function
    getAvailableSeats: function(gameId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Generate mock seats based on the game ID
                const seats = [];
                const sectionCount = gameId < 3 ? 3 : 2;
                const seatsPerSection = gameId < 3 ? 10 : 5;
                
                for (let section = 1; section <= sectionCount; section++) {
                    let price = 20.0;
                    if (section === 1) price = 30.0;
                    else if (section === 2) price = 24.0;
                    
                    for (let i = 1; i <= seatsPerSection; i++) {
                        // Generate some unavailable seats randomly
                        const isAvailable = Math.random() > 0.3;
                        if (isAvailable) {
                            seats.push({
                                id: (section - 1) * seatsPerSection + i,
                                gameId: gameId,
                                section: section,
                                price: price,
                                isAvailable: true
                            });
                        }
                    }
                }
                
                resolve(seats);
            }, 500);
        });
    },
    
    // Mock create booking function
    createBooking: function(gameId, seatId, userId, price) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const bookingId = Utils.generateId();
                const paymentId = Utils.generateId();
                
                resolve({
                    bookingId: bookingId,
                    paymentId: paymentId,
                    success: true
                });
            }, 1000);
        });
    },
    
    // Mock get user bookings function
    getUserBookings: function() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 123456,
                        gameId: 1,
                        userId: 1,
                        seat: 14,
                        discountPrice: 21.60,
                        isConfirmed: true,
                        bookingDate: '2025-04-27 10:30',
                        game: {
                            id: 1,
                            gameName: 'WVU Tech Women Soccer vs Kokomo University Women Soccer',
                            gameDate: '2025-05-04 15:00',
                            stadiumName: 'YMCA Complex'
                        },
                        seat: {
                            id: 14,
                            section: 2
                        },
                        payment: {
                            id: 789012,
                            status: 'COMPLETED'
                        }
                    },
                    {
                        id: 123457,
                        gameId: 2,
                        userId: 1,
                        seat: 8,
                        discountPrice: 27.00,
                        isConfirmed: true,
                        bookingDate: '2025-04-26 14:15',
                        game: {
                            id: 2,
                            gameName: 'WVU Tech Women Soccer vs Bluefield State Women Soccer',
                            gameDate: '2025-05-11 14:00',
                            stadiumName: 'YMCA Complex'
                        },
                        seat: {
                            id: 8,
                            section: 1
                        },
                        payment: {
                            id: 789013,
                            status: 'COMPLETED'
                        }
                    }
                ]);
            }, 500);
        });
    },
    
    // Mock cancel booking function
    cancelBooking: function(bookingId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: 'Booking cancelled successfully. A refund has been initiated.'
                });
            }, 1000);
        });
    }
};

// Detect if API is available and use appropriate data source
function detectApi() {
    return fetch(`${API_BASE_URL}/api/health`)
        .then(response => response.ok)
        .catch(() => false);
}

// Initialize the page on load
document.addEventListener('DOMContentLoaded', function() {
    // Check if API is available
    detectApi().then(apiAvailable => {
        console.log(`API ${apiAvailable ? 'is' : 'is not'} available. Using ${apiAvailable ? 'real' : 'mock'} data.`);
        
        // Override functions if API is not available
        if (!apiAvailable) {
            console.log('Using mock data as the API is not available.');
            
            // Override Auth functions
            Auth.login = MockData.login;
            Auth.register = MockData.register;
            
            // Override Games functions
            Games.getAllGames = MockData.getAllGames;
            Games.getAvailableSeats = MockData.getAvailableSeats;
            
            // Override Bookings functions
            Bookings.createBooking = MockData.createBooking;
            Bookings.getUserBookings = MockData.getUserBookings;
            Bookings.cancelBooking = MockData.cancelBooking;
        }
        
        // Check if user is logged in
        const currentUser = Auth.getCurrentUser();
        const userDisplayElement = document.getElementById('userName');
        
        if (currentUser && userDisplayElement) {
            userDisplayElement.textContent = `Welcome, ${currentUser.username}`;
        }
        
        // Add logout functionality to all logout buttons
        const logoutBtns = document.querySelectorAll('.logout-btn');
        logoutBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                Auth.logout();
            });
        });
    });
});
