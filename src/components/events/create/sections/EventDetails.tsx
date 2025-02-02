import React from 'react';
import { FormData } from '../CreateEventForm';

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Partial<Record<keyof FormData, string>>;
};

export default function EventDetails({ formData, setFormData, errors }: Props) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Event Details</h2>
      
      <div className="space-y-6">
        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="single"
                checked={formData.eventType === 'single'}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value as 'single' | 'multiple' })}
                className="text-purple-600 focus:ring-purple-500"
                required
              />
              <span className="ml-2">Single Day</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="multiple"
                checked={formData.eventType === 'multiple'}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value as 'single' | 'multiple' })}
                className="text-purple-600 focus:ring-purple-500"
                required
              />
              <span className="ml-2">Multiple Days</span>
            </label>
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              required
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
            )}
          </div>

          {formData.eventType === 'multiple' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                required
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              required
            />
            {errors.startTime && (
              <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              required
            />
            {errors.endTime && (
              <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter city"
              required
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter venue"
              required
            />
            {errors.venue && (
              <p className="text-red-500 text-sm mt-1">{errors.venue}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Describe your event"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}