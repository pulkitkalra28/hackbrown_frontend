import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ArtistDetailsForm from './components/auth/ArtistDetailsForm';
import EventsPage from './components/events/EventsPage';
import EventDetailsPage from './components/events/details/EventDetailsPage';
import PaymentPage from './components/payment/PaymentPage';
import CreateEventPage from './components/events/create/CreateEventPage';
import CreateVenuePage from './components/venues/CreateVenuePage';
import MyVenuesPage from './components/venues/MyVenuesPage';
import VenuesPage from './components/venues/VenuesPage';
import VenueDetailsPage from './components/venues/VenueDetailsPage';
import ArtistPostsPage from './components/artist/ArtistPostsPage';
import FeedPage from './components/feed/FeedPage';
import LandingPage from './components/LandingPage';
import ContactPage from './components/contact/ContactPage';
import ProfilePage from './components/profile/ProfilePage';
import EditProfilePage from './components/profile/EditProfilePage';
import BookingsPage from './components/profile/BookingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route 
            path="/events/create" 
            element={
              <ProtectedRoute>
                <CreateEventPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/venues/create" 
            element={
              <ProtectedRoute>
                <CreateVenuePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/venues/my-venues" 
            element={
              <ProtectedRoute>
                <MyVenuesPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/venues/:id" element={<VenueDetailsPage />} />
          <Route 
            path="/events/edit/:id" 
            element={
              <ProtectedRoute>
                <CreateEventPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/artist-details" 
            element={
              <ProtectedRoute>
                <ArtistDetailsForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/artist/posts" 
            element={
              <ProtectedRoute>
                <ArtistPostsPage />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}